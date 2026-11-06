// Emails sent when someone uses the Contact or Careers form on
// obramajoralia.com. Table-based with inline styles so they hold up in Gmail
// and Outlook. Brand palette only: #383838 / #797979 / #e4e3e2 / #ffffff.
// Images are served from the site's /public/email folder.

const SITE = 'https://www.obramajoralia.com';
const IMG = `${SITE}/email`;

const C = { ink: '#383838', stone: '#797979', mist: '#e4e3e2', white: '#ffffff' };
const FONT = "'Nexa','Helvetica Neue',Helvetica,Arial,sans-serif";

export const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const first = (name: string) => name.trim().split(/\s+/)[0] || 'there';

// ---- building blocks (return trusted HTML; callers escape user text) ----

const eyebrow = (text: string) =>
  `<p style="margin:0 0 16px;font-family:${FONT};font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:${C.stone}">${text}</p>`;

const headline = (html: string) =>
  `<h1 style="margin:0 0 28px;font-family:${FONT};font-size:36px;line-height:1.05;letter-spacing:-0.03em;font-weight:700;color:${C.ink}">${html}</h1>`;

const muted = (html: string) => `<span style="color:${C.stone}">${html}</span>`;

const p = (html: string, quiet = false) =>
  `<p style="margin:0 0 16px;font-family:${FONT};font-size:15px;line-height:1.65;color:${quiet ? C.stone : C.ink}">${html}</p>`;

const label = (text: string) =>
  `<p style="margin:28px 0 10px;font-family:${FONT};font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:${C.stone}">${text}</p>`;

const quote = (text: string) =>
  `<div style="margin:0 0 24px;padding:0 0 0 18px;border-left:2px solid ${C.mist};font-family:${FONT};font-size:15px;line-height:1.65;color:${C.ink};white-space:pre-wrap">${esc(text)}</div>`;

const arrowLink = (text: string, url: string) =>
  `<p style="margin:12px 0 0;font-family:${FONT};font-size:12px;letter-spacing:0.14em;text-transform:uppercase;font-weight:700"><a href="${url}" style="color:${C.ink};text-decoration:none;border-bottom:1px solid ${C.ink};padding-bottom:2px">${text}</a></p>`;

const button = (text: string, url: string) =>
  `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:8px 0 4px"><tr><td style="background:${C.ink}">
     <a href="${url}" style="display:inline-block;padding:14px 26px;font-family:${FONT};font-size:12px;letter-spacing:0.14em;text-transform:uppercase;font-weight:700;color:${C.white};text-decoration:none">${text}</a>
   </td></tr></table>`;

/** Label/value rows. Values are escaped here. */
function details(rows: [string, string | null | undefined][]) {
  const body = rows.filter(([, v]) => v).map(([k, v]) => `
    <tr>
      <td style="padding:12px 0;border-top:1px solid ${C.mist};width:120px;vertical-align:top;font-family:${FONT};font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:${C.stone}">${k}</td>
      <td style="padding:12px 0;border-top:1px solid ${C.mist};font-family:${FONT};font-size:15px;color:${C.ink}">${esc(String(v))}</td>
    </tr>`).join('');
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 8px;border-bottom:1px solid ${C.mist}">${body}</table>`;
}

const footerLink = (text: string, url: string) =>
  `<a href="${url}" style="color:${C.stone};text-decoration:none">${text}</a>`;

function frame(opts: { preheader: string; hero?: string; heroAlt?: string; body: string; note: string; links?: boolean }) {
  return `<!doctype html>
<html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light only"><meta name="supported-color-schemes" content="light">
<style>
  @media (max-width:620px){
    .wrap{padding:16px 0 !important}
    .inner{padding:32px 24px !important}
    .inner h1{font-size:30px !important}
  }
</style>
</head>
<body style="margin:0;padding:0;background:${C.white}">
<div style="display:none;max-height:0;overflow:hidden;opacity:0">${esc(opts.preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.white}">
  <tr><td class="wrap" align="center" style="padding:32px 16px">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px">
      <tr><td style="padding:0 24px 28px">
        <a href="${SITE}"><img src="${IMG}/obra-logo.png" alt="Obra Majoralia" width="150" height="50" style="display:block;border:0"></a>
      </td></tr>
      ${opts.hero ? `<tr><td><img src="${opts.hero}" alt="${esc(opts.heroAlt ?? '')}" width="600" style="display:block;width:100%;height:auto;border:0"></td></tr>` : ''}
      <tr><td class="inner" style="padding:40px 24px;border-bottom:1px solid ${C.mist}">${opts.body}</td></tr>
      <tr><td style="padding:28px 24px 0;font-family:${FONT}">
        ${opts.links === false ? '' : `
        <p style="margin:0 0 18px;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;line-height:1.8">
          ${footerLink('Projects', `${SITE}/projects`)} &nbsp;&middot;&nbsp; ${footerLink('OBRAverse', `${SITE}/obraverse`)} &nbsp;&middot;&nbsp; ${footerLink('Instagram', 'https://www.instagram.com/obra.majoralia/')} &nbsp;&middot;&nbsp; ${footerLink('Facebook', 'https://www.facebook.com/obramajoralia/')}
        </p>`}
        <p style="margin:0;font-size:11px;line-height:1.6;color:${C.stone}">${opts.note}</p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`;
}

