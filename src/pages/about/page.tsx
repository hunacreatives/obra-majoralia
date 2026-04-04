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
    { title: 'WAF 2024 Singapore', sub: 'Shortlisted — Future Projects, Culture', year: '2024' },
    { title: 'WAF 2021', sub: 'WAFX Overall Winner — Horizon Manila Masterplan', year: '2021' },
    { title: 'WAF 2021', sub: 'WAFX Water Category — Loboc Performing Arts Center', year: '2021' },
    { title: 'Young Visionaries Challenge', sub: 'Kanto X Grohe — Overall Winner', year: '2020' },
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
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />

      {/* ══════════════════════════════════════════
          01 — CINEMATIC HERO
      ══════════════════════════════════════════ */}
      <section className="relative w-full h-screen overflow-hidden" data-theme="dark">
        {/* Parallax bg */}
        <div
          className="absolute inset-0 w-full h-[120%]"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        >
          <img
            src="https://readdy.ai/api/search-image?query=dramatic%20aerial%20view%20of%20a%20luxury%20architectural%20masterpiece%20surrounded%20by%20lush%20tropical%20landscape%20in%20the%20Philippines%2C%20golden%20hour%20light%20casting%20long%20shadows%20across%20clean%20geometric%20forms%2C%20cinematic%20wide%20angle%2C%20editorial%20architecture%20photography%2C%20warm%20amber%20tones%2C%20breathtaking%20scale&width=1800&height=1200&seq=about-hero-v2&orientation=landscape"
            alt="Obra Majoralia"
            className="w-full h-full object-cover object-center"
          />
        </div>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/70" />

        {/* Bottom-left text block */}
        <div className="absolute bottom-0 left-0 right-0 px-6 md:px-16 lg:px-20 pb-10 md:pb-16 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 md:gap-8">
          <div>
            <h1
              className="text-[44px] md:text-[80px] lg:text-[100px] font-bold leading-none tracking-[-2px] md:tracking-[-3px] text-white"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              OBRA
              <br />
              MAJORALIA
            </h1>
          </div>
          <p
            className="text-xs md:text-sm text-white/70 max-w-xs leading-relaxed tracking-[0.3px] lg:pb-3"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            A future-driven architecture studio designing meaningful spaces rooted in place, culture, and human experience.
          </p>
        </div>


      </section>

      {/* ══════════════════════════════════════════
          02 — OVERSIZED STATEMENT
      ══════════════════════════════════════════ */}
      <section className="px-6 md:px-16 lg:px-20 py-16 md:py-32 border-b border-[#e4e3e2] overflow-hidden">
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
              className="text-[10px] tracking-[3px] text-white/40 uppercase mb-6"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              — Principal Architect
            </p>
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
            src="https://obramajoralia.my.canva.site/_assets/media/0d28ecfaa42789d2e67a8d9c743378aa.png"
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
          08 — CTA BAND
      ══════════════════════════════════════════ */}
      <section className="px-10 md:px-16 lg:px-20 py-20 border-t border-[#e4e3e2]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="flex flex-col gap-6">
            <p
              className="text-2xl md:text-3xl font-bold tracking-[-0.5px] text-[#383838] leading-tight"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Have something in mind?
            </p>
            <p className="text-sm text-[#797979] leading-loose max-w-sm" style={{ fontFamily: 'var(--font-sans)' }}>
              We'd love to hear about your project. Reach out and let's start a conversation.
            </p>
            <Link
              to="/contact"
              className="text-[10px] tracking-[3px] font-bold text-[#383838] border-b border-[#1a1a1a] pb-[2px] w-fit hover:text-[#797979] hover:border-[#797979] transition-colors duration-200 uppercase whitespace-nowrap"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              GET IN TOUCH
            </Link>
          </div>
          <div className="flex flex-col gap-6">
            <p
              className="text-2xl md:text-3xl font-bold tracking-[-0.5px] text-[#383838] leading-tight"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              We're always looking for talent.
            </p>
            <p className="text-sm text-[#797979] leading-loose max-w-sm" style={{ fontFamily: 'var(--font-sans)' }}>
              If you aspire to be part of the team, send your portfolio and let's see where it goes.
            </p>
            <Link
              to="/careers"
              className="text-[10px] tracking-[3px] font-bold text-[#383838] border-b border-[#1a1a1a] pb-[2px] w-fit hover:text-[#797979] hover:border-[#797979] transition-colors duration-200 uppercase whitespace-nowrap"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              VIEW OPEN POSITIONS
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
