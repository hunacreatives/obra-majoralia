import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LOGO = 'https://storage.readdy-site.link/project_files/057d11fe-555c-401e-b7e9-638ff88babf4/cf35880e-e94b-4fb6-8f22-65df2e948125_OM---Secondary-Logo.png?v=2b8748a6f303d7dad0dbeedd427064f3';

const IntroPage = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    // Fade in
    const t1 = setTimeout(() => setVisible(true), 80);
    // Auto-navigate after 2.8s
    const t2 = setTimeout(() => handleEnter(), 2800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
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
      {/* Corner letters — O B R A */}
      {/* Top-left: O */}
      <span
        className="absolute top-[-0.12em] left-[-0.08em] text-[#d8d7d6] font-light leading-none pointer-events-none"
        style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(120px, 18vw, 260px)' }}
      >
        O
      </span>

      {/* Top-right: B */}
      <span
        className="absolute top-[-0.12em] right-[-0.06em] text-[#d8d7d6] font-light leading-none pointer-events-none"
        style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(120px, 18vw, 260px)' }}
      >
        B
      </span>

      {/* Bottom-left: A */}
      <span
        className="absolute bottom-[-0.18em] left-[-0.06em] text-[#d8d7d6] font-light leading-none pointer-events-none"
        style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(120px, 18vw, 260px)' }}
      >
        A
      </span>

      {/* Bottom-right: R */}
      <span
        className="absolute bottom-[-0.18em] right-[-0.06em] text-[#d8d7d6] font-light leading-none pointer-events-none"
        style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(120px, 18vw, 260px)' }}
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
        />
        <span
          className="text-[9px] tracking-[4px] text-[#c8c7c6] mt-2"
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          CLICK TO ENTER
        </span>
      </div>
    </div>
  );
};

export default IntroPage;
