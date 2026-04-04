import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';

const MANIFESTO = [
  {
    label: 'DESIGN',
    formula: 'intention + function + experience',
    body: 'Design adds value not by being loud, but by being right — with style as a natural result, not the goal.',
  },
  {
    label: 'CONTEXT',
    formula: 'site + climate + resources + capability',
    body: 'Context balances ambition and reality, making sure design works not just on paper, but on site.',
  },
  {
    label: 'INTUITION',
    formula: 'experience + pattern recognition + empathy',
    body: 'The ability to sense the right space before it is drawn — by understanding how people live, how environments behave, and how constraints shape form.',
  },
];

const CREDENTIALS = {
  education: [
    { title: 'University of San Carlos', sub: 'Bachelor of Science in Architecture', year: '2018' },
    { title: 'University of Pécs, Hungary', sub: 'International Exchange Student', year: '2016–17' },
  ],
  work: [
    { title: 'TopLab Architecture Review Center', sub: 'Mentor', year: '2023–Present' },
    { title: 'BYC Archventure', sub: 'Architect', year: '2021–2022' },
    { title: 'WTA Architecture + Design Studio', sub: 'Architect', year: '2019–2020' },
  ],
  awards: [
    { title: 'WAF 2021 — WAFX Overall Winner', sub: 'Team Member | WTA Architecture + Design Studio', year: '2020' },
    { title: 'WAF 2024 Singapore', sub: 'Shortlisted — House of Song, Loboc Performing Arts', year: '2024' },
    { title: 'Young Visionaries Challenge', sub: 'Kanto X Grohe — Overall Winner', year: '2024' },
  ],
};

/* ── Animated counter ── */
const useCounter = (target: number, duration = 1800) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - start) / duration, 1);
            setCount(Math.floor(p * target));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);

  return { count, ref };
};

const Stat = ({ value, label, suffix = '' }: { value: number; label: string; suffix?: string }) => {
  const { count, ref } = useCounter(value);
  return (
    <div ref={ref} className="flex flex-col gap-2">
      <span
        className="text-[64px] md:text-[80px] font-bold leading-none tracking-[-3px] text-[#383838]"
        style={{ fontFamily: 'var(--font-sans)' }}
      >
        {count}{suffix}
      </span>
      <span
        className="text-[9px] tracking-[2.5px] text-[#999] uppercase"
        style={{ fontFamily: 'var(--font-sans)' }}
      >
        {label}
      </span>
    </div>
  );
};

