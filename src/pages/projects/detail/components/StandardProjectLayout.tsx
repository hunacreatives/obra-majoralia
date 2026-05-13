import { Project, projects } from '@/mocks/projects';
import ProjectMoreProjects from './ProjectMoreProjects';
import { useNightMode } from '@/contexts/useNightMode';

interface Props {
  project: Project;
}

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

const splitConcept = (concept: string) => {
  const parts = concept.split('.').map(part => part.trim()).filter(Boolean);
  const lead = parts[0] ? `${parts[0]}.` : concept;
  const rest = parts.slice(1).join('. ').trim();
  return { lead, rest };
};

const StandardProjectLayout = ({ project }: Props) => {
  const { isNight, setIsNight } = useNightMode();
  const hasNightMode = Boolean(project.nightImageUrl);
  const gallery = (project.galleryImages ?? []).filter(Boolean);
  const heroDay = project.imageUrl;
  const heroNight = project.nightImageUrl ?? project.imageUrl;
  const { lead, rest } = splitConcept(project.concept);

  const t = isNight ? '#ffffff' : '#383838';
  const sub = isNight ? '#aaaaaa' : '#aaa';
  const rule = isNight ? '#333' : '#e4e3e2';

  const infoItems = [
    { label: 'LOCATION', value: project.location },
    { label: 'AREA', value: project.area ?? '—' },
    { label: 'TYPE', value: project.typology },
    { label: 'STATUS', value: project.status ?? '—' },
    { label: project.status === 'Completed' ? 'YEAR COMPLETED' : 'YEAR', value: String(project.year) },
  ];

  return (
    <>
      {hasNightMode && <DayNightToggle isNight={isNight} onToggle={() => setIsNight(!isNight)} />}

      <section className="relative w-full" data-theme="dark" style={{ height: '100vh' }}>
        <img
          src={heroDay}
          alt={`${project.title} day view`}
          className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700"
          style={{ opacity: hasNightMode && isNight ? 0 : 1 }}
        />
        {hasNightMode && (
          <img
            src={heroNight}
            alt={`${project.title} night view`}
            className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700"
            style={{ opacity: isNight ? 1 : 0 }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-6 md:px-16 pb-8">
          <h1
            className="text-[40px] md:text-[64px] lg:text-[80px] text-white leading-none"
            style={{ fontFamily: 'var(--font-sans)', fontWeight: 700 }}
          >
            {project.title}
          </h1>
        </div>
      </section>

      <section className="py-6 md:py-8" style={{ borderBottom: `1px solid ${rule}` }}>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-y-6">
          {infoItems.map(({ label, value }) => (
            <div key={label} className="flex flex-col items-center justify-center text-center px-4">
              <span className="text-[11px] tracking-[2px] mb-2 uppercase" style={{ fontFamily: 'var(--font-sans)', color: sub }}>
                {label}
              </span>
              <span className="text-[13px] md:text-[14px] font-semibold tracking-[1px] uppercase transition-colors duration-700" style={{ fontFamily: 'var(--font-sans)', color: t }}>
                {value}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-[2fr_3fr]">
        <div className="flex flex-col gap-8 px-6 md:px-16 py-14 lg:py-20">
          <h2 className="text-[22px] md:text-[26px] font-bold leading-tight transition-colors duration-700" style={{ fontFamily: 'var(--font-sans)', color: t }}>
            Concept
          </h2>
          <p className="text-[24px] md:text-[32px] italic leading-[1.3] tracking-[-0.5px] transition-colors duration-700" style={{ fontFamily: 'var(--font-sans)', color: t }}>
            {lead}
          </p>
        </div>
        <div className="flex flex-col justify-center gap-6 px-6 md:px-16 py-14 lg:py-20 lg:border-l transition-colors duration-700" style={{ borderColor: rule }}>
          <p className="text-[15px] md:text-[17px] leading-[1.9] text-justify transition-colors duration-700" style={{ fontFamily: 'var(--font-sans)', color: t }}>
            {project.concept}
          </p>
          {project.conceptExtended && (
            <p className="text-[15px] md:text-[17px] leading-[1.9] text-justify transition-colors duration-700" style={{ fontFamily: 'var(--font-sans)', color: t }}>
              {project.conceptExtended}
            </p>
          )}
        </div>
      </section>

      {gallery[0] && (
        <section className="grid grid-cols-1 lg:grid-cols-[2fr_3fr]">
          <div className="flex flex-col gap-6 px-6 md:px-16 py-14 lg:py-20">
            <h2 className="text-[22px] md:text-[26px] font-bold leading-tight transition-colors duration-700" style={{ fontFamily: 'var(--font-sans)', color: t }}>
              Design Perspective
            </h2>
            <p className="text-[15px] md:text-[17px] leading-[1.9] text-justify transition-colors duration-700" style={{ fontFamily: 'var(--font-sans)', color: t }}>
              {project.conceptExtended ?? (rest || project.concept)}
            </p>
          </div>
          <div className="relative overflow-hidden min-h-[50vh] lg:min-h-[60vh]">
            <img src={gallery[0]} alt={`${project.title} perspective`} className="absolute inset-0 w-full h-full object-cover object-center" />
          </div>
        </section>
      )}

      {(gallery[1] || gallery[2] || gallery[3]) && (
        <section className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-3 px-6 md:px-16 mt-3 auto-rows-[35vh] lg:auto-rows-auto">
          <div className="flex flex-col gap-3 h-full">
            {gallery[1] && (
              <div className="overflow-hidden h-[35vh] lg:h-[38vh]">
                <img src={gallery[1]} alt={`${project.title} gallery one`} className="w-full h-full object-cover object-center" />
              </div>
            )}
            {gallery[2] && (
              <div className="overflow-hidden h-[35vh] lg:h-[52vh]">
                <img src={gallery[2]} alt={`${project.title} gallery two`} className="w-full h-full object-cover object-center" />
              </div>
            )}
          </div>
          {gallery[3] && (
            <div className="overflow-hidden h-[42vh] lg:h-full">
              <img src={gallery[3]} alt={`${project.title} gallery three`} className="w-full h-full object-cover object-center" />
            </div>
          )}
        </section>
      )}

      <section className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-0 px-6 md:px-16 py-12 mt-3">
        <div>
          <h2 className="text-[22px] md:text-[26px] font-bold leading-[1.2] transition-colors duration-700" style={{ fontFamily: 'var(--font-sans)', color: t }}>
            Material Presence
          </h2>
        </div>
        <div>
          <p className="text-[15px] md:text-[17px] leading-[1.85] text-justify transition-colors duration-700" style={{ fontFamily: 'var(--font-sans)', color: t }}>
            {project.conceptExtended ?? project.concept}
          </p>
        </div>
      </section>

      {(gallery[4] || gallery[5]) && (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-3 px-6 md:px-16 my-3" style={{ minHeight: '45vh' }}>
          {gallery[4] && (
            <div className="relative overflow-hidden h-[40vh] md:h-full">
              <img src={gallery[4]} alt={`${project.title} gallery four`} className="absolute inset-0 w-full h-full object-cover object-center" />
            </div>
          )}
          {gallery[5] && (
            <div className="relative overflow-hidden h-[40vh] md:h-full">
              <img src={gallery[5]} alt={`${project.title} gallery five`} className="absolute inset-0 w-full h-full object-cover object-center" />
            </div>
          )}
        </section>
      )}

      <div className="px-6 md:px-16 mt-16 mb-8">
        <h2 className="text-[22px] md:text-[28px] font-bold leading-[1.2] transition-colors duration-700" style={{ fontFamily: 'var(--font-sans)', color: t }}>
          Interior Perspectives
        </h2>
      </div>
      <section className="px-6 md:px-16 mb-10">
        <p className="text-[15px] md:text-[17px] leading-[1.9] max-w-3xl text-justify transition-colors duration-700" style={{ fontFamily: 'var(--font-sans)', color: t }}>
          {rest || project.conceptExtended || project.concept}
        </p>
      </section>

      {gallery[6] && (
        <section className="px-6 md:px-16" style={{ height: '90vh' }}>
          <div className="relative overflow-hidden h-full">
            <img src={gallery[6]} alt={`${project.title} interior feature`} className="absolute inset-0 w-full h-full object-cover object-center" />
          </div>
        </section>
      )}

      {gallery[7] && (
        <div className="relative mt-3 mb-24 mx-6 md:mx-16 overflow-hidden">
          <img src={gallery[7]} alt={`${project.title} interior composition`} className="w-full h-auto max-h-[85vh] object-cover object-center" />
        </div>
      )}

      <section className="px-6 md:px-16 py-16 md:py-20">
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

      <ProjectMoreProjects current={project} all={projects} />
    </>
  );
};

export default StandardProjectLayout;
