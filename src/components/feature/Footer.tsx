import { Link } from 'react-router-dom';

const LOGO = '/images/logo-black.png';

const SOCIALS = [
  { label: 'Instagram', href: 'https://www.instagram.com/obra.majoralia/', icon: 'ri-instagram-line' },
  { label: 'Facebook', href: 'https://www.facebook.com/obramajoralia/', icon: 'ri-facebook-line' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/jbcruz2006/', icon: 'ri-linkedin-line' },
];

interface FooterProps {
  nightMode?: boolean;
}

const Footer = ({ nightMode = false }: FooterProps) => {
  // One dark surface with the CTA band above it; a hairline separates them
  const bg = '#383838';
  const divider = '#797979';

  return (
    <footer className="w-full overflow-visible border-t border-white/10" style={{ backgroundColor: bg }}>

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
          <a
            href="mailto:obra.majoralia@gmail.com"
            className="text-base tracking-normal text-[#e4e3e2] font-bold hover:text-[#797979] transition-colors duration-200 whitespace-nowrap"
          >
            obra.majoralia@gmail.com
          </a>
          <div className="flex items-center gap-4">
            <a href="https://www.instagram.com/obra.majoralia/" target="_blank" rel="nofollow noopener noreferrer" aria-label="Instagram" className="w-5 h-5 flex items-center justify-center text-[#e4e3e2] hover:text-[#797979] transition-colors duration-200">
              <i className="ri-instagram-line text-lg" />
            </a>
            <a href="https://www.facebook.com/obramajoralia/" target="_blank" rel="nofollow noopener noreferrer" aria-label="Facebook" className="w-5 h-5 flex items-center justify-center text-[#e4e3e2] hover:text-[#797979] transition-colors duration-200">
              <i className="ri-facebook-line text-lg" />
            </a>
            <a href="https://www.linkedin.com/in/jbcruz2006/" target="_blank" rel="nofollow noopener noreferrer" aria-label="LinkedIn" className="w-5 h-5 flex items-center justify-center text-[#e4e3e2] hover:text-[#797979] transition-colors duration-200">
              <i className="ri-linkedin-line text-lg" />
            </a>
          </div>
        </div>
      </div>

      {/* Divider + bottom bar — desktop */}
      <div className="hidden md:block">
        <div className="pl-10 md:pl-16 pr-10 md:pr-16 lg:pr-20">
          <div className="py-3 flex items-center justify-between border-t" style={{ borderColor: divider }}>
            <a
              href="https://hunacreatives.com"
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="text-[11px] tracking-[2px] text-[#e4e3e2] hover:text-white transition-colors duration-200 uppercase whitespace-nowrap"
            >
              Website by Huna Creatives
            </a>
            <p
              className="text-[11px] tracking-[2px] text-[#e4e3e2] uppercase whitespace-nowrap"
            >
              © 2026 All Rights Reserved Obra Majoralia
            </p>
          </div>
        </div>
      </div>

      {/* Mobile layout — logo and socials on one line, email, then the credits */}
      <div className="md:hidden px-6 pt-8 pb-[max(1.75rem,env(safe-area-inset-bottom))] flex flex-col gap-5">
        <div className="flex items-center justify-between gap-4">
          {/* the logo file is square with wide margins: size by width, trim the margins */}
          <Link to="/" className="block -ml-[7px] -my-[54px]" aria-label="Obra Majoralia">
            <img
              src={LOGO}
              alt="Obra Majoralia"
              className="w-[164px] h-auto object-contain select-none invert"
              draggable={false}
            />
          </Link>
          <div className="flex items-center -mr-2.5">
            {SOCIALS.map(({ label, href, icon }) => (
              <a key={label} href={href} target="_blank" rel="nofollow noopener noreferrer" aria-label={label} className="w-10 h-10 flex items-center justify-center text-[#e4e3e2] hover:text-[#797979] transition-colors duration-200">
                <i className={`${icon} text-[18px]`} />
              </a>
            ))}
          </div>
        </div>
        <a
          href="mailto:obra.majoralia@gmail.com"
          className="-my-2 py-2 w-fit text-[15px] text-[#e4e3e2] font-bold hover:text-[#797979] transition-colors duration-200"
        >
          obra.majoralia@gmail.com
        </a>
        <div className="pt-4 flex flex-col gap-1.5 border-t" style={{ borderColor: divider }}>
          <a
            href="https://hunacreatives.com"
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="w-fit text-[10px] tracking-[1.5px] text-[#e4e3e2] hover:text-white transition-colors duration-200 uppercase"
          >
            Website by Huna Creatives
          </a>
          <p className="text-[10px] tracking-[1.5px] text-[#e4e3e2] uppercase">
            © 2026 All Rights Reserved Obra Majoralia
          </p>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
