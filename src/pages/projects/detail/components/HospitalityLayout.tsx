import FadeIn from '@/components/base/FadeIn';
import { Project, projects } from '@/mocks/projects';
import ProjectHero from './ProjectHero';
import ProjectInfoBar from './ProjectInfoBar';
import ProjectMoreProjects from './ProjectMoreProjects';

interface Props { project: Project; }

const HospitalityLayout = ({ project }: Props) => {
  const gallery = project.galleryImages ?? [];

  return (
    <>
      <ProjectHero project={project} />
      <ProjectInfoBar project={project} />

      {/* ── SPREAD 1: Oversized concept text — magazine opener ── */}
      <section className="px-10 md:px-20 lg:px-28 py-20 md:py-28">
        <FadeIn>
          <p
            className="text-[26px] md:text-[36px] lg:text-[44px] text-[#383838] leading-[1.5] tracking-[-0.8px] max-w-5xl"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            {project.concept}
          </p>
        </FadeIn>
      </section>

      {/* ── SPREAD 2: Full-bleed image 1 ── */}
      {gallery[0] && (
        <FadeIn>
          <section className="w-full overflow-hidden" style={{ height: '90vh' }}>
            <img
              src={gallery[0]}
              alt={`${project.title} atmosphere`}
              className="w-full h-full object-cover object-center"
            />
          </section>
        </FadeIn>
      )}

      {/* ── SPREAD 3: Three-column text break ── */}
      <section className="px-10 md:px-20 lg:px-28 py-16 md:py-24 border-t border-[#e8e7e6]">
        <FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
            <div>
              <p
                className="text-[9px] tracking-[3px] text-[#aaa] mb-4 uppercase"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                Location
              </p>
              <p
                className="text-[14px] text-[#383838] leading-[1.9]"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                {project.location}
              </p>
            </div>
            <div>
              <p
                className="text-[9px] tracking-[3px] text-[#aaa] mb-4 uppercase"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                Programme
              </p>
              <p
                className="text-[14px] text-[#383838] leading-[1.9]"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                {project.typology} · {project.area}
              </p>
            </div>
            <div>
              <p
                className="text-[9px] tracking-[3px] text-[#aaa] mb-4 uppercase"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                Extended Concept
              </p>
              <p
                className="text-[14px] text-[#383838] leading-[1.9]"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                {project.conceptExtended}
              </p>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ── SPREAD 4: Portrait + landscape pair ── */}
      {gallery.length >= 2 && (
        <FadeIn>
          <section className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-[3px]">
            <div className="overflow-hidden" style={{ aspectRatio: '3/4' }}>
              <img
                src={gallery[1]}
                alt={`${project.title} detail`}
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="overflow-hidden" style={{ aspectRatio: '4/3' }}>
              <img
                src={gallery[2] ?? gallery[0]}
                alt={`${project.title} space`}
                className="w-full h-full object-cover object-center"
              />
            </div>
          </section>
        </FadeIn>
      )}

      {/* ── SPREAD 5: Dark closing band ── */}
      <section className="bg-[#1e1e1c] px-10 md:px-20 lg:px-28 py-16 md:py-20">
        <FadeIn>
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
            <p
              className="text-[18px] md:text-[22px] text-white/70 leading-[1.8] max-w-xl"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              &ldquo;{project.concept.split('.')[0]}.&rdquo;
            </p>
            <div className="text-right shrink-0">
              <p
                className="text-[9px] tracking-[3px] text-white/30 uppercase"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                {project.year} · {project.status}
              </p>
            </div>
          </div>
        </FadeIn>
      </section>

      <ProjectMoreProjects current={project} all={projects} />
    </>
  );
};

export default HospitalityLayout;
