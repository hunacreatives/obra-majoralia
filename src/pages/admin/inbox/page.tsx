import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import AdminLayout, { refreshNewCounts } from '../AdminLayout';
import { Btn, Drawer, card } from '../ui';

type Form = 'contact' | 'careers';
type Status = 'new' | 'replied' | 'archived';

interface Submission {
  id: string;
  created_at: string;
  form: Form;
  first_name: string;
  last_name: string | null;
  email: string;
  phone: string | null;
  subject: string | null;
  position: string | null;
  message: string | null;
  file_path: string | null;
  file_name: string | null;
  file_size: number | null;
  status: Status;
}

const TABS: { key: Status | 'all'; label: string }[] = [
  { key: 'new', label: 'New' },
  { key: 'replied', label: 'Replied' },
  { key: 'archived', label: 'Archived' },
  { key: 'all', label: 'All' },
];

const TITLES: Record<Form | 'all', string> = { contact: 'Enquiries', careers: 'Applications', all: 'Inbox' };

let cache: Submission[] | null = null;

const fullName = (s: Submission) => [s.first_name, s.last_name].filter(Boolean).join(' ');
const when = (iso: string) => {
  const d = new Date(iso);
  const sameDay = d.toDateString() === new Date().toDateString();
  return sameDay
    ? d.toLocaleTimeString('en-PH', { hour: 'numeric', minute: '2-digit' })
    : d.toLocaleDateString('en-PH', {
        month: 'short',
        day: 'numeric',
        year: d.getFullYear() === new Date().getFullYear() ? undefined : 'numeric',
      });
};
const size = (b: number | null) =>
  !b ? '' : b < 1024 * 1024 ? `${Math.max(1, Math.round(b / 1024))} KB` : `${(b / 1024 / 1024).toFixed(1)} MB`;
const oneLine = (s: string | null) => (s ?? '').replace(/\s+/g, ' ');

