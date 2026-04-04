import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Project } from '@/mocks/projects';

interface HeroSlideshowProps {
  projects: Project[];
}

const HeroSlideshow = ({ projects }: HeroSlideshowProps) => {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [animating, setAnimating] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (animating || index === current) return;
      setPrev(current);
      setAnimating(true);
      setCurrent(index);
      setTimeout(() => {
        setPrev(null);
        setAnimating(false);
      }, 900);
    },
    [animating, current],
  );

  const goNext = useCallback(() => {
    goTo((current + 1) % projects.length);
  }, [current, projects.length, goTo]);

  const goPrev = useCallback(() => {
    goTo((current - 1 + projects.length) % projects.length);
  }, [current, projects.length, goTo]);

  useEffect(() => {
    const timer = setInterval(goNext, 5000);
    return () => clearInterval(timer);
  }, [goNext]);

  const project = projects[current];
  const prevProject = prev !== null ? projects[prev] : null;

  return (
    <div className="relative w-full h-screen overflow-hidden" data-theme="dark">

      {/* Outgoing slide */}
      {prevProject && (
        <div
          key={`prev-${prev}`}
          className="absolute inset-0 z-10"
          style={{ animation: 'heroSlideOut 0.9s cubic-bezier(0.4,0,0.2,1) forwards' }}
        >
          <img
            src={prevProject.imageUrl}
            alt={prevProject.title}
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
        </div>
      )}

      {/* Active slide */}
      <div
        className="absolute inset-0 z-20"
        key={`slide-${current}`}
        style={{ animation: 'heroSlideIn 0.9s cubic-bezier(0.4,0,0.2,1) forwards' }}
      >
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-cover object-top"
          style={{ animation: 'kenBurns 8s ease-in-out forwards' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />
      </div>

      {/* Bottom info bar */}
      <div className="absolute bottom-0 left-0 right-0 z-30 pointer-events-none">
        <div className="px-6 md:px-14 pb-8 md:pb-14 pointer-events-none">
          <h1
            className="text-white text-2xl md:text-5xl lg:text-6xl leading-tight tracking-[-0.5px] md:tracking-[-1px] mb-3 md:mb-4 font-bold"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            {project.title}
          </h1>

          {/* Counter + progress lines */}
          <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4 pointer-events-auto">
            <span
              className="text-white/80 text-[10px] md:text-[11px] tracking-[2px] md:tracking-[3px] font-semibold whitespace-nowrap flex-shrink-0"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              {String(current + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
            </span>
            <div className="flex items-center gap-1 flex-1">
              {projects.map((p, i) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Go to ${p.title}`}
                  className="flex-1 h-4 cursor-pointer relative flex items-center"
                >
                  <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-white/30 w-full" />
                  {i === current && (
                    <span
                      className="absolute left-0 top-1/2 -translate-y-1/2 h-[1px] bg-white"
                      style={{ animation: 'progressFill 5s linear forwards' }}
                    />
                  )}
                  {i < current && (
                    <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-white/70" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Location / Typology / View Project */}
          <div className="flex items-center justify-between pointer-events-none">
            <div className="flex items-center gap-4 md:gap-8 flex-wrap">
              <p
                className="text-white text-[10px] md:text-[13px] tracking-[2px] md:tracking-[2.6px] font-semibold"
                style={{ fontFamily: 'var(--font-sans)' }}
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
            <Link
              to={`/projects/${project.id}`}
              className="pointer-events-auto text-[10px] md:text-[11px] tracking-[2px] md:tracking-[3px] font-semibold text-white border-b border-white/60 pb-[2px] hover:border-white transition-colors duration-200 uppercase whitespace-nowrap"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              View Project
            </Link>
          </div>
        </div>
      </div>

      {/* Prev arrow */}
      <button
        type="button"
        onClick={goPrev}
        className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-40 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center text-white/70 hover:text-white transition-colors duration-200 cursor-pointer"
        aria-label="Previous project"
      >
        <i className="ri-arrow-left-s-line text-2xl md:text-3xl" />
      </button>

      {/* Next arrow */}
      <button
        type="button"
        onClick={goNext}
        className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-40 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center text-white/70 hover:text-white transition-colors duration-200 cursor-pointer"
        aria-label="Next project"
      >
        <i className="ri-arrow-right-s-line text-2xl md:text-3xl" />
      </button>

      <style>{`
        @keyframes heroSlideIn {
          from { opacity: 0; transform: scale(1.03); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes heroSlideOut {
          from { opacity: 1; transform: scale(1); }
          to   { opacity: 0; transform: scale(0.97); }
        }
        @keyframes progressFill {
          from { width: 0%; }
          to   { width: 100%; }
        }
        @keyframes kenBurns {
          0%   { transform: scale(1.08); transform-origin: 60% 40%; }
          50%  { transform: scale(1);    transform-origin: 40% 60%; }
          100% { transform: scale(1.06); transform-origin: 55% 45%; }
        }
      `}</style>
    </div>
  );
};

export default HeroSlideshow;
