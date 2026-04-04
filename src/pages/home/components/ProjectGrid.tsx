import { useState } from 'react';
import { Link } from 'react-router-dom';
import { projects } from '@/mocks/projects';
import GridTile from './GridTile';
import FadeIn from '@/components/base/FadeIn';

const INITIAL_BATCH = 6; // 2 + 3 + 1
const BATCH_SIZE = 6;    // each "see more" loads another 2+3+1

const ProjectGrid = () => {
  const grid = projects.slice(1); // skip hero
  const [visible, setVisible] = useState(INITIAL_BATCH);

  const shown = grid.slice(0, visible);

  // Build rows: 2, 3, 1, 2, 3, 1, ...
  const rows: { items: typeof grid; cols: number }[] = [];
  const pattern = [2, 3, 1];
  let idx = 0;
  let patternIdx = 0;
  while (idx < shown.length) {
    const cols = pattern[patternIdx % pattern.length];
    const slice = shown.slice(idx, idx + cols);
    if (slice.length > 0) rows.push({ items: slice, cols });
    idx += cols;
    patternIdx++;
  }

  const hasMore = visible < grid.length;

  return (
    <section className="w-full pb-24">
      {rows.map((row, rowIdx) => {
        const isFullWidth = row.cols === 1;
        return (
          <div
            key={rowIdx}
            className={[
              'mb-[3px]',
              isFullWidth
                ? 'w-full'
                : `grid gap-[3px] grid-cols-1 ${row.cols === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3'}`,
            ].join(' ')}
          >
            {row.items.map((project, i) => (
              <FadeIn key={project.id} delay={i * 60}>
                <GridTile project={project} fullWidth={isFullWidth} />
              </FadeIn>
            ))}
          </div>
        );
      })}

      {/* See More button */}
      {hasMore && (
        <FadeIn>
          <div className="flex justify-center mt-10">
            <button
              onClick={() => setVisible(v => v + BATCH_SIZE)}
              className="group flex items-center gap-3 border border-[#d4d3d2] px-8 py-3 text-[9px] tracking-[3px] text-[#797979] hover:text-[#383838] hover:border-[#383838] transition-all duration-300 cursor-pointer whitespace-nowrap"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              SEE MORE
              <i className="ri-arrow-down-line text-[11px] group-hover:translate-y-[2px] transition-transform duration-300" />
            </button>
          </div>
        </FadeIn>
      )}

      {/* All loaded */}
      {!hasMore && visible > INITIAL_BATCH && (
        <FadeIn>
          <div className="flex justify-center mt-10">
            <Link
              to="/projects"
              className="text-[9px] tracking-[3px] text-[#c8c7c6] hover:text-[#383838] transition-colors duration-300 whitespace-nowrap cursor-pointer"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              VIEW ALL PROJECTS
            </Link>
          </div>
        </FadeIn>
      )}
    </section>
  );
};

export default ProjectGrid;
