import FadeIn from '@/components/base/FadeIn';
import { Project, projects } from '@/mocks/projects';
import ProjectMoreProjects from './ProjectMoreProjects';
import { useNightMode } from '@/contexts/NightModeContext';

interface Props { project: Project; }

// Small architectural diagram icons for the strip — inline SVG placeholders
// representing different views: plan, section, elevation, perspective, axonometric
const DiagramIcons = ({ color }: { color: string }) => {
  const icons = [
    // Site plan (top-down square with dot)
    <svg key="plan" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x="4" y="4" width="32" height="32" stroke={color} strokeWidth="1.2" fill="none" />
      <rect x="10" y="10" width="12" height="8" stroke={color} strokeWidth="0.8" fill="none" />
      <rect x="24" y="14" width="8" height="12" stroke={color} strokeWidth="0.8" fill="none" />
      <line x1="10" y1="28" x2="30" y2="28" stroke={color} strokeWidth="0.8" />
      <circle cx="20" cy="32" r="1.5" fill={color} />
    </svg>,
    // Front elevation (building silhouette)
    <svg key="elev" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <line x1="4" y1="30" x2="36" y2="30" stroke={color} strokeWidth="1.2" />
      <rect x="8" y="18" width="24" height="12" stroke={color} strokeWidth="0.8" fill="none" />
      <polygon points="8,18 20,8 32,18" stroke={color} strokeWidth="0.8" fill="none" />
      <rect x="16" y="22" width="8" height="8" stroke={color} strokeWidth="0.6" fill="none" />
    </svg>,
    // Section cut (building with interior line)
    <svg key="sec" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <line x1="4" y1="30" x2="36" y2="30" stroke={color} strokeWidth="1.2" />
      <rect x="6" y="14" width="28" height="16" stroke={color} strokeWidth="0.8" fill="none" />
      <path d="M6 14 Q20 4 34 14" stroke={color} strokeWidth="0.8" fill="none" />
      <line x1="20" y1="14" x2="20" y2="30" stroke={color} strokeWidth="0.6" strokeDasharray="2 2" />
    </svg>,
    // Perspective view (box in perspective)
    <svg key="persp" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x="6" y="14" width="20" height="16" stroke={color} strokeWidth="0.8" fill="none" />
      <polygon points="26,14 34,8 34,22 26,30" stroke={color} strokeWidth="0.8" fill="none" />
      <line x1="6" y1="14" x2="14" y2="8" stroke={color} strokeWidth="0.8" />
      <line x1="14" y1="8" x2="34" y2="8" stroke={color} strokeWidth="0.8" />
    </svg>,
    // Axonometric (building from above-angle)
    <svg key="axo" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <polygon points="20,4 34,12 34,28 20,36 6,28 6,12" stroke={color} strokeWidth="0.8" fill="none" />
      <line x1="20" y1="4" x2="20" y2="20" stroke={color} strokeWidth="0.6" strokeDasharray="2 2" />
      <line x1="6" y1="12" x2="20" y2="20" stroke={color} strokeWidth="0.6" strokeDasharray="2 2" />
      <line x1="34" y1="12" x2="20" y2="20" stroke={color} strokeWidth="0.6" strokeDasharray="2 2" />
    </svg>,
    // Roof plan
    <svg key="roof" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x="4" y="4" width="32" height="32" stroke={color} strokeWidth="1" fill="none" />
      <polygon points="4,4 20,20 36,4" stroke={color} strokeWidth="0.7" fill="none" />
      <polygon points="4,36 20,20 36,36" stroke={color} strokeWidth="0.7" fill="none" />
      <line x1="4" y1="4" x2="20" y2="20" stroke={color} strokeWidth="0.7" />
      <line x1="36" y1="4" x2="20" y2="20" stroke={color} strokeWidth="0.7" />
    </svg>,
    // Landscape / site section
    <svg key="land" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M4 28 Q10 16 16 20 Q22 24 28 12 Q32 6 36 14" stroke={color} strokeWidth="0.8" fill="none" />
      <line x1="4" y1="32" x2="36" y2="32" stroke={color} strokeWidth="1" />
      <circle cx="28" cy="12" r="3" stroke={color} strokeWidth="0.7" fill="none" />
      <line x1="28" y1="9" x2="28" y2="4" stroke={color} strokeWidth="0.7" />
    </svg>,
  ];

  return (
    <div className="flex items-center gap-5 md:gap-8">
      {icons.map((icon, i) => (
        <div key={i} style={{ width: 38, height: 38, flexShrink: 0 }}>
          {icon}
        </div>
      ))}
    </div>
  );
};

