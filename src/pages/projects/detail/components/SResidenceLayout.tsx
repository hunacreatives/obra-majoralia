import { Project, projects } from '@/mocks/projects';
import ProjectMoreProjects from './ProjectMoreProjects';
import MaterialBreakdown, { Material } from './MaterialBreakdown';
import { useNightMode } from '@/contexts/useNightMode';
import DayNightToggle from './DayNightToggle';

interface Props { project: Project; }

// The studio's material board rebuilt as UI. Textures are HD CC0 photos (ambientCG,
// Poly Haven) colour-matched to their board; card positions measured from the board
// image (public/images/s-residence-materials.webp).
const S_RESIDENCE_MATERIALS: Material[] = [
  { name: 'Beige', finish: 'Adobe Stone', build: 'texture', texture: '/images/s-residence-materials/hd/beige-adobe-stone.webp', scale: '260%', box: { left: 2, top: 2.1, width: 53.1, height: 95.8 }, z: 1, label: 'top-left' },
  { name: 'Stucco', finish: 'Paint Finish', build: 'texture', texture: '/images/s-residence-materials/hd/stucco.webp', scale: '180%', box: { left: 55.6, top: 7.1, width: 41.6, height: 77 }, z: 1, label: 'top-right' },
  { name: 'Oak Wood', finish: 'Finish', build: 'texture', texture: '/images/s-residence-materials/hd/oak-wood.webp', scale: '140%', box: { left: 22.2, top: 18.8, width: 50, height: 40.5 }, z: 2, label: 'top-left' },
  { name: 'Grey', finish: 'Ledgestone', build: 'ledgestone', texture: '/images/s-residence-materials/hd/ledgestone-face.webp', box: { left: 17.9, top: 58, width: 29.1, height: 30.4 }, z: 3, label: 'top-left', dark: true },
  { name: 'Natural Oak', finish: 'Wood Slats', build: 'slats', texture: '/images/s-residence-materials/hd/oak-slat.webp', box: { left: 46.9, top: 46.9, width: 33.9, height: 46.9 }, z: 3, label: 'bottom-right', dark: true },
  { name: 'Solid Gray', finish: 'Stone', build: 'tiles', texture: '/images/s-residence-materials/hd/solid-gray-stone.webp', scale: '150%', box: { left: 58.4, top: 24.1, width: 33.7, height: 34.7 }, z: 4, label: 'top-left' },
];

