import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';

const LOGO = 'https://storage.readdy-site.link/project_files/057d11fe-555c-401e-b7e9-638ff88babf4/cf35880e-e94b-4fb6-8f22-65df2e948125_OM---Secondary-Logo.png?v=2b8748a6f303d7dad0dbeedd427064f3';

const NAV_LINKS = [
  { label: 'HOME', to: '/home' },
  { label: 'PROJECTS', to: '/projects' },
  { label: 'ABOUT', to: '/about' },
  { label: 'NEWS', to: '/news' },
  { label: 'CAREERS', to: '/careers' },
  { label: 'CONTACT', to: '/contact' },
];

const Navbar = () => {
  const location = useLocation();
  const [isDark, setIsDark] = useState(true);
  const [hasBackground, setHasBackground] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const checkTheme = useCallback(() => {
    const navMidY = 40;
    const xs = [
      window.innerWidth * 0.25,
      window.innerWidth * 0.5,
      window.innerWidth * 0.75,
    ];

    let darkCount = 0;
    for (const x of xs) {
      const els = document.elementsFromPoint(x, navMidY);
      if (els.some(el => (el as HTMLElement).dataset?.theme === 'dark')) {
        darkCount++;
      }
    }
    setIsDark(darkCount >= 2);
    setHasBackground(window.scrollY > 30 && darkCount < 2);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', checkTheme, { passive: true });
    const id = setTimeout(checkTheme, 80);
    return () => {
      window.removeEventListener('scroll', checkTheme);
      clearTimeout(id);
    };
  }, [checkTheme, location.pathname]);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const textColor = isDark ? 'text-white' : 'text-[#383838]';
  const hoverColor = isDark ? 'hover:text-white/80' : 'hover:text-[#797979]';

  return (
    <>
      <nav
        className={[
          'fixed top-0 left-0 right-0 z-50 h-20 flex items-center justify-between transition-all duration-300',
          hasBackground ? 'bg-white border-b border-[#e4e3e2] px-8 md:px-10' : 'bg-transparent px-8 md:px-10',
        ].join(' ')}
      >
        {/* Left: Menu Links */}
        <div className="hidden md:flex items-center gap-10 lg:gap-12">
          {NAV_LINKS.map(({ label, to }) =>
            to ? (
              <Link
                key={label}
                to={to}
                className={[
                  'text-[10px] tracking-[2.4px] font-bold transition-colors duration-200 whitespace-nowrap',
                  textColor,
                  hoverColor,
                  location.pathname === to ? 'border-b border-current pb-[2px]' : '',
                ].join(' ')}
              >
                {label}
              </Link>
            ) : (
              <span
                key={label}
                className={[
                  'text-[10px] tracking-[2.4px] font-medium whitespace-nowrap cursor-default',
                  isDark ? 'text-white/40' : 'text-[#383838]/30',
                ].join(' ')}
              >
                {label}
              </span>
            )
          )}
        </div>

        {/* Right: Logo — CSS invert handles dark/light switching cleanly */}
        <div className="ml-auto md:ml-0 flex items-center">
          <img
            src={LOGO}
            alt="Obra Majoralia"
            className="h-11 w-auto object-contain select-none transition-all duration-200"
            style={{ filter: isDark ? 'invert(1)' : 'none' }}
            draggable={false}
          />
        </div>

        {/* Mobile: Hamburger */}
        <button
          className={`md:hidden ml-6 flex flex-col gap-[5px] transition-colors duration-200 ${isDark ? 'text-white' : 'text-[#383838]'}`}
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-px transition-all duration-200 bg-current ${menuOpen ? 'rotate-45 translate-y-[6px]' : ''}`} />
          <span className={`block w-6 h-px bg-current transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-px bg-current transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-[6px]' : ''}`} />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-white flex flex-col justify-center px-10 transition-all duration-400 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        <div className="flex flex-col gap-8">
          {NAV_LINKS.map(({ label, to }) =>
            to ? (
              <Link
                key={label}
                to={to}
                className="text-[#383838] text-2xl tracking-[3px] font-semibold hover:text-[#797979] transition-colors duration-200"
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            ) : (
              <span key={label} className="text-[#383838]/25 text-2xl tracking-[3px] font-semibold">
                {label}
              </span>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
