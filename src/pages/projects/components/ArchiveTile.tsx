import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Project } from '@/mocks/projects';

interface Props {
  project: Project;
  index: number;
  total: number;
}

const ArchiveTile = ({ project, index, total }: Props) => {
  const images = [project.imageUrl, ...(project.galleryImages ?? [])].filter(Boolean);
  const [imgIndex, setImgIndex] = useState(0);
  const navigate = useNavigate();

  const prev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setImgIndex(i => (i - 1 + images.length) % images.length);
  };

  const next = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setImgIndex(i => (i + 1) % images.length);
  };

  const handleTileClick = (e: React.MouseEvent) => {
    // Only navigate if the click wasn't on an arrow button
    const target = e.target as HTMLElement;
    if (target.closest('button')) return;
    navigate(`/projects/${project.id}`);
  };

  return (
    <div
      onClick={handleTileClick}
      className="relative group overflow-hidden block cursor-pointer"
    >
      {/* Image — fixed aspect ratio, uniform across all tiles */}
      <div className="relative w-full" style={{ aspectRatio: '5/3' }}>
        {images.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={project.title}
            className={[
              'absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-500 ease-out',
              i === imgIndex ? 'opacity-100' : 'opacity-0',
            ].join(' ')}
          />
        ))}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/35 transition-all duration-500 ease-out" />

        {/* Left / Right arrows — centered vertically, always visible on hover */}
        {images.length > 1 && (
          <>
            {/* Left arrow */}
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
              aria-label="Previous image"
            >
              <span className="w-7 h-7 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/40 transition-colors duration-200">
                <i className="ri-arrow-left-s-line text-white text-sm" />
              </span>
            </button>

            {/* Right arrow */}
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
              aria-label="Next image"
            >
              <span className="w-7 h-7 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/40 transition-colors duration-200">
                <i className="ri-arrow-right-s-line text-white text-sm" />
              </span>
            </button>
          </>
        )}

        {/* Dot indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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

        {/* Info — hover only on all tiles */}
        <div className="absolute inset-0 flex flex-col justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-400 ease-out pointer-events-none">
          <div className="flex justify-end">
            <span
              className="text-[9px] tracking-[2.5px] text-white/75"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              {String(index + 1).padStart(2, '0')}/{String(total).padStart(2, '0')}
            </span>
          </div>
          <div>
            <p
              className="text-[9px] tracking-[2.2px] text-white/65 mb-[5px]"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              {project.typology.toUpperCase()} &nbsp;·&nbsp; {project.location}
            </p>
            <h3
              className="text-base md:text-lg text-white leading-snug tracking-[-0.2px]"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              {project.title}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchiveTile;