const AboutPage = () => {
  const [credTab, setCredTab] = useState<'education' | 'work' | 'awards'>('awards');

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ══════════════════════════════════════════
          01 — CINEMATIC HERO
      ══════════════════════════════════════════ */}
      <section className="relative w-full h-screen overflow-hidden" data-theme="dark">
        {/* Static bg — no parallax */}
        <img
          src="https://storage.readdy-site.link/project_files/057d11fe-555c-401e-b7e9-638ff88babf4/5db33e67-a2cf-4c8f-a06e-ad6df44ef7e2_Loboc-River---Best-Project.png?v=1424a9275c81dfcd848632b4e3d15fbd"
          alt="Obra Majoralia"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/70" />

        {/* Bottom text block — OBRA MAJORALIA left, tagline right */}
        <div className="absolute bottom-0 left-0 right-0 px-6 md:px-16 lg:px-20 pb-6 md:pb-10 flex flex-row items-end justify-between gap-8">
          {/* Left: studio name */}
          <h1
            className="text-[44px] md:text-[80px] lg:text-[100px] font-bold leading-none tracking-[-2px] md:tracking-[-3px] text-white flex-shrink-0"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            OBRA
            <br />
            MAJORALIA
          </h1>

          {/* Right: tagline — 3 lines */}
          <p
            className="text-[15px] md:text-[17px] text-white/75 leading-[1.9] tracking-[0.2px] text-right mb-6"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            A future-driven architecture studio
            <br />
            designing meaningful spaces
            <br />
            rooted in place, culture, and human experience.
          </p>
        </div>

        {/* Project annotation — locked to section, does NOT scroll with image */}
        <div className="absolute top-[18%] right-[5%] flex items-start gap-0 z-10">
          {/* L-shaped callout: horizontal line then short vertical tick dropping down, circle at bottom */}
          <div className="flex flex-col items-start">
            {/* Horizontal line */}
            <div className="w-32 md:w-48 h-px bg-white/50 mt-[18px]" />
            {/* Short vertical tick dropping down from left end, with circle at bottom */}
            <div className="w-px h-16 bg-white/50 relative">
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-white/70 rounded-full" />
            </div>
          </div>

          {/* Info panel */}
          <div className="ml-5 flex flex-col gap-2">
            <p
              className="text-xl md:text-2xl font-bold tracking-[-0.5px] text-white leading-tight"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              House of Song
            </p>
            <p
              className="text-sm md:text-[15px] text-white/60 mb-4"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Loboc Performing Arts Center
            </p>
            <div className="flex gap-4">
              <img
                src="https://storage.readdy-site.link/project_files/057d11fe-555c-401e-b7e9-638ff88babf4/b5e975b0-6e6d-492c-8255-57622459074f_8.png?v=4904ed1b99a07b55dba47b0554c9785b"
                alt="Award 1"
                className="w-24 h-24 md:w-28 md:h-28 object-contain opacity-95"
              />
              <img
                src="https://storage.readdy-site.link/project_files/057d11fe-555c-401e-b7e9-638ff88babf4/247fc22e-0cd5-4441-8f28-6e53d88a1f3b_9.png?v=254efb0730372fc0d14979d1bedea563"
                alt="Award 2"
                className="w-24 h-24 md:w-28 md:h-28 object-contain opacity-95"
              />
              <img
                src="https://storage.readdy-site.link/project_files/057d11fe-555c-401e-b7e9-638ff88babf4/5602e32a-862d-47dc-8e00-1c7bc90150ea_10.png?v=61c38fc96ca752df22ab489efc6a7d53"
                alt="Award 3"
                className="w-24 h-24 md:w-28 md:h-28 object-contain opacity-95"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          02 — OVERSIZED STATEMENT
      ══════════════════════════════════════════ */}
      <section className="px-6 md:px-16 lg:px-20 py-16 md:py-32 border-b border-[#e4e3e2]">
        <p
          className="text-[28px] md:text-[52px] lg:text-[68px] font-bold leading-[1.1] md:leading-[1.05] tracking-[-1px] md:tracking-[-2px] text-[#383838] max-w-5xl"
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          Architecture is for the{' '}
          <span className="italic font-normal text-[#999]">End Users</span>,
          <br />
          not for the Designers.
        </p>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
          <p className="text-sm text-[#797979] leading-loose" style={{ fontFamily: 'var(--font-sans)' }}>
            Rooted in a deep understanding of context — the culture, history, and aspirations of the people and places they design for.
          </p>
          <p className="text-sm text-[#797979] leading-loose" style={{ fontFamily: 'var(--font-sans)' }}>
            Guided by intuition and a sensitivity to both form and function, they create spaces that are purposeful, poetic, and responsive.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          03 — STATS BAND
      ══════════════════════════════════════════ */}
      <section className="px-6 md:px-16 lg:px-20 py-14 md:py-20 border-b border-[#e4e3e2]">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-[#e4e3e2]">
          {[
            { value: 15, label: 'Projects Completed', suffix: '+' },
            { value: 4, label: 'Typologies', suffix: '' },
            { value: 3, label: 'International Awards', suffix: '' },
            { value: 6, label: 'Years of Practice', suffix: '' },
          ].map((s) => (
            <div key={s.label} className="lg:px-12 first:pl-0 last:pr-0 flex justify-center">
              <Stat value={s.value} label={s.label} suffix={s.suffix} />
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          04 — FULL-BLEED IMAGE + PULL QUOTE
      ══════════════════════════════════════════ */}
      <section className="relative w-full h-[80vh] overflow-hidden" data-theme="dark">
        <img
          src="https://readdy.ai/api/search-image?query=interior%20of%20a%20high-end%20architectural%20studio%20in%20the%20Philippines%2C%20large%20scale%20architectural%20drawings%20pinned%20to%20walls%2C%20scale%20models%20on%20long%20white%20tables%2C%20dramatic%20raking%20light%20through%20floor%20to%20ceiling%20windows%2C%20moody%20editorial%20photography%2C%20warm%20shadows%2C%20minimalist%20aesthetic&width=1800&height=1000&seq=about-studio-interior-v2&orientation=landscape"
          alt="Studio interior"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center px-10 md:px-16 lg:px-20">
          <div className="max-w-2xl">
            <p
              className="text-[32px] md:text-[44px] lg:text-[56px] font-bold leading-[1.1] tracking-[-1.5px] text-white"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              "Architecture must listen
              <br />
              before it speaks."
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          05 — FOUNDER — EDITORIAL SPLIT
      ══════════════════════════════════════════ */}
      <section className="grid grid-cols-1 lg:grid-cols-2 border-b border-[#e4e3e2]">
        {/* Left: portrait — tall */}
        <div className="relative w-full h-[70vw] lg:h-auto lg:min-h-[700px] overflow-hidden">
          <img
            src="https://obramajoralia.my.canva.site/_assets/media/ce32977ce0b766a30047bd571a81ab98.jpg"
            alt="Ar. Jonathan Cruz"
            className="w-full h-full object-cover object-top"
          />
          {/* Name overlay at bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/60 to-transparent">
            <p
              className="text-2xl font-bold tracking-[-0.5px] text-white"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Ar. Jonathan Cruz
            </p>
            <p
              className="text-[9px] tracking-[2.5px] text-white/60 uppercase mt-1"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Principal Architect &amp; Founder
            </p>
          </div>
        </div>

        {/* Right: credentials */}
        <div className="flex flex-col px-10 md:px-14 lg:px-16 py-16">
          <p
            className="text-[22px] md:text-[28px] leading-tight tracking-[-0.5px] text-[#383838] mb-8"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            A licensed architect with a practice rooted in cultural sensitivity, spatial precision, and award-winning design.
          </p>
          <p
            className="text-sm text-[#797979] leading-loose mb-12"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            Trained at the University of San Carlos and internationally at the University of Pécs, Hungary, Ar. Jonathan Cruz brings a global perspective to deeply local contexts. His work spans residential, hospitality, interior, and monumental typologies.
          </p>

          {/* Tab switcher */}
          <div className="flex gap-0 border-b border-[#e4e3e2] mb-8">
            {(['awards', 'work', 'education'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setCredTab(tab)}
                className={[
                  'text-[9px] tracking-[2.5px] uppercase pb-3 pr-8 transition-colors duration-200 cursor-pointer whitespace-nowrap',
                  credTab === tab
                    ? 'text-[#383838] border-b-2 border-[#1a1a1a] -mb-px'
                    : 'text-[#bbb] hover:text-[#797979]',
                ].join(' ')}
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="flex flex-col gap-5 flex-1">
            {CREDENTIALS[credTab].map((item, i) => (
              <div key={i} className="flex items-start justify-between gap-4 border-b border-[#f0f0f0] pb-5 last:border-0">
                <div className="flex flex-col gap-1">
                  <span
                    className="text-xs font-bold tracking-[0.5px] text-[#383838]"
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    {item.title}
                  </span>
                  <span
                    className="text-[11px] text-[#999] tracking-[0.3px]"
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    {item.sub}
                  </span>
                </div>
                <span
                  className="text-[10px] tracking-[1.5px] text-[#bbb] whitespace-nowrap flex-shrink-0 mt-0.5"
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  {item.year}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          06 — MANIFESTO — FORMULA LAYOUT
      ══════════════════════════════════════════ */}
      <section className="px-6 md:px-16 lg:px-20 py-16 md:py-32 border-b border-[#e4e3e2]">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 md:mb-16">
          <div>
            <p
              className="text-[40px] md:text-[56px] font-bold leading-none tracking-[-2px] text-[#383838]"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Form Follows{' '}
              <span className="italic font-normal text-[#999]">Formula</span>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-[#e4e3e2]">
          {MANIFESTO.map(({ label, formula, body }, i) => (
            <div key={label} className={`flex flex-col gap-5 py-10 ${i === 0 ? 'md:pr-12' : i === 1 ? 'md:px-12' : 'md:pl-12'}`}>
              <p
                className="text-xl font-bold tracking-[-0.3px] text-[#383838] flex items-baseline gap-2"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                <span className="text-[#999] font-normal" style={{ fontFamily: 'var(--font-sans)' }}>{i + 1}.</span>
                {label}
              </p>
              <p
                className="text-xs text-[#aaa] leading-loose italic"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                {formula}
              </p>
              <p
                className="text-sm text-[#797979] leading-loose"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                {body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          07 — IMAGE MOSAIC
      ══════════════════════════════════════════ */}
      <section className="grid grid-cols-12 grid-rows-2 h-[80vh]">
        <div className="col-span-7 row-span-2 overflow-hidden">
          <img
            src="https://readdy.ai/api/search-image?query=stunning%20luxury%20residential%20architecture%20exterior%20in%20tropical%20Philippines%20setting%2C%20dramatic%20evening%20light%2C%20clean%20modernist%20lines%2C%20lush%20landscaping%2C%20award-winning%20architectural%20photography%2C%20cinematic%20composition%2C%20warm%20golden%20tones&width=900&height=800&seq=about-mosaic-1&orientation=portrait"
            alt="Project"
            className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-[1.03]"
          />
        </div>
        <div className="col-span-5 row-span-1 overflow-hidden border-l border-b border-white">
          <img
            src="https://readdy.ai/api/search-image?query=elegant%20interior%20design%20of%20a%20high-end%20Philippine%20residence%2C%20warm%20natural%20materials%2C%20rattan%20and%20wood%20textures%2C%20dramatic%20ceiling%20height%2C%20soft%20diffused%20light%2C%20editorial%20interior%20photography&width=600&height=400&seq=about-mosaic-2&orientation=landscape"
            alt="Interior"
            className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-[1.03]"
          />
        </div>
        <div className="col-span-5 row-span-1 overflow-hidden border-l border-white">
          <img
            src="https://readdy.ai/api/search-image?query=monumental%20civic%20architecture%20in%20the%20Philippines%2C%20grand%20public%20building%20with%20dramatic%20geometric%20facade%2C%20wide%20open%20plaza%2C%20blue%20sky%2C%20architectural%20photography%2C%20strong%20shadows%20and%20light&width=600&height=400&seq=about-mosaic-3&orientation=landscape"
            alt="Monumental"
            className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-[1.03]"
          />
        </div>
      </section>

      {/* ══════════════════════════════════════════
          08 — DESIGN TEAM
      ══════════════════════════════════════════ */}
      <section className="px-6 md:px-16 lg:px-20 py-16 md:py-32 border-b border-[#e4e3e2]">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14 md:mb-20">
          <p
            className="text-[40px] md:text-[56px] font-bold leading-none tracking-[-2px] text-[#383838]"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            Design{' '}
            <span className="italic font-normal text-[#999]">Team</span>
          </p>
          <p
            className="text-sm text-[#999] max-w-xs leading-loose"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            A focused team of designers and architects working together to shape meaningful spaces.
          </p>
        </div>

        {/* 9-box uniform grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-[#e4e3e2]">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="bg-white flex flex-col">
              {/* Placeholder image box */}
              <div className="w-full aspect-[3/4] bg-[#f5f4f3] flex items-center justify-center">
                <i className="ri-user-3-line text-[#d0cfc9] text-4xl" />
              </div>
              {/* Name + role */}
              <div className="px-5 py-5 flex flex-col gap-1">
                <p
                  className="text-sm font-bold tracking-[-0.2px] text-[#383838]"
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  Team Member
                </p>
                <p
                  className="text-[11px] text-[#aaa] tracking-[0.3px]"
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  Architectural Designer
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          09 — CTA BAND
      ══════════════════════════════════════════ */}
      <section className="bg-[#1a1a1a]">
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10">
          {/* Left CTA */}
          <div className="px-10 md:px-16 lg:px-20 py-14 md:py-20 flex flex-col gap-5">
            <p
              className="text-[40px] md:text-[56px] lg:text-[64px] font-bold leading-[1.0] tracking-[-2px] text-white"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Have something
              <br />
              <span className="italic font-normal text-white/40">in mind?</span>
            </p>
            <p className="text-sm text-white/40 leading-loose max-w-xs" style={{ fontFamily: 'var(--font-sans)' }}>
              We'd love to hear about your project. Reach out and let's start a conversation.
            </p>
            <Link
              to="/contact"
              className="mt-1 flex items-center gap-3 group w-fit cursor-pointer"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              <span className="text-[10px] tracking-[3px] font-bold text-white uppercase whitespace-nowrap group-hover:text-white/50 transition-colors duration-200">
                GET IN TOUCH
              </span>
              <span className="w-8 h-px bg-white/30 group-hover:w-16 transition-all duration-300" />
            </Link>
          </div>

          {/* Right CTA */}
          <div className="px-10 md:px-16 lg:px-20 py-14 md:py-20 flex flex-col gap-5">
            <p
              className="text-[40px] md:text-[56px] lg:text-[64px] font-bold leading-[1.0] tracking-[-2px] text-white"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Always looking
              <br />
              <span className="italic font-normal text-white/40">for talent.</span>
            </p>
            <p className="text-sm text-white/40 leading-loose max-w-xs" style={{ fontFamily: 'var(--font-sans)' }}>
              If you aspire to be part of the team, send your portfolio and let's see where it goes.
            </p>
            <Link
              to="/careers"
              className="mt-1 flex items-center gap-3 group w-fit cursor-pointer"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              <span className="text-[10px] tracking-[3px] font-bold text-white uppercase whitespace-nowrap group-hover:text-white/50 transition-colors duration-200">
                VIEW OPEN POSITIONS
              </span>
              <span className="w-8 h-px bg-white/30 group-hover:w-16 transition-all duration-300" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
