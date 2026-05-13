import React from 'react';

interface OptimizedImgProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
}

const toWebP = (src: string) => src.replace(/\.(jpg|jpeg|png)(\?.*)?$/i, '.webp$2');

/**
 * Serves WebP when available, falls back to original format.
 * Drop-in replacement for <img> — all props pass through.
 */
const OptimizedImg = ({ src, alt, className, style, ...rest }: OptimizedImgProps) => (
  <picture style={{ display: 'contents' }}>
    <source srcSet={toWebP(src)} type="image/webp" />
    <img src={src} alt={alt} className={className} style={style} {...rest} />
  </picture>
);

export default OptimizedImg;