const SENDER_NOTE =
  `You’re receiving this because you contacted Obra Majoralia Design Studio through <a href="${SITE}" style="color:${C.stone}">obramajoralia.com</a>.`;
const TEAM_NOTE = `Sent from the forms on <a href="${SITE}" style="color:${C.stone}">obramajoralia.com</a>.`;

const excerpt = (s: string | null) => (s && s.length > 400 ? s.slice(0, 400).trimEnd() + '…' : s);

// ---- the emails ----

export interface Submission {
  form: 'contact' | 'careers';
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  position: string | null;
  message: string | null;
  fileName: string | null;
}

/** To the person who used the Contact form. */
export function contactConfirmation(s: Submission) {
  const msg = excerpt(s.message);
  return {
    subject: 'We received your message',
    html: frame({
      preheader: 'Thank you for getting in touch with Obra Majoralia.',
      hero: `${IMG}/hero-contact.jpg`,
      heroAlt: 'A project by Obra Majoralia Design Studio',
      body:
        eyebrow('Message received')
        + headline(`We received your ${muted('message.')}`)
        + p(`Hi ${esc(first(s.name))},`)
        + p('Thank you for getting in touch with Obra Majoralia Design Studio. Our team will read your message and get back to you.')
        + (msg ? label('Your message') + quote(msg) : '')
        + p('If you’d like to add anything, like a site plan, photos or a brief, reply to this email.', true)
        + arrowLink('See our projects', `${SITE}/projects`),
      note: SENDER_NOTE,
    }),
    text: [
      `Hi ${first(s.name)},`, '',
      'Thank you for getting in touch with Obra Majoralia Design Studio. Our team will read your message and get back to you.', '',
      'If you’d like to add anything, like a site plan, photos or a brief, reply to this email.', '',
      'Obra Majoralia Design Studio', SITE,
      ...(s.message ? ['', '---', 'Your message:', s.message] : []),
    ].join('\n'),
  };
}

/** To the person who applied through the Careers form. */
export function careersConfirmation(s: Submission) {
  const role = s.position ?? 'a role at the studio';
  return {
    subject: 'We received your application',
    html: frame({
      preheader: `Thank you for applying for ${role}.`,
      hero: `${IMG}/hero-careers.jpg`,
      heroAlt: 'Bakley Rotonda by Obra Majoralia',
      body:
        eyebrow('Application received')
        + headline(`We received your ${muted('application.')}`)
        + p(`Hi ${esc(first(s.name))},`)
        + p(`Thank you for applying for <strong>${esc(role)}</strong> at Obra Majoralia Design Studio. We review every application and will contact you if there’s a fit.`)
        + details([
            ['Position', s.position],
            ['Attached', s.fileName],
          ])
        + p('If you’d like to send more of your work, reply to this email.', true)
        + arrowLink('See our projects', `${SITE}/projects`),
      note: SENDER_NOTE,
    }),
    text: [
      `Hi ${first(s.name)},`, '',
      `Thank you for applying for ${role} at Obra Majoralia Design Studio. We review every application and will contact you if there’s a fit.`, '',
      ...(s.fileName ? [`Attached: ${s.fileName}`, ''] : []),
      'If you’d like to send more of your work, reply to this email.', '',
      'Obra Majoralia Design Studio', SITE,
    ].join('\n'),
  };
}

/** To the studio, for either form. Replying goes to the sender (reply_to is set by the caller). */
export function teamNotification(s: Submission, adminUrl: string) {
  const careers = s.form === 'careers';
  const subject = careers
    ? `Application from ${s.name}${s.position ? ` for ${s.position}` : ''}`
    : `New enquiry from ${s.name}${s.subject ? `: ${s.subject}` : ''}`;
  const replySubject = careers ? `Your application to Obra Majoralia` : `Re: ${s.subject ?? 'Your enquiry to Obra Majoralia'}`;
  const reply = `mailto:${s.email}?subject=${encodeURIComponent(replySubject)}`;

  return {
    subject,
    html: frame({
      preheader: (s.message ?? '').slice(0, 120),
      body:
        eyebrow(careers ? 'New application' : 'New enquiry')
        + headline(`${careers ? 'Application' : 'Enquiry'} from ${muted(esc(s.name))}`)
        + details([
            ['Email', s.email],
            ['Phone', s.phone],
            [careers ? 'Position' : 'Subject', careers ? s.position : s.subject],
            ['Attached', s.fileName],
          ])
        + (s.message ? label(careers ? 'Cover letter' : 'Their message') + quote(s.message) : '')
        + button(`Reply to ${esc(first(s.name))}`, reply)
        + `<p style="margin:18px 0 0;font-family:${FONT};font-size:14px;line-height:1.6;color:${C.stone}">Or reply to this email. It goes straight to them. <a href="${adminUrl}" style="color:${C.stone}">Open in the admin</a></p>`,
      note: TEAM_NOTE,
      links: false,
    }),
    text: [
      subject, '',
      `Email: ${s.email}`,
      ...(s.phone ? [`Phone: ${s.phone}`] : []),
      ...(careers && s.position ? [`Position: ${s.position}`] : []),
      ...(!careers && s.subject ? [`Subject: ${s.subject}`] : []),
      ...(s.fileName ? [`Attached: ${s.fileName}`] : []),
      ...(s.message ? ['', s.message] : []),
      '', 'Reply to this email to answer them directly.',
      `Admin: ${adminUrl}`,
    ].join('\n'),
  };
}
