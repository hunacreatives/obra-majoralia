import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Project } from '@/mocks/projects';
import OptimizedImg from '@/components/base/OptimizedImg';

interface Props {
  project: Project;
}

const ArchiveTile = ({ project }: Props) => {
  const extras = project.tileImages ?? project.galleryImages?.slice(0, 5) ?? [];
  const images = [project.imageUrl, ...extras].filter(Boolean) as string[];
  const [imgIndex, setImgIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const navigate = useNavigate();

  const changeTo = useCallback((newIndex: number) => {
    setVisible(false);
    setTimeout(() => {
      setImgIndex(newIndex);
      setVisible(true);
    }, 180);
  }, []);

  const prev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    changeTo((imgIndex - 1 + images.length) % images.length);
  };

  const next = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    changeTo((imgIndex + 1) % images.length);
  };

  const handleTileClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('button')) return;
    navigate(`/projects/${project.id}`);
  };

  return (
    <div
      onClick={handleTileClick}
      className="relative group overflow-hidden block cursor-pointer"
    >
      <div className="relative w-full" style={{ aspectRatio: '5/3' }}>
        {/* Single image — swapped on nav, not all stacked in DOM */}
        <OptimizedImg
          src={images[imgIndex]}
          alt={project.title}
          width={800}
          loading="lazy"
          decoding="async"
          className={[
            'absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-[180ms] ease-out',
            visible ? 'opacity-100' : 'opacity-0',
          ].join(' ')}
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/35 transition-all duration-500 ease-out" />

        {/* Left / Right arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
              aria-label="Previous image"
            >
              <span className="w-7 h-7 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/40 transition-colors duration-200">
                <i className="ri-arrow-left-s-line text-white text-base" />
              </span>
            </button>

            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
              aria-label="Next image"
            >
              <span className="w-7 h-7 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/40 transition-colors duration-200">
                <i className="ri-arrow-right-s-line text-white text-base" />
              </span>
            </button>
          </>
        )}

        {/* Dot indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1 z-10 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
            {images.map((_, i) => (
              <span
                key={i}
                className={[
                  'block rounded-full transition-all duration-300',
                  i === imgIndex ? 'w-3 h-[3px] bg-white' : 'w-[3px] h-[3px] bg-white/50',
                ].join(' ')}
              />
            ))}
          </div>
        )}

        {/* Info — always visible on mobile, hover reveal on desktop */}
        <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-400 ease-out pointer-events-none">
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/60 to-transparent md:hidden" />
          <h3
            className="relative text-sm md:text-lg text-white leading-snug tracking-[-0.2px]"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            {project.title}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default ArchiveTile;