// Vertical sketch strip component — thin architectural line drawings
const SketchStrip = ({ index, color }: { index: number; color: string }) => {
  const paths = [
    // Strip 0 — building section
    <svg key={0} viewBox="0 0 60 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <line x1="10" y1="180" x2="50" y2="180" stroke={color} strokeWidth="0.8" />
      <rect x="12" y="60" width="36" height="120" stroke={color} strokeWidth="0.7" fill="none" />
      <path d="M12 60 Q30 30 48 60" stroke={color} strokeWidth="0.8" fill="none" />
      <line x1="12" y1="100" x2="48" y2="100" stroke={color} strokeWidth="0.5" strokeDasharray="3 2" />
      <line x1="12" y1="130" x2="48" y2="130" stroke={color} strokeWidth="0.5" strokeDasharray="3 2" />
      <rect x="22" y="150" width="16" height="30" stroke={color} strokeWidth="0.6" fill="none" />
      <line x1="30" y1="40" x2="30" y2="10" stroke={color} strokeWidth="0.5" strokeDasharray="2 2" />
      <circle cx="30" cy="8" r="2" stroke={color} strokeWidth="0.5" fill="none" />
    </svg>,
    // Strip 1 — elevation with trees
    <svg key={1} viewBox="0 0 60 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <line x1="6" y1="175" x2="54" y2="175" stroke={color} strokeWidth="0.8" />
      <rect x="14" y="95" width="32" height="80" stroke={color} strokeWidth="0.7" fill="none" />
      <path d="M14 95 L30 55 L46 95" stroke={color} strokeWidth="0.8" fill="none" />
      <circle cx="8" cy="140" r="12" stroke={color} strokeWidth="0.6" fill="none" />
      <line x1="8" y1="152" x2="8" y2="175" stroke={color} strokeWidth="0.6" />
      <circle cx="50" cy="148" r="9" stroke={color} strokeWidth="0.6" fill="none" />
      <line x1="50" y1="157" x2="50" y2="175" stroke={color} strokeWidth="0.6" />
      <rect x="22" y="145" width="16" height="30" stroke={color} strokeWidth="0.5" fill="none" />
      <line x1="30" y1="45" x2="30" y2="20" stroke={color} strokeWidth="0.5" />
      <line x1="24" y1="28" x2="36" y2="28" stroke={color} strokeWidth="0.5" />
    </svg>,
    // Strip 2 — plan view
    <svg key={2} viewBox="0 0 60 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x="8" y="30" width="44" height="60" stroke={color} strokeWidth="0.7" fill="none" />
      <rect x="8" y="100" width="44" height="40" stroke={color} strokeWidth="0.7" fill="none" />
      <line x1="30" y1="30" x2="30" y2="140" stroke={color} strokeWidth="0.5" strokeDasharray="3 2" />
      <rect x="16" y="110" width="12" height="20" stroke={color} strokeWidth="0.5" fill="none" />
      <rect x="32" y="110" width="12" height="20" stroke={color} strokeWidth="0.5" fill="none" />
      <path d="M8 30 Q30 10 52 30" stroke={color} strokeWidth="0.6" fill="none" />
      <circle cx="30" cy="70" r="8" stroke={color} strokeWidth="0.6" fill="none" />
      <line x1="8" y1="160" x2="52" y2="160" stroke={color} strokeWidth="0.8" />
      <line x1="8" y1="175" x2="52" y2="175" stroke={color} strokeWidth="0.5" />
    </svg>,
    // Strip 3 — perspective sketch
    <svg key={3} viewBox="0 0 60 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <line x1="30" y1="20" x2="8" y2="130" stroke={color} strokeWidth="0.5" strokeDasharray="2 2" />
      <line x1="30" y1="20" x2="52" y2="130" stroke={color} strokeWidth="0.5" strokeDasharray="2 2" />
      <rect x="12" y="90" width="36" height="60" stroke={color} strokeWidth="0.7" fill="none" />
      <line x1="12" y1="90" x2="30" y2="65" stroke={color} strokeWidth="0.6" />
      <line x1="48" y1="90" x2="30" y2="65" stroke={color} strokeWidth="0.6" />
      <line x1="30" y1="65" x2="30" y2="150" stroke={color} strokeWidth="0.5" strokeDasharray="2 1" />
      <rect x="20" y="120" width="20" height="30" stroke={color} strokeWidth="0.5" fill="none" />
      <line x1="6" y1="155" x2="54" y2="155" stroke={color} strokeWidth="0.8" />
      <circle cx="15" cy="80" r="10" stroke={color} strokeWidth="0.5" fill="none" />
      <line x1="15" y1="90" x2="12" y2="90" stroke={color} strokeWidth="0.5" />
    </svg>,
  ];

  return (
    <div className="overflow-hidden w-full h-full">
      {paths[index % paths.length]}
    </div>
  );
};

