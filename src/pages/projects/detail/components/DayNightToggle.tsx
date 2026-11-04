import { useEffect, useState } from 'react';

interface Props {
  isNight: boolean;
  onToggle: () => void;
}

// The fixed sun / moon switch for projects with night renders. On phones it
// tucks away while you scroll down (so it never sits on the text you are
// reading), comes back as soon as you scroll up, and stays out of the footer.
// From md up it is always shown, as before.
const DayNightToggle = ({ isNight, onToggle }: Props) => {
  const [tucked, setTucked] = useState(false);

  useEffect(() => {
    const phone = window.matchMedia('(max-width: 767px)');
    let lastY = window.scrollY;
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      if (!phone.matches) { setTucked(false); lastY = y; return; }
      const footer = document.querySelector('footer');
      const atFooter = footer ? footer.getBoundingClientRect().top < window.innerHeight - 24 : false;
      const dy = y - lastY;
      if (Math.abs(dy) < 8 && !atFooter) return;
      setTucked(atFooter || (dy > 0 && y > window.innerHeight * 0.5));
      lastY = y;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    window.addEventListener('scroll', onScroll, { passive: true });
    phone.addEventListener('change', update);
    return () => {
      window.removeEventListener('scroll', onScroll);
      phone.removeEventListener('change', update);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const half = 'flex items-center justify-center w-10 h-10 md:w-9 md:h-9 transition-colors duration-300';

  return (
    <button
      type="button"
      onClick={onToggle}
      className={`fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 md:bottom-6 md:right-6 z-50 cursor-pointer flex items-center gap-0 rounded-full overflow-hidden border border-white/30 backdrop-blur-sm shadow-lg transition-[transform,opacity] duration-300 ease-out ${
        tucked ? 'translate-y-[calc(100%+2rem)] opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'
      }`}
      style={{ background: 'rgba(56,56,56,0.5)' }}
      aria-label="Toggle day/night view"
      aria-pressed={isNight}
    >
      <span className={half} style={{ background: isNight ? 'transparent' : 'rgba(255,255,255,0.2)' }}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="5" stroke="white" strokeWidth="1.8" fill={isNight ? 'none' : 'white'} />
          <line x1="12" y1="2" x2="12" y2="5" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="12" y1="19" x2="12" y2="22" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="2" y1="12" x2="5" y2="12" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="19" y1="12" x2="22" y2="12" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="4.22" y1="4.22" x2="6.34" y2="6.34" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="17.66" y1="6.34" x2="19.78" y2="4.22" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </span>
      <span className={half} style={{ background: isNight ? 'rgba(255,255,255,0.2)' : 'transparent' }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path
            d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"
            stroke="white"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill={isNight ? 'white' : 'none'}
          />
        </svg>
      </span>
    </button>
  );
};

export default DayNightToggle;
