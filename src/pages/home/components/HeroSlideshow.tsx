import { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Project } from '@/mocks/projects';
import { coverSrcSet, sizedImage } from '@/components/base/sizedImage';

interface HeroSlideshowProps {
  projects: Project[];
  /** While false, autoplay stays paused on the current slide (used to hold
   *  on slide 1 while the cinematic intro plays over it). Defaults to true. */
  autoplay?: boolean;
}

const HeroSlideshow = ({ projects, autoplay = true }: HeroSlideshowProps) => {
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
    if (!autoplay) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    resetTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [resetTimer, autoplay]);

  const project = projects[current];

  // only fetch the slide on screen and the one after it; the rest load as the
  // slideshow reaches them (stacked slides all count as "visible" to the browser)
  const [loaded, setLoaded] = useState<Set<number>>(() => new Set([0, 1]));
  useEffect(() => {
    setLoaded(prev => {
      const next = (current + 1) % projects.length;
      if (prev.has(current) && prev.has(next)) return prev;
      return new Set([...prev, current, next]);
    });
  }, [current, projects.length]);

  return (
    <div className="relative w-full h-[100svh] overflow-hidden" data-theme="dark">

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
          {loaded.has(i) && (
            <img
              src={sizedImage(p.imageUrl, 'thumbs-1600')}
              srcSet={coverSrcSet(p.imageUrl)}
              sizes="100vw"
              onError={(e) => {
                const img = e.currentTarget;
                if (img.srcset) { img.srcset = ''; img.src = p.imageUrl; }
              }}
              alt={p.title}
              fetchPriority={i === 0 ? 'high' : 'auto'}
              decoding="async"
              className="w-full h-full object-cover object-top"
              style={{ animation: 'kenBurns 10s ease-in-out infinite alternate' }}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#383838]/60 via-[#383838]/10 to-transparent pointer-events-none" />
        </div>
      ))}

      {/* Bottom info bar — held back until the intro has dissolved, so its
          text never shows through the intro's title mid-fade */}
      <div
        className="absolute bottom-0 left-0 right-0 z-30 pointer-events-none"
        style={{
          opacity: autoplay ? 1 : 0,
          transition: autoplay ? 'opacity 0.9s ease 1.1s' : 'none',
        }}
      >
        <div className="px-6 md:px-14 pb-[max(2rem,env(safe-area-inset-bottom))] md:pb-14 pointer-events-none">

          {/* Title — crossfades between slides */}
          <div className="relative overflow-hidden mb-3 md:mb-4" style={{ minHeight: '1.2em' }}>
            {projects.map((p, i) => (
              <h2
                key={p.id}
                className="font-bold text-white text-[26px] md:text-[44px] lg:text-[56px] leading-[1.05] tracking-[-0.02em] absolute inset-x-0 top-0"
                style={{
                  opacity: i === current ? 1 : 0,
                  transform: i === current ? 'translateY(0)' : 'translateY(10px)',
                  transition: 'opacity 0.7s ease, transform 0.7s ease',
                  transitionDelay: i === current ? '0.3s' : '0s',
                  position: i === current ? 'relative' : 'absolute',
                }}
              >
                {p.title}
              </h2>
            ))}
          </div>

          {/* Progress lines only — no counter here */}
          <div className="flex items-center gap-1 mb-2 md:mb-4 pointer-events-auto">
            {projects.map((p, i) => (
              <button
                key={p.id}
                type="button"
                onClick={() => { goTo(i); resetTimer(); }}
                aria-label={`Go to ${p.title}`}
                className="flex-1 h-6 md:h-4 cursor-pointer relative flex items-center"
              >
                <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-white/30 w-full" />
                {i === current && autoplay && (
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

          {/* Location over typology on the left, counter over View Project on the
              right — phones keep each pair on its own row so long locations wrap
              inside their column instead of pushing the typology around */}
          <div className="grid grid-cols-[1fr_auto] md:flex md:items-end md:justify-between gap-x-6 gap-y-2 md:gap-0 pointer-events-none">
            <p className="min-w-0 text-white text-[11px] md:text-[15px] leading-[1.4] tracking-[1.5px] md:tracking-[2.6px] font-semibold md:order-1">
              {project.location.toUpperCase()}
            </p>
            <span className="text-[#e4e3e2] text-[11px] md:text-[13px] leading-[1.4] tracking-[1.5px] md:tracking-[2px] font-semibold whitespace-nowrap text-right md:hidden">
              {current + 1} / {projects.length}
            </span>
            <p className="text-[#e4e3e2] md:text-white text-[11px] md:text-[15px] leading-[1.4] tracking-[1.5px] md:tracking-[2px] font-semibold md:order-2 md:mr-auto md:ml-8">
              {project.typology.toUpperCase()}
            </p>
            <div className="flex flex-col items-end gap-1 pointer-events-auto md:order-3">
              <span className="hidden md:block text-[#e4e3e2] text-[13px] tracking-[2px] font-semibold whitespace-nowrap">
                {current + 1} / {projects.length}
              </span>
              <Link
                to={`/projects/${project.id}`}
                className="-my-3 py-3 md:my-0 md:py-0 text-[11px] md:text-[13px] leading-[1.4] tracking-[1.5px] md:tracking-[2px] font-semibold text-white hover:text-[#e4e3e2] transition-colors duration-200 uppercase whitespace-nowrap"
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
        className="absolute left-1 md:left-6 top-1/2 -translate-y-1/2 z-40 w-11 h-11 md:w-10 md:h-10 flex items-center justify-center text-[#e4e3e2] hover:text-white transition-colors duration-200 cursor-pointer"
        aria-label="Previous project"
      >
        <i className="ri-arrow-left-s-line text-2xl md:text-3xl" />
      </button>

      {/* Next arrow */}
      <button
        type="button"
        onClick={() => { goNext(); resetTimer(); }}
        className="absolute right-1 md:right-6 top-1/2 -translate-y-1/2 z-40 w-11 h-11 md:w-10 md:h-10 flex items-center justify-center text-[#e4e3e2] hover:text-white transition-colors duration-200 cursor-pointer"
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
