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
        className="text-[64px] md:text-[80px] font-bold leading-[1] tracking-normal text-[#383838]"
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

/* ── Scroll-triggered reveal ── */
const useReveal = (threshold = 0.1) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
};

/* ── Award badge — timer-based, no onLoad jank ── */
const AwardBadge = ({ src, alt, delay, masterReady }: { src: string; alt: string; delay: number; masterReady: boolean }) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!masterReady) return;
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [masterReady, delay]);

  return (
    <div
      className="relative group"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'scale(1) translateY(0px)' : 'scale(0.75) translateY(16px)',
        transition: 'opacity 600ms cubic-bezier(0.34, 1.4, 0.64, 1), transform 600ms cubic-bezier(0.34, 1.4, 0.64, 1)',
      }}
    >
      <div className="absolute inset-0 rounded-full bg-white/10 scale-0 group-hover:scale-110 transition-transform duration-500" />
      <img
        src={src}
        alt={alt}
        className="w-24 h-24 md:w-28 md:h-28 object-contain opacity-95 relative z-10 group-hover:scale-105 transition-transform duration-300"
      />
    </div>
  );
};

const AboutPage = () => {
  const [credTab, setCredTab] = useState<'education' | 'work' | 'awards'>('awards');

  /* Page-level entrance states */
  const [curtainLifted, setCurtainLifted] = useState(false);
  const [heroReady, setHeroReady] = useState(false);
  const [titleIn, setTitleIn] = useState(false);
  const [taglineIn, setTaglineIn] = useState(false);
  const [calloutIn, setCalloutIn] = useState(false);
  const [awardsIn, setAwardsIn] = useState(false);

  useEffect(() => {
    // Staggered cinematic entrance sequence
    const t0 = setTimeout(() => setCurtainLifted(true), 80);
    const t1 = setTimeout(() => setHeroReady(true), 200);
    const t2 = setTimeout(() => setTitleIn(true), 500);
    const t3 = setTimeout(() => setTaglineIn(true), 800);
    // callout line starts drawing at 900ms, finishes ~1900ms
    const t4 = setTimeout(() => setCalloutIn(true), 900);
    // badges fire after line + text are done
    const t5 = setTimeout(() => setAwardsIn(true), 1400);
    return () => { [t0, t1, t2, t3, t4, t5].forEach(clearTimeout); };
  }, []);

  /* Scroll reveals */
  const statementReveal = useReveal(0.15);
  const statsReveal = useReveal(0.15);
  const founderReveal = useReveal(0.1);
  const manifestoReveal = useReveal(0.1);
  const teamReveal = useReveal(0.1);

  return (
    <div className="min-h-screen bg-white">
      {/* ── Page curtain overlay ── */}
      <div
        className="fixed inset-0 z-[999] pointer-events-none bg-[#1a1a1a]"
        style={{
          opacity: curtainLifted ? 0 : 1,
          transition: 'opacity 1200ms cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      />

      <Navbar />

      {/* ══════════════════════════════════════════
          01 — CINEMATIC HERO
      ══════════════════════════════════════════ */}
      <section className="relative w-full h-screen overflow-hidden" data-theme="dark">
        {/* Hero image with scale-in */}
        <img
          src="/images/about-hero.png"
          alt="Obra Majoralia"
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{
            transform: heroReady ? 'scale(1)' : 'scale(1.08)',
            transition: 'transform 2200ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/70" />

        {/* Bottom text block */}
        <div className="absolute bottom-0 left-0 right-0 px-6 md:px-16 lg:px-20 pb-6 md:pb-10 flex flex-row items-end justify-between gap-8">
          {/* Left: studio name — slides up */}
          <div
            style={{
              opacity: titleIn ? 1 : 0,
              transform: titleIn ? 'translateY(0px)' : 'translateY(60px)',
              transition: 'opacity 1000ms cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 1000ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }}
          >
            <h1
              className="text-[44px] md:text-[80px] lg:text-[100px] font-bold leading-none tracking-[-2px] md:tracking-[-3px] text-white flex-shrink-0"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              OBRA
              <br />
              MAJORALIA
            </h1>
          </div>

          {/* Right: tagline — slides up with delay */}
          <div
            style={{
              opacity: taglineIn ? 1 : 0,
              transform: taglineIn ? 'translateY(0px)' : 'translateY(40px)',
              transition: 'opacity 900ms cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 900ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }}
          >
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
        </div>

        {/* Award callout — each element animates independently */}
        <div className="absolute top-[18%] right-[5%] flex items-start gap-0 z-10">
          {/* L-shaped lines — draw in with scale */}
          <div className="flex flex-col items-start">
            {/* Horizontal line draws right→left (from label toward building) */}
            <div
              className="w-32 md:w-48 h-px bg-white/50 mt-[18px] origin-right"
              style={{
                transform: calloutIn ? 'scaleX(1)' : 'scaleX(0)',
                transition: 'transform 600ms cubic-bezier(0.4, 0, 0.2, 1) 900ms',
              }}
            />
            {/* Vertical line draws top→bottom */}
            <div
              className="w-px h-16 bg-white/50 relative origin-top"
              style={{
                transform: calloutIn ? 'scaleY(1)' : 'scaleY(0)',
                transition: 'transform 400ms cubic-bezier(0.4, 0, 0.2, 1) 1480ms',
              }}
            >
              {/* Dot at end fades in after line finishes */}
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-white/70 rounded-full"
                style={{
                  opacity: calloutIn ? 1 : 0,
                  transition: 'opacity 300ms ease 1900ms',
                }}
              />
            </div>
          </div>

          {/* Info panel — text fades in sequentially */}
          <div className="ml-5 flex flex-col gap-2">
            {/* Title */}
            <p
              className="text-xl md:text-2xl font-bold tracking-[-0.5px] text-white leading-tight"
              style={{
                fontFamily: 'var(--font-sans)',
                opacity: calloutIn ? 1 : 0,
                transform: calloutIn ? 'translateY(0px)' : 'translateY(10px)',
                transition: 'opacity 500ms ease 1050ms, transform 500ms ease 1050ms',
              }}
            >
              House of Song
            </p>
            {/* Subtitle */}
            <p
              className="text-sm md:text-[15px] text-white/60 mb-4"
              style={{
                fontFamily: 'var(--font-sans)',
                opacity: calloutIn ? 1 : 0,
                transform: calloutIn ? 'translateY(0px)' : 'translateY(8px)',
                transition: 'opacity 500ms ease 1200ms, transform 500ms ease 1200ms',
              }}
            >
              Loboc Performing Arts Center
            </p>

            {/* Award badges — staggered after subtitle */}
            <div className="flex gap-4">
              <AwardBadge
                src="/images/award-1.png"
                alt="WAF Award"
                delay={0}
                masterReady={awardsIn}
              />
              <AwardBadge
                src="/images/award-2.png"
                alt="Award 2"
                delay={160}
                masterReady={awardsIn}
              />
              <AwardBadge
                src="/images/award-3.png"
                alt="Award 3"
                delay={320}
                masterReady={awardsIn}
              />
            </div>
          </div>
        </div>


      </section>

      {/* ══════════════════════════════════════════
          02 — OVERSIZED STATEMENT
      ══════════════════════════════════════════ */}
      <div ref={statementReveal.ref}>
        <section
          className="px-6 md:px-16 lg:px-20 py-16 md:py-32 border-b border-[#e4e3e2]"
          style={{
            opacity: statementReveal.visible ? 1 : 0,
            transform: statementReveal.visible ? 'translateY(0px)' : 'translateY(50px)',
            transition: 'opacity 1000ms cubic-bezier(0.4, 0, 0.2, 1) 200ms, transform 1000ms cubic-bezier(0.4, 0, 0.2, 1) 200ms',
          }}
        >
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
      </div>

      {/* ══════════════════════════════════════════
          03 — STATS BAND
      ══════════════════════════════════════════ */}
      <div ref={statsReveal.ref}>
        <section
          className="px-6 md:px-16 lg:px-20 py-14 md:py-20 border-b border-[#e4e3e2]"
          style={{
            opacity: statsReveal.visible ? 1 : 0,
            transform: statsReveal.visible ? 'translateY(0px)' : 'translateY(40px)',
            transition: 'opacity 900ms cubic-bezier(0.4, 0, 0.2, 1), transform 900ms cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
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
      </div>

      {/* ══════════════════════════════════════════
          04 — FULL-BLEED IMAGE + PULL QUOTE
      ══════════════════════════════════════════ */}
      <section className="relative w-full h-[80vh] overflow-hidden" data-theme="dark">
        <img
          src="/images/about-studio-interior-v2.jpg"
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
      <div ref={founderReveal.ref}>
        <section
          className="grid grid-cols-1 lg:grid-cols-2 border-b border-[#e4e3e2]"
          style={{
            opacity: founderReveal.visible ? 1 : 0,
            transform: founderReveal.visible ? 'translateY(0px)' : 'translateY(50px)',
            transition: 'opacity 1000ms cubic-bezier(0.4, 0, 0.2, 1), transform 1000ms cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          {/* Left: portrait */}
          <div className="relative w-full h-[70vw] lg:h-auto lg:min-h-[700px] overflow-hidden">
            <img
              src="/images/home-bg.jpg"
              alt="Ar. Jonathan Cruz"
              className="w-full h-full object-cover object-top"
            />
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
                <div
                  key={i}
                  className="flex items-start justify-between gap-4 border-b border-[#f0f0f0] pb-5 last:border-0"
                  style={{
                    opacity: founderReveal.visible ? 1 : 0,
                    transform: founderReveal.visible ? 'translateX(0px)' : 'translateX(20px)',
                    transition: `opacity 600ms ease ${200 + i * 100}ms, transform 600ms ease ${200 + i * 100}ms`,
                  }}
                >
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
      </div>

      {/* ══════════════════════════════════════════
          06 — MANIFESTO — FORMULA LAYOUT
      ══════════════════════════════════════════ */}
      <div ref={manifestoReveal.ref}>
        <section
          className="px-6 md:px-16 lg:px-20 py-16 md:py-32 border-b border-[#e4e3e2]"
          style={{
            opacity: manifestoReveal.visible ? 1 : 0,
            transform: manifestoReveal.visible ? 'translateY(0px)' : 'translateY(40px)',
            transition: 'opacity 900ms cubic-bezier(0.4, 0, 0.2, 1), transform 900ms cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
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
              <div
                key={label}
                className={`flex flex-col gap-5 py-10 ${i === 0 ? 'md:pr-12' : i === 1 ? 'md:px-12' : 'md:pl-12'}`}
                style={{
                  opacity: manifestoReveal.visible ? 1 : 0,
                  transform: manifestoReveal.visible ? 'translateY(0px)' : 'translateY(30px)',
                  transition: `opacity 700ms ease ${i * 150}ms, transform 700ms ease ${i * 150}ms`,
                }}
              >
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
      </div>

      {/* ══════════════════════════════════════════
          07 — IMAGE MOSAIC
      ══════════════════════════════════════════ */}
      <section className="grid grid-cols-12 grid-rows-2 h-[80vh]">
        <div className="col-span-7 row-span-2 overflow-hidden">
          <img
            src="/images/about-mosaic-1.jpg"
            alt="Project"
            className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-[1.03]"
          />
        </div>
        <div className="col-span-5 row-span-1 overflow-hidden border-l border-b border-white">
          <img
            src="/images/about-mosaic-2.jpg"
            alt="Interior"
            className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-[1.03]"
          />
        </div>
        <div className="col-span-5 row-span-1 overflow-hidden border-l border-white">
          <img
            src="/images/about-mosaic-3.jpg"
            alt="Monumental"
            className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-[1.03]"
          />
        </div>
      </section>

      {/* ══════════════════════════════════════════
          08 — DESIGN TEAM
      ══════════════════════════════════════════ */}
      <div ref={teamReveal.ref}>
        <section
          className="px-6 md:px-16 lg:px-20 py-16 md:py-32 border-b border-[#e4e3e2]"
          style={{
            opacity: teamReveal.visible ? 1 : 0,
            transform: teamReveal.visible ? 'translateY(0px)' : 'translateY(40px)',
            transition: 'opacity 900ms cubic-bezier(0.4, 0, 0.2, 1), transform 900ms cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
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

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-[#e4e3e2]">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="bg-white flex flex-col">
                <div className="w-full aspect-[3/4] bg-[#f5f4f3] flex items-center justify-center">
                  <i className="ri-user-3-line text-[#d0cfc9] text-4xl" />
                </div>
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
      </div>

      {/* ══════════════════════════════════════════
          09 — CTA BAND
      ══════════════════════════════════════════ */}
      <section className="bg-[#1a1a1a]">
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10">
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
