import { Project, projects } from '@/mocks/projects';
import ProjectMoreProjects from './ProjectMoreProjects';
import { useNightMode } from '@/contexts/NightModeContext';

interface Props { project: Project; }

const SResidenceLayout = ({ project }: Props) => {
  const { isNight, setIsNight } = useNightMode();

  const t = isNight ? '#ffffff' : '#383838';
  const sub = isNight ? '#aaaaaa' : '#aaa';

  return (
    <>
      {/* 01  HERO */}
      <section className="relative w-full" style={{ height: '85vh' }}>
        <img
          src={`/images/s-residence-hero.jpg`}
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

      {/* 02  INFO BAR */}
      <section className="py-8">
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
              <span className="text-[13px] md:text-[14px] font-semibold tracking-[1px] uppercase transition-colors duration-700" style={{ fontFamily: 'var(--font-sans)', color: t }}>
                {value}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 03 + 04 + 05  TWO-COLUMN: Image/Schematic LEFT — Concept/Materials/Warm Minimalism RIGHT */}
      <section className="grid grid-cols-1 lg:grid-cols-2">

        {/* ── LEFT COLUMN ── */}
        <div className="flex flex-col">

          {/* Day / Night toggle image */}
          <div className="relative overflow-hidden" style={{ height: '65vh' }}>
            <img
              src={`/images/s-residence-exterior.jpg`}
              alt="S Residence day"
              className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700"
              style={{ opacity: isNight ? 0 : 1 }}
            />
            <img
              src={`/images/s-residence-night.jpg`}
              alt="S Residence night"
              className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700"
              style={{ opacity: isNight ? 1 : 0 }}
            />
            {/* Sun / Moon toggle pill */}
            <button
              type="button"
              onClick={() => setIsNight(!isNight)}
              className="absolute bottom-5 left-1/2 -translate-x-1/2 cursor-pointer flex items-center gap-0 rounded-full overflow-hidden border border-white/30 backdrop-blur-sm"
              style={{ background: 'rgba(0,0,0,0.35)' }}
              aria-label="Toggle day/night view"
            >
              {/* Sun side */}
              <span
                className="flex items-center justify-center w-9 h-9 transition-colors duration-300"
                style={{ background: isNight ? 'transparent' : 'rgba(255,255,255,0.2)' }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
              {/* Moon side */}
              <span
                className="flex items-center justify-center w-9 h-9 transition-colors duration-300"
                style={{ background: isNight ? 'rgba(255,255,255,0.2)' : 'transparent' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
          </div>

          {/* Schematic / axonometric drawing */}
          <div
            className="relative flex items-center justify-center overflow-hidden"
            style={{ minHeight: '520px' }}
          >
            <img
              src="/images/s-residence-element.svg"
              alt="S Residence axonometric"
              className="w-full max-w-[680px] px-6"
            />
          </div>

        </div>

        {/* ── RIGHT COLUMN ── */}
        <div className="flex flex-col px-10 md:px-16 py-12 gap-6">

          {/* Concept */}
          <p className="text-[20px] md:text-[24px] font-bold leading-[1.2] transition-colors duration-700" style={{ fontFamily: 'var(--font-sans)', color: t }}>
            Concept
          </p>
          <p className="text-[13px] md:text-[14px] leading-[1.9] text-justify transition-colors duration-700" style={{ fontFamily: 'var(--font-sans)', color: t }}>
            Grounded in the clarity of minimalism and the warmth of tropical living, the design blends wood, stone, and concrete to create a space that feels calm, honest, and enduring. The home opens itself to the landscape—allowing light, air, and greenery to flow freely throughout.
          </p>
          <p className="text-[13px] md:text-[14px] leading-[1.9] text-justify transition-colors duration-700" style={{ fontFamily: 'var(--font-sans)', color: t }}>
            Natural textures define the palette: the warmth of wood, the solidity of stone, and the raw elegance of concrete come together in quiet balance. Wide openings dissolve the line between inside and out, while clean forms and open layouts support a sense of ease and quiet luxury. Every surface is intentional, every material left to speak in its natural voice.
          </p>

          {/* Materials board */}
          <div className="flex justify-start mt-2">
            <img
              src="/images/s-residence-materials.png"
              alt="Materials"
              className="w-4/5 object-contain"
              style={{ imageRendering: 'auto', filter: 'contrast(1.04) saturate(1.08)' }}
            />
          </div>

          {/* Warm Minimalism */}
          <p className="text-[20px] md:text-[24px] font-bold leading-[1.2] mt-4 transition-colors duration-700" style={{ fontFamily: 'var(--font-sans)', color: t }}>
            Warm Minimalism
          </p>
          <p className="text-[13px] md:text-[14px] leading-[1.9] text-justify transition-colors duration-700" style={{ fontFamily: 'var(--font-sans)', color: t }}>
            This board blends the softness of beige adobe stone and natural oak wood slats with the strength of solid gray stone and grey ledgestone. The result is a warm, grounded palette with tonal balance — where tactile stone elements define mass and depth, while oak details add a breathable, tropical rhythm to the space.
          </p>
          <p className="text-[13px] md:text-[14px] leading-[1.9] text-justify transition-colors duration-700" style={{ fontFamily: 'var(--font-sans)', color: t }}>
            With stucco paint finish tying everything together, this selection creates a strong yet serene material identity. Ideal for homes situated near the coast or elevated terrains, it brings both durability and quiet elegance to a modern tropical envelope.
          </p>

        </div>
      </section>

      {/* Text + side image — asymmetric two-col */}
      <section className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 px-10 md:px-16 mb-4" style={{ height: '65vh' }}>
        <div className="flex flex-col justify-start gap-5 overflow-hidden">
          <h2 className="text-[22px] md:text-[28px] font-bold leading-[1.2] transition-colors duration-700" style={{ fontFamily: 'var(--font-sans)', color: t }}>
            The Weight of Simplicity
          </h2>
          <p className="text-[13px] md:text-[14px] leading-[1.9] text-justify transition-colors duration-700" style={{ fontFamily: 'var(--font-sans)', color: t }}>
            Monolithic yet quiet, the home holds presence through raw finishes and shadow play—where minimalism becomes poetry. Here, minimalism is not stark, but soulful.
          </p>
          <p className="text-[13px] md:text-[14px] leading-[1.9] text-justify transition-colors duration-700" style={{ fontFamily: 'var(--font-sans)', color: t }}>
            Wood and stone are left honest, unpolished—allowing natural texture and light to carry the mood. Restraint becomes richness, and the absence of clutter makes room for clarity.
          </p>
          <p className="text-[13px] md:text-[14px] leading-[1.9] text-justify transition-colors duration-700" style={{ fontFamily: 'var(--font-sans)', color: t }}>
            With solid volumes and minimal detailing, the structure feels like it&apos;s resting—anchored to its site through sheer presence. The neutral, matte surfaces reflect changing skies and hold a softness that balances the weight of mass.
          </p>
        </div>
        <div className="overflow-hidden h-full">
          <img
            src={`/images/s-residence-exterior-detail.jpg`}
            alt="S Residence exterior detail"
            className="w-full h-full object-cover object-center"
          />
        </div>
      </section>

      {/* 2-col gallery */}
      <section className="grid grid-cols-2 gap-3 px-10 md:px-16 mb-3">
        {[
          '/images/s-residence-balance.png',
          '/images/s-residence-int-3.svg',
        ].map((src, i) => (
          <div key={i} className="overflow-hidden" style={{ height: '45vh' }}>
            <img src={src} alt={`S Residence ${i + 1}`} className="w-full h-full object-cover object-center" />
          </div>
        ))}
      </section>

      {/* ── INTERIOR PERSPECTIVES ────────────────────────────────────── */}
      <div className="px-10 md:px-16 mt-24 mb-8">
        <h2 className="text-[22px] md:text-[28px] font-bold leading-[1.2] transition-colors duration-700" style={{ fontFamily: 'var(--font-sans)', color: t }}>
          Interior Perspectives
        </h2>
      </div>

      {/* Closing copy */}
      <section className="px-10 md:px-16 mb-10">
        <p className="text-[13px] md:text-[14px] leading-[1.9] max-w-2xl text-justify transition-colors duration-700" style={{ fontFamily: 'var(--font-sans)', color: t }}>
          The structure presents itself with quiet confidence—solid planes of stone, softened only by the warmth of wood. There&apos;s no excess, no ornament. The residential finds strength in simplicity, allowing the materials to hold presence against the landscape with a calm, monolithic grace.
        </p>
      </section>

      {/* Interior photo layout */}
      <section className="grid grid-cols-[3fr_2fr] gap-3 px-10 md:px-16 mb-24" style={{ height: '110vh' }}>
        <div className="overflow-hidden h-full">
          <img
            src="/images/s-residence-int-1.png"
            alt="Interior Perspective"
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className="flex flex-col gap-3 h-full">
          <div className="overflow-hidden flex-1">
            <img
              src="/images/s-residence-int-2.png"
              alt="Interior detail"
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div className="overflow-hidden flex-1">
            <img
              src="/images/s-residence-int-4.svg"
              alt="Interior detail"
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div className="overflow-hidden flex-1">
            <img
              src="/images/s-residence-int-5.svg"
              alt="Interior detail"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </section>



      {/* DAY / NIGHT — full-bleed bottom section */}
      <section className="relative w-full overflow-hidden mt-24" style={{ height: '85vh', marginBottom: '-1px' }}>
        <img
          src="/images/s-residence-day.svg"
          alt="S Residence day"
          className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700"
          style={{ opacity: isNight ? 0 : 1 }}
        />
        <img
          src={`/images/s-residence-night.jpg`}
          alt="S Residence night"
          className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700"
          style={{ opacity: isNight ? 1 : 0 }}
        />
        {/* Sun / Moon toggle pill */}
        <button
          type="button"
          onClick={() => setIsNight(!isNight)}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer flex items-center gap-0 rounded-full overflow-hidden border border-white/30 backdrop-blur-sm"
          style={{ background: 'rgba(0,0,0,0.35)' }}
          aria-label="Toggle day/night view"
        >
          <span
            className="flex items-center justify-center w-9 h-9 transition-colors duration-300"
            style={{ background: isNight ? 'transparent' : 'rgba(255,255,255,0.2)' }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
      </section>

      {/* MORE PROJECTS */}
      <ProjectMoreProjects current={project} all={projects} />
    </>
  );
};

export default SResidenceLayout;
