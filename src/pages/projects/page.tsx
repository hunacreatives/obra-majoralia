import { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import { Link, useSearchParams } from 'react-router-dom';
import { projects, Project } from '@/mocks/projects';
import { placeOf } from '@/mocks/places';
import ArchiveTile from './components/ArchiveTile';
import ProjectsList from './components/ProjectsList';

// the map (and Leaflet) only loads when someone opens map view
const ProjectsMap = lazy(() => import('./components/ProjectsMap'));

type View = 'map' | 'list' | 'grid';
type FilterKey = 'type' | 'year' | 'status' | 'location';

const FILTERS: { key: FilterKey; label: string; value: (p: Project) => string | null }[] = [
  { key: 'type', label: 'Type', value: p => p.typology },
  { key: 'year', label: 'Year', value: p => String(p.year) },
  { key: 'status', label: 'Status', value: p => p.status ?? null },
  { key: 'location', label: 'Location', value: p => placeOf(p.location) },
];

// "All types", "All years", "All statuses", "All locations"
const allLabel = (label: string) => `All ${label.toLowerCase()}${/s$/i.test(label) ? 'es' : 's'}`;

const VIEWS: { key: View; label: string; icon: string }[] = [
  { key: 'map', label: 'Map view', icon: 'ri-global-line' },
  { key: 'list', label: 'List view', icon: 'ri-layout-row-line' },
  { key: 'grid', label: 'Grid view', icon: 'ri-layout-grid-line' },
];

/** "○ Type" — opens a list of that filter's values with counts */
const FilterButton = ({
  label, value, options, onChange,
}: {
  label: string;
  value: string;
  options: { value: string; count: number }[];
  onChange: (v: string) => void;
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [open]);

  // Phones: the list drops below the whole filter bar at full width (the bar is
  // the positioned parent), so it is never cut off at the screen edge.
  // md+: it hangs under its own button as before.
  return (
    <div ref={ref} className="md:relative min-w-0">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2 h-10 md:h-auto max-w-full text-[14px] md:text-[15px] text-[#383838] hover:text-[#797979] transition-colors duration-200 cursor-pointer whitespace-nowrap"
        aria-expanded={open}
      >
        <span className={`shrink-0 w-[11px] h-[11px] rounded-full border-2 border-[#383838] transition-colors duration-200 ${value ? 'bg-[#383838]' : 'bg-transparent'}`} />
        <span className={`truncate ${value ? 'font-bold' : ''}`}>{value || label}</span>
      </button>
      {open && (
        <div className="absolute inset-x-6 top-full -mt-px md:inset-x-auto md:left-0 md:mt-3 z-30 md:min-w-[220px] max-h-[60svh] overflow-y-auto bg-white border border-[#e4e3e2] shadow-[0_12px_30px_rgba(56,56,56,0.12)] py-1 md:py-2">
          {[{ value: '', count: projects.length }, ...options].map(o => (
            <button
              key={o.value || 'all'}
              type="button"
              onClick={() => { onChange(o.value); setOpen(false); }}
              className={`w-full flex items-center justify-between gap-6 px-4 min-h-[44px] md:min-h-0 md:py-2 text-left text-[14px] hover:bg-[#e4e3e2]/50 cursor-pointer ${value === o.value ? 'font-bold text-[#383838]' : 'text-[#383838]'}`}
            >
              <span>{o.value || allLabel(label)}</span>
              <span className="text-[12px] text-[#797979] tabular-nums">{o.count}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const ClearButton = ({ className, onClear }: { className: string; onClear: () => void }) => (
  <button
    type="button"
    onClick={onClear}
    className={`${className} h-10 md:h-auto text-[13px] text-[#797979] underline underline-offset-4 hover:text-[#383838] cursor-pointer`}
  >
    Clear
  </button>
);

const ProjectsPage = () => {
  const [params, setParams] = useSearchParams();
  // "typology" is the older link format (home page typology list)
  const filters: Record<FilterKey, string> = {
    type: params.get('type') ?? params.get('typology') ?? '',
    year: params.get('year') ?? '',
    status: params.get('status') ?? '',
    location: params.get('location') ?? '',
  };
  const view = (params.get('view') as View) || 'grid';

  const setParam = (key: string, value: string) => {
    setParams(prev => {
      const next = new URLSearchParams(prev);
      if (key === 'type') next.delete('typology');
      if (value) next.set(key, value); else next.delete(key);
      return next;
    }, { replace: true });
  };

  const filtered = useMemo(
    () => projects
      .filter(p => FILTERS.every(f => !filters[f.key] || (f.value(p) ?? '').toLowerCase() === filters[f.key].toLowerCase()))
      .sort((a, b) => a.title.localeCompare(b.title)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [params],
  );

  const optionsFor = (f: (typeof FILTERS)[number]) => {
    const counts = new Map<string, number>();
    projects.forEach(p => { const v = f.value(p); if (v) counts.set(v, (counts.get(v) ?? 0) + 1); });
    return [...counts.entries()]
      .map(([value, count]) => ({ value, count }))
      .sort((a, b) => (f.key === 'year' ? Number(b.value) - Number(a.value) : a.value.localeCompare(b.value)));
  };

  const anyFilter = FILTERS.some(f => filters[f.key]);
  const clearFilters = () => setParams(prev => {
    const next = new URLSearchParams(prev);
    ['type', 'typology', 'year', 'status', 'location'].forEach(k => next.delete(k));
    return next;
  }, { replace: true });

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div style={{ height: '80px' }} />

      <div className="px-6 md:px-10 pt-8 md:pt-14">
        <h1 className="font-bold text-title text-[#383838]">Projects</h1>
      </div>

      {/* Filter : ○ Type ○ Year ○ Status ○ Location            View : map list grid
          Phones: the labels share a column, the four filters sit in a 2×2 grid
          and every control is a 40px tap target. */}
      <div className="relative px-6 md:px-10 mt-6 md:mt-10 pb-2 md:pb-5 border-b border-[#383838] flex flex-col md:flex-row md:items-center md:justify-between gap-1 md:gap-5">
        <div className="flex items-start md:items-center gap-x-4 md:gap-x-8">
          <span className="w-14 md:w-auto shrink-0 h-10 md:h-auto flex items-center text-[14px] md:text-[15px] text-[#797979]">Filter :</span>
          <div className="flex-1 min-w-0 grid grid-cols-2 gap-x-4 md:flex md:items-center md:gap-x-8 md:gap-y-3 md:flex-wrap">
            {FILTERS.map(f => (
              <FilterButton
                key={f.key}
                label={f.label}
                value={filters[f.key]}
                options={optionsFor(f)}
                onChange={v => setParam(f.key, v)}
              />
            ))}
            {anyFilter && <ClearButton className="hidden md:block" onClear={clearFilters} />}
          </div>
        </div>
        <div className="flex items-center gap-x-4 md:gap-5">
          <span className="w-14 md:w-auto shrink-0 text-[14px] md:text-[15px] text-[#797979]">View :</span>
          <div className="flex items-center -ml-2 md:ml-0 md:gap-5">
            {VIEWS.map(v => (
              <button
                key={v.key}
                type="button"
                onClick={() => setParam('view', v.key === 'grid' ? '' : v.key)}
                aria-label={v.label}
                aria-pressed={view === v.key}
                className={`w-10 h-10 md:w-auto md:h-auto flex items-center justify-center text-[22px] leading-none cursor-pointer transition-colors duration-200 ${view === v.key ? 'text-[#383838]' : 'text-[#797979]/50 hover:text-[#797979]'}`}
              >
                <i className={v.icon} />
              </button>
            ))}
          </div>
          {anyFilter && <ClearButton className="md:hidden ml-auto" onClear={clearFilters} />}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="py-32 flex flex-col items-center gap-4">
          <p className="text-[14px] text-[#797979]">No projects match these filters.</p>
        </div>
      ) : view === 'map' ? (
        <Suspense fallback={<div className="h-[70svh] md:h-[78vh] bg-[#e4e3e2]" />}>
          <ProjectsMap projects={filtered} />
        </Suspense>
      ) : view === 'list' ? (
        <ProjectsList projects={filtered} />
      ) : (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map(project => <ArchiveTile key={project.id} project={project} />)}
        </section>
      )}

      {/* Gap between grid and OBRAverse */}
      <div className="h-16 md:h-24 bg-white" />

      {/* OBRAverse CTA — full bleed, edge to edge, shorter */}
      <section className="relative w-full h-[38vh] overflow-hidden group" data-theme="dark">
        <img
          src="/images/obraverse/cta.webp"
          alt="OBRAverse map"
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-center transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
        />
        {/* Dark navy tint */}
        <div className="absolute inset-0 bg-[#383838]/75" />

        {/* Content — bottom left aligned, editorial */}
        <div className="absolute inset-0 flex flex-col justify-end px-6 md:px-12 pb-10 md:pb-12">
          <p
            className="text-[11px] tracking-[2px] text-[#e4e3e2] mb-3 uppercase"
          >
            Interactive Map
          </p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6">
            <h2
              className="font-bold text-heading text-white"
            >
              <span className="font-bold">OBRA</span>verse
            </h2>

            {/* Explore CTA — big, animated */}
            <Link
              to="/obraverse"
              className="group/cta flex items-center gap-4 md:mb-1 shrink-0"
            >
              <span
                className="text-[15px] tracking-[2px] text-[#e4e3e2] group-hover/cta:text-white transition-colors duration-300 uppercase whitespace-nowrap"
              >
                Explore the Map
              </span>
              {/* Animated extending line + arrow */}
              <span className="flex items-center pr-2">
                <span className="block h-px bg-white/40 group-hover/cta:bg-white w-6 group-hover/cta:w-16 transition-all duration-500 ease-out" />
                <i className="ri-arrow-right-line text-[16px] text-[#e4e3e2] group-hover/cta:text-white transition-all duration-300 ml-2 translate-x-0 group-hover/cta:translate-x-2" />
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
