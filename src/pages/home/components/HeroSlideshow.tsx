import { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Project } from '@/mocks/projects';

interface HeroSlideshowProps {
  projects: Project[];
}

const HeroSlideshow = ({ projects }: HeroSlideshowProps) => {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback(
    (index: number) => {
      if (animating || index === current) return;
      setAnimating(true);
      setCurrent(index);
      setTimeout(() => setAnimating(false), 1200);
    },
    [animating, current],
  );

  const goNext = useCallback(() => {
    goTo((current + 1) % projects.length);
  }, [current, projects.length, goTo]);

  const goPrev = useCallback(() => {
    goTo((current - 1 + projects.length) % projects.length);
  }, [current, projects.length, goTo]);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(goNext, 5500);
  }, [goNext]);

  useEffect(() => {
    resetTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [resetTimer]);

  const project = projects[current];

  return (
    <div className="relative w-full h-screen overflow-hidden" data-theme="dark">

      {/* All slides stacked — only active one is visible */}
      {projects.map((p, i) => (
        <div
          key={p.id}
          className="absolute inset-0"
          style={{
            zIndex: i === current ? 2 : 1,
            opacity: i === current ? 1 : 0,
            transition: 'opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <img
            src={p.imageUrl}
            alt={p.title}
            className="w-full h-full object-cover object-top"
            style={{ animation: 'kenBurns 10s ease-in-out infinite alternate' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />
        </div>
      ))}

      {/* Bottom info bar */}
      <div className="absolute bottom-0 left-0 right-0 z-30 pointer-events-none">
        <div className="px-6 md:px-14 pb-8 md:pb-14 pointer-events-none">

          {/* Title — crossfades between slides */}
          <div className="relative overflow-hidden mb-3 md:mb-4" style={{ minHeight: '1.2em' }}>
            {projects.map((p, i) => (
              <h1
                key={p.id}
                className="text-white text-2xl md:text-5xl lg:text-6xl leading-tight tracking-[-0.5px] md:tracking-[-1px] font-bold absolute inset-x-0 top-0"
                style={{
                  fontFamily: 'var(--font-serif)',
                  opacity: i === current ? 1 : 0,
                  transform: i === current ? 'translateY(0)' : 'translateY(10px)',
                  transition: 'opacity 0.7s ease, transform 0.7s ease',
                  transitionDelay: i === current ? '0.3s' : '0s',
                  position: i === current ? 'relative' : 'absolute',
                }}
              >
                {p.title}
              </h1>
            ))}
          </div>

          {/* Progress lines only — no counter here */}
          <div className="flex items-center gap-1 mb-3 md:mb-4 pointer-events-auto">
            {projects.map((p, i) => (
              <button
                key={p.id}
                type="button"
                onClick={() => { goTo(i); resetTimer(); }}
                aria-label={`Go to ${p.title}`}
                className="flex-1 h-4 cursor-pointer relative flex items-center"
              >
                <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-white/30 w-full" />
                {i === current && (
                  <span
                    key={`progress-${current}`}
                    className="absolute left-0 top-1/2 -translate-y-1/2 h-[1px] bg-white"
                    style={{ animation: 'progressFill 5.5s linear forwards' }}
                  />
                )}
                {i < current && (
                  <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-white/70" />
                )}
              </button>
            ))}
          </div>

          {/* Location / Typology left — Counter + View Project stacked right */}
          <div className="flex items-end justify-between pointer-events-none">
            <div className="flex items-center gap-4 md:gap-8 flex-wrap">
              <p
                className="text-white text-[10px] md:text-[13px] tracking-[2px] md:tracking-[2.6px] font-semibold"
                style={{
                  fontFamily: 'var(--font-sans)',
                  opacity: 1,
                  transition: 'opacity 0.5s ease',
                }}
              >
                {project.location.toUpperCase()}
              </p>
              <p
                className="text-white text-[10px] md:text-[13px] tracking-[2px] md:tracking-[3px] font-semibold"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                {project.typology.toUpperCase()}
              </p>
            </div>

            {/* Right column: counter on top, View Project below */}
            <div className="flex flex-col items-end gap-1 pointer-events-auto">
              <span
                className="text-white/60 text-[10px] md:text-[11px] tracking-[2px] md:tracking-[3px] font-semibold whitespace-nowrap"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                {String(current + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
              </span>
              <Link
                to={`/projects/${project.id}`}
                className="text-[10px] md:text-[11px] tracking-[2px] md:tracking-[3px] font-semibold text-white hover:text-white/70 transition-colors duration-200 uppercase whitespace-nowrap"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                View Project
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Prev arrow */}
      <button
        type="button"
        onClick={() => { goPrev(); resetTimer(); }}
        className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-40 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center text-white/70 hover:text-white transition-colors duration-200 cursor-pointer"
        aria-label="Previous project"
      >
        <i className="ri-arrow-left-s-line text-2xl md:text-3xl" />
      </button>

      {/* Next arrow */}
      <button
        type="button"
        onClick={() => { goNext(); resetTimer(); }}
        className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-40 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center text-white/70 hover:text-white transition-colors duration-200 cursor-pointer"
        aria-label="Next project"
      >
        <i className="ri-arrow-right-s-line text-2xl md:text-3xl" />
      </button>

      <style>{`
        @keyframes progressFill {
          from { width: 0%; }
          to   { width: 100%; }
        }
        @keyframes kenBurns {
          0%   { transform: scale(1) translate(0%, 0%); }
          100% { transform: scale(1.06) translate(-1%, -0.5%); }
        }
      `}</style>
    </div>
  );
};

export default HeroSlideshow;
