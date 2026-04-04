import FadeIn from '@/components/base/FadeIn';
import { Project, projects } from '@/mocks/projects';
import ProjectHero from './ProjectHero';
import ProjectInfoBar from './ProjectInfoBar';
import ProjectMoreProjects from './ProjectMoreProjects';

interface Props { project: Project; }

const MonumentalLayout = ({ project }: Props) => {
  const gallery = project.galleryImages ?? [];
  const annotations = project.annotations ?? [];

  return (
    <>
      <ProjectHero project={project} />
      <ProjectInfoBar project={project} />

      {/* ── SPREAD 1: Concept — stark, wide, typographic ── */}
      <section className="px-10 md:px-20 lg:px-32 py-24 md:py-32">
        <FadeIn>
          <div className="max-w-3xl">
            <p
              className="text-[9px] tracking-[4px] text-[#aaa] mb-10 uppercase"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Concept
            </p>
            <p
              className="text-[20px] md:text-[26px] text-[#383838] leading-[1.8] tracking-[-0.3px]"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              {project.concept}
            </p>
          </div>
        </FadeIn>
      </section>

      {/* ── SPREAD 2: Annotated aerial diagram — full bleed ── */}
      <FadeIn>
        <section className="relative w-full overflow-hidden" style={{ height: '80vh' }}>
          <img
            src={`https://readdy.ai/api/search-image?query=architectural%20aerial%20view%20monumental%20structure%20tropical%20garden%20landscaped%20grounds%20overhead%20perspective%20Philippines%20editorial%20photography%20neutral%20light%20tones%20minimal%20site%20plan&width=1600&height=900&seq=${project.id}-aerial&orientation=landscape`}
            alt={`${project.title} aerial`}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/10" />

          {/* Annotation callouts */}
          {annotations.map((ann, i) => (
            <div
              key={i}
              className="absolute flex items-center gap-3"
              style={{ left: ann.x, top: ann.y, transform: 'translate(-50%, -50%)' }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-white shrink-0" />
              <div className="w-16 md:w-24 h-px bg-white/60" />
              <div>
                <p
                  className="text-white text-[10px] md:text-[11px] font-semibold leading-tight whitespace-nowrap"
                  style={{ fontFamily: 'var(--font-sans)', textShadow: '0 1px 6px rgba(0,0,0,0.5)' }}
                >
                  {ann.label}
                </p>
                {ann.sublabel && (
                  <p
                    className="text-white/70 text-[9px] font-light whitespace-nowrap"
                    style={{ fontFamily: 'var(--font-sans)', textShadow: '0 1px 6px rgba(0,0,0,0.5)' }}
                  >
                    {ann.sublabel}
                  </p>
                )}
              </div>
            </div>
          ))}
        </section>
      </FadeIn>

      {/* ── SPREAD 3: Two-column extended concept ── */}
      {project.conceptExtended && (
        <section className="px-10 md:px-20 lg:px-32 py-20 md:py-28 border-t border-[#e8e7e6]">
          <FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
              <div className="flex flex-col justify-between gap-10">
                <div className="w-8 h-px bg-[#383838]" />
                <div>
                  <p
                    className="text-[9px] tracking-[3px] text-[#aaa] mb-3 uppercase"
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    {project.location}
                  </p>
                  <p
                    className="text-[9px] tracking-[3px] text-[#aaa] uppercase"
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    {project.area} · {project.status}
                  </p>
                </div>
              </div>
              <p
                className="text-[15px] md:text-[16px] text-[#383838] leading-[2.1] tracking-[0.1px]"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                {project.conceptExtended}
              </p>
            </div>
          </FadeIn>
        </section>
      )}

      {/* ── SPREAD 4: Gallery — cinematic wide + portrait ── */}
      <section className="pb-24 md:pb-32">
        {gallery[0] && (
          <FadeIn>
            <div className="w-full overflow-hidden mb-[3px]" style={{ height: '70vh' }}>
              <img
                src={gallery[0]}
                alt={`${project.title} 1`}
                className="w-full h-full object-cover object-center"
              />
            </div>
          </FadeIn>
        )}
        {gallery[1] && (
          <FadeIn delay={60}>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-[3px]">
              <div className="bg-[#f7f6f5] flex flex-col justify-end p-10 md:p-14">
                <p
                  className="text-[9px] tracking-[3px] text-[#aaa] mb-4 uppercase"
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  {project.typology}
                </p>
                <p
                  className="text-[22px] md:text-[28px] text-[#383838] leading-[1.4] tracking-[-0.5px]"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  {project.title}
                </p>
              </div>
              <div className="overflow-hidden" style={{ aspectRatio: '4/3' }}>
                <img
                  src={gallery[1]}
                  alt={`${project.title} 2`}
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
          </FadeIn>
        )}
      </section>

      <ProjectMoreProjects current={project} all={projects} />
    </>
  );
};

export default MonumentalLayout;
