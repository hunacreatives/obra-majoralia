import { Project, projects } from '@/mocks/projects';
import ProjectMoreProjects from './ProjectMoreProjects';
import { useNightMode } from '@/contexts/NightModeContext';

interface Props { project: Project; }

const HospitalityLayout = ({ project }: Props) => {
  const { isNight, setIsNight } = useNightMode();

  const t = isNight ? '#ffffff' : '#383838';
  const sub = isNight ? '#888888' : '#aaa';
  const divider = isNight ? '#2a2a2a' : '#e8e7e6';

  const gallery = project.galleryImages ?? [];

  const details = [
    { label: 'Programme',    value: project.typology },
    { label: 'Location',     value: project.location },
    { label: 'Total Area',   value: project.area ?? '—' },
    { label: 'Status',       value: project.status ?? '—' },
    { label: 'Year',         value: String(project.year) },
    { label: 'Materials',    value: 'Timber, River Stone, Rammed Earth' },
    { label: 'Landscape',    value: 'Native Planting, Terraced Grounds' },
  ];

  return (
    <>
      {/* 01 HERO — full bleed, title centered at bottom */}
      <section className="relative w-full" style={{ height: '90vh' }}>
        <img
          src={project.imageUrl}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-14 px-10 text-center">
          <p className="text-[10px] tracking-[4px] text-white/60 uppercase mb-4" style={{ fontFamily: 'var(--font-sans)' }}>
            {project.typology} · {project.location}
          </p>
          <h1
            className="text-[52px] md:text-[76px] text-white leading-none"
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

      {/* 03 WIDE CONCEPT OPENER — oversized serif text */}
      <section className="px-10 md:px-20 lg:px-28 py-20 md:py-28">
        <p className="text-[9px] tracking-[3px] uppercase mb-8 font-bold transition-colors duration-700" style={{ fontFamily: 'var(--font-sans)', color: t }}>
          Concept
        </p>
        <p
          className="text-[26px] md:text-[38px] lg:text-[46px] leading-[1.45] tracking-[-0.8px] max-w-5xl transition-colors duration-700"
          style={{ fontFamily: 'var(--font-serif)', color: t }}
        >
          {project.concept}
        </p>
      </section>

      {/* 04 FULL-BLEED IMAGE */}
      {gallery[0] && (
        <section className="w-full" style={{ height: '85vh' }}>
          <img src={gallery[0]} alt={`${project.title} atmosphere`} className="w-full h-full object-cover object-center" />
        </section>
      )}

      {/* 05 DETAILS HORIZONTAL STRIP + EXTENDED CONCEPT */}
      <section className="px-10 md:px-16 py-16 border-t border-b transition-colors duration-700" style={{ borderColor: divider }}>
        <p className="text-[9px] tracking-[3px] uppercase mb-8 font-bold transition-colors duration-700" style={{ fontFamily: 'var(--font-sans)', color: t }}>
          Project Details
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-6 mb-16">
          {details.map(({ label, value }) => (
            <div key={label} className="flex flex-col gap-1">
              <span className="text-[10px] tracking-[1.5px] uppercase font-semibold transition-colors duration-700" style={{ fontFamily: 'var(--font-sans)', color: t }}>
                {label}
              </span>
              <span className="text-[12px] font-medium transition-colors duration-700" style={{ fontFamily: 'var(--font-sans)', color: t }}>
                {value}
              </span>
            </div>
          ))}
        </div>
        {project.conceptExtended && (
          <div className="max-w-3xl border-t pt-10 transition-colors duration-700" style={{ borderColor: divider }}>
            <p className="text-[13px] md:text-[14px] leading-[1.9] text-justify transition-colors duration-700" style={{ fontFamily: 'var(--font-sans)', color: t }}>
              {project.conceptExtended}
            </p>
          </div>
        )}
      </section>

      {/* 06 ALTERNATING 3-IMAGE STRIP */}
      {gallery.length >= 4 && (
        <section className="grid grid-cols-[3fr_2fr_3fr] gap-[3px] mt-[3px]">
          {[gallery[1], gallery[2], gallery[3]].map((src, i) => (
            <div key={i} className="overflow-hidden" style={{ height: '60vh' }}>
              <img src={src} alt={`${project.title} ${i + 2}`} className="w-full h-full object-cover object-center" />
            </div>
          ))}
        </section>
      )}

      {/* 07 WIDE SINGLE IMAGE */}
      {gallery[4] && (
        <section className="w-full mt-[3px]" style={{ height: '70vh' }}>
          <img src={gallery[4]} alt={`${project.title} 5`} className="w-full h-full object-cover object-center" />
        </section>
      )}

      {/* 08 TWO-COL IMAGES */}
      {gallery.length >= 7 && (
        <section className="grid grid-cols-2 gap-[3px] mt-[3px]">
          {[gallery[5], gallery[6]].map((src, i) => (
            <div key={i} className="overflow-hidden" style={{ height: '55vh' }}>
              <img src={src} alt={`${project.title} ${i + 6}`} className="w-full h-full object-cover object-center" />
            </div>
          ))}
        </section>
      )}

      {/* 09 THREE-COL CLOSING STRIP */}
      {gallery.length >= 10 && (
        <section className="grid grid-cols-3 gap-[3px] mt-[3px]">
          {[gallery[7], gallery[8], gallery[9]].map((src, i) => (
            <div key={i} className="overflow-hidden" style={{ height: '45vh' }}>
              <img src={src} alt={`${project.title} ${i + 8}`} className="w-full h-full object-cover object-center" />
            </div>
          ))}
        </section>
      )}

      {/* 10 DAY / NIGHT */}
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
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 pointer-events-none" />
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

      {/* 11 DARK CLOSING BAND */}
      <section
        className="px-10 md:px-20 lg:px-28 py-16 md:py-20 transition-colors duration-700"
        style={{ backgroundColor: isNight ? '#111' : '#1e1e1c' }}
      >
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
          <p
            className="text-[18px] md:text-[24px] text-white/70 leading-[1.8] max-w-xl"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            &ldquo;{project.concept.split('.')[0]}.&rdquo;
          </p>
          <div className="text-right shrink-0">
            <p className="text-[9px] tracking-[3px] text-white/30 uppercase" style={{ fontFamily: 'var(--font-sans)' }}>
              {project.year} · {project.status}
            </p>
          </div>
        </div>
      </section>

      <ProjectMoreProjects current={project} all={projects} />
    </>
  );
};

export default HospitalityLayout;
