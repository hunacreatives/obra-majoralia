import { Link } from 'react-router-dom';

const LOGO = 'https://storage.readdy-site.link/project_files/057d11fe-555c-401e-b7e9-638ff88babf4/840215c1-b1c1-422b-b3bf-4d497afd7a61_OBRA-MAJORALIA_Relayout_Wide_Black.png?v=39274b9389791c8085b9c37ec0734b83';

const Footer = () => (
  <footer className="w-full border-t border-[#e4e3e2] bg-white overflow-visible">
    {/* Desktop layout */}
    <div className="hidden md:flex pl-10 md:pl-16 pr-10 md:pr-16 lg:pr-20 py-4 items-center justify-between overflow-visible">
      <Link to="/" className="block flex-shrink-0 overflow-visible flex items-center">
        <img
          src={LOGO}
          alt="Obra Majoralia"
          className="h-40 w-auto object-contain select-none -mt-[56px] -mb-[56px]"
          draggable={false}
        />
      </Link>
      <div className="flex flex-col items-end justify-between h-full py-4">
        <p className="text-[11px] tracking-[3px] text-[#383838] font-bold uppercase" style={{ fontFamily: 'var(--font-sans)' }}>
          Get in Touch
        </p>
        <a
          href="mailto:obra.majoralia@gmail.com"
          className="text-base tracking-[0.5px] text-[#383838] font-bold hover:text-[#797979] transition-colors duration-200 whitespace-nowrap"
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          obra.majoralia@gmail.com
        </a>
        <div className="flex items-center gap-4">
          <a href="#" aria-label="Instagram" className="w-5 h-5 flex items-center justify-center text-[#383838] hover:text-[#797979] transition-colors duration-200">
            <i className="ri-instagram-line text-lg" />
          </a>
          <a href="#" aria-label="Facebook" className="w-5 h-5 flex items-center justify-center text-[#383838] hover:text-[#797979] transition-colors duration-200">
            <i className="ri-facebook-line text-lg" />
          </a>
          <a href="#" aria-label="LinkedIn" className="w-5 h-5 flex items-center justify-center text-[#383838] hover:text-[#797979] transition-colors duration-200">
            <i className="ri-linkedin-line text-lg" />
          </a>
        </div>
      </div>
    </div>

    {/* Mobile layout */}
    <div className="md:hidden px-6 py-10 flex flex-col gap-8">
      <Link to="/" className="block">
        <img
          src={LOGO}
          alt="Obra Majoralia"
          className="h-8 w-auto object-contain select-none"
          draggable={false}
        />
      </Link>
      <div className="flex flex-col gap-2">
        <p className="text-[10px] tracking-[2.5px] text-[#383838] font-bold uppercase" style={{ fontFamily: 'var(--font-sans)' }}>
          Get in Touch
        </p>
        <a
          href="mailto:obra.majoralia@gmail.com"
          className="text-sm tracking-[0.3px] text-[#383838] font-semibold hover:text-[#797979] transition-colors duration-200"
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          obra.majoralia@gmail.com
        </a>
      </div>
      <div className="flex items-center gap-5">
        <a href="#" aria-label="Instagram" className="w-5 h-5 flex items-center justify-center text-[#383838]">
          <i className="ri-instagram-line text-lg" />
        </a>
        <a href="#" aria-label="Facebook" className="w-5 h-5 flex items-center justify-center text-[#383838]">
          <i className="ri-facebook-line text-lg" />
        </a>
        <a href="#" aria-label="LinkedIn" className="w-5 h-5 flex items-center justify-center text-[#383838]">
          <i className="ri-linkedin-line text-lg" />
        </a>
      </div>
      <p className="text-[9px] tracking-[1.5px] text-[#bbb] uppercase" style={{ fontFamily: 'var(--font-sans)' }}>
        © {new Date().getFullYear()} Obra Majoralia. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
