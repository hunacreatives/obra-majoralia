import { Project, projects } from '@/mocks/projects';
import ProjectMoreProjects from './ProjectMoreProjects';
import { useNightMode } from '@/contexts/useNightMode';

interface Props { project: Project; }

const DayNightToggle = ({ isNight, onToggle }: { isNight: boolean; onToggle: () => void }) => (
  <button
    type="button"
    onClick={onToggle}
    className="fixed bottom-6 right-6 z-50 cursor-pointer flex items-center gap-0 rounded-full overflow-hidden border border-white/30 backdrop-blur-sm shadow-lg"
    style={{ background: 'rgba(0,0,0,0.5)' }}
    aria-label="Toggle day/night view"
  >
    <span
      className="flex items-center justify-center w-9 h-9 transition-colors duration-300"
      style={{ background: isNight ? 'transparent' : 'rgba(255,255,255,0.2)' }}
    >
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
    <span
      className="flex items-center justify-center w-9 h-9 transition-colors duration-300"
      style={{ background: isNight ? 'rgba(255,255,255,0.2)' : 'transparent' }}
    >
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

const SResidenceLayout = ({ project }: Props) => {
  const { isNight, setIsNight } = useNightMode();

  const t = isNight ? '#ffffff' : '#383838';
  const sub = isNight ? '#aaaaaa' : '#aaa';
  const rule = isNight ? '#333' : '#e4e3e2';

  return (
    <>
      {/* Single fixed day/night toggle */}
      <DayNightToggle isNight={isNight} onToggle={() => setIsNight(!isNight)} />

      {/* 01 HERO */}
      <section className="relative w-full" data-theme="dark" style={{ height: '100vh' }}>
        <img
          src="/images/s-residence-day.svg"
          alt="S Residence day"
          className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700"
          style={{ opacity: isNight ? 0 : 1 }}
        />
        <img
          src="/images/s-residence-night.webp"
          alt="S Residence night"
          className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700"
          style={{ opacity: isNight ? 1 : 0 }}
        />
        <div className="absolute bottom-0 left-0 right-0 px-10 md:px-16 pb-8">
          <h1
            className="text-[56px] md:text-[80px] text-white leading-none"
            style={{ fontFamily: 'var(--font-sans)', fontWeight: 700 }}
          >
            S Residence
          </h1>
        </div>
      </section>

      {/* 02 INFO BAR */}
      <section className="py-8" style={{ borderBottom: `1px solid ${rule}` }}>
        <div className="grid grid-cols-5">
          {[
            { label: 'LOCATION',       value: 'DIPOLOG CITY, ZAN' },
            { label: 'AREA',           value: '420 SQM.' },
            { label: 'TYPE',           value: 'RESIDENTIAL' },
            { label: 'STATUS',         value: 'COMPLETED' },
            { label: 'YEAR COMPLETED', value: '2024' },
          ].map(({ label, value }) => (
            <div key={label} className="flex flex-col items-center justify-center text-center px-4">
              <span className="text-[12px] tracking-[2px] mb-2 uppercase" style={{ fontFamily: 'var(--font-sans)', color: sub }}>
                {label}
              </span>
              <span className="text-[14px] md:text-[15px] font-semibold tracking-[1px] uppercase transition-colors duration-700" style={{ fontFamily: 'var(--font-sans)', color: t }}>
                {value}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 03 CONCEPT — editorial split */}
      <section className="grid grid-cols-1 lg:grid-cols-[2fr_3fr]">
        {/* Left: label + pullquote */}
        <div className="flex flex-col gap-10 px-10 md:px-16 py-16 lg:py-20">
          <h2 className="text-[22px] md:text-[26px] font-bold leading-tight transition-colors duration-700" style={{ fontFamily: 'var(--font-sans)', color: t }}>
            Concept
          </h2>
          <p className="text-[26px] md:text-[32px] italic leading-[1.3] tracking-[-0.5px] transition-colors duration-700" style={{ fontFamily: 'var(--font-sans)', color: t }}>
            Grounded in the clarity of minimalism and the warmth of tropical living,
          </p>
        </div>
        {/* Right: body text */}
        <div className="flex flex-col justify-center gap-6 px-10 md:px-16 py-16 lg:py-20 border-l transition-colors duration-700" style={{ borderColor: rule }}>
          <p className="text-[16px] md:text-[17px] leading-[1.9] text-justify transition-colors duration-700" style={{ fontFamily: 'var(--font-sans)', color: t }}>
            The design blends wood, stone, and concrete to create a space that feels calm, honest, and enduring. The home opens itself to the landscape—allowing light, air, and greenery to flow freely throughout.
          </p>
          <p className="text-[16px] md:text-[17px] leading-[1.9] text-justify transition-colors duration-700" style={{ fontFamily: 'var(--font-sans)', color: t }}>
            Natural textures define the palette: the warmth of wood, the solidity of stone, and the raw elegance of concrete come together in quiet balance. Wide openings dissolve the line between inside and out, while clean forms and open layouts support a sense of ease and quiet luxury. Every surface is intentional, every material left to speak in its natural voice.
          </p>
        </div>
      </section>

      {/* 03b EXTERIOR PERSPECTIVE — text left, photo right */}
      <section className="grid grid-cols-1 lg:grid-cols-[2fr_3fr]">
        {/* Left: heading + body */}
        <div className="flex flex-col gap-8 px-10 md:px-16 py-16 lg:py-20">
          <h2 className="text-[22px] md:text-[26px] font-bold leading-tight transition-colors duration-700" style={{ fontFamily: 'var(--font-sans)', color: t }}>
            Exterior Perspective
          </h2>
          <p className="text-[16px] md:text-[17px] leading-[1.9] text-justify transition-colors duration-700" style={{ fontFamily: 'var(--font-sans)', color: t }}>
            Monolithic yet quiet, the home holds presence through raw finishes and shadow play—where minimalism becomes poetry. Here, minimalism is not stark, but soulful. Wood and stone are left honest, unpolished—allowing natural texture and light to carry the mood. It&apos;s a meditative environment, where restraint becomes richness, and the absence of clutter makes room for clarity. The aesthetic is quiet, weighty, and elemental.
          </p>
        </div>
        {/* Right: photo with day/night */}
        <div className="relative overflow-hidden" style={{ minHeight: '60vh' }}>
          <img
            src="/images/s-residence-concept-day.webp"
            alt="Exterior day"
            className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700"
            style={{ opacity: isNight ? 0 : 1 }}
          />
          <img
            src="/images/s-residence-concept-night.webp"
            alt="Exterior night"
            className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700"
            style={{ opacity: isNight ? 1 : 0 }}
          />
        </div>
      </section>

      {/* 06 EDITORIAL 3-IMAGE LAYOUT */}
      <section className="grid grid-cols-[2fr_3fr] gap-3 px-10 md:px-16 mt-3" style={{ height: 'calc(38vh + 52vh + 1.25rem)' }}>
        {/* Left column — two stacked photos */}
        <div className="flex flex-col gap-5 h-full">
          <div className="overflow-hidden" style={{ flex: '0 0 38vh' }}>
            <img src="/images/s-residence-ext-night-01.webp" alt="Exterior night 01" className="w-full h-full object-cover object-center" />
          </div>
          <div className="overflow-hidden flex-1">
            <img src="/images/s-residence-ext-night-02.webp" alt="Exterior night 02" className="w-full h-full object-cover object-[70%_center]" />
          </div>
        </div>
        {/* Right column — single tall photo filling full height */}
        <div className="overflow-hidden h-full">
          <img src="/images/s-residence-ext-night-03.webp" alt="Exterior night" className="w-full h-full object-cover object-center" />
        </div>
      </section>

      {/* Weight of Simplicity — full-width editorial strip */}
      <section className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-0 px-10 md:px-16 py-12 mt-3">
        <div>
          <h2 className="text-[22px] md:text-[26px] font-bold leading-[1.2] transition-colors duration-700" style={{ fontFamily: 'var(--font-sans)', color: t }}>
            The Weight of Simplicity
          </h2>
        </div>
        <div>
          <p className="text-[16px] md:text-[17px] leading-[1.85] text-justify transition-colors duration-700" style={{ fontFamily: 'var(--font-sans)', color: t }}>
            With solid volumes and minimal detailing, the structure feels like it&apos;s resting—anchored to its site through sheer presence. The neutral, matte surfaces reflect changing skies and hold a softness that balances the weight of mass. It doesn&apos;t disrupt its setting, it deepens it.
          </p>
        </div>
      </section>

      {/* 07 TWO-IMAGE ROW */}
      <section className="grid grid-cols-2 gap-3 px-10 md:px-16 my-3" style={{ height: '45vh' }}>
        <div className="relative overflow-hidden h-full">
          <img src="/images/s-residence-foyer-01-day.webp" alt="Foyer day" className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700" style={{ opacity: isNight ? 0 : 1 }} />
          <img src="/images/s-residence-foyer-01.webp" alt="Foyer night" className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700" style={{ opacity: isNight ? 1 : 0 }} />
        </div>
        <div className="relative overflow-hidden h-full">
          <img src="/images/s-residence-foyer-02-day.webp" alt="Foyer 2 day" className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700" style={{ opacity: isNight ? 0 : 1 }} />
          <img src="/images/s-residence-foyer-02-night.webp" alt="Foyer 2 night" className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700" style={{ opacity: isNight ? 1 : 0 }} />
        </div>
      </section>

      {/* 08 INTERIOR PERSPECTIVES */}
      <div className="px-10 md:px-16 mt-16 mb-8">
        <h2 className="text-[22px] md:text-[28px] font-bold leading-[1.2] transition-colors duration-700" style={{ fontFamily: 'var(--font-sans)', color: t }}>
          Interior Perspectives
        </h2>
      </div>
      <section className="px-10 md:px-16 mb-10">
        <p className="text-[16px] md:text-[17px] leading-[1.9] max-w-2xl text-justify transition-colors duration-700" style={{ fontFamily: 'var(--font-sans)', color: t }}>
          The structure presents itself with quiet confidence—solid planes of stone, softened only by the warmth of wood. There&apos;s no excess, no ornament. The residential finds strength in simplicity, allowing the materials to hold presence against the landscape with a calm, monolithic grace.
        </p>
      </section>

      {/* 09 INTERIOR PHOTO LAYOUT */}
      <section className="px-10 md:px-16" style={{ height: '90vh' }}>
        <div className="relative overflow-hidden h-full">
          <img
            src="/images/s-residence-int-1-day.webp"
            alt="Interior perspective day"
            className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700"
            style={{ opacity: isNight ? 0 : 1 }}
          />
          <img
            src="/images/s-residence-int-1.webp"
            alt="Interior perspective night"
            className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700"
            style={{ opacity: isNight ? 1 : 0 }}
          />
        </div>
      </section>

      {/* 09b DAY / NIGHT INTERIOR — natural aspect ratio */}
      <div className="relative mt-3 mb-24 mx-10 md:mx-16">
        <img
          src="/images/s-residence-int-day.webp"
          alt="Interior day"
          className="w-full object-contain transition-opacity duration-700"
          style={{ opacity: isNight ? 0 : 1 }}
        />
        <img
          src="/images/s-residence-int-2.webp"
          alt="Interior night"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
          style={{ opacity: isNight ? 1 : 0 }}
        />
      </div>

      {/* WARM MINIMALISM */}
      <section className="grid grid-cols-1 lg:grid-cols-2 py-16 md:py-20">
        <div className="flex justify-center items-center px-10 md:px-16 mb-10 lg:mb-0">
          <img
            src="/images/s-residence-materials.webp"
            alt="Material palette"
            className="w-full max-w-md object-contain"
            style={{ imageRendering: 'auto', filter: 'contrast(1.04) saturate(1.08)' }}
          />
        </div>
        <div className="flex flex-col justify-center gap-6 px-10 md:px-16">
          <h3 className="text-[22px] md:text-[26px] font-bold transition-colors duration-700" style={{ fontFamily: 'var(--font-sans)', color: t }}>
            Warm Minimalism
          </h3>
          <p className="text-[16px] md:text-[17px] leading-[1.9] text-justify transition-colors duration-700" style={{ fontFamily: 'var(--font-sans)', color: t }}>
            This board blends the softness of beige adobe stone and natural oak wood slats with the strength of solid gray stone and grey ledgestone. The result is a warm, grounded palette with tonal balance — where tactile stone elements define mass and depth, while oak details add a breathable, tropical rhythm to the space.
          </p>
          <p className="text-[16px] md:text-[17px] leading-[1.9] text-justify transition-colors duration-700" style={{ fontFamily: 'var(--font-sans)', color: t }}>
            With stucco paint finish tying everything together, this selection creates a strong yet serene material identity. Ideal for homes situated near the coast or elevated terrains, it brings both durability and quiet elegance to a modern tropical envelope.
          </p>
        </div>
      </section>

      {/* FLOOR PLANS */}
      <section className="px-10 md:px-16 py-16 md:py-20">
        <h2 className="text-[22px] md:text-[26px] font-bold mb-12 transition-colors duration-700" style={{ fontFamily: 'var(--font-sans)', color: t }}>
          Floor Plans
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map((n) => (
            <div
              key={n}
              className="flex flex-col items-center justify-center gap-4 rounded-sm"
              style={{ height: '420px', border: `1px dashed ${rule}`, background: isNight ? '#111' : '#f9f8f7' }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.25 }}>
                <rect x="3" y="3" width="18" height="18" rx="1" stroke={t} strokeWidth="1.5" />
                <path d="M3 9h18M9 9v12M3 15h6" stroke={t} strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <p className="text-[12px] tracking-[3px] uppercase transition-colors duration-700" style={{ fontFamily: 'var(--font-sans)', color: sub }}>
                Floor Plan {n}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* MORE PROJECTS */}
      <ProjectMoreProjects current={project} all={projects} />
    </>
  );
};

export default SResidenceLayout;
