import { useEffect, useRef, useState } from 'react';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import ObraverseMap from '@/components/feature/ObraverseMap';

/* Cloud field for the intro: position, size, and the direction each cloud
   drifts as the sky parts to reveal the map. */
const INTRO_CLOUDS = [
  { left: -8, top: -6, w: 46, h: 34, dx: -60, dy: -35 },
  { left: 22, top: -10, w: 44, h: 30, dx: -10, dy: -55 },
  { left: 55, top: -8, w: 48, h: 32, dx: 45, dy: -45 },
  { left: -12, top: 18, w: 42, h: 34, dx: -65, dy: -5 },
  { left: 18, top: 14, w: 46, h: 36, dx: -20, dy: -30 },
  { left: 48, top: 16, w: 44, h: 34, dx: 30, dy: -25 },
  { left: 76, top: 12, w: 44, h: 36, dx: 65, dy: -15 },
  { left: -10, top: 46, w: 46, h: 36, dx: -60, dy: 15 },
  { left: 20, top: 44, w: 48, h: 38, dx: -25, dy: 30 },
  { left: 52, top: 42, w: 46, h: 36, dx: 25, dy: 25 },
  { left: 78, top: 46, w: 44, h: 34, dx: 60, dy: 20 },
  { left: -6, top: 72, w: 46, h: 36, dx: -55, dy: 45 },
  { left: 24, top: 74, w: 48, h: 34, dx: -10, dy: 55 },
  { left: 56, top: 72, w: 46, h: 36, dx: 35, dy: 50 },
  { left: 80, top: 70, w: 44, h: 34, dx: 62, dy: 42 },
];

const INTRO_MIN_MS = 2400;

