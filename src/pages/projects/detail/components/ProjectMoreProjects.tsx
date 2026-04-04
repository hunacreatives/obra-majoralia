import { Link } from 'react-router-dom';
import FadeIn from '@/components/base/FadeIn';
import { Project } from '@/mocks/projects';

interface ProjectMoreProjectsProps {
  current: Project;
  all: Project[];
}

const ProjectMoreProjects = ({ current, all }: ProjectMoreProjectsProps) => {
  const others = all.filter(p => p.id !== current.id).slice(0, 3);

  return (
    <section className="px-6 md:px-10 pb-20 border-t border-[#e4e3e2] pt-16">
      <FadeIn>
        <div className="flex items-center justify-between mb-10">
          <p
            className="text-[9px] tracking-[2.2px] text-[#797979]"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            MORE PROJECTS
          </p>
          <Link
            to="/projects"
            className="text-[9px] tracking-[2px] text-[#797979] hover:text-[#383838] transition-colors duration-200 flex items-center gap-2 cursor-pointer"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            VIEW ALL
            <i className="ri-arrow-right-line" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {others.map(p => (
            <Link key={p.id} to={`/projects/${p.id}`} className="group cursor-pointer">
              <div className="aspect-[4/3] overflow-hidden mb-4">
                <img
                  src={p.imageUrl}
                  alt={p.title}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </div>
              <p
                className="text-[12px] text-[#383838] tracking-[0.3px]"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                {p.title}
              </p>
              <p
                className="text-[9px] tracking-[1.8px] text-[#797979] mt-1 uppercase"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                {p.typology} · {p.year}
              </p>
            </Link>
          ))}
        </div>
      </FadeIn>
    </section>
  );
};

export default ProjectMoreProjects;
