import { Project } from '@/mocks/projects';

interface ProjectHeroProps {
  project: Project;
}

const ProjectHero = ({ project }: ProjectHeroProps) => (
  <section
    className="relative w-full overflow-hidden"
    style={{ height: '92vh' }}
    data-theme="dark"
  >
    <img
      src={project.imageUrl}
      alt={project.title}
      className="w-full h-full object-cover object-center"
      style={{
        animation: 'heroScale 2s cubic-bezier(0.4,0,0.2,1) forwards',
        transformOrigin: 'center center',
      }}
    />
    {/* Deep gradient — bottom heavy */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

    {/* Typology tag — top left */}
    <div className="absolute top-28 left-10">
      <span
        className="text-[9px] tracking-[4px] text-white/50 uppercase"
        style={{ fontFamily: 'var(--font-sans)' }}
      >
        {project.typology}
      </span>
    </div>

    {/* Title — bottom left, very large */}
    <div className="absolute bottom-10 md:bottom-16 left-6 md:left-10 right-6 md:right-10">
      <h1
        className="text-5xl md:text-7xl lg:text-8xl text-white leading-[0.95] tracking-[-2px]"
        style={{ fontFamily: 'var(--font-serif)' }}
      >
        {project.title}
      </h1>
    </div>
  </section>
);

export default ProjectHero;
