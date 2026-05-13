import { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import CtaBand from '@/components/feature/CtaBand';
import PdfViewer from './components/PdfViewer';

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
    { title: 'TopLab Architecture Review Center', sub: 'Mentor', year: '2023–2025' },
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
    <div ref={ref} className="flex flex-col gap-2 items-center">
      <span
        className="text-[40px] md:text-[52px] font-bold leading-[1] tracking-normal text-[#383838]"
        style={{ fontFamily: 'var(--font-sans)' }}
      >
        {count}{suffix}
      </span>
      <span
        className="text-[11px] tracking-[2.5px] text-[#999] uppercase"
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

const AboutPage = () => {
  const [credTab, setCredTab] = useState<'education' | 'work' | 'awards'>('awards');

  /* Scroll reveals */
  const statementReveal = useReveal(0.15);
  const statsReveal = useReveal(0.15);
  const founderReveal = useReveal(0.1);
  const manifestoReveal = useReveal(0.1);
  const teamReveal = useReveal(0.1);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ══════════════════════════════════════════
          01 — FULL-SCREEN HERO: STATEMENT + IMAGE
      ══════════════════════════════════════════ */}
      <section className="h-screen flex flex-col pt-20 border-b border-[#e4e3e2]">
        {/* Main split */}
        <div
          ref={statementReveal.ref}
          className="flex-1 grid grid-cols-1 lg:grid-cols-[3fr_2fr] overflow-hidden"
          style={{
            opacity: statementReveal.visible ? 1 : 0,
            transform: statementReveal.visible ? 'translateY(0px)' : 'translateY(40px)',
            transition: 'opacity 1000ms cubic-bezier(0.4, 0, 0.2, 1) 100ms, transform 1000ms cubic-bezier(0.4, 0, 0.2, 1) 100ms',
          }}
        >
          {/* Left: statement */}
          <div className="flex flex-col justify-center px-8 md:px-16 lg:px-20 py-10 border-r border-[#e4e3e2]">
            <p
              className="text-[11px] tracking-[3px] text-[#bbb] uppercase mb-8"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Studio · Est. 2018
            </p>
            <p
              className="text-[24px] md:text-[36px] lg:text-[46px] font-bold leading-[1.1] tracking-[-1px] md:tracking-[-1.5px] text-[#383838]"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Architecture is for the{' '}
              <span className="italic font-normal text-[#999]">End Users</span>,
              <br />not for the Designers.
            </p>
            <div className="mt-10 w-10 h-px bg-[#e4e3e2]" />
            <div className="mt-8 flex flex-col gap-5 max-w-2xl">
              <p className="text-base text-[#797979] leading-loose" style={{ fontFamily: 'var(--font-sans)' }}>
                Rooted in a deep understanding of context — the culture, history, and aspirations of the people and places they design for.
              </p>
              <p className="text-base text-[#797979] leading-loose" style={{ fontFamily: 'var(--font-sans)' }}>
                Guided by intuition and a sensitivity to both form and function, they create spaces that are purposeful, poetic, and responsive.
              </p>
            </div>
          </div>

          {/* Right: image panel */}
          <div className="hidden lg:block overflow-hidden relative">
            <img
              src="/images/about-studio-interior-v2.webp"
              alt="Studio"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/10" />
          </div>
        </div>

        {/* Stats bar — anchored at bottom */}
        <div
          ref={statsReveal.ref}
          className="shrink-0 border-t border-[#e4e3e2] grid grid-cols-2 lg:grid-cols-4 divide-x divide-[#e4e3e2]"
          style={{
            opacity: statsReveal.visible ? 1 : 0,
            transition: 'opacity 800ms cubic-bezier(0.4, 0, 0.2, 1) 400ms',
          }}
        >
          {[
            { value: 15, label: 'Projects Completed', suffix: '+' },
            { value: 4, label: 'Typologies', suffix: '' },
            { value: 3, label: 'International Awards', suffix: '' },
            { value: 6, label: 'Years of Practice', suffix: '' },
          ].map((s) => (
            <div key={s.label} className="flex items-center justify-center py-6">
              <Stat value={s.value} label={s.label} suffix={s.suffix} />
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          03 — FOUNDER — EDITORIAL SPLIT
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
              src="/images/jonathan-cruz.webp"
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
                className="text-[11px] tracking-[2.5px] text-white/60 uppercase mt-1"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                Principal Architect &amp; Founder
              </p>
            </div>
          </div>

          {/* Right: quote + credentials */}
          <div className="flex flex-col px-10 md:px-14 lg:px-16 py-16 lg:min-h-[700px]">
            {/* Pull quote */}
            <div className="mb-10 pb-10 border-b border-[#e4e3e2]">
              <p
                className="text-[26px] md:text-[32px] lg:text-[38px] font-bold italic leading-[1.25] tracking-[-0.5px] text-[#383838] mb-6"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                &ldquo;Architecture must listen before it speaks.&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <span className="w-6 h-px bg-[#d0cfc9] flex-shrink-0" />
                <p
                  className="text-[12px] tracking-[2.5px] text-[#aaa] uppercase"
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  Ar. Jonathan Cruz · Principal Architect
                </p>
              </div>
            </div>

            <p
              className="text-[17px] text-[#797979] leading-loose mb-8"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              A licensed architect with a practice rooted in cultural sensitivity, spatial precision, and award-winning design.
            </p>
            <p
              className="text-base text-[#797979] leading-loose mb-12"
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
                    'text-[11px] tracking-[2.5px] uppercase pb-3 pr-8 transition-colors duration-200 cursor-pointer whitespace-nowrap',
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

            {/* Tab content — fixed height so switching tabs never resizes the photo */}
            <div className="flex flex-col gap-5 h-[220px]">
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
                      className="text-base font-bold tracking-[0.5px] text-[#383838]"
                      style={{ fontFamily: 'var(--font-sans)' }}
                    >
                      {item.title}
                    </span>
                    <span
                      className="text-[13px] text-[#999] tracking-[0.3px]"
                      style={{ fontFamily: 'var(--font-sans)' }}
                    >
                      {item.sub}
                    </span>
                  </div>
                  <span
                    className="text-[12px] tracking-[1.5px] text-[#bbb] whitespace-nowrap flex-shrink-0 mt-0.5"
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
          05 — MANIFESTO — FORMULA LAYOUT
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
                  className="text-base text-[#aaa] leading-loose italic"
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  {formula}
                </p>
                <p
                  className="text-base text-[#797979] leading-loose"
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
          06 — PROJECT PROPOSAL PDF VIEWER
      ══════════════════════════════════════════ */}
      <section className="h-screen flex flex-col border-b border-[#e4e3e2]">
        <div className="shrink-0 px-8 md:px-16 lg:px-20 pt-14 pb-5 flex items-end justify-between border-b border-[#e4e3e2]">
          <div>
            <p className="text-[32px] md:text-[44px] font-bold leading-none tracking-[-1.5px] text-[#383838]" style={{ fontFamily: 'var(--font-sans)' }}>
              Project <span className="italic font-normal text-[#999]">Proposal</span>
            </p>
          </div>
        </div>
        <div className="flex-1 overflow-hidden">
          <PdfViewer file="/casa-rossi-proposal.pdf" headerHeight={0} />
        </div>
      </section>

      {/* ══════════════════════════════════════════
          07 — DESIGN TEAM
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
              className="text-base text-[#999] max-w-xs leading-loose"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              A focused team of designers and architects working together to shape meaningful spaces.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-[#e4e3e2]">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white flex flex-col">
                <div className="w-full aspect-[3/4] bg-[#f5f4f3] flex items-center justify-center">
                  <i className="ri-user-3-line text-[#d0cfc9] text-4xl" />
                </div>
                <div className="px-5 py-5 flex flex-col gap-1">
                  <p
                    className="text-base font-bold tracking-[-0.2px] text-[#383838]"
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    Team Member
                  </p>
                  <p
                    className="text-[13px] text-[#aaa] tracking-[0.3px]"
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
          08 — CTA BAND
      ══════════════════════════════════════════ */}
      <CtaBand />

      <Footer />
    </div>
  );
};

export default AboutPage;
