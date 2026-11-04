import FadeIn from '@/components/base/FadeIn';
import { sizedImage } from '@/components/base/sizedImage';

interface Props {
  images: string[];
  title: string;
  /** number of the first plate (plates before this one live elsewhere on the page) */
  start?: number;
  /** caption colour, so it follows the page's day/night palette */
  captionColor: string;
}

type Plate =
  | { kind: 'full'; src: string; n: number }
  | { kind: 'inset'; src: string; n: number }
  | { kind: 'pair'; srcs: [string, string]; n: number };

// full-bleed → pair → inset → pair → … ; a pair with one image left becomes an inset
const PATTERN: Plate['kind'][] = ['full', 'pair', 'inset', 'pair'];

const toPlates = (images: string[], start: number): Plate[] => {
  const plates: Plate[] = [];
  let i = 0;
  let p = 0;
  let n = start;
  while (i < images.length) {
    const kind = PATTERN[p % PATTERN.length];
    if (kind === 'pair' && i + 1 < images.length) {
      plates.push({ kind: 'pair', srcs: [images[i], images[i + 1]], n });
      i += 2;
      n += 2;
    } else {
      plates.push({ kind: kind === 'pair' ? 'inset' : kind, src: images[i], n } as Plate);
      i += 1;
      n += 1;
    }
    p++;
  }
  return plates;
};

// plate numbers without leading zeros (brand rule)
const num = (n: number) => String(n);

const Img = ({ src, alt, sizes, className }: { src: string; alt: string; sizes: string; className: string }) => (
  <img
    src={sizedImage(src)}
    srcSet={`${sizedImage(src)} 960w, ${src} 2560w`}
    sizes={sizes}
    onError={(e) => {
      const img = e.currentTarget;
      if (img.srcset) { img.srcset = ''; img.src = src; }
    }}
    alt={alt}
    loading="lazy"
    decoding="async"
    className={className}
  />
);

// The project's images as a sequence of numbered plates with real gutters and
// space between them; each plate uncovers upward as it scrolls into view.
const ProjectPlates = ({ images, title, start = 1, captionColor }: Props) => {
  const plates = toPlates(images, start);
  const caption = (label: string) => (
    <figcaption className="pt-3 text-[11px] tracking-[2px] uppercase" style={{ color: captionColor }}>
      {label}
    </figcaption>
  );

  return (
    <div className="flex flex-col gap-12 md:gap-28 py-12 md:py-28">
      {plates.map((plate) => {
        if (plate.kind === 'full') {
          return (
            <figure key={plate.n}>
              <FadeIn direction="reveal">
                {/* phones: the photo at its own proportions (a 56vh box cropped
                    landscape renders into tall slivers); md+: full-height plate */}
                <div className="md:h-[92vh] overflow-hidden">
                  <Img src={plate.src} alt={`${title}, plate ${plate.n}`} sizes="100vw" className="w-full h-auto max-h-[80svh] md:h-full md:max-h-none object-cover object-center" />
                </div>
              </FadeIn>
              <div className="px-6 md:px-16">{caption(num(plate.n))}</div>
            </figure>
          );
        }
        if (plate.kind === 'inset') {
          return (
            <figure key={plate.n} className="px-6 md:px-16 lg:px-[14%]">
              <FadeIn direction="reveal">
                <Img src={plate.src} alt={`${title}, plate ${plate.n}`} sizes="(min-width: 1024px) 72vw, 100vw" className="w-full h-auto max-h-[88vh] object-cover object-center" />
              </FadeIn>
              {caption(num(plate.n))}
            </figure>
          );
        }
        return (
          <figure key={plate.n} className="px-6 md:px-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
              {plate.srcs.map((src, j) => (
                <FadeIn key={src} direction="reveal" delay={j * 120}>
                  <div className="aspect-[4/3] overflow-hidden">
                    <Img src={src} alt={`${title}, plate ${plate.n + j}`} sizes="(min-width: 768px) 50vw, 100vw" className="w-full h-full object-cover object-center" />
                  </div>
                </FadeIn>
              ))}
            </div>
            {caption(`${num(plate.n)} — ${num(plate.n + 1)}`)}
          </figure>
        );
      })}
    </div>
  );
};

export default ProjectPlates;
