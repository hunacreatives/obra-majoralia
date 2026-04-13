import { Project, projects } from '@/mocks/projects';
import ProjectMoreProjects from './ProjectMoreProjects';
import { useNightMode } from '@/contexts/NightModeContext';

interface Props { project: Project; }

const InteriorLayout = ({ project }: Props) => {
  const { isNight, setIsNight } = useNightMode();

  const t = isNight ? '#ffffff' : '#383838';
  const sub = isNight ? '#888888' : '#aaa';
  const divider = isNight ? '#2a2a2a' : '#e8e7e6';

  const gallery = project.galleryImages ?? [];

  const details = [
    { label: 'Programme',       value: project.typology },
    { label: 'Location',        value: project.location },
    { label: 'Interior Area',   value: project.area ?? '—' },
    { label: 'Status',          value: project.status ?? '—' },
    { label: 'Year',            value: String(project.year) },
    { label: 'Primary Finish',  value: 'Marble, Timber, Brushed Metal' },
    { label: 'Lighting',        value: 'Layered Ambient + Accent' },
    { label: 'Joinery',         value: 'Custom Integrated System' },
  ];

  return (
    <>
      {/* 01 HERO — full bleed, title bottom-right */}
      <section className="relative w-full" style={{ height: '85vh' }}>
        <img
          src={project.imageUrl}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <div className="absolute bottom-0 right-0 px-10 pb-10 text-right">
          <p className="text-[10px] tracking-[3px] text-white/60 uppercase mb-3" style={{ fontFamily: 'var(--font-sans)' }}>
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

      {/* 03 DARK INTRO BAND — concept text on dark */}
      <section
        className="px-10 md:px-20 lg:px-32 py-20 md:py-28 transition-colors duration-700"
        style={{ backgroundColor: isNight ? '#111' : '#1e1e1c' }}
      >
        <div className="max-w-4xl">
          <p className="text-[9px] tracking-[4px] text-white/30 mb-8 uppercase font-bold" style={{ fontFamily: 'var(--font-sans)' }}>
            Concept · {project.location}
          </p>
          <p
            className="text-[18px] md:text-[22px] text-white/80 leading-[1.9] tracking-[0.1px]"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            {project.concept}
          </p>
        </div>
      </section>

      {/* 04 TWO PORTRAIT IMAGES */}
      {gallery.length >= 2 && (
        <section className="grid grid-cols-2 gap-[3px]">
          {gallery.slice(0, 2).map((src, i) => (
            <div key={i} className="overflow-hidden" style={{ height: '80vh' }}>
              <img src={src} alt={`${project.title} ${i + 1}`} className="w-full h-full object-cover object-center" />
            </div>
          ))}
        </section>
      )}

      {/* 05 DETAILS + EXTENDED CONCEPT — sticky left */}
      <section className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-0 border-t transition-colors duration-700" style={{ borderColor: divider }}>
        <div
          className="px-10 md:px-16 py-16 border-r transition-colors duration-700"
          style={{ alignSelf: 'start', position: 'sticky', top: '100px', borderColor: divider }}
        >
          <p className="text-[9px] tracking-[3px] uppercase mb-8 font-bold transition-colors duration-700" style={{ fontFamily: 'var(--font-sans)', color: t }}>
            Project Details
          </p>
          <div className="flex flex-col divide-y transition-colors duration-700" style={{ borderColor: divider }}>
            {details.map(({ label, value }) => (
              <div key={label} className="flex justify-between items-baseline py-3 gap-4">
                <span className="text-[10px] tracking-[1.5px] uppercase font-semibold shrink-0 transition-colors duration-700" style={{ fontFamily: 'var(--font-sans)', color: t }}>
                  {label}
                </span>
                <span className="text-[12px] font-medium text-right transition-colors duration-700" style={{ fontFamily: 'var(--font-sans)', color: t }}>
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — year graphic + extended concept + images 3–4 stacked */}
        <div className="flex flex-col gap-0">
          <div className="px-10 md:px-16 py-16">
            <span
              className="text-[80px] md:text-[110px] leading-none font-light select-none block mb-6 transition-colors duration-700"
              style={{ fontFamily: 'var(--font-serif)', color: isNight ? '#2a2a2a' : '#e8e7e6' }}
            >
              {project.year}
            </span>
            {project.conceptExtended && (
              <p className="text-[13px] md:text-[14px] leading-[1.9] text-justify transition-colors duration-700" style={{ fontFamily: 'var(--font-sans)', color: t }}>
                {project.conceptExtended}
              </p>
            )}
          </div>
          {gallery[2] && (
            <div className="overflow-hidden" style={{ height: '55vh' }}>
              <img src={gallery[2]} alt={`${project.title} 3`} className="w-full h-full object-cover object-center" />
            </div>
          )}
          {gallery[3] && (
            <div className="overflow-hidden" style={{ height: '55vh' }}>
              <img src={gallery[3]} alt={`${project.title} 4`} className="w-full h-full object-cover object-center" />
            </div>
          )}
        </div>
      </section>

      {/* 06 WIDE SINGLE IMAGE */}
      {gallery[4] && (
        <section className="w-full mt-[3px]" style={{ height: '75vh' }}>
          <img src={gallery[4]} alt={`${project.title} 5`} className="w-full h-full object-cover object-center" />
        </section>
      )}

      {/* 07 THREE-COL STRIP */}
      {gallery.length >= 8 && (
        <section className="grid grid-cols-3 gap-[3px] mt-[3px]">
          {[gallery[5], gallery[6], gallery[7]].map((src, i) => (
            <div key={i} className="overflow-hidden" style={{ height: '45vh' }}>
              <img src={src} alt={`${project.title} ${i + 6}`} className="w-full h-full object-cover object-center" />
            </div>
          ))}
        </section>
      )}

      {/* 08 TWO-COL CLOSING PAIR */}
      {gallery.length >= 10 && (
        <section className="grid grid-cols-[3fr_2fr] gap-[3px] mt-[3px] mb-3">
          <div className="overflow-hidden" style={{ height: '55vh' }}>
            <img src={gallery[8]} alt={`${project.title} 9`} className="w-full h-full object-cover object-center" />
          </div>
          <div className="overflow-hidden" style={{ height: '55vh' }}>
            <img src={gallery[9]} alt={`${project.title} 10`} className="w-full h-full object-cover object-center" />
          </div>
        </section>
      )}

      {/* 09 DAY / NIGHT */}
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

      <ProjectMoreProjects current={project} all={projects} />
    </>
  );
};

export default InteriorLayout;
