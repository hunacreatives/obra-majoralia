import { useEffect, useRef, useState } from 'react';

export interface Material {
  name: string;
  finish: string;
  /** how the surface is built: a plain texture, large tiles, a ledgestone panel or slats */
  build: 'texture' | 'tiles' | 'ledgestone' | 'slats';
  /** HD texture (CC0 photo, colour-matched to the studio's board) */
  texture: string;
  /** texture scale, as CSS background-size */
  scale?: string;
  /** card position on the board, in % of the board */
  box: { left: number; top: number; width: number; height: number };
  z: number;
  label: 'top-left' | 'top-right' | 'bottom-right';
  /** light label text for dark materials */
  dark?: boolean;
}

interface Props {
  title: string;
  paragraphs: string[];
  materials: Material[];
  ink: string;
  muted: string;
}

// deterministic "random" so the panels look natural but never reshuffle
const rand = (seed: number) => {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};

/** Stacked split-face strips: rows of 2–3 pieces with staggered joints */
const Ledgestone = ({ texture }: { texture: string }) => {
  const rows = 13;
  return (
    <div className="absolute inset-0 flex flex-col gap-[2px] p-[2px] bg-[#1a1a1a]">
      {Array.from({ length: rows }, (_, r) => {
        const pieces = 2 + Math.round(rand(r + 1));
        const widths = Array.from({ length: pieces }, (_, k) => 0.6 + rand(r * 7 + k) * 0.9);
        return (
          <div key={r} className="flex gap-[2px] flex-1">
            {widths.map((w, k) => (
              <div
                key={k}
                style={{
                  flexGrow: w,
                  backgroundImage: `url(${texture})`,
                  backgroundSize: '520%',
                  backgroundPosition: `${Math.round(rand(r * 13 + k * 3) * 100)}% ${Math.round(rand(r * 5 + k * 11) * 100)}%`,
                  filter: `brightness(${0.82 + rand(r * 3 + k) * 0.32})`,
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.18), inset 0 -2px 3px rgba(0,0,0,0.45)',
                }}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
};

/** Vertical oak slats on a dark backing, each slat rounded by light and shade */
const Slats = ({ texture }: { texture: string }) => {
  const count = 15;
  return (
    <div className="absolute inset-0 flex justify-between px-[3%] bg-[#1a1a1a]">
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          className="h-full"
          style={{
            width: `${(94 / count) * 0.62}%`,
            backgroundImage: `linear-gradient(90deg, rgba(0,0,0,0.32), rgba(255,255,255,0.08) 35%, rgba(255,255,255,0.04) 65%, rgba(0,0,0,0.38)), url(${texture})`,
            backgroundSize: '100% 100%, 900% 120%',
            backgroundPosition: `0 0, ${Math.round(rand(i + 2) * 100)}% ${Math.round(rand(i + 9) * 100)}%`,
            filter: `brightness(${0.92 + rand(i * 4) * 0.16})`,
          }}
        />
      ))}
    </div>
  );
};

/** Large-format tiles: the texture with fine joints (2 across, 2 down) */
const Tiles = ({ texture, scale }: { texture: string; scale?: string }) => (
  <div className="absolute inset-0" style={{ backgroundImage: `url(${texture})`, backgroundSize: scale ?? 'cover', backgroundPosition: 'center' }}>
    <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100" aria-hidden="true">
      <g stroke="rgba(56,56,56,0.16)" strokeWidth="0.35" vectorEffect="non-scaling-stroke">
        <line x1="36" y1="0" x2="36" y2="100" />
        <line x1="0" y1="66" x2="100" y2="66" />
      </g>
      <g stroke="rgba(255,255,255,0.55)" strokeWidth="0.35" vectorEffect="non-scaling-stroke">
        <line x1="36.6" y1="0" x2="36.6" y2="100" />
        <line x1="0" y1="66.6" x2="100" y2="66.6" />
      </g>
    </svg>
  </div>
);

// The studio's material board rebuilt as UI: each card is built from an HD
// texture of the material, in the board's composition. Cards settle in one
// by one; hovering a card lifts it to the front.
const MaterialBreakdown = ({ title, paragraphs, materials, ink, muted }: Props) => {
  const boardRef = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  const [hover, setHover] = useState<number | null>(null);

  useEffect(() => {
    const el = boardRef.current;
    if (!el) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) { setShown(true); return; }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setShown(true); io.disconnect(); }
    }, { rootMargin: '0px 0px -25% 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center px-6 md:px-16 py-12 md:py-24">
      <div ref={boardRef} className="relative w-full max-w-[680px] mx-auto aspect-[1960/1889]">
        {materials.map((m, i) => {
          const lifted = hover === i;
          return (
            <div
              key={m.name + m.finish}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              className="absolute overflow-hidden cursor-default"
              style={{
                left: `${m.box.left}%`,
                top: `${m.box.top}%`,
                width: `${m.box.width}%`,
                height: `${m.box.height}%`,
                zIndex: lifted ? 50 : m.z,
                boxShadow: lifted ? '0 28px 56px rgba(56,56,56,0.38)' : '0 8px 18px rgba(56,56,56,0.24), 0 1px 2px rgba(56,56,56,0.2)',
                opacity: shown ? (hover !== null && !lifted ? 0.78 : 1) : 0,
                transform: shown ? `translateY(${lifted ? -8 : 0}px) scale(${lifted ? 1.02 : 1})` : 'translateY(28px)',
                transition: `opacity 500ms ease ${shown && hover === null ? i * 90 : 0}ms, transform 700ms cubic-bezier(0.22, 1, 0.36, 1) ${shown && hover === null ? i * 90 : 0}ms, box-shadow 300ms ease`,
              }}
            >
              {m.build === 'ledgestone' ? <Ledgestone texture={m.texture} />
                : m.build === 'slats' ? <Slats texture={m.texture} />
                  : m.build === 'tiles' ? <Tiles texture={m.texture} scale={m.scale} />
                    : <div className="absolute inset-0" style={{ backgroundImage: `url(${m.texture})`, backgroundSize: m.scale ?? 'cover', backgroundPosition: 'center' }} />}

              <span
                className={`absolute z-10 flex gap-[0.5em] text-[clamp(9px,1.25vw,15px)] leading-[1.15] ${
                  m.label === 'top-left' ? 'left-[7%] top-[5%]'
                    : m.label === 'top-right' ? 'right-[7%] top-[5%]'
                      : 'right-[7%] bottom-[5%]'
                }`}
                style={{ color: m.dark ? '#ffffff' : '#383838', textShadow: m.dark ? '0 1px 6px rgba(0,0,0,0.5)' : 'none' }}
              >
                <span aria-hidden="true">•</span>
                <span>
                  <span className="block font-bold">{m.name}</span>
                  <span className="block" style={{ color: m.dark ? '#e4e3e2' : '#797979' }}>{m.finish}</span>
                </span>
              </span>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col gap-5 md:gap-6">
        <h3 className="font-bold text-heading transition-colors duration-700" style={{ color: ink }}>{title}</h3>
        {paragraphs.map(p => (
          <p key={p} className="text-[14px] leading-[1.55] md:text-[15px] md:leading-[1.6] text-pretty transition-colors duration-700" style={{ color: muted }}>{p}</p>
        ))}
      </div>
    </section>
  );
};

export default MaterialBreakdown;
