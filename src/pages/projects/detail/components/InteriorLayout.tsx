import FadeIn from '@/components/base/FadeIn';
import { Project, projects } from '@/mocks/projects';
import ProjectHero from './ProjectHero';
import ProjectInfoBar from './ProjectInfoBar';
import ProjectMoreProjects from './ProjectMoreProjects';

interface Props { project: Project; }

const InteriorLayout = ({ project }: Props) => {
  const gallery = project.galleryImages ?? [];

  return (
    <>
      <ProjectHero project={project} />
      <ProjectInfoBar project={project} />

      {/* ── SPREAD 1: Dark intro band — typeset title + concept ── */}
      <section className="bg-[#1e1e1c] px-10 md:px-20 lg:px-32 py-20 md:py-28">
        <FadeIn>
          <div className="max-w-4xl">
            <p
              className="text-[9px] tracking-[4px] text-white/30 mb-8 uppercase"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Interior · {project.location}
            </p>
            <p
              className="text-[18px] md:text-[22px] text-white/80 leading-[1.9] tracking-[0.1px]"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              {project.concept}
            </p>
          </div>
        </FadeIn>
      </section>

      {/* ── SPREAD 2: Two portrait images edge to edge ── */}
      {gallery.length >= 2 && (
        <FadeIn>
          <section className="grid grid-cols-2 gap-[3px]">
            {gallery.slice(0, 2).map((src, i) => (
              <div key={i} className="overflow-hidden" style={{ aspectRatio: '3/4' }}>
                <img
                  src={src}
                  alt={`${project.title} ${i + 1}`}
                  className="w-full h-full object-cover object-center"
                />
              </div>
            ))}
          </section>
        </FadeIn>
      )}

      {/* ── SPREAD 3: Extended concept — right-column text with large number ── */}
      <section className="px-10 md:px-20 lg:px-32 py-20 md:py-28">
        <FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 md:gap-20 items-start">
            {/* Left — large year as graphic element */}
            <div className="flex flex-col gap-4">
              <span
                className="text-[80px] md:text-[100px] leading-none text-[#e8e7e6] font-light select-none"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                {project.year}
              </span>
              <div className="flex flex-col gap-1">
                <p
                  className="text-[9px] tracking-[2.5px] text-[#aaa] uppercase"
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  {project.area}
                </p>
                <p
                  className="text-[9px] tracking-[2.5px] text-[#aaa] uppercase"
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  {project.status}
                </p>
              </div>
            </div>

            {/* Right — extended concept */}
            <div>
              {project.conceptExtended && (
                <p
                  className="text-[15px] md:text-[16px] text-[#383838] leading-[2.1] tracking-[0.1px]"
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  {project.conceptExtended}
                </p>
              )}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ── SPREAD 4: Full-bleed third image ── */}
      {gallery[2] && (
        <FadeIn>
          <section className="w-full overflow-hidden" style={{ height: '80vh' }}>
            <img
              src={gallery[2]}
              alt={`${project.title} full spread`}
              className="w-full h-full object-cover object-center"
            />
          </section>
        </FadeIn>
      )}

      {/* ── SPREAD 5: Material close-up + caption ── */}
      <section className="grid grid-cols-1 md:grid-cols-[3fr_2fr] min-h-[50vh]">
        <FadeIn>
          <div className="overflow-hidden" style={{ aspectRatio: '4/3' }}>
            <img
              src={`https://readdy.ai/api/search-image?query=luxury%20interior%20material%20detail%20marble%20surface%20texture%20warm%20light%20close-up%20refined%20craftsmanship%20Philippines%20editorial%20photography%20minimal%20neutral%20warm%20tones&width=900&height=675&seq=${project.id}-mat&orientation=landscape`}
              alt="material detail"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </FadeIn>
        <FadeIn delay={80}>
          <div className="bg-[#f7f6f5] flex flex-col justify-end p-10 md:p-14">
            <p
              className="text-[9px] tracking-[3px] text-[#aaa] mb-4 uppercase"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Materials
            </p>
            <p
              className="text-[14px] text-[#383838] leading-[2] tracking-[0.1px]"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Marble, timber, and brushed metal — each surface chosen for its tactile quality and relationship to light.
            </p>
          </div>
        </FadeIn>
      </section>

      <ProjectMoreProjects current={project} all={projects} />
    </>
  );
};

export default InteriorLayout;
