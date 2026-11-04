import { Link } from 'react-router-dom';
import GridTile from './GridTile';
import FadeIn from '@/components/base/FadeIn';
import { gridProjects } from '../featured';
import { projects } from '@/mocks/projects';

const SHOWN = 6; // one 2 + 3 + 1 cycle

const ProjectGrid = () => {
  const shown = gridProjects.slice(0, SHOWN);

  // Build rows: 2, 3, 1
  const rows: { items: typeof shown; cols: number }[] = [];
  const pattern = [2, 3, 1];
  let idx = 0;
  let patternIdx = 0;
  while (idx < shown.length) {
    // the last row takes however many are left (2 → pair, 1 → full width), so no empty cells
    const cols = Math.min(pattern[patternIdx % pattern.length], shown.length - idx);
    const slice = shown.slice(idx, idx + cols);
    if (slice.length > 0) rows.push({ items: slice, cols });
    idx += cols;
    patternIdx++;
  }

  return (
    <section className="w-full pb-14 md:pb-28">
      <FadeIn>
        <div className="flex items-end justify-between gap-6 px-6 md:px-16 lg:px-24 pb-5 md:pb-12">
          <h2 className="font-bold text-heading text-[#383838]">
            Selected work
          </h2>
          <Link
            to="/projects"
            className="group hidden md:flex items-center gap-3 text-[11px] tracking-[2px] text-[#383838] uppercase whitespace-nowrap pb-2"
          >
            All projects
            <span className="block h-px bg-[#383838] w-6 group-hover:w-12 transition-all duration-500 ease-out" />
          </Link>
        </div>
      </FadeIn>

      {rows.map((row, rowIdx) => {
        const isFullWidth = row.cols === 1;
        return (
          <div
            key={rowIdx}
            className={isFullWidth ? 'w-full' : `grid gap-x-[3px] grid-cols-2 ${row.cols === 3 ? 'lg:grid-cols-3' : ''}`}
          >
            {row.items.map((project, i) => {
              // Below lg a 3-row has only 2 columns, so its first tile spans both
              // (no empty cell): phones read pair, wide, pair, wide.
              const isLead = row.cols === 3 && i === 0;
              return (
                <FadeIn key={project.id} delay={i * 60} className={isLead ? 'col-span-2 lg:col-span-1' : ''}>
                  <GridTile project={project} variant={isFullWidth ? 'full' : isLead ? 'lead' : 'pair'} />
                </FadeIn>
              );
            })}
          </div>
        );
      })}

      <FadeIn>
        <div className="flex justify-center mt-6 md:mt-10">
          <Link
            to="/projects"
            className="group flex items-center gap-3 border border-[#e4e3e2] px-8 py-3 rounded-full text-[11px] tracking-[2px] text-[#797979] hover:text-[#383838] hover:border-[#383838] transition-all duration-300 whitespace-nowrap uppercase"
          >
            See all {projects.length} projects
            <i className="ri-arrow-right-line text-[13px] group-hover:translate-x-[2px] transition-transform duration-300" />
          </Link>
        </div>
      </FadeIn>
    </section>
  );
};

export default ProjectGrid;
