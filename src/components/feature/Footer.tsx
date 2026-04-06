import { Link } from 'react-router-dom';

const LOGO = 'https://storage.readdy-site.link/project_files/057d11fe-555c-401e-b7e9-638ff88babf4/840215c1-b1c1-422b-b3bf-4d497afd7a61_OBRA-MAJORALIA_Relayout_Wide_Black.png?v=39274b9389791c8085b9c37ec0734b83';

const Footer = () => (
  <footer className="w-full bg-[#383838] overflow-visible">

    {/* Desktop layout */}
    <div className="hidden md:flex pl-10 md:pl-16 pr-10 md:pr-16 lg:pr-20 py-2 items-center justify-between overflow-visible">
      <Link to="/" className="block flex-shrink-0 overflow-visible flex items-center">
        <img
          src={LOGO}
          alt="Obra Majoralia"
          className="h-44 w-auto object-contain select-none -mt-[64px] -mb-[64px] invert"
          draggable={false}
          style={{ transform: 'translateZ(0)', willChange: 'transform' }}
        />
      </Link>
      <div className="flex flex-col items-end justify-between h-full py-3 gap-2">
        <p className="text-[11px] tracking-[3px] text-[#e4e3e2] font-bold uppercase" style={{ fontFamily: 'var(--font-sans)' }}>
          Get in Touch
        </p>
        <a
          href="mailto:obra.majoralia@gmail.com"
          className="text-sm tracking-[0.5px] text-[#e4e3e2] font-bold hover:text-[#b0afae] transition-colors duration-200 whitespace-nowrap"
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          obra.majoralia@gmail.com
        </a>
        <div className="flex items-center gap-4">
          <a href="https://www.instagram.com/obra.majoralia/" target="_blank" rel="nofollow noopener noreferrer" aria-label="Instagram" className="w-5 h-5 flex items-center justify-center text-[#e4e3e2] hover:text-[#b0afae] transition-colors duration-200">
            <i className="ri-instagram-line text-lg" />
          </a>
          <a href="https://www.facebook.com/obramajoralia/" target="_blank" rel="nofollow noopener noreferrer" aria-label="Facebook" className="w-5 h-5 flex items-center justify-center text-[#e4e3e2] hover:text-[#b0afae] transition-colors duration-200">
            <i className="ri-facebook-line text-lg" />
          </a>
          <a href="https://www.linkedin.com/in/jbcruz2006/" target="_blank" rel="nofollow noopener noreferrer" aria-label="LinkedIn" className="w-5 h-5 flex items-center justify-center text-[#e4e3e2] hover:text-[#b0afae] transition-colors duration-200">
            <i className="ri-linkedin-line text-lg" />
          </a>
        </div>
      </div>
    </div>

    {/* Divider + bottom bar — desktop */}
    <div className="hidden md:block">
      <div className="pl-10 md:pl-16 pr-10 md:pr-16 lg:pr-20">
        <div className="border-t border-[#555555] py-3 flex items-center justify-between">
          <a
            href="https://hunacreatives.com"
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="text-[9px] tracking-[2px] text-[#e4e3e2] hover:text-white transition-colors duration-200 uppercase whitespace-nowrap"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            Website by Huna Creatives
          </a>
          <p
            className="text-[9px] tracking-[2px] text-[#e4e3e2] uppercase whitespace-nowrap"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            © 2026 All Rights Reserved Obra Majoralia
          </p>
        </div>
      </div>
    </div>

    {/* Mobile layout */}
    <div className="md:hidden px-6 py-8 flex flex-col gap-6">
      <Link to="/" className="block">
        <img
          src={LOGO}
          alt="Obra Majoralia"
          className="h-8 w-auto object-contain select-none invert"
          draggable={false}
        />
      </Link>
      <div className="flex flex-col gap-2">
        <p className="text-[10px] tracking-[2.5px] text-[#e4e3e2] font-bold uppercase" style={{ fontFamily: 'var(--font-sans)' }}>
          Get in Touch
        </p>
        <a
          href="mailto:obra.majoralia@gmail.com"
          className="text-sm tracking-[0.3px] text-[#e4e3e2] font-semibold hover:text-[#b0afae] transition-colors duration-200"
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          obra.majoralia@gmail.com
        </a>
      </div>
      <div className="flex items-center gap-5">
        <a href="https://www.instagram.com/obra.majoralia/" target="_blank" rel="nofollow noopener noreferrer" aria-label="Instagram" className="w-5 h-5 flex items-center justify-center text-[#e4e3e2] hover:text-[#b0afae] transition-colors duration-200">
          <i className="ri-instagram-line text-lg" />
        </a>
        <a href="https://www.facebook.com/obramajoralia/" target="_blank" rel="nofollow noopener noreferrer" aria-label="Facebook" className="w-5 h-5 flex items-center justify-center text-[#e4e3e2] hover:text-[#b0afae] transition-colors duration-200">
          <i className="ri-facebook-line text-lg" />
        </a>
        <a href="https://www.linkedin.com/in/jbcruz2006/" target="_blank" rel="nofollow noopener noreferrer" aria-label="LinkedIn" className="w-5 h-5 flex items-center justify-center text-[#e4e3e2] hover:text-[#b0afae] transition-colors duration-200">
          <i className="ri-linkedin-line text-lg" />
        </a>
      </div>
      <div className="border-t border-[#555555] pt-4 flex flex-col gap-2">
        <a
          href="https://hunacreatives.com"
          target="_blank"
          rel="nofollow noopener noreferrer"
          className="text-[9px] tracking-[1.5px] text-[#e4e3e2] hover:text-white transition-colors duration-200 uppercase"
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          Website by Huna Creatives
        </a>
        <p className="text-[9px] tracking-[1.5px] text-[#e4e3e2] uppercase" style={{ fontFamily: 'var(--font-sans)' }}>
          © 2026 All Rights Reserved Obra Majoralia
        </p>
      </div>
    </div>

  </footer>
);

export default Footer;
