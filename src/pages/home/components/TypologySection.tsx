import { Link } from 'react-router-dom';
import FadeIn from '@/components/base/FadeIn';

const ROW_ONE = [
  {
    label: 'Residential',
    image: '/images/typology-residential.png',
  },
  {
    label: 'Interior',
    image: '/images/typology-interior.png',
  },
  {
    label: 'Commercial',
    image: '/images/typology-commercial.png',
  },
  {
    label: 'Hospitality',
    image: '/images/typology-hospitality.png',
  },
];

const ROW_TWO = [
  {
    label: 'Healthcare',
    image: '/images/typology-healthcare.png',
  },
  {
    label: 'Government',
    image: '/images/typology-government.png',
  },
  {
    label: 'Monumental',
    image: '/images/typology-monumental.png',
  },
];

interface TileProps {
  label: string;
  image: string;
  delay: number;
}

const TypologyTile = ({ label, image, delay }: TileProps) => (
  <FadeIn delay={delay} direction="none">
    <Link
      to={`/projects?typology=${encodeURIComponent(label)}`}
      className="group flex flex-col items-center gap-3 cursor-pointer"
    >
      <div className="w-3/5 overflow-hidden mx-auto">
        <img
          src={image}
          alt={label}
          className="w-full h-auto object-contain transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-[1.03]"
          loading="lazy"
        />
      </div>
      <p
        className="text-[15px] tracking-[2px] text-[#383838] font-semibold group-hover:text-[#797979] transition-colors duration-200 uppercase"
        style={{ fontFamily: 'var(--font-sans)' }}
      >
        {label}
      </p>
    </Link>
  </FadeIn>
);

const TypologySection = () => (
  <section className="w-full px-8 md:px-14 pb-14 md:pb-20">
    {/* Row 1 — 4 columns */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-7 mb-5 md:mb-7">
      {ROW_ONE.map((t, i) => (
        <TypologyTile key={t.label} label={t.label} image={t.image} delay={i * 60} />
      ))}
    </div>

    {/* Row 2 — 3 columns, centered */}
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-7 max-w-[75%] mx-auto">
      {ROW_TWO.map((t, i) => (
        <TypologyTile key={t.label} label={t.label} image={t.image} delay={i * 60} />
      ))}
    </div>
  </section>
);

export default TypologySection;