const LobocLayout = ({ project }: Props) => {
  const { isNight } = useNightMode();
  const gallery = project.galleryImages ?? [];

  const t = isNight ? '#ffffff' : '#383838';
  const sub = isNight ? '#aaaaaa' : '#aaa';
  const border = isNight ? 'rgba(255,255,255,0.1)' : '#e8e7e6';
  const bg = isNight ? '#0d0d0d' : '#ffffff';

  return (
    <>
      {/* ── 01 HERO ─────────────────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden" style={{ height: '85vh' }}>
        <img
          src={gallery[0] ?? project.imageUrl}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
        <div className="absolute top-28 left-10">
          <span
            className="text-[9px] tracking-[4px] text-white/50 uppercase"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            {project.typology}
          </span>
        </div>
        <div className="absolute bottom-10 md:bottom-16 left-6 md:left-10 right-6 md:right-10">
          <h1
            className="text-5xl md:text-7xl lg:text-8xl text-white leading-[0.95] tracking-[-2px]"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            {project.title}
          </h1>
        </div>
      </section>

      {/* ── 02 INFO BAR ─────────────────────────────────────────────── */}
      <section className="py-8" style={{ borderBottom: `1px solid ${border}` }}>
        <div className="grid grid-cols-5">
          {[
            { label: 'LOCATION', value: project.location.toUpperCase() },
            { label: 'AREA', value: project.area ?? '—' },
            { label: 'TYPE', value: project.typology.toUpperCase() },
            { label: 'STATUS', value: (project.status ?? '—').toUpperCase() },
            { label: 'YEAR', value: String(project.year) },
          ].map(({ label, value }) => (
            <div key={label} className="flex flex-col items-center justify-center text-center px-4">
              <span
                className="text-[9px] tracking-[2px] mb-2 uppercase transition-colors duration-700"
                style={{ fontFamily: 'var(--font-sans)', color: sub }}
              >
                {label}
              </span>
              <span
                className="text-[11px] md:text-[13px] font-bold tracking-[1px] uppercase transition-colors duration-700"
                style={{ fontFamily: 'var(--font-sans)', color: t }}
              >
                {value}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── 03 DIAGRAM STRIP + CONCEPT TEXT ─────────────────────────── */}
      <FadeIn>
        <section className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-0">
          {/* Left — diagram icons + label */}
          <div
            className="flex flex-col justify-between px-10 md:px-16 py-14 md:py-20"
            style={{ borderRight: `1px solid ${border}` }}
          >
            <div>
              <p
                className="text-[9px] tracking-[3px] mb-8 uppercase transition-colors duration-700"
                style={{ fontFamily: 'var(--font-sans)', color: sub }}
              >
                Drawing Set
              </p>
              <DiagramIcons color={isNight ? '#888' : '#c0bebb'} />
            </div>
            <div className="mt-14">
              <p
                className="text-[9px] tracking-[3px] mb-3 uppercase transition-colors duration-700"
                style={{ fontFamily: 'var(--font-sans)', color: sub }}
              >
                Programme
              </p>
              <p
                className="text-[13px] leading-[1.8] transition-colors duration-700"
                style={{ fontFamily: 'var(--font-sans)', color: t }}
              >
                {project.typology} · {project.area}
              </p>
            </div>
          </div>

          {/* Right — concept text */}
          <div className="flex flex-col justify-center px-10 md:px-16 py-14 md:py-20 gap-6">
            <p
              className="text-[9px] tracking-[3px] uppercase transition-colors duration-700"
              style={{ fontFamily: 'var(--font-sans)', color: sub }}
            >
              Concept
            </p>
            <p
              className="text-[22px] md:text-[30px] leading-[1.5] tracking-[-0.5px] transition-colors duration-700"
              style={{ fontFamily: 'var(--font-serif)', color: t }}
            >
              {project.concept}
            </p>
            {project.conceptExtended && (
              <p
                className="text-[15px] md:text-[16px] leading-[2] text-justify transition-colors duration-700"
                style={{ fontFamily: 'var(--font-sans)', color: t }}
              >
                {project.conceptExtended}
              </p>
            )}
          </div>
        </section>
      </FadeIn>

      {/* ── 04 SKETCH STRIPS + AERIAL IMAGE ─────────────────────────── */}
      <FadeIn>
        <section className="grid grid-cols-[auto_1fr] gap-[3px]" style={{ height: '90vh' }}>
          {/* Left — 4 thin sketch strips */}
          <div className="grid grid-cols-4 gap-[3px]" style={{ width: 200 }}>
            {[0, 1, 2, 3].map(i => (
              <div
                key={i}
                className="overflow-hidden h-full transition-colors duration-700"
                style={{ background: isNight ? '#1a1a1a' : '#f3f2f0' }}
              >
                <SketchStrip index={i} color={isNight ? '#555' : '#c8c5c0'} />
              </div>
            ))}
          </div>

          {/* Right — large aerial/site image */}
          <div className="overflow-hidden h-full">
            <img
              src={gallery[1] ?? project.imageUrl}
              alt={`${project.title} aerial view`}
              className="w-full h-full object-cover object-center"
            />
          </div>
        </section>
      </FadeIn>

      {/* ── 05 BOTTOM PHOTO GALLERY ──────────────────────────────────── */}
      <FadeIn>
        <section className="grid grid-cols-1 md:grid-cols-2 gap-[3px]" style={{ height: '65vh' }}>
          <div className="overflow-hidden h-full">
            <img
              src={gallery[2] ?? gallery[0]}
              alt={`${project.title} interior`}
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div className="overflow-hidden h-full">
            <img
              src={gallery[3] ?? gallery[1] ?? gallery[0]}
              alt={`${project.title} exterior`}
              className="w-full h-full object-cover object-center"
            />
          </div>
        </section>
      </FadeIn>

      {/* ── 06 CLOSING BAND ──────────────────────────────────────────── */}
      <FadeIn>
        <section
          className="px-10 md:px-20 lg:px-28 py-16 md:py-20"
          style={{ background: isNight ? '#111' : '#1e1e1c' }}
        >
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
            <p
              className="text-[18px] md:text-[22px] text-white/70 leading-[1.8] max-w-xl"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              &ldquo;{project.concept.split('.')[0]}.&rdquo;
            </p>
            <div className="text-right shrink-0">
              <p
                className="text-[9px] tracking-[3px] text-white/30 uppercase"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                {project.year} · {project.status}
              </p>
              <p
                className="text-[9px] tracking-[2px] text-white/20 uppercase mt-1"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                {project.location}
              </p>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ── MORE PROJECTS ─────────────────────────────────────────────── */}
      <ProjectMoreProjects current={project} all={projects} />
    </>
  );
};

export default LobocLayout;
