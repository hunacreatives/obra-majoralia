import { Link } from 'react-router-dom';
import { Project } from '@/mocks/projects';
import { coverSrcSet, sizedImage } from '@/components/base/sizedImage';

interface GridTileProps {
  project: Project;
  /** full = the single-project row; lead = first of a 3-row, full width below lg */
  variant?: 'pair' | 'lead' | 'full';
}

const ASPECT: Record<NonNullable<GridTileProps['variant']>, string> = {
  pair: 'aspect-[4/3]',
  lead: 'aspect-[3/2] lg:aspect-[4/3]',
  full: 'aspect-[3/2] md:aspect-[21/9]',
};

const SIZES: Record<NonNullable<GridTileProps['variant']>, string> = {
  pair: '50vw',
  lead: '(min-width: 1024px) 33vw, 100vw',
  full: '100vw',
};

// Image with its caption underneath — always visible, no hover-only titles.
const GridTile = ({ project, variant = 'pair' }: GridTileProps) => (
  <Link to={`/projects/${project.id}`} className="group block cursor-pointer">
    <div className={`relative overflow-hidden bg-[#e4e3e2] ${ASPECT[variant]}`}>
      <img
        src={sizedImage(project.imageUrl)}
        srcSet={coverSrcSet(project.imageUrl)}
        sizes={SIZES[variant]}
        onError={(e) => {
          const img = e.currentTarget;
          if (img.srcset) { img.srcset = ''; img.src = project.imageUrl; }
        }}
        alt={project.title}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-[1.03]"
      />
    </div>

    <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 md:gap-6 px-4 md:px-5 pt-3 pb-6 md:pb-8">
      <h3
        className="font-bold text-[17px] md:text-[22px] leading-[1.15] tracking-[-0.01em] [text-wrap:balance] text-[#383838] group-hover:text-[#797979] transition-colors duration-300"
      >
        {project.title}
      </h3>
      <p className="text-[10px] md:text-[11px] tracking-[2px] text-[#797979] uppercase whitespace-nowrap">
        {project.typology}
        <span className="hidden md:inline"> · {project.year}</span>
      </p>
    </div>
  </Link>
);

export default GridTile;
