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

const CResidenceLayout = ({ project }: Props) => {
  const { isNight, setIsNight } = useNightMode();

  const t = isNight ? '#ffffff' : '#383838';
  const sub = isNight ? '#aaaaaa' : '#aaa';
  const rule = isNight ? '#333' : '#e4e3e2';

  return (
    <>
      {/* 01 HERO */}
      <section className="relative w-full" style={{ height: '85vh' }}>
        <img
          src="/images/c-residence-hero.jpg"
          alt="C Residence"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute bottom-0 left-0 right-0 px-10 md:px-16 pb-8">
          <h1
            className="text-[56px] md:text-[80px] text-white leading-none"
            style={{ fontFamily: 'var(--font-sans)', fontWeight: 700 }}
          >
            C Residence
          </h1>
        </div>
      </section>

      {/* 02 INFO BAR */}
      <section className="py-8" style={{ borderBottom: `1px solid ${rule}` }}>
        <div className="grid grid-cols-5">
          {[
            { label: 'LOCATION',       value: 'BRGY. KASAMBAGAN, CEBU CITY' },
            { label: 'AREA',           value: '245 SQM.' },
            { label: 'TYPE',           value: 'RESIDENTIAL' },
            { label: 'STATUS',         value: 'CONSTRUCTION PHASE' },
            { label: 'YEAR COMPLETED', value: '—' },
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

      {/* 03 CONCEPT */}
      <section className="px-10 md:px-24 lg:px-40 py-16 text-center">
        <h2 className="text-[22px] md:text-[26px] font-bold mb-8 transition-colors duration-700" style={{ fontFamily: 'var(--font-sans)', color: t }}>
          Concept
        </h2>
        <p className="text-[13px] md:text-[14px] leading-[1.9] mb-5 transition-colors duration-700" style={{ fontFamily: 'var(--font-sans)', color: t }}>
          {project.concept}
        </p>
        <p className="text-[13px] md:text-[14px] leading-[1.9] transition-colors duration-700" style={{ fontFamily: 'var(--font-sans)', color: t }}>
          {project.conceptExtended}
        </p>
      </section>

      {/* 04 TWO-COL: Exterior photo LEFT | Material palette + Earthbound Tones RIGHT */}
      <section className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left: exterior photo */}
        <div className="overflow-hidden" style={{ height: '70vh' }}>
          <img
            src="/images/c-residence-g1.jpg"
            alt="C Residence exterior"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Right: material palette board + Earthbound Tones */}
        <div className="flex flex-col px-10 md:px-16 py-12 gap-6">
          {/* Material swatches grid */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { img: '/images/c-residence-mat1.jpg', label: 'Light Gray', sub: 'Fabric' },
              { img: '/images/c-residence-mat2.jpg', label: 'Herringbone', sub: 'Wood Flooring' },
              { img: '/images/c-residence-mat3.jpg', label: 'Wood', sub: 'Laminate' },
              { img: '/images/c-residence-mat4.jpg', label: 'Ledgestone', sub: 'Cream' },
              { img: '/images/c-residence-mat5.jpg', label: 'Stucco', sub: 'Paint Finish' },
              { img: '', label: 'Olive', sub: 'Paint Finish', color: '#6b6b47' },
            ].map((m, i) => (
              <div key={i} className="flex flex-col gap-1">
                <div className="overflow-hidden rounded-sm" style={{ height: '80px' }}>
                  {m.img ? (
                    <img src={m.img} alt={m.label} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full" style={{ backgroundColor: m.color }} />
                  )}
                </div>
                <span className="text-[9px] font-semibold tracking-[1px] uppercase transition-colors duration-700" style={{ fontFamily: 'var(--font-sans)', color: t }}>
                  {m.label}
                </span>
                <span className="text-[9px] tracking-[0.5px] transition-colors duration-700" style={{ fontFamily: 'var(--font-sans)', color: sub }}>
                  {m.sub}
                </span>
              </div>
            ))}
          </div>

          {/* Earthbound Tones */}
          <h3 className="text-[20px] md:text-[22px] font-bold mt-4 transition-colors duration-700" style={{ fontFamily: 'var(--font-sans)', color: t }}>
            Earthbound Tones
          </h3>
          <p className="text-[13px] md:text-[14px] leading-[1.9] text-justify transition-colors duration-700" style={{ fontFamily: 'var(--font-sans)', color: t }}>
            The color and material palette of earth tones perfectly captures the essence of a tropical luxurious design. Earth tones bring warmth and elegance, with rich wood adding depth and organic texture.
          </p>
          <p className="text-[13px] md:text-[14px] leading-[1.9] text-justify transition-colors duration-700" style={{ fontFamily: 'var(--font-sans)', color: t }}>
            Lush greens evoke a tropical, refreshing feel, connecting the space to nature. Soft neutrals and stone accents balance the palette, creating a serene yet luxurious atmosphere inspired by natural beauty.
          </p>
        </div>
      </section>

      {/* 05 FULL-WIDTH AXONOMETRIC DIAGRAM */}
      <section
        className="relative flex items-center justify-center py-16 px-10 md:px-20 transition-colors duration-700"
        style={{ backgroundColor: isNight ? '#111' : '#f7f6f5' }}
      >
        <div className="relative w-full max-w-3xl">
          <img
            src="/images/c-residence-axon.png"
            alt="C Residence axonometric diagram"
            className="w-full object-contain"
          />
          {/* Floor labels — positioned to match PDF */}
          {[
            { label: 'Skylight',      x: '78%', y: '8%' },
            { label: 'Roof Deck',     x: '78%', y: '18%' },
            { label: 'Garage',        x: '78%', y: '30%' },
            { label: 'Ground Floor',  x: '78%', y: '44%' },
            { label: 'Second Floor',  x: '78%', y: '56%' },
            { label: 'Family Area',   x: '-2%', y: '30%' },
            { label: 'Lanai',         x: '-2%', y: '50%' },
            { label: 'Existing Road', x: '-2%', y: '88%' },
          ].map(({ label, x, y }) => (
            <div
              key={label}
              className="absolute text-[9px] tracking-[1.5px] uppercase"
              style={{ left: x, top: y, fontFamily: 'var(--font-sans)', color: sub, whiteSpace: 'nowrap' }}
            >
              {label}
            </div>
          ))}
        </div>
      </section>

      {/* 06 TWO-COL: Exterior detail LEFT | B&W drawing RIGHT */}
      <section className="grid grid-cols-1 lg:grid-cols-2" style={{ height: '70vh' }}>
        {/* Left: exterior detail + caption */}
        <div className="relative overflow-hidden">
          <img
            src="/images/c-residence-g2.jpg"
            alt="C Residence exterior detail"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute bottom-0 left-0 right-0 px-8 pb-8">
            <p className="text-white text-[12px] md:text-[13px] leading-[1.8] max-w-xs" style={{ fontFamily: 'var(--font-sans)' }}>
              A modern take on the cottage silhouette, the structure features clean rooflines, light-toned finishes, and finely crafted details that nod to tradition with a fresh, contemporary twist.
            </p>
          </div>
        </div>
        {/* Right: B&W architectural rendering */}
        <div className="overflow-hidden">
          <img
            src="/images/c-residence-bw.png"
            alt="C Residence architectural rendering"
            className="w-full h-full object-cover object-center"
          />
        </div>
      </section>

      {/* 07 TWO-COL: Classic Cottage with Modern Soul */}
      <section className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left: image + pull quote */}
        <div className="flex flex-col">
          <div className="overflow-hidden" style={{ height: '55vh' }}>
            <img
              src="/images/c-residence-g3.jpg"
              alt="C Residence cottage"
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div className="px-10 md:px-14 py-10 flex flex-col gap-5">
            <h3 className="text-[20px] md:text-[24px] font-bold leading-[1.2] transition-colors duration-700" style={{ fontFamily: 'var(--font-sans)', color: t }}>
              Classic Cottage with Modern Soul
            </h3>
            <p className="text-[13px] md:text-[14px] leading-[1.9] text-justify transition-colors duration-700" style={{ fontFamily: 'var(--font-sans)', color: t }}>
              There's a quiet charm in this space—a home that feels like a warm memory. The atmosphere evokes the ease of cottage living, where textured woods, soft neutrals, and vintage nuances bring both nostalgia and elegance.
            </p>
            <p className="text-[13px] md:text-[14px] leading-[1.9] text-justify transition-colors duration-700" style={{ fontFamily: 'var(--font-sans)', color: t }}>
              It's an aesthetic grounded in familiarity, reimagined for today's lifestyle—warm, welcoming, and deeply human.
            </p>
          </div>
        </div>
        {/* Right: large exterior */}
        <div className="overflow-hidden" style={{ minHeight: '70vh' }}>
          <img
            src="/images/c-residence-g4.jpg"
            alt="C Residence facade"
            className="w-full h-full object-cover object-center"
          />
        </div>
      </section>

      {/* 08 THREE-IMAGE ROW: large left + two stacked right */}
      <section className="grid grid-cols-[3fr_2fr] gap-3 px-10 md:px-16 my-3" style={{ height: '65vh' }}>
        <div className="overflow-hidden h-full">
          <img
            src="/images/c-residence-g5.jpg"
            alt="C Residence night corner"
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className="flex flex-col gap-3 h-full">
          <div className="overflow-hidden flex-1">
            <img
              src="/images/c-residence-g6.jpg"
              alt="C Residence detail"
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div className="overflow-hidden flex-1">
            <img
              src="/images/c-residence-g7.jpg"
              alt="C Residence dusk"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </section>

      {/* 09 DAY / NIGHT FULL-BLEED */}
      <section className="relative w-full overflow-hidden mt-4" style={{ height: '80vh' }}>
        <img
          src="/images/c-residence-hero.jpg"
          alt="C Residence day"
          className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700"
          style={{ opacity: isNight ? 0 : 1 }}
        />
        <img
          src="/images/c-residence-night.jpg"
          alt="C Residence night"
          className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700"
          style={{ opacity: isNight ? 1 : 0 }}
        />
        <DayNightToggle isNight={isNight} onToggle={() => setIsNight(!isNight)} />
      </section>

      {/* 10 BOTTOM GRID: 4 images */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-1 mt-1 px-10 md:px-16 mb-24" style={{ height: '35vh' }}>
        {[
          '/images/c-residence-g8.jpg',
          '/images/c-residence-g1.jpg',
          '/images/c-residence-g3.jpg',
          '/images/c-residence-g2.jpg',
        ].map((src, i) => (
          <div key={i} className="overflow-hidden h-full">
            <img src={src} alt={`C Residence view ${i + 1}`} className="w-full h-full object-cover object-center" />
          </div>
        ))}
      </section>

      {/* MORE PROJECTS */}
      <ProjectMoreProjects current={project} all={projects} />
    </>
  );
};

export default CResidenceLayout;
