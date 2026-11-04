// Paths to the resized copies made by scripts/make-thumbs.mjs.
// thumbs: 960px wide (every project image); thumbs-1600 and thumbs-2400: covers only.
export const sizedImage = (src: string, dir: 'thumbs' | 'thumbs-1600' | 'thumbs-2400' = 'thumbs') =>
  src.replace(/^\/images\//, `/images/${dir}/`).replace(/\.(jpe?g|png)$/i, '.webp');

// srcSet for a project cover: 960 / 1600 / 2400 copies.
export const coverSrcSet = (src: string) =>
  `${sizedImage(src)} 960w, ${sizedImage(src, 'thumbs-1600')} 1600w, ${sizedImage(src, 'thumbs-2400')} 2400w`;
