import { Link } from 'react-router-dom';
import FadeIn from '@/components/base/FadeIn';

// Current image assignments before this fix:
// Residential → _4, Interior → _5, Commercial → _8, Hospitality → _6
// Healthcare  → _7, Government → _8, Monumental → _9
//
// User swaps (icon currently at X should go to Y):
// government(_8) → monumental | interior(_5) → government | hospitality(_6) → interior
// healthcare(_7) → hospitality | commercial(_8) → healthcare
//
// Result:
// Residential → _4 (unchanged)
// Interior    → _6  (gets hospitality's icon)
// Commercial  → _7  (gets healthcare's icon)
// Hospitality → _8  (gets commercial's icon — _8 was commercial)
// Healthcare  → _8  (gets commercial's icon) ... wait commercial was _8 too
// Let me use the v13 state images directly per label:

// v13 state (what was showing):
// Residential: _4
// Interior:    _5  (hospitality orig)
// Commercial:  _8  (interiors orig)
// Hospitality: _6  (cultural orig)
// Healthcare:  _7  (commercial orig)
// Government:  _8  (interiors orig — same as commercial, placeholder)
// Monumental:  _9  (masterplan orig)

// After swaps:
// Residential: _4  (no change)
// Interior:    _5 → gets hospitality's icon = _6
// Commercial:  _8 → gets healthcare's icon  = _7
// Hospitality: _6 → gets healthcare icon    = _7... no
//
// Simpler: just shift each label's image one step forward in the chain:
// Interior    now shows what Hospitality showed  → _6
// Commercial  now shows what Healthcare showed   → _7
// Hospitality now shows what Commercial showed   → _8
// Healthcare  now shows what Government showed   → _8 (same placeholder, ok)
// Government  now shows what Interior showed     → _5
// Monumental  now shows what Government showed   → _8

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
        className="text-[13px] tracking-[2px] text-[#383838] font-semibold group-hover:text-[#797979] transition-colors duration-200 uppercase"
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
