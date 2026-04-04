import FadeIn from '@/components/base/FadeIn';
import { Project, projects } from '@/mocks/projects';
import ProjectHero from './ProjectHero';
import ProjectInfoBar from './ProjectInfoBar';
import ProjectMoreProjects from './ProjectMoreProjects';

interface Props { project: Project; }

const ResidentialLayout = ({ project }: Props) => {
  const gallery = project.galleryImages ?? [];

  return (
    <>
      <ProjectHero project={project} />
      <ProjectInfoBar project={project} />

      {/* ── SPREAD 1: Pull quote + portrait image ── */}
      <section className="grid grid-cols-1 md:grid-cols-[1fr_1px_1fr] min-h-[70vh]">
        {/* Left — oversized pull quote */}
        <FadeIn>
          <div className="flex flex-col justify-center px-10 md:px-16 lg:px-24 py-20 md:py-28">
            <span
              className="text-[80px] md:text-[120px] leading-none text-[#e8e7e6] select-none mb-6"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              &ldquo;
            </span>
            <blockquote
              className="text-[22px] md:text-[28px] lg:text-[32px] text-[#383838] leading-[1.5] tracking-[-0.5px]"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              {project.concept.split('.')[0]}.
            </blockquote>
            <div className="mt-10 w-10 h-px bg-[#d4d3d2]" />
            <p
              className="mt-4 text-[10px] tracking-[3px] text-[#aaa] uppercase"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              {project.typology} · {project.location}
            </p>
          </div>
        </FadeIn>

        {/* Divider */}
        <div className="hidden md:block bg-[#e8e7e6]" />

        {/* Right — tall portrait image, no padding */}
        <FadeIn delay={80}>
          <div className="w-full h-full min-h-[60vh] overflow-hidden">
            <img
              src={`https://readdy.ai/api/search-image?query=residential%20architecture%20exterior%20facade%20tropical%20light%20concrete%20timber%20warm%20afternoon%20Philippines%20editorial%20photography%20refined%20minimal%20neutral%20calm%20tones%20vertical%20composition&width=800&height=1100&seq=${project.id}-spread1&orientation=portrait`}
              alt={project.title}
              className="w-full h-full object-cover object-center"
              style={{ minHeight: '60vh' }}
            />
          </div>
        </FadeIn>
      </section>

      {/* ── SPREAD 2: Full-bleed image with caption overlay ── */}
      {gallery[0] && (
        <FadeIn>
          <section className="relative w-full overflow-hidden" style={{ height: '85vh' }}>
            <img
              src={gallery[0]}
              alt={`${project.title} exterior`}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            <div className="absolute bottom-10 right-10 md:right-16 text-right">
              <p
                className="text-white/60 text-[9px] tracking-[3px] uppercase"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                Exterior View
              </p>
            </div>
          </section>
        </FadeIn>
      )}

      {/* ── SPREAD 3: Concept body text — editorial column layout ── */}
      <section className="px-10 md:px-20 lg:px-32 py-20 md:py-28">
        <FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-12 md:gap-20 items-start">
            <div className="md:sticky md:top-32">
              <p
                className="text-[9px] tracking-[3.5px] text-[#aaa] mb-6 uppercase"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                Concept
              </p>
              <h2
                className="text-[32px] md:text-[42px] text-[#383838] leading-[1.2] tracking-[-1px]"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                {project.title}
              </h2>
            </div>
            <div>
              <p
                className="text-[15px] md:text-[16px] text-[#383838] leading-[2] tracking-[0.1px] mb-8"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                {project.concept}
              </p>
              {project.conceptExtended && (
                <p
                  className="text-[15px] md:text-[16px] text-[#797979] leading-[2] tracking-[0.1px]"
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  {project.conceptExtended}
                </p>
              )}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ── SPREAD 4: Asymmetric gallery — offset images ── */}
      {gallery.length >= 2 && (
        <section className="pb-24 md:pb-32">
          <FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-[3px]">
              <div className="overflow-hidden" style={{ aspectRatio: '4/3' }}>
                <img
                  src={gallery[1] ?? gallery[0]}
                  alt={`${project.title} detail`}
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="flex flex-col gap-[3px]">
                <div
                  className="overflow-hidden flex-1"
                  style={{ aspectRatio: '1/1' }}
                >
                  <img
                    src={`https://readdy.ai/api/search-image?query=residential%20architecture%20material%20detail%20concrete%20texture%20timber%20grain%20close-up%20warm%20light%20Philippines%20editorial%20photography%20refined%20minimal%20neutral&width=600&height=600&seq=${project.id}-mat1&orientation=squarish`}
                    alt="material detail"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div className="bg-[#f7f6f5] flex items-end p-8">
                  <p
                    className="text-[11px] tracking-[2px] text-[#aaa] leading-relaxed"
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    {project.location}<br />{project.year}
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </section>
      )}

      <ProjectMoreProjects current={project} all={projects} />
    </>
  );
};

export default ResidentialLayout;