const ObraversePage = () => {
  const [reveal, setReveal] = useState(false);
  const [introGone, setIntroGone] = useState(false);
  const mapWrapRef = useRef<HTMLDivElement>(null);

  /* Intro: hold the cloud sky while the map's key layers load, then part. */
  useEffect(() => {
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const preload = (src: string) =>
      new Promise<void>(res => {
        const img = new Image();
        img.onload = () => res();
        img.onerror = () => res();
        img.src = src;
      });
    const assets = Promise.all([
      preload('/images/obraverse/base.webp'),
      preload('/images/obraverse/trees.webp'),
    ]);
    const minHold = new Promise<void>(res => { timers.push(setTimeout(res, INTRO_MIN_MS)); });
    // never hold the page hostage if an asset stalls
    const failsafe = new Promise<void>(res => { timers.push(setTimeout(res, 7000)); });
    Promise.race([Promise.all([assets, minHold]), failsafe]).then(() => {
      if (cancelled) return;
      // desktop only: position the view near the plaza while the clouds still
      // cover the screen; mobile starts at the top of the map
      const el = mapWrapRef.current;
      if (el && window.matchMedia('(min-width: 768px)').matches) {
        const top = el.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: top + el.offsetHeight * 0.72 - window.innerHeight / 2, behavior: 'instant' });
      }
      setReveal(true);
      timers.push(setTimeout(() => { if (!cancelled) setIntroGone(true); }, 1900));
    });
    return () => { cancelled = true; timers.forEach(clearTimeout); };
  }, []);

  return (
    <main className="min-h-screen bg-white overflow-x-clip">
      <Navbar />

      {/* Spacer to push content below fixed navbar */}
      <div style={{ height: '80px' }} />

      {/* Wordmark bar — scrolls away with the page (sticky version slid under
          the fixed navbar and its border showed as a stray line) */}
      <div className="bg-white border-b border-[#e4e3e2]">
        <div className="flex items-center px-6 md:px-10 py-3">
          <div className="flex items-baseline">
            <span
              className="text-[32px] md:text-[56px] lg:text-[68px] leading-none tracking-[-2px] text-[#383838] font-bold"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              OBRA
            </span>
            <span
              className="text-[32px] md:text-[56px] lg:text-[68px] leading-none tracking-[-2px] text-[#383838] font-thin"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              verse
            </span>
          </div>
        </div>
      </div>

      {/* Explorable map — full width, natural height */}
      <div
        ref={mapWrapRef}
        className="relative w-full"
        style={{
          aspectRatio: '1920 / 3049',
          opacity: reveal ? 1 : 0,
          // 'none', not scale(1): any transform here would make this box the
          // containing block of the map's fixed controls and strand them at
          // the map's far bottom edge, below the fold
          transform: reveal ? 'none' : 'scale(1.02)',
          transition: 'opacity 1.2s ease 0.3s, transform 1.4s ease 0.3s',
        }}
      >
        <ObraverseMap />
      </div>

      {/* Cloud intro — a sky of clouds parts to reveal the OBRAverse */}
      {!introGone && (
        <div
          className="fixed inset-0 z-[60] overflow-hidden"
          style={{ pointerEvents: reveal ? 'none' : 'auto' }}
        >
          {/* sky backdrop — faint cool tint so the white clouds read */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(180deg, #e4e3e2 0%, #e4e3e2 55%, #e4e3e2 100%)',
              opacity: reveal ? 0 : 1,
              transition: 'opacity 1.1s ease 0.35s',
            }}
          />
          {/* clouds */}
          {INTRO_CLOUDS.map((c, i) => (
            <div
              key={i}
              aria-hidden="true"
              className="absolute"
              style={{
                left: `${c.left}%`,
                top: `${c.top}%`,
                width: `${c.w}vw`,
                height: `${c.h}vh`,
                background: [
                  'radial-gradient(ellipse 55% 55% at 38% 55%, rgba(255,255,255,1) 0%, rgba(255,255,255,0.85) 40%, transparent 72%)',
                  'radial-gradient(ellipse 48% 52% at 64% 42%, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.7) 45%, transparent 74%)',
                  'radial-gradient(ellipse 40% 45% at 80% 60%, rgba(252,252,253,0.95) 0%, transparent 70%)',
                ].join(', '),
                filter: 'blur(6px)',
                opacity: reveal ? 0 : 1,
                transform: reveal ? `translate(${c.dx}vw, ${c.dy}vh) scale(1.18)` : 'none',
                transition: `transform 1.7s cubic-bezier(0.4, 0, 0.6, 1) ${i * 45}ms, opacity 1.5s ease ${150 + i * 45}ms`,
              }}
            />
          ))}
          {/* wordmark */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-4"
            style={{ opacity: reveal ? 0 : 1, transition: 'opacity 0.5s ease' }}
          >
            <div
              className="text-[56px] md:text-[84px] leading-none tracking-[-2px] text-[#383838] font-bold"
              style={{ fontFamily: 'var(--font-display)', animation: 'obraverse-intro-rise 1.1s cubic-bezier(0.22, 1, 0.36, 1) both' }}
            >
              OBRA<span className="font-thin">verse</span>
            </div>
            <div
              className="text-[10px] md:text-[11px] tracking-[3.5px] text-[#797979]"
              style={{ animation: 'obraverse-intro-fade 0.9s ease 0.75s both' }}
            >
              A LIVING MAP OF THE STUDIO’S WORK
            </div>
          </div>
          <style>{`
            @keyframes obraverse-intro-rise {
              from { opacity: 0; transform: translateY(26px); }
              to { opacity: 1; transform: translateY(0); }
            }
            @keyframes obraverse-intro-fade {
              from { opacity: 0; }
              to { opacity: 1; }
            }
          `}</style>
        </div>
      )}

      {/* CTA below map */}
      <div className="w-full bg-[#e4e3e2] border-t border-[#e4e3e2] py-14 md:py-20 px-6 md:px-20">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-start lg:items-stretch justify-between gap-8 md:gap-10">

          {/* Left — copy */}
          <div className="flex flex-col gap-4 max-w-lg">
            <h2
              className="font-normal text-subhead text-[#383838] text-balance"
            >
              Work with us — and your project becomes part of <strong className="font-bold">OBRAverse</strong>.
            </h2>
            <p
              className="text-[14px] md:text-[15px] text-[#797979] leading-[1.55] md:leading-relaxed text-pretty"
            >
              Every project on this map was designed by Obra Majoralia. Commission a project with us and it earns its place here — a living record of the studio’s work, built and in&nbsp;progress.
            </p>
          </div>

          {/* Right — two buttons stacked, vertically centered to copy block */}
          <div className="flex flex-col gap-3 shrink-0 justify-center">
            <a
              href="/contact"
              className="border border-[#383838] bg-[#383838] text-white px-10 py-3 text-[11px] tracking-[2px] hover:bg-transparent hover:text-[#383838] transition-all duration-300 cursor-pointer text-center rounded-full whitespace-nowrap"
            >
              START A PROJECT
            </a>
            <a
              href="/projects"
              className="border border-[#e4e3e2] text-[#797979] px-10 py-3 text-[11px] tracking-[2px] hover:border-[#383838] hover:text-[#383838] transition-all duration-300 cursor-pointer text-center rounded-full whitespace-nowrap"
            >
              VIEW ALL PROJECTS
            </a>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
};

export default ObraversePage;
