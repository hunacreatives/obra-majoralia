import { useState, useEffect } from 'react';

const PASSWORD = 'obra2026';
const SESSION_KEY = 'om_auth';

interface PasswordGateProps {
  children: React.ReactNode;
}

const PasswordGate = ({ children }: PasswordGateProps) => {
  const [unlocked, setUnlocked] = useState(false);
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    // sessionStorage clears on every tab close / refresh
    const ok = sessionStorage.getItem(SESSION_KEY) === '1';
    setUnlocked(ok);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input === PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, '1');
      setUnlocked(true);
    } else {
      setError(true);
      setShake(true);
      setInput('');
      setTimeout(() => setShake(false), 500);
    }
  };

  // The website admin has its own login, so it skips the preview password.
  const isAdmin = window.location.pathname.startsWith('/admin');
  if (unlocked || isAdmin) return <>{children}</>;

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm flex flex-col items-center gap-10">

        {/* Logo */}
        <img
          src="/images/logo-black.png"
          alt="Obra Majoralia"
          className="h-10 w-auto object-contain select-none"
          draggable={false}
        />

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className={`w-full flex flex-col gap-6 ${shake ? 'animate-shake' : ''}`}
        >
          <div className="flex flex-col gap-2">
            <label
              className="text-[12px] tracking-[1.5px] text-[#383838] uppercase font-semibold"
            >
              Password
            </label>
            <div className="border-b border-[#e4e3e2] pb-2">
              <input
                type="password"
                value={input}
                onChange={e => { setInput(e.target.value); setError(false); }}
                autoFocus
                className="w-full bg-transparent text-base text-[#383838] tracking-normal outline-none"
                placeholder="Enter password"
              />
            </div>
            {error && (
              <p
                className="text-[12px] tracking-[1.5px] text-red-400"
              >
                Incorrect password.
              </p>
            )}
          </div>

          <button
            type="submit"
            className="text-[12px] tracking-[2px] font-semibold text-[#383838] border-b border-[#383838] pb-[2px] w-fit hover:text-[#797979] hover:border-[#797979] transition-colors duration-200 uppercase whitespace-nowrap cursor-pointer self-end"
          >
            Enter
          </button>
        </form>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%       { transform: translateX(-8px); }
          40%       { transform: translateX(8px); }
          60%       { transform: translateX(-6px); }
          80%       { transform: translateX(6px); }
        }
        .animate-shake { animation: shake 0.45s ease-in-out; }
      `}</style>
    </div>
  );
};

export default PasswordGate;
