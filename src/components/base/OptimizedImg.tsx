import React from 'react';

interface OptimizedImgProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  quality?: number;
}

const toWebP = (src: string) => src.replace(/\.(jpg|jpeg|png)(\?.*)?$/i, '.webp$2');

const OptimizedImg = ({ src, alt, width: _w, quality: _q, className, style, ...rest }: OptimizedImgProps) => (
  <img
    src={toWebP(src)}
    alt={alt}
    className={className}
    style={style}
    onError={(e) => { (e.currentTarget as HTMLImageElement).src = src; }}
    {...rest}
  />
);

export default OptimizedImg;
