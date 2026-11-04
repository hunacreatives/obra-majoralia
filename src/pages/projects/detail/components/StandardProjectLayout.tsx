import { Link } from 'react-router-dom';
import { Project, projects } from '@/mocks/projects';
import ProjectMoreProjects from './ProjectMoreProjects';
import ProjectPlates from './ProjectPlates';
import { useNightMode } from '@/contexts/useNightMode';
import OptimizedImg from '@/components/base/OptimizedImg';
import DayNightToggle from './DayNightToggle';

interface Props {
  project: Project;
}

// First sentence becomes the pull-quote; the rest keeps its own punctuation.
const splitConcept = (concept: string) => {
  const match = concept.match(/^.*?[.!?](?=\s|$)/);
  const lead = match ? match[0].trim() : concept;
  const rest = concept.slice(lead.length).trim();
  return { lead, rest };
};

const StandardProjectLayout = ({ project }: Props) => {
  const { isNight, setIsNight } = useNightMode();
  const hasNightMode = Boolean(project.nightImageUrl);
  const gallery = (project.galleryImages ?? []).filter(Boolean);
  const heroDay = project.imageUrl;
  const heroNight = project.nightImageUrl ?? project.imageUrl;
  const { lead, rest } = splitConcept(project.concept);
  // Each paragraph appears once: the lead is the pull-quote, the rest of the
  // concept (or the extended text if there is no rest) sits beside it, and the
  // extended text only gets its own section when it hasn't been used yet.
  const conceptBody = rest || project.conceptExtended;
  const perspectiveText = rest ? project.conceptExtended : undefined;

  const t = isNight ? '#ffffff' : '#383838';
  const sub = isNight ? '#797979' : '#797979';
  const rule = isNight ? '#383838' : '#e4e3e2';

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

      <section className="relative w-full h-[100svh] md:h-screen" data-theme="dark">
        <OptimizedImg
          src={heroDay}
          alt={`${project.title} day view`}
          width={1920}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700"
          style={{ opacity: hasNightMode && isNight ? 0 : 1 }}
        />
        {hasNightMode && (
          <OptimizedImg
            src={heroNight}
            alt={`${project.title} night view`}
            width={1920}
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700"
            style={{ opacity: isNight ? 1 : 0 }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#383838]/55 via-[#383838]/10 to-transparent" />
        {/* phones: keep the title clear of the fixed day/night switch */}
        <div className={`absolute bottom-0 left-0 right-0 px-6 md:px-16 pb-8 ${hasNightMode ? 'pr-28 md:pr-16' : ''}`}>
          <h1
            className="font-bold text-display text-white text-balance"
          >
            {project.title}
          </h1>
        </div>
      </section>

      {/* Facts: label / value rows on phones, five centred columns from md */}
      <section className="px-6 md:px-0 py-1 md:py-8" style={{ borderBottom: `1px solid ${rule}` }}>
        <div className="flex flex-col md:grid md:grid-cols-5">
          {infoItems.map(({ label, value }, i) => (
            <div
              key={label}
              className={`flex items-baseline justify-between gap-6 py-3 md:py-0 md:flex-col md:items-center md:justify-start md:gap-0 md:text-center md:px-4 ${i < infoItems.length - 1 ? 'border-b md:border-b-0' : ''}`}
              style={{ borderColor: rule }}
            >
              <span className="shrink-0 text-[11px] tracking-[2px] md:mb-2 uppercase" style={{ color: sub }}>
                {label}
              </span>
              <span className="text-right md:text-center text-[13px] md:text-[14px] font-semibold tracking-[1px] uppercase transition-colors duration-700" style={{ color: t }}>
                {value}
              </span>
            </div>
          ))}
        </div>
      </section>

      {project.recognition && (
        <Link
          to="/news"
          className="group flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8 px-6 md:px-16 py-5 md:py-6"
          style={{ borderBottom: `1px solid ${rule}` }}
        >
          <span className="text-[11px] tracking-[2px] uppercase shrink-0" style={{ color: sub }}>
            Recognition
          </span>
          <span className="flex flex-col gap-1">
            {project.recognition.map(r => (
              <span
                key={r}
                className="font-bold text-[16px] md:text-[18px] leading-snug tracking-[-0.01em] group-hover:opacity-70 transition-opacity duration-300"
                style={{ color: t }}
              >
                {r}
              </span>
            ))}
          </span>
        </Link>
      )}

      <section className="grid grid-cols-1 lg:grid-cols-[2fr_3fr]">
        <div className="flex flex-col gap-5 md:gap-8 px-6 md:px-16 pt-12 pb-6 md:pt-14 md:pb-8 lg:py-20">
          <h2 className="font-bold text-subhead transition-colors duration-700" style={{ color: t }}>
            Concept
          </h2>
          <p className="font-bold text-quote text-pretty transition-colors duration-700" style={{ color: t }}>
            {lead}
          </p>
        </div>
        {conceptBody && (
          <div className="flex flex-col justify-center gap-6 px-6 md:px-16 pb-12 md:pb-14 lg:py-20 lg:border-l transition-colors duration-700" style={{ borderColor: rule }}>
            <p className="text-[14px] leading-[1.55] md:text-[15px] md:leading-[1.6] text-pretty transition-colors duration-700" style={{ color: t }}>
              {conceptBody}
            </p>
          </div>
        )}
      </section>

      {gallery[0] && perspectiveText && (
        <section className="grid grid-cols-1 lg:grid-cols-[2fr_3fr]">
          <div className="flex flex-col gap-5 md:gap-6 px-6 md:px-16 pt-2 pb-12 md:pt-4 md:pb-14 lg:py-20">
            <h2 className="font-bold text-subhead transition-colors duration-700" style={{ color: t }}>
              Design Perspective
            </h2>
            <p className="text-[14px] leading-[1.55] md:text-[15px] md:leading-[1.6] text-pretty transition-colors duration-700" style={{ color: t }}>
              {perspectiveText}
            </p>
          </div>
          <div className="relative overflow-hidden aspect-[4/3] lg:aspect-auto lg:min-h-[60vh]">
            <OptimizedImg src={gallery[0]} alt={`${project.title} perspective`} width={1200} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover object-center" />
          </div>
        </section>
      )}
      {gallery[0] && !perspectiveText && (
        <section className="px-6 md:px-16 md:h-[80vh]">
          <div className="relative overflow-hidden aspect-[4/3] md:aspect-auto md:h-full">
            <OptimizedImg src={gallery[0]} alt={`${project.title} perspective`} width={1600} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover object-center" />
          </div>
        </section>
      )}

      <ProjectPlates
        images={gallery.slice(1).filter(src => src !== project.imageUrl)}
        title={project.title}
        start={gallery[0] ? 2 : 1}
        captionColor={sub}
      />

      <ProjectMoreProjects current={project} all={projects} />
    </>
  );
};

export default StandardProjectLayout;
