import { Project, projects } from '@/mocks/projects';
import ProjectMoreProjects from './ProjectMoreProjects';
import { useNightMode } from '@/contexts/NightModeContext';

interface Props { project: Project; }

const DayNightToggle = ({ isNight, onToggle }: { isNight: boolean; onToggle: () => void }) => (
  <button
    type="button"
    onClick={onToggle}
    className="absolute bottom-5 left-1/2 -translate-x-1/2 cursor-pointer flex items-center gap-0 rounded-full overflow-hidden border border-white/30 backdrop-blur-sm"
    style={{ background: 'rgba(0,0,0,0.35)' }}
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
      {/* 01 HERO */}
      <section className="relative w-full" style={{ height: '85vh' }}>
        <img
          src="/images/s-residence-hero.jpg"
          alt="S Residence"
          className="absolute inset-0 w-full h-full object-cover object-center"
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
              <span className="text-[9px] tracking-[2px] mb-2 uppercase" style={{ fontFamily: 'var(--font-sans)', color: sub }}>
                {label}
              </span>
              <span className="text-[11px] md:text-[12px] font-semibold tracking-[1px] uppercase transition-colors duration-700" style={{ fontFamily: 'var(--font-sans)', color: t }}>
                {value}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 03 CONCEPT — full-width centered */}
      <section className="px-10 md:px-24 lg:px-40 py-16 text-center">
        <h2 className="text-[22px] md:text-[26px] font-bold mb-8 transition-colors duration-700" style={{ fontFamily: 'var(--font-sans)', color: t }}>
          Concept
        </h2>
        <p className="text-[13px] md:text-[14px] leading-[1.9] mb-5 transition-colors duration-700" style={{ fontFamily: 'var(--font-sans)', color: t }}>
          Grounded in the clarity of minimalism and the warmth of tropical living, the design blends wood, stone, and concrete to create a space that feels calm, honest, and enduring. The home opens itself to the landscape—allowing light, air, and greenery to flow freely throughout.
        </p>
        <p className="text-[13px] md:text-[14px] leading-[1.9] transition-colors duration-700" style={{ fontFamily: 'var(--font-sans)', color: t }}>
          Natural textures define the palette: the warmth of wood, the solidity of stone, and the raw elegance of concrete come together in quiet balance. Wide openings dissolve the line between inside and out, while clean forms and open layouts support a sense of ease and quiet luxury. Every surface is intentional, every material left to speak in its natural voice.
        </p>
      </section>

      {/* 04 TWO-COL: Exterior photo LEFT | Materials board + Warm Minimalism RIGHT */}
      <section className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left: exterior photo with day/night toggle */}
        <div className="relative overflow-hidden" style={{ height: '70vh' }}>
          <img
            src="/images/s-residence-concept-day.jpg"
            alt="S Residence day"
            className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700"
            style={{ opacity: isNight ? 0 : 1 }}
          />
          <img
            src="/images/s-residence-concept-night.jpg"
            alt="S Residence night"
            className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700"
            style={{ opacity: isNight ? 1 : 0 }}
          />
          <DayNightToggle isNight={isNight} onToggle={() => setIsNight(!isNight)} />
        </div>

        {/* Right: materials board + Warm Minimalism */}
        <div className="flex flex-col px-10 md:px-16 py-12 gap-6">
          <div className="flex justify-center">
            <img
              src="/images/s-residence-materials.jpg"
              alt="Material palette"
              className="w-full max-w-md object-contain"
              style={{ imageRendering: 'auto', filter: 'contrast(1.04) saturate(1.08)' }}
            />
          </div>

          <h3 className="text-[20px] md:text-[22px] font-bold mt-2 transition-colors duration-700" style={{ fontFamily: 'var(--font-sans)', color: t }}>
            Warm Minimalism
          </h3>
          <p className="text-[13px] md:text-[14px] leading-[1.9] text-justify transition-colors duration-700" style={{ fontFamily: 'var(--font-sans)', color: t }}>
            This board blends the softness of beige adobe stone and natural oak wood slats with the strength of solid gray stone and grey ledgestone. The result is a warm, grounded palette with tonal balance — where tactile stone elements define mass and depth, while oak details add a breathable, tropical rhythm to the space.
          </p>
          <p className="text-[13px] md:text-[14px] leading-[1.9] text-justify transition-colors duration-700" style={{ fontFamily: 'var(--font-sans)', color: t }}>
            With stucco paint finish tying everything together, this selection creates a strong yet serene material identity. Ideal for homes situated near the coast or elevated terrains, it brings both durability and quiet elegance to a modern tropical envelope.
          </p>
        </div>
      </section>

      {/* 05 FULL-WIDTH AXONOMETRIC DIAGRAM */}
      <section
        className="relative flex items-center justify-center py-16 px-10 md:px-20 transition-colors duration-700"
        style={{ backgroundColor: isNight ? '#111' : '#ffffff' }}
      >
        <img
          src="/images/s-residence-element.svg"
          alt="S Residence axonometric"
          className="w-full max-w-3xl object-contain"
        />
      </section>

      {/* 06 EDITORIAL 4-IMAGE LAYOUT */}
      <section className="grid grid-cols-[2fr_3fr] gap-3 px-10 md:px-16 mt-3">
        {/* Left column — narrower */}
        <div className="flex flex-col gap-5">
          {/* Top: small exterior detail */}
          <div className="overflow-hidden" style={{ height: '38vh' }}>
            <img
              src="/images/s-residence-exterior-detail.jpg"
              alt="S Residence exterior detail"
              className="w-full h-full object-cover object-top"
            />
          </div>
          {/* Caption */}
          <p className="text-[11px] md:text-[12px] leading-[1.85] text-justify transition-colors duration-700 pr-2" style={{ fontFamily: 'var(--font-sans)', color: t }}>
            Monolithic yet quiet, the home holds presence through raw finishes and shadow play—where minimalism becomes poetry. Here, minimalism is not stark, but soulful. Wood and stone are left honest, unpolished—allowing natural texture and light to carry the mood. It&apos;s a meditative environment, where restraint becomes richness, and the absence of clutter makes room for clarity. The aesthetic is quiet, weighty, and elemental.
          </p>
          {/* Bottom: large exterior facade */}
          <div className="overflow-hidden" style={{ height: '52vh' }}>
            <img
              src="/images/s-residence-exterior.jpg"
              alt="S Residence facade"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>

        {/* Right column — wider */}
        <div className="flex flex-col gap-3">
          {/* Top: large B&W shot */}
          <div className="overflow-hidden" style={{ height: '58vh' }}>
            <img
              src="/images/s-residence-balance.jpg"
              alt="S Residence"
              className="w-full h-full object-cover object-center"
            />
          </div>
          {/* Bottom: interior detail */}
          <div className="overflow-hidden" style={{ height: '30vh' }}>
            <img
              src="/images/s-residence-int-2.jpg"
              alt="S Residence walkway"
              className="w-full h-full object-cover object-center"
            />
          </div>
          {/* Heading + text */}
          <div className="flex flex-col gap-3 pt-1">
            <h2 className="text-[18px] md:text-[22px] font-bold leading-[1.2] transition-colors duration-700" style={{ fontFamily: 'var(--font-sans)', color: t }}>
              The Weight of Simplicity
            </h2>
            <p className="text-[11px] md:text-[12px] leading-[1.85] text-justify transition-colors duration-700" style={{ fontFamily: 'var(--font-sans)', color: t }}>
              With solid volumes and minimal detailing, the structure feels like it&apos;s resting—anchored to its site through sheer presence. The neutral, matte surfaces reflect changing skies and hold a softness that balances the weight of mass. It doesn&apos;t disrupt its setting, it deepens it.
            </p>
          </div>
        </div>
      </section>

      {/* 07 TWO-IMAGE ROW */}
      <section className="grid grid-cols-2 gap-3 px-10 md:px-16 my-3" style={{ height: '45vh' }}>
        <div className="overflow-hidden h-full">
          <img src="/images/s-residence-balance.jpg" alt="S Residence balance" className="w-full h-full object-cover object-center" />
        </div>
        <div className="overflow-hidden h-full">
          <img src="/images/s-residence-night.jpg" alt="S Residence night" className="w-full h-full object-cover object-center" />
        </div>
      </section>

      {/* 08 INTERIOR PERSPECTIVES */}
      <div className="px-10 md:px-16 mt-16 mb-8">
        <h2 className="text-[22px] md:text-[28px] font-bold leading-[1.2] transition-colors duration-700" style={{ fontFamily: 'var(--font-sans)', color: t }}>
          Interior Perspectives
        </h2>
      </div>
      <section className="px-10 md:px-16 mb-10">
        <p className="text-[13px] md:text-[14px] leading-[1.9] max-w-2xl text-justify transition-colors duration-700" style={{ fontFamily: 'var(--font-sans)', color: t }}>
          The structure presents itself with quiet confidence—solid planes of stone, softened only by the warmth of wood. There&apos;s no excess, no ornament. The residential finds strength in simplicity, allowing the materials to hold presence against the landscape with a calm, monolithic grace.
        </p>
      </section>

      {/* 09 INTERIOR PHOTO LAYOUT */}
      <section className="grid grid-cols-[3fr_2fr] gap-3 px-10 md:px-16 mb-24" style={{ height: '90vh' }}>
        <div className="overflow-hidden h-full">
          <img
            src="/images/s-residence-int-1.jpg"
            alt="Interior perspective"
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className="overflow-hidden h-full">
          <img
            src="/images/s-residence-int-2.jpg"
            alt="Interior detail"
            className="w-full h-full object-cover object-center"
          />
        </div>
      </section>

      {/* 10 DAY / NIGHT FULL-BLEED */}
      <section className="relative w-full overflow-hidden mt-4" style={{ height: '85vh', marginBottom: '-1px' }}>
        <img
          src="/images/s-residence-day.svg"
          alt="S Residence day"
          className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700"
          style={{ opacity: isNight ? 0 : 1 }}
        />
        <img
          src="/images/s-residence-night.jpg"
          alt="S Residence night"
          className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700"
          style={{ opacity: isNight ? 1 : 0 }}
        />
        <DayNightToggle isNight={isNight} onToggle={() => setIsNight(!isNight)} />
      </section>

      {/* MORE PROJECTS */}
      <ProjectMoreProjects current={project} all={projects} />
    </>
  );
};

export default SResidenceLayout;
