import { Project, projects } from '@/mocks/projects';
import ProjectMoreProjects from './ProjectMoreProjects';
import { useNightMode } from '@/contexts/NightModeContext';

interface Props { project: Project; }

const MonumentalLayout = ({ project }: Props) => {
  const { isNight, setIsNight } = useNightMode();

  const t = isNight ? '#ffffff' : '#383838';
  const sub = isNight ? '#888888' : '#aaa';
  const divider = isNight ? '#2a2a2a' : '#e8e7e6';

  const gallery = project.galleryImages ?? [];
  const annotations = project.annotations ?? [];

  const details = [
    { label: 'Programme',   value: project.typology },
    { label: 'Location',    value: project.location },
    { label: 'Total Area',  value: project.area ?? '—' },
    { label: 'Status',      value: project.status ?? '—' },
    { label: 'Year',        value: String(project.year) },
    { label: 'Structure',   value: 'Reinforced Concrete, Masonry' },
    { label: 'Roof',        value: 'Dark Shingle, Compressed Pyramid' },
    { label: 'Landscape',   value: 'Concentric Garden Rings' },
  ];

  return (
    <>
      {/* 01 HERO — full bleed, title bottom-left */}
      <section className="relative w-full" style={{ height: '85vh' }}>
        <img
          src={project.imageUrl}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-10 pb-10">
          <p className="text-[10px] tracking-[4px] text-white/60 uppercase mb-3" style={{ fontFamily: 'var(--font-sans)' }}>
            {project.typology} · {project.location}
          </p>
          <h1
            className="text-[52px] md:text-[72px] text-white leading-none"
            style={{ fontFamily: 'var(--font-sans)', fontWeight: 700 }}
          >
            {project.title}
          </h1>
        </div>
      </section>

      {/* 02 INFO BAR */}
      <section className="py-8 border-b transition-colors duration-700" style={{ borderColor: divider }}>
        <div className="grid grid-cols-5">
          {[
            { label: 'LOCATION', value: project.location },
            { label: 'AREA',     value: project.area ?? '—' },
            { label: 'TYPE',     value: project.typology },
            { label: 'STATUS',   value: project.status ?? '—' },
            { label: 'YEAR',     value: String(project.year) },
          ].map(({ label, value }) => (
            <div key={label} className="flex flex-col items-center justify-center text-center px-4">
              <span className="text-[9px] tracking-[2px] mb-2 uppercase transition-colors duration-700" style={{ fontFamily: 'var(--font-sans)', color: sub }}>
                {label}
              </span>
              <span className="text-[13px] font-semibold tracking-[0.5px] uppercase transition-colors duration-700" style={{ fontFamily: 'var(--font-sans)', color: t }}>
                {value}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 03 CONCEPT — stark, wide, typographic */}
      <section className="px-10 md:px-20 lg:px-32 py-24 md:py-32">
        <div className="max-w-3xl">
          <p className="text-[9px] tracking-[4px] uppercase mb-10 font-bold transition-colors duration-700" style={{ fontFamily: 'var(--font-sans)', color: t }}>
            Concept
          </p>
          <p
            className="text-[20px] md:text-[28px] leading-[1.8] tracking-[-0.3px] transition-colors duration-700"
            style={{ fontFamily: 'var(--font-serif)', color: t }}
          >
            {project.concept}
          </p>
        </div>
      </section>

      {/* 04 ANNOTATED AERIAL — full bleed with callouts */}
      {gallery[0] && (
        <section className="relative w-full overflow-hidden" style={{ height: '80vh' }}>
          <img src={gallery[0]} alt={`${project.title} aerial`} className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-black/15" />
          {annotations.map((ann, i) => (
            <div
              key={i}
              className="absolute flex items-center gap-3"
              style={{ left: ann.x, top: ann.y, transform: 'translate(-50%, -50%)' }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-white shrink-0" />
              <div className="w-16 md:w-24 h-px bg-white/60" />
              <div>
                <p className="text-white text-[10px] md:text-[11px] font-semibold leading-tight whitespace-nowrap" style={{ fontFamily: 'var(--font-sans)', textShadow: '0 1px 6px rgba(0,0,0,0.5)' }}>
                  {ann.label}
                </p>
                {ann.sublabel && (
                  <p className="text-white/70 text-[9px] font-light whitespace-nowrap" style={{ fontFamily: 'var(--font-sans)', textShadow: '0 1px 6px rgba(0,0,0,0.5)' }}>
                    {ann.sublabel}
                  </p>
                )}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* 05 DETAILS AS FOOTNOTE ROW */}
      <section className="px-10 md:px-16 py-14 border-t border-b transition-colors duration-700" style={{ borderColor: divider }}>
        <p className="text-[9px] tracking-[3px] uppercase mb-10 font-bold transition-colors duration-700" style={{ fontFamily: 'var(--font-sans)', color: t }}>
          Project Details
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-x-6 gap-y-8">
          {details.map(({ label, value }) => (
            <div key={label} className="flex flex-col gap-2">
              <span className="text-[10px] tracking-[1.5px] uppercase font-semibold transition-colors duration-700" style={{ fontFamily: 'var(--font-sans)', color: t }}>
                {label}
              </span>
              <span className="text-[11px] font-medium leading-[1.5] transition-colors duration-700" style={{ fontFamily: 'var(--font-sans)', color: t }}>
                {value}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 06 EXTENDED CONCEPT + SECOND IMAGE */}
      {project.conceptExtended && (
        <section className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-0">
          <div className="px-10 md:px-16 py-20 flex flex-col justify-center">
            <p className="text-[13px] md:text-[14px] leading-[1.9] text-justify transition-colors duration-700" style={{ fontFamily: 'var(--font-sans)', color: t }}>
              {project.conceptExtended}
            </p>
          </div>
          {gallery[1] && (
            <div className="overflow-hidden" style={{ height: '60vh' }}>
              <img src={gallery[1]} alt={`${project.title} 2`} className="w-full h-full object-cover object-center" />
            </div>
          )}
        </section>
      )}

      {/* 07 WIDE IMAGE */}
      {gallery[2] && (
        <section className="w-full mt-[3px]" style={{ height: '70vh' }}>
          <img src={gallery[2]} alt={`${project.title} 3`} className="w-full h-full object-cover object-center" />
        </section>
      )}

      {/* 08 THREE-COL STRIP */}
      {gallery.length >= 6 && (
        <section className="grid grid-cols-3 gap-[3px] mt-[3px]">
          {[gallery[3], gallery[4], gallery[5]].map((src, i) => (
            <div key={i} className="overflow-hidden" style={{ height: '42vh' }}>
              <img src={src} alt={`${project.title} ${i + 4}`} className="w-full h-full object-cover object-center" />
            </div>
          ))}
        </section>
      )}

      {/* 09 TWO-COL MID GALLERY */}
      {gallery.length >= 8 && (
        <section className="grid grid-cols-[2fr_3fr] gap-[3px] mt-[3px]">
          {[gallery[6], gallery[7]].map((src, i) => (
            <div key={i} className="overflow-hidden" style={{ height: '55vh' }}>
              <img src={src} alt={`${project.title} ${i + 7}`} className="w-full h-full object-cover object-center" />
            </div>
          ))}
        </section>
      )}

      {/* 10 FINAL WIDE IMAGE */}
      {gallery[8] && (
        <section className="w-full mt-[3px]" style={{ height: '65vh' }}>
          <img src={gallery[8]} alt={`${project.title} 9`} className="w-full h-full object-cover object-center" />
        </section>
      )}

      {/* 11 DAY / NIGHT */}
      {project.nightImageUrl && (
        <section className="relative w-full overflow-hidden mt-16" style={{ height: '85vh', marginBottom: '-1px' }}>
          <img
            src={project.imageUrl}
            alt={`${project.title} day`}
            className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700"
            style={{ opacity: isNight ? 0 : 1 }}
          />
          <img
            src={project.nightImageUrl}
            alt={`${project.title} night`}
            className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700"
            style={{ opacity: isNight ? 1 : 0 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
          <button
            type="button"
            onClick={() => setIsNight(!isNight)}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
          >
            <span className="text-[11px] tracking-[2px] text-white uppercase underline underline-offset-4" style={{ fontFamily: 'var(--font-sans)' }}>
              {isNight ? 'See day view' : 'Tap to see the night view'}
            </span>
          </button>
        </section>
      )}

      {/* 12 CLOSING BAND */}
      <section
        className="px-10 md:px-16 py-16 transition-colors duration-700"
        style={{ backgroundColor: isNight ? '#141414' : '#f7f6f5' }}
      >
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <p
            className="text-[28px] md:text-[36px] leading-[1.3] tracking-[-0.5px] transition-colors duration-700"
            style={{ fontFamily: 'var(--font-serif)', color: t }}
          >
            {project.title}
          </p>
          <p className="text-[9px] tracking-[3px] uppercase transition-colors duration-700" style={{ fontFamily: 'var(--font-sans)', color: sub }}>
            {project.typology} · {project.year} · {project.status}
          </p>
        </div>
      </section>

      <ProjectMoreProjects current={project} all={projects} />
    </>
  );
};

export default MonumentalLayout;
