import React from 'react';

interface OptimizedImgProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  quality?: number;
}

const OptimizedImg = ({ src, alt, width: _width, quality: _quality, className, style, ...rest }: OptimizedImgProps) => (
  <img src={src} alt={alt} className={className} style={style} {...rest} />
);

export default OptimizedImg;
