import { Link } from 'react-router-dom';
import { Project } from '@/mocks/projects';
import { sizedImage } from '@/components/base/sizedImage';

interface ProjectMoreProjectsProps {
  current: Project;
  all: Project[];
}

// One full-bleed "Next project" band: same typology first, then the project
// that follows this one in the list (wrapping round).
const ProjectMoreProjects = ({ current, all }: ProjectMoreProjectsProps) => {
  const idx = all.findIndex(p => p.id === current.id);
  const following = [...all.slice(idx + 1), ...all.slice(0, idx)];
  const next = following.find(p => p.typology === current.typology) ?? following[0];
  if (!next) return null;

  return (
    <Link
      to={`/projects/${next.id}`}
      className="group relative block w-full h-[70svh] md:h-[80vh] overflow-hidden"
      data-theme="dark"
    >
      <img
        src={sizedImage(next.imageUrl, 'thumbs-1600')}
        onError={(e) => { e.currentTarget.src = next.imageUrl; }}
        alt={next.title}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#383838]/80 via-[#383838]/20 to-[#383838]/10" />

      <div className="absolute inset-x-0 bottom-0 px-6 md:px-16 pb-10 md:pb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div className="flex flex-col gap-4">
          <p className="text-[11px] tracking-[2px] text-[#e4e3e2] uppercase">Next project</p>
          <h2 className="font-bold text-display text-white text-balance">{next.title}</h2>
          <p className="text-[11px] tracking-[2px] text-[#e4e3e2] uppercase">
            {next.typology} · {next.location}
          </p>
        </div>
        <span className="flex items-center gap-3 text-[12px] tracking-[2px] text-white uppercase whitespace-nowrap">
          View project
          <span className="block h-px bg-white w-6 group-hover:w-14 transition-all duration-500 ease-out" />
        </span>
      </div>
    </Link>
  );
};

export default ProjectMoreProjects;
