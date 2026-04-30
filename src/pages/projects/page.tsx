import { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import { projects } from '@/mocks/projects';
import ArchiveTile from './components/ArchiveTile';

type SortMode = 'date' | 'alpha';

const INITIAL_COUNT = 12;
const BATCH = 8;

const ProjectsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sort, setSort] = useState<SortMode>('date');
  const [search, setSearch] = useState('');
  const [typology, setTypology] = useState(() => searchParams.get('typology') ?? '');
  const [visible, setVisible] = useState(INITIAL_COUNT);

  useEffect(() => {
    const t = searchParams.get('typology') ?? '';
    setTypology(t);
    setVisible(INITIAL_COUNT);
  }, [searchParams]);

  const clearTypology = () => {
    setSearchParams(prev => {
      prev.delete('typology');
      return prev;
    });
  };

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    const t = typology.toLowerCase();
    return [...projects]
      .filter(p => {
        const matchesSearch =
          !q ||
          p.title.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q) ||
          p.typology.toLowerCase().includes(q);
        const matchesTypology = !t || p.typology.toLowerCase() === t;
        return matchesSearch && matchesTypology;
      })
      .sort((a, b) =>
        sort === 'date'
          ? b.year - a.year
          : a.title.localeCompare(b.title)
      );
  }, [sort, search, typology]);

  const shown = filtered.slice(0, visible);
  const hasMore = visible < filtered.length;

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Spacer below fixed navbar */}
      <div style={{ height: '80px' }} />

      {/* PROJECTS title + controls — all on the page, none of it fixed */}
      <div className="px-6 md:px-10 pt-10 pb-6 border-b border-[#e4e3e2]">
        <div className="flex items-end justify-between gap-6">
          <h1
            className="text-[42px] md:text-[56px] lg:text-[68px] leading-none tracking-[-2px] text-[#383838] font-bold"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Projects
          </h1>

          {/* Sort + search — bottom-right, aligned to baseline of title */}
          <div className="flex items-center gap-5 md:gap-7 pb-2">
            <button
              onClick={() => setSort('date')}
              className={[
                'text-[9px] tracking-[2.5px] transition-colors duration-200 whitespace-nowrap cursor-pointer',
                sort === 'date' ? 'text-[#383838]' : 'text-[#c8c7c6] hover:text-[#797979]',
              ].join(' ')}
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              DATE &uarr;
            </button>

            <button
              onClick={() => setSort('alpha')}
              className={[
                'text-[9px] tracking-[2.5px] transition-colors duration-200 whitespace-nowrap cursor-pointer',
                sort === 'alpha' ? 'text-[#383838]' : 'text-[#c8c7c6] hover:text-[#797979]',
              ].join(' ')}
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              ALPHABETICAL
            </button>

            {/* Pill search */}
            <div className="flex items-center gap-2 border border-[#e4e3e2] rounded-full px-4 py-[6px]">
              <i className="ri-search-line text-[10px] text-[#aaa]" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="SEARCH"
                className="text-[9px] tracking-[2.2px] bg-transparent border-none outline-none placeholder-[#c8c7c6] text-[#383838] w-20 md:w-28"
                style={{ fontFamily: 'var(--font-sans)' }}
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="w-4 h-4 flex items-center justify-center text-[#c8c7c6] hover:text-[#383838] transition-colors duration-150 cursor-pointer"
                >
                  <i className="ri-close-line text-[10px]" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Active typology filter badge */}
      {typology && (
        <div className="px-6 md:px-10 py-4 flex items-center gap-3 border-b border-[#e4e3e2]">
          <span
            className="text-[9px] tracking-[2px] text-[#797979]"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            CATEGORY
          </span>
          <div className="flex items-center gap-2 border border-[#383838] rounded-full px-4 py-[5px]">
            <span
              className="text-[9px] tracking-[2px] text-[#383838]"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              {typology.toUpperCase()}
            </span>
            <button
              onClick={clearTypology}
              className="w-4 h-4 flex items-center justify-center text-[#797979] hover:text-[#383838] transition-colors duration-150 cursor-pointer"
            >
              <i className="ri-close-line text-[10px]" />
            </button>
          </div>
        </div>
      )}

      {/* 4-column flush grid — no gaps, edge to edge */}
      <section className="grid grid-cols-2 md:grid-cols-4">
        {shown.length > 0 ? (
          shown.map((project) => (
            <ArchiveTile
              key={project.id}
              project={project}
            />
          ))
        ) : (
          <div className="col-span-2 md:col-span-4 py-32 flex flex-col items-center justify-center gap-4">
            <p
              className="text-[10px] tracking-[2.5px] text-[#797979]"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              {search ? `NO RESULTS FOR "${search}"` : `NO PROJECTS IN ${typology.toUpperCase()}`}
            </p>
            <button
              onClick={() => { setSearch(''); clearTypology(); }}
              className="text-[9px] tracking-[2px] text-[#797979] hover:text-[#383838] transition-colors duration-200 underline cursor-pointer"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              CLEAR FILTERS
            </button>
          </div>
        )}
      </section>

      {/* See More Projects button */}
      {hasMore && (
        <div className="flex justify-center py-14">
          <button
            onClick={() => setVisible(v => v + BATCH)}
            className="group flex items-center gap-3 border border-[#d4d3d2] px-10 py-3 rounded-full text-[9px] tracking-[3px] text-[#797979] hover:text-[#383838] hover:border-[#383838] transition-all duration-300 cursor-pointer whitespace-nowrap"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            SEE MORE PROJECTS
            <i className="ri-arrow-down-line text-[11px] group-hover:translate-y-[2px] transition-transform duration-300" />
          </button>
        </div>
      )}

      {/* Gap between grid and OBRAverse */}
      <div className="h-16 md:h-24 bg-white" />

      {/* OBRAverse CTA — full bleed, edge to edge, shorter */}
      <section className="relative w-full h-[38vh] overflow-hidden group" data-theme="dark">
        <img
          src="/images/obraverse.png"
          alt="OBRAverse map"
          className="w-full h-full object-cover object-center transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
        />
        {/* Dark navy tint */}
        <div className="absolute inset-0 bg-[#060d1f]/75" />

        {/* Content — bottom left aligned, editorial */}
        <div className="absolute inset-0 flex flex-col justify-end px-8 md:px-12 pb-10 md:pb-12">
          <p
            className="text-[9px] tracking-[3px] text-white/40 mb-3 uppercase"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            Interactive Map
          </p>
          <div className="flex items-end justify-between gap-6">
            <h2
              className="text-[36px] md:text-[52px] lg:text-[60px] font-bold leading-none tracking-[-2px] text-white"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              OBRAverse
            </h2>

            {/* Explore CTA — big, animated */}
            <Link
              to="/obraverse"
              className="group/cta flex items-center gap-4 mb-1 shrink-0"
            >
              <span
                className="text-[13px] md:text-[15px] tracking-[4px] text-white/80 group-hover/cta:text-white transition-colors duration-300 uppercase whitespace-nowrap"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                Explore the Map
              </span>
              {/* Animated extending line + arrow */}
              <span className="flex items-center pr-2">
                <span className="block h-px bg-white/40 group-hover/cta:bg-white w-6 group-hover/cta:w-16 transition-all duration-500 ease-out" />
                <i className="ri-arrow-right-line text-[16px] text-white/50 group-hover/cta:text-white transition-all duration-300 ml-2 translate-x-0 group-hover/cta:translate-x-2" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default ProjectsPage;
