import { useRef } from 'react';
import { Project, projects } from '@/mocks/projects';
import ProjectMoreProjects from './ProjectMoreProjects';
import { useNightMode } from '@/contexts/NightModeContext';

interface Props { project: Project; }

const ResidentialLayout = ({ project }: Props) => {
  const { isNight, setIsNight } = useNightMode();
  const detailsSection = useRef<HTMLElement>(null);

  const t = isNight ? '#ffffff' : '#383838';
  const sub = isNight ? '#888888' : '#aaa';
  const divider = isNight ? '#2a2a2a' : '#e8e7e6';

  const gallery = project.galleryImages ?? [];

  const details = [
    { label: 'Project Type',     value: project.typology },
    { label: 'Location',         value: project.location },
    { label: 'Floor Area',       value: project.area ?? '—' },
    { label: 'Status',           value: project.status ?? '—' },
    { label: 'Year',             value: String(project.year) },
    { label: 'Structure',        value: 'Reinforced Concrete' },
    { label: 'Facade',           value: 'Concrete, Timber Cladding' },
    { label: 'Landscape',        value: 'Tropical Garden' },
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-10 pb-10">
          <p className="text-[11px] tracking-[3px] text-white/60 uppercase mb-3" style={{ fontFamily: 'var(--font-sans)' }}>
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

      {/* 03 FULL-BLEED SECOND IMAGE */}
      {gallery[0] && (
        <section className="w-full" style={{ height: '80vh' }}>
          <img src={gallery[0]} alt={`${project.title} exterior`} className="w-full h-full object-cover object-center" />
        </section>
      )}

      {/* 04 CONCEPT — two col: large pull quote left, body right */}
      <section className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-0 px-10 md:px-16 py-20">
        <div className="flex flex-col justify-start pr-0 lg:pr-16 mb-10 lg:mb-0">
          <p className="text-[9px] tracking-[3px] uppercase mb-6 font-bold transition-colors duration-700" style={{ fontFamily: 'var(--font-sans)', color: t }}>
            Concept
          </p>
          <p
            className="text-[28px] md:text-[36px] leading-[1.35] tracking-[-0.5px] transition-colors duration-700"
            style={{ fontFamily: 'var(--font-serif)', color: t }}
          >
            {project.concept.split('.')[0]}.
          </p>
        </div>
        <div className="flex flex-col justify-end gap-5 border-l pl-0 lg:pl-16 transition-colors duration-700" style={{ borderColor: divider }}>
          <p className="text-[13px] md:text-[14px] leading-[1.9] text-justify transition-colors duration-700" style={{ fontFamily: 'var(--font-sans)', color: t }}>
            {project.concept}
          </p>
          {project.conceptExtended && (
            <p className="text-[13px] md:text-[14px] leading-[1.9] text-justify transition-colors duration-700" style={{ fontFamily: 'var(--font-sans)', color: sub }}>
              {project.conceptExtended}
            </p>
          )}
        </div>
      </section>

      {/* 05 THREE-IMAGE ROW */}
      {gallery.length >= 4 && (
        <section className="grid grid-cols-3 gap-[3px] px-10 md:px-16 mb-3">
          {[gallery[1], gallery[2], gallery[3]].map((src, i) => (
            <div key={i} className="overflow-hidden" style={{ height: '45vh' }}>
              <img src={src} alt={`${project.title} view ${i + 2}`} className="w-full h-full object-cover object-center" />
            </div>
          ))}
        </section>
      )}

      {/* 06 DETAILS + GALLERY — sticky details left, tall images right */}
      <section ref={detailsSection} className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-0 mt-8" style={{ position: 'relative' }}>
        {/* Sticky details */}
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

        {/* Right — stacked images 4–7 */}
        <div className="flex flex-col gap-[3px]">
          {[gallery[4], gallery[5], gallery[6], gallery[7]].filter(Boolean).map((src, i) => (
            <div key={i} className="overflow-hidden" style={{ height: '58vh' }}>
              <img src={src} alt={`${project.title} ${i + 5}`} className="w-full h-full object-cover object-center" />
            </div>
          ))}
        </div>
      </section>

      {/* 07 TWO-COL CLOSING PAIR */}
      {gallery.length >= 10 && (
        <section className="grid grid-cols-[2fr_3fr] gap-[3px] px-10 md:px-16 mt-3 mb-3">
          <div className="overflow-hidden" style={{ height: '55vh' }}>
            <img src={gallery[8]} alt={`${project.title} 9`} className="w-full h-full object-cover object-center" />
          </div>
          <div className="overflow-hidden" style={{ height: '55vh' }}>
            <img src={gallery[9]} alt={`${project.title} 10`} className="w-full h-full object-cover object-center" />
          </div>
        </section>
      )}

      {/* 08 CLOSING BAND */}
      <section
        className="px-10 md:px-16 py-20 mt-2 transition-colors duration-700"
        style={{ backgroundColor: isNight ? '#141414' : '#f7f6f5' }}
      >
        <div className="max-w-3xl">
          <p className="text-[9px] tracking-[3px] uppercase mb-6 transition-colors duration-700" style={{ fontFamily: 'var(--font-sans)', color: sub }}>
            {project.typology} · {project.year}
          </p>
          <p
            className="text-[20px] md:text-[26px] leading-[1.7] tracking-[-0.3px] transition-colors duration-700"
            style={{ fontFamily: 'var(--font-serif)', color: t }}
          >
            &ldquo;{project.concept.split('.')[0]}.&rdquo;
          </p>
        </div>
      </section>

      {/* 09 DAY / NIGHT */}
      {project.nightImageUrl && (
        <section className="relative w-full overflow-hidden mt-0" style={{ height: '85vh', marginBottom: '-1px' }}>
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

export default ResidentialLayout;