const SResidenceLayout = ({ project }: Props) => {
  const { isNight, setIsNight } = useNightMode();

  const t = isNight ? '#ffffff' : '#383838';
  const sub = isNight ? '#797979' : '#797979';
  const rule = isNight ? '#383838' : '#e4e3e2';

  return (
    <>
      {/* Single fixed day/night toggle */}
      <DayNightToggle isNight={isNight} onToggle={() => setIsNight(!isNight)} />

      {/* 01 HERO */}
      <section className="relative w-full h-[100svh] md:h-screen" data-theme="dark">
        <img
          src="/images/s-residence-day.webp"
          alt="S Residence day"
          className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700"
          style={{ opacity: isNight ? 0 : 1 }}
        />
        <img
          src="/images/s-residence-night.webp"
          alt="S Residence night"
          className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700"
          style={{ opacity: isNight ? 1 : 0 }}
        />
        {/* phones: keep the title clear of the fixed day/night switch */}
        <div className="absolute bottom-0 left-0 right-0 pl-6 pr-28 md:px-16 pb-8">
          <h1
            className="font-bold text-display text-white whitespace-nowrap"
          >
            S Residence
          </h1>
        </div>
      </section>

      {/* 02 INFO BAR */}
      {/* label / value rows on phones, five centred columns from md */}
      <section className="px-6 md:px-0 py-1 md:py-8" style={{ borderBottom: `1px solid ${rule}` }}>
        <div className="flex flex-col md:grid md:grid-cols-5">
          {[
            { label: 'LOCATION',       value: 'DIPOLOG CITY, ZAN' },
            { label: 'AREA',           value: '420 SQM.' },
            { label: 'TYPE',           value: 'RESIDENTIAL' },
            { label: 'STATUS',         value: 'COMPLETED' },
            { label: 'YEAR COMPLETED', value: '2024' },
          ].map(({ label, value }, i, all) => (
            <div
              key={label}
              className={`flex items-baseline justify-between gap-6 py-3 md:py-0 md:flex-col md:items-center md:justify-start md:gap-0 md:text-center md:px-4 ${i < all.length - 1 ? 'border-b md:border-b-0' : ''}`}
              style={{ borderColor: rule }}
            >
              <span className="shrink-0 text-[11px] md:text-[12px] tracking-[2px] md:mb-2 uppercase" style={{ color: sub }}>
                {label}
              </span>
              <span className="text-right md:text-center text-[13px] md:text-[15px] font-semibold tracking-[1px] uppercase transition-colors duration-700" style={{ color: t }}>
                {value}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 03 CONCEPT — editorial split */}
      <section className="grid grid-cols-1 lg:grid-cols-[2fr_3fr]">
        {/* Left: label + pullquote */}
        <div className="flex flex-col gap-5 md:gap-8 lg:gap-10 px-6 md:px-16 pt-12 pb-6 md:pt-14 md:pb-8 lg:py-20">
          <h2 className="font-bold text-subhead transition-colors duration-700" style={{ color: t }}>
            Concept
          </h2>
          <p className="font-bold text-quote text-pretty transition-colors duration-700" style={{ color: t }}>
            Grounded in the clarity of minimalism and the warmth of tropical living, the design blends wood, stone, and concrete to create a space that feels calm, honest, and enduring.
          </p>
        </div>
        {/* Right: body text */}
        <div className="flex flex-col justify-center gap-5 md:gap-6 px-6 md:px-16 pb-10 md:pb-12 lg:py-20 lg:border-l transition-colors duration-700" style={{ borderColor: rule }}>
          <p className="text-[14px] leading-[1.55] md:text-[15px] md:leading-[1.6] text-pretty transition-colors duration-700" style={{ color: t }}>
            The home opens itself to the landscape&#8288;—allowing light, air, and greenery to flow freely throughout.
          </p>
          <p className="text-[14px] leading-[1.55] md:text-[15px] md:leading-[1.6] text-pretty transition-colors duration-700" style={{ color: t }}>
            Natural textures define the palette: the warmth of wood, the solidity of stone, and the raw elegance of concrete come together in quiet balance. Wide openings dissolve the line between inside and out, while clean forms and open layouts support a sense of ease and quiet luxury. Every surface is intentional, every material left to speak in its natural voice.
          </p>
        </div>
      </section>

      {/* 03b EXTERIOR PERSPECTIVE — text left, photo right; same margins, 2:3 split and
          gap as the photo grid below, so the photo lines up with the column under it */}
      <section className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-3 px-6 md:px-16">
        {/* Left: heading + body */}
        <div className="flex flex-col gap-5 md:gap-8 pt-2 pb-8 md:pb-12 lg:py-20 lg:pr-10">
          <h2 className="font-bold text-subhead transition-colors duration-700" style={{ color: t }}>
            Exterior Perspective
          </h2>
          <p className="text-[14px] leading-[1.55] md:text-[15px] md:leading-[1.6] text-pretty transition-colors duration-700" style={{ color: t }}>
            Monolithic yet quiet, the home holds presence through raw finishes and shadow play&#8288;—where minimalism becomes poetry. Here, minimalism is not stark, but soulful. Wood and stone are left honest, unpolished&#8288;—allowing natural texture and light to carry the mood. It&apos;s a meditative environment, where restraint becomes richness, and the absence of clutter makes room for clarity. The aesthetic is quiet, weighty, and elemental.
          </p>
        </div>
        {/* Right: photo with day/night */}
        <div className="relative overflow-hidden aspect-[4/3] lg:aspect-auto lg:min-h-[60vh]">
          <img
            src="/images/s-residence-concept-day.webp"
            alt="Exterior day"
            className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700"
            style={{ opacity: isNight ? 0 : 1 }}
          />
          <img
            src="/images/s-residence-concept-night.webp"
            alt="Exterior night"
            className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700"
            style={{ opacity: isNight ? 1 : 0 }}
          />
        </div>
      </section>

      {/* 06 EDITORIAL 3-IMAGE LAYOUT — day renders by default, night with the toggle */}
      <section className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-3 px-6 md:px-16 mt-3 lg:h-[calc(38vh+52vh+1.25rem)]">
        {/* Left column — two stacked photos */}
        <div className="flex flex-col gap-3 lg:gap-5 h-full">
          <div className="relative overflow-hidden aspect-[3/2] lg:aspect-auto lg:h-[38vh] lg:flex-none">
            <img src="/images/s-residence-ext-day-01.webp" alt="Front elevation by day" className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700" style={{ opacity: isNight ? 0 : 1 }} />
            <img src="/images/s-residence-ext-night-01.webp" alt="Front elevation at night" className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700" style={{ opacity: isNight ? 1 : 0 }} />
          </div>
          <div className="relative overflow-hidden aspect-[3/2] lg:aspect-auto lg:h-auto lg:flex-1">
            {/* entrance view: the one day/night pair rendered from the same camera for this slot
                (the earlier street view only exists as a night render) */}
            <img src="/images/s-residence-ext-15.webp" alt="Entrance by day" className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700" style={{ opacity: isNight ? 0 : 1 }} />
            <img src="/images/s-residence-ext-15-night.webp" alt="Entrance at night" className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700" style={{ opacity: isNight ? 1 : 0 }} />
          </div>
        </div>
        {/* Right column — single tall photo filling full height */}
        <div className="relative overflow-hidden aspect-[4/3] lg:aspect-auto lg:h-full">
          <img src="/images/s-residence-ext-day-03.webp" alt="Corner view by day" className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700" style={{ opacity: isNight ? 0 : 1 }} />
          <img src="/images/s-residence-ext-night-03.webp" alt="Corner view at night" className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700" style={{ opacity: isNight ? 1 : 0 }} />
        </div>
      </section>

      {/* Weight of Simplicity — full-width editorial strip */}
      <section className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-4 lg:gap-0 px-6 md:px-16 py-10 md:py-12 mt-3">
        <div>
          <h2 className="font-bold text-subhead transition-colors duration-700" style={{ color: t }}>
            The Weight of Simplicity
          </h2>
        </div>
        <div>
          <p className="text-[14px] leading-[1.55] md:text-[15px] md:leading-[1.6] text-pretty transition-colors duration-700" style={{ color: t }}>
            With solid volumes and minimal detailing, the structure feels like it&apos;s resting&#8288;—anchored to its site through sheer presence. The neutral, matte surfaces reflect changing skies and hold a softness that balances the weight of mass. It doesn&apos;t disrupt its setting, it deepens it.
          </p>
        </div>
      </section>

      {/* 07 TWO-IMAGE ROW */}
      <section className="grid grid-cols-2 gap-3 px-6 md:px-16 my-3 h-[56vw] md:h-[45vh]">
        <div className="relative overflow-hidden h-full">
          <img src="/images/s-residence-foyer-01-day.webp" alt="Foyer day" className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700" style={{ opacity: isNight ? 0 : 1 }} />
          <img src="/images/s-residence-foyer-01.webp" alt="Foyer night" className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700" style={{ opacity: isNight ? 1 : 0 }} />
        </div>
        <div className="relative overflow-hidden h-full">
          <img src="/images/s-residence-foyer-02-day.webp" alt="Foyer 2 day" className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700" style={{ opacity: isNight ? 0 : 1 }} />
          <img src="/images/s-residence-foyer-02-night.webp" alt="Foyer 2 night" className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700" style={{ opacity: isNight ? 1 : 0 }} />
        </div>
      </section>

      {/* 08 INTERIOR PERSPECTIVES */}
      <div className="px-6 md:px-16 mt-12 mb-5 md:mt-16 md:mb-8">
        <h2 className="font-bold text-subhead transition-colors duration-700" style={{ color: t }}>
          Interior Perspectives
        </h2>
      </div>
      <section className="px-6 md:px-16 mb-8 md:mb-10">
        <p className="text-[14px] leading-[1.55] md:text-[15px] md:leading-[1.6] text-pretty max-w-2xl transition-colors duration-700" style={{ color: t }}>
          The structure presents itself with quiet confidence&#8288;—solid planes of stone, softened only by the warmth of wood. There&apos;s no excess, no ornament. The residential finds strength in simplicity, allowing the materials to hold presence against the landscape with a calm, monolithic grace.
        </p>
      </section>

      {/* 09 INTERIOR PHOTO LAYOUT */}
      <section className="px-6 md:px-16 md:h-[90vh]">
        <div className="relative overflow-hidden aspect-[4/3] md:aspect-auto md:h-full">
          <img
            src="/images/s-residence-int-1-day.webp"
            alt="Interior perspective day"
            className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700"
            style={{ opacity: isNight ? 0 : 1 }}
          />
          <img
            src="/images/s-residence-int-1.webp"
            alt="Interior perspective night"
            className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700"
            style={{ opacity: isNight ? 1 : 0 }}
          />
        </div>
      </section>

      {/* 09b DAY / NIGHT INTERIOR — natural aspect ratio */}
      <div className="relative mt-3 mb-4 md:mb-24 mx-6 md:mx-16">
        <img
          src="/images/s-residence-int-day.webp"
          alt="Interior day"
          className="w-full object-contain transition-opacity duration-700"
          style={{ opacity: isNight ? 0 : 1 }}
        />
        <img
          src="/images/s-residence-int-2.webp"
          alt="Interior night"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
          style={{ opacity: isNight ? 1 : 0 }}
        />
      </div>

      {/* WARM MINIMALISM — the material board as an interactive breakdown */}
      <MaterialBreakdown
        title="Warm Minimalism"
        paragraphs={[
          'This board blends the softness of beige adobe stone and natural oak wood slats with the strength of solid gray stone and grey ledgestone. The result is a warm, grounded palette with tonal balance — where tactile stone elements define mass and depth, while oak details add a breathable, tropical rhythm to the space.',
          'With stucco paint finish tying everything together, this selection creates a strong yet serene material identity. Ideal for homes situated near the coast or elevated terrains, it brings both durability and quiet elegance to a modern tropical envelope.',
        ]}
        materials={S_RESIDENCE_MATERIALS}
        ink={t}
        muted={isNight ? '#e4e3e2' : '#797979'}
      />


      {/* MORE PROJECTS */}
      <ProjectMoreProjects current={project} all={projects} />
    </>
  );
};

export default SResidenceLayout;
