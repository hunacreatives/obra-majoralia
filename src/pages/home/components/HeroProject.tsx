import { Link } from 'react-router-dom';
import { Project } from '@/mocks/projects';

interface HeroProjectProps {
  project: Project;
}

const HeroProject = ({ project }: HeroProjectProps) => (
  <Link
    to={`/projects/${project.id}`}
    className="relative block w-full h-screen overflow-hidden cursor-pointer"
    data-theme="dark"
  >
    {/* Full-bleed image */}
    <img
      src={project.imageUrl}
      alt={project.title}
      className="w-full h-full object-cover object-top transition-transform duration-[1.2s] ease-[cubic-bezier(0.4,0,0.2,1)] hover:scale-[1.02]"
      style={{ animation: 'heroFadeIn 1.6s cubic-bezier(0.4,0,0.2,1) forwards' }}
    />

    {/* Subtle dark vignette — bottom only */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent pointer-events-none" />

    {/* Bottom info bar */}
    <div className="absolute bottom-0 left-0 right-0">
      {/* Content with padding */}
      <div className="px-10 md:px-14 pb-10 md:pb-14">
        {/* Project name */}
        <h1
          className="text-white text-3xl md:text-5xl lg:text-6xl leading-tight tracking-[-1px] mb-4"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          {project.title}
        </h1>

        {/* Full-width divider */}
        <div className="w-full h-px bg-white/40 mb-4" />

        {/* Bottom row: Address left, Typology right */}
        <div className="flex items-center justify-between">
          <p
            className="text-white text-[13px] tracking-[2.6px] font-semibold"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            {project.location.toUpperCase()}
          </p>
          <p
            className="text-white text-[13px] tracking-[3px] font-semibold"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            {project.typology.toUpperCase()}
          </p>
        </div>
      </div>
    </div>
  </Link>
);

export default HeroProject;
