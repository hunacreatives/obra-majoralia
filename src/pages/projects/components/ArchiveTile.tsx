import { Link } from 'react-router-dom';
import { Project } from '@/mocks/projects';

interface Props {
  project: Project;
  index: number;
  total: number;
}

const ArchiveTile = ({ project, index, total }: Props) => {
  return (
    <Link
      to={`/projects/${project.id}`}
      className="relative group overflow-hidden block"
    >
      {/* Image — fixed aspect ratio, uniform across all tiles */}
      <div className="relative w-full aspect-[4/3]">
        <img
          src={project.imageUrl}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/35 transition-all duration-500 ease-out" />

        {/* Info — hover only on all tiles */}
        <div className="absolute inset-0 flex flex-col justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-400 ease-out">
          <div className="flex justify-end">
            <span
              className="text-[9px] tracking-[2.5px] text-white/75"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              {String(index + 1).padStart(2, '0')}/{String(total).padStart(2, '0')}
            </span>
          </div>
          <div>
            <p
              className="text-[9px] tracking-[2.2px] text-white/65 mb-[5px]"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              {project.typology.toUpperCase()} &nbsp;·&nbsp; {project.location}
            </p>
            <h3
              className="text-base md:text-lg text-white leading-snug tracking-[-0.2px]"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              {project.title}
            </h3>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ArchiveTile;
