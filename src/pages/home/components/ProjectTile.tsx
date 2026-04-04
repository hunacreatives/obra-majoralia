import { Link } from 'react-router-dom';
import { Project } from '@/mocks/projects';

interface ProjectTileProps {
  project: Project;
  className?: string;
  style?: React.CSSProperties;
}

const ProjectTile = ({ project, className = '', style }: ProjectTileProps) => (
  <Link
    to={`/projects/${project.id}`}
    className={`group relative overflow-hidden block cursor-pointer ${className}`}
    style={style}
    data-theme="dark"
  >
    {/* Image */}
    <img
      src={project.imageUrl}
      alt={project.title}
      className="w-full h-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-[1.03]"
      loading="lazy"
    />

    {/* Gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent transition-opacity duration-300 group-hover:opacity-90" />

    {/* Text — bottom left */}
    <div className="absolute bottom-0 left-0 p-7 md:p-9">
      <div className="transition-all duration-300 group-hover:translate-y-[-4px]">
        <h2
          className="text-white text-base font-semibold tracking-[1px] leading-snug mb-2 transition-all duration-300 group-hover:tracking-[1.6px]"
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          {project.title}
        </h2>
        <p
          className="text-white/80 text-[11px] tracking-[1.8px] mb-1 transition-opacity duration-300 group-hover:text-white"
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          {project.location}
        </p>
        <p
          className="text-white/55 text-[10px] tracking-[2px] uppercase transition-opacity duration-300 group-hover:text-white/80"
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          {project.typology} &nbsp;&middot;&nbsp; {project.year}
        </p>
      </div>
    </div>
  </Link>
);

export default ProjectTile;