function Row({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null;
  return (
    <div className="flex gap-4 border-t border-[#e4e3e2] py-2.5 text-[13px] first:border-t-0">
      <span className="w-24 flex-shrink-0 text-[#797979]">{label}</span>
      <span className="min-w-0 flex-1 break-words text-[#383838]">{value}</span>
    </div>
  );
}

export default function InboxPage({ form }: { form?: Form }) {
  const [rows, setRows] = useState<Submission[] | null>(cache);
  const [tab, setTab] = useState<Status | 'all'>('new');
  const [params, setParams] = useSearchParams();
  const openId = params.get('id');
  const [error, setError] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    supabase
      .from('form_submissions')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1000)
      .then(({ data, error }) => {
        if (error) return setError(error.message);
        cache = data as Submission[];
        setRows(cache);
      });
  }, []);

  const mine = useMemo(() => (rows ?? []).filter((r) => !form || r.form === form), [rows, form]);
  const counts = useMemo(() => {
    const c = { new: 0, replied: 0, archived: 0, all: mine.length };
    mine.forEach((r) => c[r.status]++);
    return c;
  }, [mine]);

  const shown = mine.filter((r) => tab === 'all' || r.status === tab);
  const open = rows?.find((r) => r.id === openId) ?? null;

  const setOpenId = (id: string | null) => {
    const next = new URLSearchParams(params);
    if (id) next.set('id', id);
    else next.delete('id');
    setParams(next, { replace: true });
  };

  const update = (id: string, patch: Partial<Submission>) => {
    cache = (rows ?? []).map((r) => (r.id === id ? { ...r, ...patch } : r));
    setRows(cache);
  };

  const setStatus = async (s: Submission, status: Status) => {
    update(s.id, { status });
    const { error } = await supabase.from('form_submissions').update({ status }).eq('id', s.id);
    if (error) setError(error.message);
    refreshNewCounts();
  };

  const remove = async (s: Submission) => {
    const what = s.form === 'careers' ? 'application' : 'enquiry';
    if (!window.confirm(`Delete the ${what} from ${fullName(s)}${s.file_name ? ' and its attachment' : ''}? This can’t be undone.`)) return;
    if (s.file_path) await supabase.storage.from('form-files').remove([s.file_path]);
    const { error } = await supabase.from('form_submissions').delete().eq('id', s.id);
    if (error) return setError(error.message);
    cache = (rows ?? []).filter((r) => r.id !== s.id);
    setRows(cache);
    setOpenId(null);
    refreshNewCounts();
  };

  const download = async (s: Submission) => {
    if (!s.file_path) return;
    setDownloading(true);
    const { data, error } = await supabase.storage
      .from('form-files')
      .createSignedUrl(s.file_path, 300, { download: s.file_name ?? true });
    setDownloading(false);
    if (error || !data) return setError(error?.message ?? 'Couldn’t open the file.');
    window.location.href = data.signedUrl;
  };

  const replyHref = (s: Submission) =>
    `mailto:${s.email}?subject=${encodeURIComponent(
      s.form === 'careers' ? 'Your application to Obra Majoralia' : `Re: ${s.subject ?? 'Your enquiry to Obra Majoralia'}`,
    )}`;

  const empty =
    tab === 'new'
      ? form === 'careers'
        ? 'No new applications.'
        : 'No new enquiries.'
      : 'Nothing here.';

  return (
    <AdminLayout title={TITLES[form ?? 'all']}>
      {error && (
        <p className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-700">{error}</p>
      )}

      <div className="mb-4 flex gap-1 overflow-x-auto">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
              tab === t.key ? 'bg-[#383838] text-white' : 'text-[#797979] hover:bg-white/70 hover:text-[#383838]'
            }`}
          >
            {t.label}
            <span className={`ml-1.5 ${tab === t.key ? 'text-white/70' : 'text-[#797979]/70'}`}>{counts[t.key]}</span>
          </button>
        ))}
      </div>

      {rows === null && !error && <p className="py-16 text-center text-[13px] text-[#797979]">Loading…</p>}

      {rows && (
        <div className={`${card} overflow-hidden`}>
          {shown.map((s) => (
            <button
              key={s.id}
              onClick={() => setOpenId(s.id)}
              className="flex w-full items-center gap-4 border-t border-[#e4e3e2] px-4 py-3 text-left first:border-t-0 hover:bg-[#e4e3e2]/30"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className={`truncate text-[14px] ${s.status === 'new' ? 'font-bold text-[#383838]' : 'text-[#383838]'}`}>
                    {fullName(s)}
                  </p>
                  {(s.form === 'careers' ? s.position : s.subject) && (
                    <span className="flex-shrink-0 truncate rounded-full bg-[#e4e3e2]/70 px-2 py-0.5 text-[11px] text-[#383838] max-w-[45%]">
                      {s.form === 'careers' ? s.position : s.subject}
                    </span>
                  )}
                  {s.file_name && <i className="ri-attachment-2 flex-shrink-0 text-[14px] text-[#797979]" title={s.file_name} />}
                </div>
                <p className="truncate text-[13px] text-[#797979]">{oneLine(s.message)}</p>
              </div>
              <span className="flex-shrink-0 text-[12px] text-[#797979]">{when(s.created_at)}</span>
            </button>
          ))}
          {shown.length === 0 && <p className="px-4 py-14 text-center text-[13px] text-[#797979]">{empty}</p>}
        </div>
      )}

      <Drawer
        open={!!open}
        onClose={() => setOpenId(null)}
        title={open ? fullName(open) : ''}
        footer={
          open && (
            <>
              <button onClick={() => remove(open)} className="mr-auto text-[13px] font-medium text-red-600 hover:underline">
                Delete
              </button>
              {open.status !== 'archived' ? (
                <Btn variant="outline" onClick={() => setStatus(open, 'archived')}>
                  Archive
                </Btn>
              ) : (
                <Btn variant="outline" onClick={() => setStatus(open, 'new')}>
                  Move to New
                </Btn>
              )}
              {open.status === 'new' && (
                <Btn variant="outline" onClick={() => setStatus(open, 'replied')}>
                  Mark replied
                </Btn>
              )}
              <a
                href={replyHref(open)}
                onClick={() => open.status === 'new' && setStatus(open, 'replied')}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#383838] px-4 py-2 text-[13px] font-semibold text-white hover:opacity-90"
              >
                Reply
              </a>
            </>
          )
        }
      >
        {open && (
          <>
            <p className="text-[12px] text-[#797979]">
              {open.form === 'careers' ? 'Job application' : 'Contact form'} ·{' '}
              {new Date(open.created_at).toLocaleString('en-PH', { dateStyle: 'medium', timeStyle: 'short' })}
            </p>
            <div>
              <Row label="Email" value={open.email} />
              <Row label="Phone" value={open.phone} />
              <Row label="Position" value={open.position} />
              <Row label="Subject" value={open.subject} />
            </div>
            {open.message && (
              <div className="whitespace-pre-wrap rounded-xl bg-[#e4e3e2]/40 px-4 py-3 text-[14px] leading-relaxed text-[#383838]">
                {open.message}
              </div>
            )}
            {open.file_name && (
              <button
                onClick={() => download(open)}
                disabled={downloading}
                className="flex w-full items-center gap-3 rounded-xl border border-[#e4e3e2] bg-white px-4 py-3 text-left hover:border-[#797979] disabled:opacity-60"
              >
                <i className="ri-file-text-line text-xl text-[#797979]" />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[13px] font-semibold text-[#383838]">{open.file_name}</span>
                  <span className="block text-[12px] text-[#797979]">{size(open.file_size)}</span>
                </span>
                <span className="text-[12px] font-semibold text-[#383838]">{downloading ? 'Opening…' : 'Download'}</span>
              </button>
            )}
          </>
        )}
      </Drawer>
    </AdminLayout>
  );
}
