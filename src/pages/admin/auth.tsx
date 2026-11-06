import { ReactNode, useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

/** Current Supabase session; `loading` until it has been read from storage. */
export function useSession() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
    const { data } = supabase.auth.onAuthStateChange((_event, s) => setSession(s));
    return () => data.subscription.unsubscribe();
  }, []);
  return { session, loading };
}

function Spinner() {
  return (
    <div className="flex h-screen items-center justify-center bg-white">
      <i className="ri-loader-4-line animate-spin text-2xl text-[#797979]" />
    </div>
  );
}

// Admin status doesn't change mid-session; remember it so moving between
// admin pages doesn't re-check and flash the spinner.
let adminCache: { uid: string; ok: boolean } | null = null;

/**
 * Only signed-in users listed in site_admins get in. Fails closed: if the
 * check itself errors, access is denied (with a retry), never granted.
 */
export function AdminGate({ children }: { children: ReactNode }) {
  const { session, loading } = useSession();
  const location = useLocation();
  const navigate = useNavigate();
  const uid = session?.user.id ?? null;
  const [state, setState] = useState<boolean | null | 'error'>(() =>
    uid && adminCache?.uid === uid ? adminCache.ok : null,
  );
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (!uid) return;
    if (adminCache?.uid === uid) {
      setState(adminCache.ok);
      return;
    }
    let alive = true;
    setState(null);
    supabase.rpc('is_site_admin').then(({ data, error }) => {
      if (!alive) return;
      if (error) return setState('error');
      adminCache = { uid, ok: Boolean(data) };
      setState(Boolean(data));
    });
    return () => {
      alive = false;
    };
  }, [uid, attempt]);

  if (loading) return <Spinner />;
  if (!session) return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  if (state === null) return <Spinner />;

  if (state !== true) {
    const isError = state === 'error';
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-3 bg-white px-6 text-center">
        <p className="text-sm font-semibold text-gray-800">
          {isError ? 'Couldn’t verify your access.' : 'This account can’t manage the website.'}
        </p>
        <p className="text-[13px] text-gray-500">
          {isError
            ? 'There was a problem reaching the server. Try again.'
            : 'Sign in with the Obra Majoralia admin account.'}
        </p>
        <div className="mt-1 flex gap-2">
          {isError && (
            <button
              onClick={() => setAttempt((a) => a + 1)}
              className="rounded-xl bg-[#383838] px-4 py-2 text-[13px] font-semibold text-white"
            >
              Try again
            </button>
          )}
          <button
            onClick={async () => {
              adminCache = null;
              await supabase.auth.signOut();
              navigate('/admin/login', { replace: true });
            }}
            className={`rounded-xl px-4 py-2 text-[13px] font-semibold ${
              isError ? 'border border-gray-200 text-gray-700' : 'bg-[#383838] text-white'
            }`}
          >
            Sign out
          </button>
        </div>
      </div>
    );
  }
  return <>{children}</>;
}

export async function signOut() {
  adminCache = null;
  await supabase.auth.signOut();
}
