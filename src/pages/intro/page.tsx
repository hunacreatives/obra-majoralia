import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LOGO = 'https://storage.readdy-site.link/project_files/057d11fe-555c-401e-b7e9-638ff88babf4/cf35880e-e94b-4fb6-8f22-65df2e948125_OM---Secondary-Logo.png?v=2b8748a6f303d7dad0dbeedd427064f3';

const IntroPage = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [lettersIn, setLettersIn] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    // Fade in background
    const t1 = setTimeout(() => setVisible(true), 80);
    // Letters dance in
    const t2 = setTimeout(() => setLettersIn(true), 200);
    // Auto-navigate after 2.8s
    const t3 = setTimeout(() => handleEnter(), 2800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  const handleEnter = () => {
    if (leaving) return;
    setLeaving(true);
    setTimeout(() => navigate('/home'), 600);
  };

  return (
    <div
      className="fixed inset-0 bg-white flex items-center justify-center cursor-pointer select-none overflow-hidden"
      onClick={handleEnter}
      style={{
        opacity: leaving ? 0 : visible ? 1 : 0,
        transition: leaving ? 'opacity 0.6s ease' : 'opacity 0.8s ease',
      }}
    >
      {/* Corner letters — O B R A with dancing entrance */}
      {/* Top-left: O */}
      <span
        className="absolute text-[#d8d7d6] font-light leading-none pointer-events-none"
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(120px, 18vw, 260px)',
          top: '0.04em',
          left: lettersIn ? '-0.02em' : '-0.4em',
          opacity: lettersIn ? 1 : 0,
          transform: lettersIn ? 'translateY(0) rotate(0deg)' : 'translateY(-20px) rotate(-8deg)',
          transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
          transitionDelay: '0ms',
        }}
      >
        O
      </span>

      {/* Top-right: B */}
      <span
        className="absolute text-[#d8d7d6] font-light leading-none pointer-events-none"
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(120px, 18vw, 260px)',
          top: '0.04em',
          right: lettersIn ? '-0.02em' : '-0.4em',
          opacity: lettersIn ? 1 : 0,
          transform: lettersIn ? 'translateY(0) rotate(0deg)' : 'translateY(-20px) rotate(8deg)',
          transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
          transitionDelay: '80ms',
        }}
      >
        B
      </span>

      {/* Bottom-left: A */}
      <span
        className="absolute text-[#d8d7d6] font-light leading-none pointer-events-none"
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(120px, 18vw, 260px)',
          bottom: '-0.22em',
          left: lettersIn ? '-0.02em' : '-0.4em',
          opacity: lettersIn ? 1 : 0,
          transform: lettersIn ? 'translateY(0) rotate(0deg)' : 'translateY(20px) rotate(8deg)',
          transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
          transitionDelay: '160ms',
        }}
      >
        A
      </span>

      {/* Bottom-right: R */}
      <span
        className="absolute text-[#d8d7d6] font-light leading-none pointer-events-none"
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(120px, 18vw, 260px)',
          bottom: '-0.22em',
          right: lettersIn ? '-0.02em' : '-0.4em',
          opacity: lettersIn ? 1 : 0,
          transform: lettersIn ? 'translateY(0) rotate(0deg)' : 'translateY(20px) rotate(-8deg)',
          transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
          transitionDelay: '240ms',
        }}
      >
        R
      </span>

      {/* Center logo */}
      <div className="flex flex-col items-center gap-6 z-10">
        <img
          src={LOGO}
          alt="Obra Majoralia"
          className="w-[160px] md:w-[200px] h-auto object-contain"
          draggable={false}
          style={{
            opacity: lettersIn ? 1 : 0,
            transform: lettersIn ? 'scale(1)' : 'scale(0.9)',
            transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
            transitionDelay: '300ms',
          }}
        />
        <span
          className="text-[9px] tracking-[4px] text-[#c8c7c6] mt-2"
          style={{
            fontFamily: 'var(--font-sans)',
            opacity: lettersIn ? 1 : 0,
            transition: 'opacity 0.6s ease',
            transitionDelay: '500ms',
          }}
        >
          CLICK TO ENTER
        </span>
      </div>
    </div>
  );
};

export default IntroPage;
