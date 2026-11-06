import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { encodeBase64 } from 'jsr:@std/encoding@1/base64';
import { careersConfirmation, contactConfirmation, teamNotification, type Submission } from './email.ts';

// Handles both public forms: Contact (form=contact) and Careers (form=careers).
// Takes multipart form data so a file can come along. Saves the submission and
// the file, emails the studio (file attached), and sends the sender a
// confirmation. Emails go out through Obra's own Resend account.

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')!;
// Comma-separated, so another inbox can be added without a redeploy.
const list = (v: string | undefined, fallback: string) =>
  (v ?? fallback).split(',').map((s) => s.trim()).filter(Boolean);
const NOTIFY_CONTACT = list(Deno.env.get('NOTIFY_EMAIL'), 'obra.majoralia@gmail.com');
const NOTIFY_CAREERS = list(Deno.env.get('NOTIFY_CAREERS_EMAIL') ?? Deno.env.get('NOTIFY_EMAIL'), 'obra.majoralia@gmail.com');
const FROM_EMAIL = Deno.env.get('FROM_EMAIL') ?? 'Obra Majoralia <hello@obramajoralia.com>';
// Where senders' replies to the confirmation land.
const REPLY_TO = Deno.env.get('REPLY_TO') ?? 'obra.majoralia@gmail.com';
const ADMIN_URL = 'https://www.obramajoralia.com/admin/inbox';

const MAX_FILE = 10 * 1024 * 1024;
const FILE_TYPES = ['pdf', 'doc', 'docx', 'zip', 'jpg', 'jpeg', 'png', 'webp', 'heic', 'ppt', 'pptx', 'key', 'dwg'];

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
);

const cors = {
  'Access-Control-Allow-Origin': Deno.env.get('ALLOWED_ORIGIN') ?? '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Content-Type': 'application/json',
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: cors });

// Public input: trim, cap length, drop empties.
const str = (v: FormDataEntryValue | null, max: number) =>
  typeof v === 'string' && v.trim() ? v.trim().slice(0, max) : null;

const sendEmail = (payload: Record<string, unknown>) =>
  fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: FROM_EMAIL, ...payload }),
  }).catch((e) => { console.error('resend request failed', e); return null; });

const safeName = (name: string) =>
  name.normalize('NFKD').replace(/[^\w.\-]+/g, '-').replace(/-+/g, '-').slice(-100) || 'file';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors });
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);

  try {
    const body = await req.formData();

    // Honeypot: a hidden field real visitors never fill. Pretend it worked.
    if (str(body.get('website'), 200)) return json({ ok: true });

    const form = body.get('form') === 'careers' ? 'careers' : 'contact';
    const firstName = str(body.get('first_name'), 100);
    const lastName = str(body.get('last_name'), 100);
    const email = str(body.get('email'), 200)?.toLowerCase() ?? null;
    const phone = str(body.get('phone'), 50);
    const subject = form === 'contact' ? str(body.get('subject'), 200) : null;
    const position = form === 'careers' ? str(body.get('position'), 120) : null;
    const message = str(body.get('message'), 5000);
    const fileEntry = body.get('file');
    const file = fileEntry instanceof File && fileEntry.size > 0 ? fileEntry : null;

    if (!firstName || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !message) {
      return json({ error: 'Please fill in the required fields.' }, 400);
    }
    if (form === 'careers' && !position) return json({ error: 'Please fill in the required fields.' }, 400);
    if (file) {
      const ext = file.name.split('.').pop()?.toLowerCase() ?? '';
      if (file.size > MAX_FILE) return json({ error: 'That file is over 10 MB. Please send a smaller one or include a link.' }, 400);
      if (!FILE_TYPES.includes(ext)) return json({ error: 'Please attach a PDF, Word, image or ZIP file.' }, 400);
    }

    // The form is public, so cap how often one address can use it, and only
    // send the confirmation for the first submission per address per day.
    const hourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const [{ count: lastHour }, { count: lastDay }] = await Promise.all([
      supabase.from('form_submissions').select('id', { count: 'exact', head: true })
        .eq('email', email).gte('created_at', hourAgo),
      supabase.from('form_submissions').select('id', { count: 'exact', head: true })
        .eq('email', email).eq('form', form).gte('created_at', dayAgo),
    ]);
    if ((lastHour ?? 0) >= 5) return json({ error: 'Too many submissions. Please try again later.' }, 429);

    // Store the file first so the row can point at it.
    let filePath: string | null = null;
    let fileBytes: Uint8Array | null = null;
    if (file) {
      fileBytes = new Uint8Array(await file.arrayBuffer());
      const month = new Date().toISOString().slice(0, 7);
      filePath = `${form}/${month}/${crypto.randomUUID()}-${safeName(file.name)}`;
      const { error: upErr } = await supabase.storage.from('form-files')
        .upload(filePath, fileBytes, { contentType: file.type || 'application/octet-stream' });
      if (upErr) {
        console.error('upload failed', upErr);
        return json({ error: 'We couldn’t upload your file. Please try again.' }, 500);
      }
    }

    const { data: saved, error: dbError } = await supabase.from('form_submissions').insert({
      form,
      first_name: firstName,
      last_name: lastName,
      email,
      phone,
      subject,
      position,
      message,
      file_path: filePath,
      file_name: file?.name.slice(0, 200) ?? null,
      file_size: file?.size ?? null,
    }).select('id').single();

    if (dbError) {
      console.error('insert failed', dbError);
      return json({ error: 'Something went wrong. Please try again.' }, 500);
    }

    const s: Submission = {
      form,
      name: [firstName, lastName].filter(Boolean).join(' '),
      email,
      phone,
      subject,
      position,
      message,
      fileName: file?.name ?? null,
    };

    // The submission is already saved, so a failed email doesn't fail the form.
    const team = teamNotification(s, `${ADMIN_URL}?id=${saved.id}`);
    const res = await sendEmail({
      to: form === 'careers' ? NOTIFY_CAREERS : NOTIFY_CONTACT,
      reply_to: email,
      ...team,
      ...(file && fileBytes ? { attachments: [{ filename: file.name, content: encodeBase64(fileBytes) }] } : {}),
    });
    if (res?.ok) {
      await supabase.from('form_submissions').update({ email_sent: true }).eq('id', saved.id);
    } else if (res) {
      console.error('resend error', res.status, await res.text());
    }

    if (!lastDay) {
      const ack = await sendEmail({
        to: [email],
        reply_to: REPLY_TO,
        ...(form === 'careers' ? careersConfirmation(s) : contactConfirmation(s)),
      });
      if (ack && !ack.ok) console.error('confirmation error', ack.status, await ack.text());
    }

    return json({ ok: true });
  } catch (err) {
    console.error(err);
    return json({ error: 'Something went wrong. Please try again.' }, 500);
  }
});
