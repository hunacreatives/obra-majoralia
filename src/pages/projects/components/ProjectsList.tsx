import { Link } from 'react-router-dom';
import { Project } from '@/mocks/projects';
import { sizedImage } from '@/components/base/sizedImage';

// List view: one row per project with its facts in columns.
const ProjectsList = ({ projects }: { projects: Project[] }) => (
  <div className="px-6 md:px-10">
    <div className="hidden md:grid grid-cols-[96px_2fr_1fr_1.4fr_0.6fr_1.2fr] gap-6 py-4 border-b border-[#e4e3e2] text-[11px] tracking-[2px] text-[#797979] uppercase">
      <span />
      <span>Project</span>
      <span>Type</span>
      <span>Location</span>
      <span>Year</span>
      <span>Status</span>
    </div>
    {projects.map(p => (
      <Link
        key={p.id}
        to={`/projects/${p.id}`}
        className="group grid grid-cols-[72px_1fr] md:grid-cols-[96px_2fr_1fr_1.4fr_0.6fr_1.2fr] gap-x-4 md:gap-6 gap-y-1 items-center py-4 border-b border-[#e4e3e2]"
      >
        <span className="row-span-2 md:row-span-1 block aspect-[4/3] overflow-hidden bg-[#e4e3e2]">
          <img src={sizedImage(p.imageUrl)} alt="" loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        </span>
        <span className="text-[15px] font-bold text-[#383838] group-hover:text-[#797979] transition-colors duration-200">
          {p.title}
        </span>
        <span className="text-[12px] md:text-[14px] text-[#797979] md:text-[#383838]">
          {p.typology}<span className="md:hidden"> · {p.year}</span>
        </span>
        <span className="hidden md:block text-[14px] text-[#383838]">{p.location}</span>
        <span className="hidden md:block text-[14px] text-[#383838] tabular-nums">{p.year}</span>
        <span className="hidden md:block text-[14px] text-[#797979]">{p.status ?? '—'}</span>
      </Link>
    ))}
  </div>
);

export default ProjectsList;
