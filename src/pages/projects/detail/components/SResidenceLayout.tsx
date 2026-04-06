import { useState } from 'react';
import { Project, projects } from '@/mocks/projects';
import ProjectMoreProjects from './ProjectMoreProjects';

interface Props { project: Project; }

const D = 'https://obramajoralia.my.canva.site/copy-of-02-obra-majoralia-web-design/_assets/media/';

const SResidenceLayout = ({ project }: Props) => {
  const [showNight, setShowNight] = useState(false);

  return (
    <>
      {/* 01  HERO */}
      <section className="relative w-full" style={{ height: '85vh' }}>
        <img
          src={`${D}ac8de25f47b57d0632f8afc1699fe1d9.jpg`}
          alt="S Residence"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute bottom-0 left-0 right-0 px-8 pb-8">
          <h1
            className="text-[56px] md:text-[80px] text-white leading-none"
            style={{ fontFamily: 'var(--font-sans)', fontWeight: 700 }}
          >
            S Residence
          </h1>
        </div>
      </section>

      {/* 02  INFO BAR */}
      <section className="py-8">
        <div className="grid grid-cols-5">
          {[
            { label: 'LOCATION',       value: 'DIPOLOG CITY, ZAN' },
            { label: 'AREA',           value: '420 SQM.' },
            { label: 'TYPE',           value: 'RESIDENTIAL' },
            { label: 'STATUS',         value: 'COMPLETED' },
            { label: 'YEAR COMPLETED', value: '2024' },
          ].map(({ label, value }) => (
            <div key={label} className="flex flex-col items-center justify-center text-center px-4">
              <span className="text-[9px] tracking-[2px] text-[#aaa] mb-2 uppercase" style={{ fontFamily: 'var(--font-sans)' }}>
                {label}
              </span>
              <span className="text-[11px] md:text-[13px] font-bold tracking-[1px] text-[#383838] uppercase" style={{ fontFamily: 'var(--font-sans)' }}>
                {value}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 03  SECOND HERO IMAGE */}
      <section className="w-full relative" style={{ height: '85vh', zIndex: 1 }}>
        <img
          src={`${D}5025ab214475aacfcf264707b0867d89.jpg`}
          alt="S Residence exterior"
          className="w-full h-full object-cover object-center"
        />
      </section>

      {/* 04  ELEMENT IMAGE + CONCEPT TEXT */}
      <section className="grid grid-cols-1 lg:grid-cols-2" style={{ overflow: 'visible', position: 'relative', zIndex: 5 }}>
        <div className="relative flex items-center justify-center" style={{ minHeight: '520px', overflow: 'visible' }}>
          <img
            src="https://storage.readdy-site.link/project_files/057d11fe-555c-401e-b7e9-638ff88babf4/ba264382-58f6-40f8-8606-b38c20eb8704_S-Residence---Element.svg?v=3e91bed3e3172ba2fa8a8b939c4aa067"
            alt="S Residence material element"
            style={{ width: '140%', maxWidth: '820px', transform: 'rotate(-1.5deg) translateY(-60px)', position: 'relative', zIndex: 20 }}
          />
        </div>
        <div className="flex flex-col justify-start px-10 md:px-16 pt-10 pb-16 gap-5">
          <p className="text-[22px] md:text-[28px] font-bold text-[#383838] leading-[1.2]" style={{ fontFamily: 'var(--font-sans)' }}>
            Concept:
          </p>
          <p className="text-[16px] md:text-[17px] text-[#383838] leading-[1.9]" style={{ fontFamily: 'var(--font-sans)' }}>
            Grounded in the clarity of minimalism and the warmth of tropical living, the design blends wood, stone, and concrete to create a space that feels calm, honest, and enduring. The home opens itself to the landscape—allowing light, air, and greenery to flow freely throughout.
          </p>
          <p className="text-[16px] md:text-[17px] text-[#383838] leading-[1.9]" style={{ fontFamily: 'var(--font-sans)' }}>
            Natural textures define the palette: the warmth of wood, the solidity of stone, and the raw elegance of concrete come together in quiet balance. Wide openings dissolve the line between inside and out, while clean forms and open layouts support a sense of ease and quiet luxury. Every surface is intentional, every material left to speak in its natural voice.
          </p>
        </div>
      </section>

      {/* 05  WARM MINIMALISM — left: large pull quote, right: image + copy */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-0 mt-8 mb-24">
        {/* Left — editorial pull quote */}
        <div className="flex flex-col justify-center px-10 md:px-16 py-16">
          <blockquote
            className="text-[32px] md:text-[42px] font-bold text-[#383838] leading-[1.15] tracking-[-0.5px]"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            "Every surface is intentional. Every material left to speak in its natural voice."
          </blockquote>
          <p className="text-[12px] tracking-[2px] text-[#aaa] uppercase mt-8" style={{ fontFamily: 'var(--font-sans)' }}>
            — S Residence, 2024
          </p>
        </div>

        {/* Right — header + image + copy */}
        <div className="flex flex-col justify-start px-10 md:px-16 pt-10 pb-16 gap-6">
          <p className="text-[22px] md:text-[28px] font-bold text-[#383838] leading-[1.2]" style={{ fontFamily: 'var(--font-sans)' }}>
            Warm Minimalism
          </p>
          <img
            src="https://storage.readdy-site.link/project_files/057d11fe-555c-401e-b7e9-638ff88babf4/59cbb05f-6b9a-466c-ac1d-bf56f257372d_Materials---Obra.png?v=0274841bdb763eeb8cd56597b2152017"
            alt="Materials"
            className="w-full object-cover"
          />
          <p className="text-[16px] md:text-[17px] text-[#383838] leading-[1.9]" style={{ fontFamily: 'var(--font-sans)' }}>
            This board blends the softness of beige adobe stone and natural oak wood slats with the strength of solid gray stone and grey ledgestone. The result is a warm, grounded palette with tonal balance — where tactile stone elements define mass and depth, while oak details add a breathable, tropical rhythm to the space.
          </p>
          <p className="text-[16px] md:text-[17px] text-[#383838] leading-[1.9]" style={{ fontFamily: 'var(--font-sans)' }}>
            With stucco paint finish tying everything together, this selection creates a strong yet serene material identity. Ideal for homes situated near the coast or elevated terrains, it brings both durability and quiet elegance to a modern tropical envelope.
          </p>
        </div>
      </section>

      {/* ── THE WEIGHT OF SIMPLICITY ─────────────────────────────────── */}

      <div className="px-10 md:px-16 mb-8">
        <h2 className="text-[22px] md:text-[28px] font-bold text-[#383838] leading-[1.2]" style={{ fontFamily: 'var(--font-sans)' }}>
          The Weight of Simplicity
        </h2>
      </div>

      {/* Large full-bleed image */}
      <section className="w-full px-10 md:px-16 mb-4" style={{ height: '80vh' }}>
        <img
          src={`${D}71dcb66bdaaa8bfc3dd3b5829ecc827d.png`}
          alt="The Weight of Simplicity"
          className="w-full h-full object-cover object-center"
        />
      </section>

      {/* Text + side image — asymmetric two-col */}
      <section className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 px-10 md:px-16 mb-4">
        {/* Left — body copy */}
        <div className="flex flex-col justify-center gap-5 py-8">
          <p className="text-[15px] md:text-[16px] text-[#383838] leading-[1.9]" style={{ fontFamily: 'var(--font-sans)' }}>
            Monolithic yet quiet, the home holds presence through raw finishes and shadow play—where minimalism becomes poetry. Here, minimalism is not stark, but soulful.
          </p>
          <p className="text-[15px] md:text-[16px] text-[#383838] leading-[1.9]" style={{ fontFamily: 'var(--font-sans)' }}>
            Wood and stone are left honest, unpolished—allowing natural texture and light to carry the mood. Restraint becomes richness, and the absence of clutter makes room for clarity.
          </p>
          <p className="text-[15px] md:text-[16px] text-[#383838] leading-[1.9]" style={{ fontFamily: 'var(--font-sans)' }}>
            With solid volumes and minimal detailing, the structure feels like it&apos;s resting—anchored to its site through sheer presence. The neutral, matte surfaces reflect changing skies and hold a softness that balances the weight of mass.
          </p>
        </div>
        {/* Right — tall image */}
        <div className="overflow-hidden" style={{ height: '65vh' }}>
          <img
            src={`${D}9f98d065c9d1ef96052a82093bab3a60.jpg`}
            alt="S Residence exterior detail"
            className="w-full h-full object-cover object-center"
          />
        </div>
      </section>

      {/* 3-col gallery with gaps */}
      <section className="grid grid-cols-3 gap-3 px-10 md:px-16 mb-3">
        {[
          `${D}899ea79a18d0db661a1217ae51650731.jpg`,
          `${D}38b2c837942a11ca7fe2d32120157ab0.jpg`,
          `${D}565909130a5ce6c00d6aa5bb160a85ef.jpg`,
        ].map((src, i) => (
          <div key={i} className="overflow-hidden" style={{ height: '45vh' }}>
            <img src={src} alt={`S Residence ${i + 1}`} className="w-full h-full object-cover object-center" />
          </div>
        ))}
      </section>



      {/* ── INTERIOR PERSPECTIVES ────────────────────────────────────── */}

      <div className="px-10 md:px-16 mt-24 mb-8">
        <h2 className="text-[22px] md:text-[28px] font-bold text-[#383838] leading-[1.2]" style={{ fontFamily: 'var(--font-sans)' }}>
          Interior Perspectives
        </h2>
      </div>

      {/* Closing copy */}
      <section className="px-10 md:px-16 mb-10">
        <p className="text-[14px] md:text-[15px] text-[#383838] leading-[1.9] max-w-2xl" style={{ fontFamily: 'var(--font-sans)' }}>
          The structure presents itself with quiet confidence—solid planes of stone, softened only by the warmth of wood. There&apos;s no excess, no ornament. The residential finds strength in simplicity, allowing the materials to hold presence against the landscape with a calm, monolithic grace.
        </p>
      </section>

      {/* Interior photo layout — large left, three stacked right */}
      <section className="grid grid-cols-[3fr_2fr] gap-3 px-10 md:px-16 mb-24" style={{ height: '110vh' }}>
        {/* Left — one tall image */}
        <div className="overflow-hidden h-full">
          <img
            src="https://storage.readdy-site.link/project_files/057d11fe-555c-401e-b7e9-638ff88babf4/c39a3c58-16ad-47bf-b69c-b59633a24606_2.svg?v=23ade51f2ebed191a1d8a2ae0db37aa6"
            alt="Interior Perspective"
            className="w-full h-full object-cover object-center"
          />
        </div>
        {/* Right — three stacked images */}
        <div className="flex flex-col gap-3 h-full">
          <div className="overflow-hidden flex-1">
            <img
              src="https://storage.readdy-site.link/project_files/057d11fe-555c-401e-b7e9-638ff88babf4/928b42af-ffa2-4160-b6c9-f01a98d67279_3.svg?v=2d8ba527d02bff0ce6b2df9599e91b42"
              alt="Interior detail"
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div className="overflow-hidden flex-1">
            <img
              src="https://storage.readdy-site.link/project_files/057d11fe-555c-401e-b7e9-638ff88babf4/97e8912c-1b51-478e-b7d8-b6933ff5c85e_4.svg?v=0283632a0c9fb641812a6d2469d1aa80"
              alt="Interior detail"
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div className="overflow-hidden flex-1">
            <img
              src="https://storage.readdy-site.link/project_files/057d11fe-555c-401e-b7e9-638ff88babf4/7e97172a-0179-4d57-838a-6b16404bd1ae_5.svg?v=70a1f59e3b90b5dbcd96cf41fa8c29fe"
              alt="Interior detail"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </section>

      {/* DAY / NIGHT — bottom of page */}
      <section className="relative w-full overflow-hidden mt-24" style={{ height: '85vh' }}>
        <img
          src="https://storage.readdy-site.link/project_files/057d11fe-555c-401e-b7e9-638ff88babf4/cfd2a9d2-7200-4b93-8288-fa770ced1edb_Light-Mode.svg?v=f021d1a9f79f4bbe098cabfdad42ddef"
          alt="S Residence day"
          className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700"
          style={{ opacity: showNight ? 0 : 1 }}
        />
        <img
          src={`${D}2bc4926e98f32f1746aab2606c6c26fe.jpg`}
          alt="S Residence night"
          className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700"
          style={{ opacity: showNight ? 1 : 0 }}
        />
        <button
          type="button"
          onClick={() => setShowNight(v => !v)}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
        >
          <span className="text-[11px] tracking-[2px] text-white uppercase underline underline-offset-4" style={{ fontFamily: 'var(--font-sans)' }}>
            {showNight ? 'See day view' : 'Tap to see the night view'}
          </span>
        </button>
      </section>

      {/* MORE PROJECTS */}
      <ProjectMoreProjects current={project} all={projects} />
    </>
  );
};

export default SResidenceLayout;
