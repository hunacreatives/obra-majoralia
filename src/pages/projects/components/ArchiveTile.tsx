import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Project } from '@/mocks/projects';
import OptimizedImg from '@/components/base/OptimizedImg';

interface Props {
  project: Project;
}

// 960px grid copies from scripts/make-thumbs.mjs; the tile falls back to the
// original if a thumb is missing.
const thumb = (src: string) =>
  src.replace(/^\/images\//, '/images/thumbs/').replace(/\.(jpe?g|png)$/i, '.webp');

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
      <div className="relative w-full aspect-[3/2] sm:aspect-[5/3]">
        {/* Single image — swapped on nav, not all stacked in DOM */}
        <OptimizedImg
          src={thumb(images[imgIndex])}
          onError={(e) => {
            const img = e.currentTarget;
            if (!img.src.endsWith(images[imgIndex])) img.src = images[imgIndex];
          }}
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
        <div className="absolute inset-0 bg-[#383838]/0 md:group-hover:bg-[#383838]/20 transition-all duration-500 ease-out" />

        {/* Left / Right arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 hidden md:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
              aria-label="Previous image"
            >
              <span className="w-7 h-7 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/40 transition-colors duration-200">
                <i className="ri-arrow-left-s-line text-white text-base" />
              </span>
            </button>

            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 hidden md:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
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
          <div className="absolute top-3 left-1/2 -translate-x-1/2 hidden md:flex gap-1 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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

        {/* Name on the photo — always visible */}
        <div className="absolute inset-x-0 bottom-0 pt-16 px-6 sm:px-3 md:px-5 pb-4 sm:pb-3 md:pb-4 bg-gradient-to-t from-[#383838]/75 via-[#383838]/25 to-transparent pointer-events-none">
          <h3 className="text-[17px] sm:text-[14px] md:text-[15px] font-bold leading-tight tracking-[-0.01em] text-white">
            {project.title}
          </h3>
          <p className="mt-1 text-[10px] md:text-[11px] tracking-[1.5px] text-[#e4e3e2] uppercase">
            {project.typology} · {project.year}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ArchiveTile;
