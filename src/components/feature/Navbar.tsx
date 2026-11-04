import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { usePageTransition } from '@/hooks/usePageTransition';

const LOGO = '/images/logo-secondary.png';

const NAV_LINKS = [
  { label: 'HOME', to: '/home' },
  { label: 'PROJECTS', to: '/projects' },
  { label: 'ABOUT', to: '/about' },
  { label: 'NEWS', to: '/news' },
  { label: 'CAREERS', to: '/careers' },
  { label: 'CONTACT', to: '/contact' },
];

const SOCIALS = [
  { label: 'Instagram', href: 'https://www.instagram.com/obra.majoralia/', icon: 'ri-instagram-line' },
  { label: 'Facebook', href: 'https://www.facebook.com/obramajoralia/', icon: 'ri-facebook-line' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/jbcruz2006/', icon: 'ri-linkedin-line' },
];

interface NavbarProps {
  nightMode?: boolean;
}

const Navbar = ({ nightMode = false }: NavbarProps) => {
  const location = useLocation();
  const { navigate } = usePageTransition();
  const [isDark, setIsDark] = useState(true);
  const [hasBackground, setHasBackground] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const checkTheme = useCallback(() => {
    if (nightMode) {
      setIsDark(true);
      setHasBackground(false);
      return;
    }
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
    // once scrolled, the bar is always solid (dark over dark sections) so
    // content never shows through behind the links
    setHasBackground(window.scrollY > 0);
  }, [nightMode]);

  // Instantly respond to nightMode prop changes — no delay
  useEffect(() => {
    if (nightMode) {
      setIsDark(true);
      setHasBackground(false);
    } else {
      checkTheme();
    }
  }, [nightMode, checkTheme]);

  useEffect(() => {
    // At most one hit-test per frame — scroll can fire several times per frame
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => { frame = 0; checkTheme(); });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    const id = setTimeout(checkTheme, 80);
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
      clearTimeout(id);
    };
  }, [checkTheme, location.pathname]);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // While the menu is open the page underneath stays put, and Escape closes it
  useEffect(() => {
    if (!menuOpen) return;
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => {
      html.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  const textColor = isDark ? 'text-white' : 'text-[#383838]';
  const hoverColor = isDark ? 'hover:text-[#e4e3e2]' : 'hover:text-[#797979]';

  // Phones: same 24px gutter as the page content. With the menu open the bar
  // sits on the overlay, so it takes the overlay's colours, not the section's.
  const menuDark = nightMode;
  const logoDark = menuOpen ? menuDark : isDark;
  const navBg = menuOpen || !hasBackground
    ? 'bg-transparent px-6 md:px-10'
    : (isDark ? 'bg-[#383838] border-b border-white/10 px-6 md:px-10' : 'bg-white border-b border-[#e4e3e2] px-6 md:px-10');

  const handleNav = (to: string) => {
    if (location.pathname === to) return;
    setMenuOpen(false);
    navigate(to);
  };

  return (
    <>
      <nav
        className={[
          // above the open menu (z-[55]), which itself covers page-level floating controls (z-50)
          `fixed top-0 left-0 right-0 ${menuOpen ? 'z-[60]' : 'z-50'} h-20 flex items-center justify-between transition-colors duration-300`,
          navBg,
        ].join(' ')}
      >
        {/* Left: Menu Links */}
        <div className="hidden md:flex items-center gap-10 lg:gap-12">
          {NAV_LINKS.map(({ label, to }) => (
            <button
              key={label}
              type="button"
              onClick={() => handleNav(to)}
              className={[
                'text-[12px] tracking-[1.5px] font-bold transition-colors duration-200 whitespace-nowrap cursor-pointer bg-transparent border-0 p-0',
                textColor,
                hoverColor,
                location.pathname === to ? 'border-b border-current pb-[2px]' : '',
              ].join(' ')}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Right: Logo (desktop) / Left: Logo (mobile via order) */}
        <div className="order-first md:order-none md:ml-0 flex items-center">
          <button
            type="button"
            onClick={() => handleNav('/home')}
            className="cursor-pointer bg-transparent border-0 p-0"
          >
            <img
              src={LOGO}
              alt="Obra Majoralia"
              className="h-10 md:h-11 w-auto object-contain select-none transition-all duration-200"
              style={{ filter: logoDark ? 'invert(1)' : 'none' }}
              draggable={false}
            />
          </button>
        </div>

        {/* Mobile: Hamburger */}
        <button
          type="button"
          className={`md:hidden ml-auto -mr-2.5 w-11 h-11 flex flex-col items-center justify-center gap-[5px] transition-colors duration-200 relative z-50 ${logoDark ? 'text-white' : 'text-[#383838]'}`}
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span className={`block w-6 h-px transition-all duration-200 bg-current ${menuOpen ? 'rotate-45 translate-y-[6px]' : ''}`} />
          <span className={`block w-6 h-px bg-current transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-px bg-current transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-[6px]' : ''}`} />
        </button>
      </nav>

      {/* Mobile Menu Overlay — links on the page gutter, contact details at the foot */}
      <div
        className={`md:hidden fixed inset-0 z-[55] flex flex-col px-6 pt-28 pb-[max(2rem,env(safe-area-inset-bottom))] transition-opacity duration-300 ${menuDark ? 'bg-[#383838]' : 'bg-white'} ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        aria-hidden={!menuOpen}
      >
        <div className="flex-1 flex flex-col justify-center">
          {NAV_LINKS.map(({ label, to }) => {
            const active = location.pathname === to || location.pathname.startsWith(`${to}/`);
            return (
              <button
                key={label}
                type="button"
                tabIndex={menuOpen ? 0 : -1}
                onClick={() => handleNav(to)}
                className={[
                  'flex items-center gap-3 min-h-[52px] text-[24px] leading-none tracking-[1px] font-bold transition-colors duration-200 text-left bg-transparent border-0 p-0 cursor-pointer',
                  menuDark
                    ? (active ? 'text-white' : 'text-[#e4e3e2] hover:text-white')
                    : (active ? 'text-[#383838]' : 'text-[#797979] hover:text-[#383838]'),
                ].join(' ')}
              >
                {label}
                {active && <span className="block h-px w-6 bg-current" />}
              </button>
            );
          })}
        </div>

        <div className={`flex items-center justify-between gap-4 pt-5 border-t ${menuDark ? 'border-white/15' : 'border-[#e4e3e2]'}`}>
          <a
            href="mailto:obra.majoralia@gmail.com"
            tabIndex={menuOpen ? 0 : -1}
            className={`py-2.5 text-[13px] font-bold ${menuDark ? 'text-[#e4e3e2]' : 'text-[#383838]'}`}
          >
            obra.majoralia@gmail.com
          </a>
          <div className={`flex items-center -mr-2.5 ${menuDark ? 'text-[#e4e3e2]' : 'text-[#383838]'}`}>
            {SOCIALS.map(({ label, href, icon }) => (
              <a key={label} href={href} target="_blank" rel="nofollow noopener noreferrer" aria-label={label} tabIndex={menuOpen ? 0 : -1} className="w-10 h-10 flex items-center justify-center">
                <i className={`${icon} text-[18px]`} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
