import React from 'react';

interface OptimizedImgProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  /** Target display width — used to serve an appropriately sized image */
  width?: number;
  /** 0-100, defaults to 80 */
  quality?: number;
}

/**
 * In production (Vercel), routes through /_vercel/image which:
 * - Resizes to the requested width
 * - Converts to WebP for supporting browsers
 * - Compresses at the given quality
 * - Caches at the edge
 *
 * In dev, serves the original file unchanged.
 */
const optimizedSrc = (src: string, width: number, quality: number): string => {
  if (!import.meta.env.PROD || !src.startsWith('/')) return src;
  return `/_vercel/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality}`;
};

const OptimizedImg = ({
  src,
  alt,
  width = 1200,
  quality = 80,
  className,
  style,
  ...rest
}: OptimizedImgProps) => (
  <img
    src={optimizedSrc(src, width, quality)}
    alt={alt}
    className={className}
    style={style}
    {...rest}
  />
);

export default OptimizedImg;
