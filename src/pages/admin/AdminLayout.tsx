import { ReactNode, useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { signOut, useSession } from './auth';

const ICON = '/images/logo-secondary.png';

type Form = 'contact' | 'careers';
type Item = { to: string; label: string; icon: string; badge?: Form };

const NAV: { label: string; items: Item[] }[] = [
  {
    label: 'Inbox',
    items: [
      { to: '/admin/enquiries', label: 'Enquiries', icon: 'ri-inbox-line', badge: 'contact' },
      { to: '/admin/applications', label: 'Applications', icon: 'ri-briefcase-line', badge: 'careers' },
    ],
  },
];

/** Counts of submissions still marked new, for the sidebar badges. */
type Counts = Record<Form, number>;
let countCache: Counts | null = null;
const countListeners = new Set<(c: Counts) => void>();
export function refreshNewCounts() {
  Promise.all(
    (['contact', 'careers'] as Form[]).map((form) =>
      supabase
        .from('form_submissions')
        .select('id', { count: 'exact', head: true })
        .eq('status', 'new')
        .eq('form', form)
        .then(({ count }) => count ?? 0),
    ),
  ).then(([contact, careers]) => {
    countCache = { contact, careers };
    countListeners.forEach((fn) => fn(countCache!));
  });
}
function useNewCounts() {
  const [c, setC] = useState<Counts>(countCache ?? { contact: 0, careers: 0 });
  useEffect(() => {
    countListeners.add(setC);
    if (countCache === null) refreshNewCounts();
    return () => {
      countListeners.delete(setC);
    };
  }, []);
  return c;
}

function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const { session } = useSession();
  const navigate = useNavigate();
  const counts = useNewCounts();
  const email = session?.user.email ?? '';

  return (
    <aside className="flex h-full w-full flex-col lg:w-[250px] lg:px-4 lg:py-5">
      <div
        className="flex min-h-0 flex-1 flex-col overflow-hidden lg:rounded-[30px]"
        style={{
          background: 'rgba(255,255,255,0.6)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          boxShadow: '0 8px 32px rgba(56,56,56,0.08), inset 0 1px 0 rgba(255,255,255,0.8)',
          border: '1px solid rgba(255,255,255,0.75)',
        }}
      >
        <div className="flex h-[66px] items-center gap-2.5 border-b border-white/60 px-4">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white">
            <img src={ICON} alt="Obra Majoralia" className="h-5 w-7 object-contain" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-[13px] font-bold leading-tight text-[#383838]">Obra Majoralia</p>
            <p className="text-[11px] leading-tight tracking-wide text-[#797979]">Website Admin</p>
          </div>
        </div>

        <nav className="min-h-0 flex-1 overflow-y-auto px-3 pb-3 pt-2">
          {NAV.map((group) => (
            <div key={group.label}>
              <p className="px-3 pb-2 pt-4 text-[10px] font-bold uppercase tracking-widest text-[#797979]/80">
                {group.label}
              </p>
              {group.items.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={onNavigate}
                  className={({ isActive }) =>
                    `group flex items-center gap-3 rounded-2xl px-3 py-2 text-[13px] transition-all ${
                      isActive ? 'bg-white/80 text-[#383838] shadow-sm' : 'text-[#797979] hover:bg-white/50 hover:text-[#383838]'
                    }`
                  }
                >
                  <i className={`${item.icon} text-[16px]`} />
                  <span className="min-w-0 flex-1 truncate">{item.label}</span>
                  {item.badge && counts[item.badge] > 0 && (
                    <span className="rounded-full bg-[#383838] px-1.5 py-0.5 text-[10px] font-bold leading-none text-white">
                      {counts[item.badge]}
                    </span>
                  )}
                </NavLink>
              ))}
            </div>
          ))}
          <a
            href="/home"
            target="_blank"
            rel="noreferrer"
            className="mt-4 flex items-center gap-3 rounded-2xl px-3 py-2 text-[13px] text-[#797979] hover:bg-white/50 hover:text-[#383838]"
          >
            <i className="ri-external-link-line text-[16px]" />
            View website
          </a>
        </nav>

        <div className="flex min-w-0 items-center gap-2.5 border-t border-white/60 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
          <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#383838] text-[11px] font-bold text-white">
            {email[0]?.toUpperCase() ?? 'O'}
          </span>
          <p className="min-w-0 flex-1 truncate text-[12px] font-bold text-[#383838]">{email}</p>
          <button
            onClick={async () => {
              await signOut();
              navigate('/admin/login', { replace: true });
            }}
            title="Sign out"
            className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl text-[#797979] hover:bg-white/50 hover:text-[#383838]"
          >
            <i className="ri-logout-box-r-line text-[18px]" />
          </button>
        </div>
      </div>
    </aside>
  );
}

export default function AdminLayout({
  title,
  back,
  actions,
  children,
}: {
  title: string;
  /** Shows a back arrow to this path instead of the menu button on phones. */
  back?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = `${title} · Obra Admin`;
  }, [title]);
  useEffect(() => setMobileOpen(false), [pathname]);

  return (
    <div
      className="relative flex h-screen overflow-hidden font-sans"
      style={{ background: 'linear-gradient(135deg, #e4e3e2 0%, #efeeed 45%, #ffffff 100%)' }}
    >
      <div className="relative z-10 hidden lg:block">
        <Sidebar />
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="h-full w-[260px] flex-shrink-0 bg-[#efeeed]">
            <Sidebar onNavigate={() => setMobileOpen(false)} />
          </div>
          <div className="flex-1 bg-black/20 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
        </div>
      )}

      <div className="relative z-10 min-w-0 flex-1 overflow-hidden lg:pb-4 lg:pr-4 lg:pt-5">
        <div
          className="flex h-full flex-col overflow-hidden lg:rounded-[34px] lg:shadow-xl lg:shadow-black/5"
          style={{
            background: 'rgba(255,255,255,0.62)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(255,255,255,0.75)',
          }}
        >
          <header className="flex h-[72px] flex-shrink-0 items-center gap-3 border-b border-white/60 px-4 md:px-6">
            {back ? (
              <button
                onClick={() => navigate(back)}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#e4e3e2] bg-white/50 text-[#797979] hover:text-[#383838]"
                aria-label="Back"
              >
                <i className="ri-arrow-left-line text-lg" />
              </button>
            ) : (
              <button
                onClick={() => setMobileOpen(true)}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#e4e3e2] bg-white/50 text-[#797979] lg:hidden"
                aria-label="Open menu"
              >
                <i className="ri-menu-line text-lg" />
              </button>
            )}
            <h1 className="min-w-0 flex-1 truncate text-lg font-bold leading-tight text-[#383838] sm:text-[24px]">
              {title}
            </h1>
            {actions && <div className="flex flex-shrink-0 items-center gap-2">{actions}</div>}
          </header>
          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            <div className="mx-auto max-w-6xl">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
