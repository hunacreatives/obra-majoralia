import { Link } from 'react-router-dom';
import { Project } from '@/mocks/projects';

interface GridTileProps {
  project: Project;
  fullWidth?: boolean;
}

const GridTile = ({ project, fullWidth = false }: GridTileProps) => (
  <Link
    to={`/projects/${project.id}`}
    className="group relative block cursor-pointer overflow-hidden"
    style={{ aspectRatio: fullWidth ? '21/9' : '4/3' }}
  >
    {/* Image */}
    <img
      src={project.imageUrl}
      alt={project.title}
      className="w-full h-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-[1.04]"
      loading="lazy"
    />

    {/* Hover overlay */}
    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

    {/* Text — revealed on hover */}
    <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)]">
      <h3
        className="text-white text-[14px] font-medium tracking-[0.6px] leading-snug mb-1"
        style={{ fontFamily: 'var(--font-sans)' }}
      >
        {project.title}
      </h3>
      <div className="flex items-center gap-2">
        <p
          className="text-white/75 text-[10px] tracking-[1.4px]"
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          {project.location}
        </p>
        <span className="text-white/40 text-[9px]">·</span>
        <p
          className="text-white/75 text-[10px] tracking-[2px] uppercase"
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          {project.typology}
        </p>
      </div>
    </div>
  </Link>
);

export default GridTile;
