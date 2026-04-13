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

  if (unlocked) return <>{children}</>;

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
              className="text-[10px] tracking-[2.5px] text-[#383838] uppercase font-semibold"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Password
            </label>
            <div className="border-b border-[#d0d0d0] pb-2">
              <input
                type="password"
                value={input}
                onChange={e => { setInput(e.target.value); setError(false); }}
                autoFocus
                className="w-full bg-transparent text-sm text-[#383838] tracking-[0.5px] outline-none"
                style={{ fontFamily: 'var(--font-sans)' }}
                placeholder="Enter password"
              />
            </div>
            {error && (
              <p
                className="text-[10px] tracking-[1.5px] text-red-400"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                Incorrect password.
              </p>
            )}
          </div>

          <button
            type="submit"
            className="text-[10px] tracking-[3px] font-semibold text-[#383838] border-b border-[#383838] pb-[2px] w-fit hover:text-[#797979] hover:border-[#797979] transition-colors duration-200 uppercase whitespace-nowrap cursor-pointer self-end"
            style={{ fontFamily: 'var(--font-sans)' }}
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
