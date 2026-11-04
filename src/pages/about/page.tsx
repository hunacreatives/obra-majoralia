import { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import CtaBand from '@/components/feature/CtaBand';
import ProposalStack from './components/ProposalStack';
import FormulaSequence from './components/FormulaSequence';
import { TEAM, TEAM_PLACEHOLDER, MANIFESTO, CREDENTIALS } from './data';



/* ── Scroll-triggered reveal ── */
// Pages shown in the proposal stack (fee and contract pages left out on purpose)
const PROPOSAL_PAGES = [
  { src: '/images/proposal/page-1.webp', label: 'Cover' },
  { src: '/images/proposal/page-2.webp', label: 'Contents' },
  { src: '/images/proposal/page-3.webp', label: 'Company profile' },
  { src: '/images/proposal/page-5.webp', label: 'Schematic design' },
  { src: '/images/proposal/page-6.webp', label: 'Design development' },
  { src: '/images/proposal/page-9.webp', label: 'Construction' },
  { src: '/images/proposal/page-15.webp', label: 'Project timeline' },
  { src: '/images/proposal/page-31.webp', label: 'Contact' },
];

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
  const founderReveal = useReveal(0.1);
  const teamReveal = useReveal(0.1);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ══════════════════════════════════════════
          01 — FULL-SCREEN HERO: STATEMENT + IMAGE
      ══════════════════════════════════════════ */}
      <section className="min-h-[76svh] md:min-h-[56svh] lg:min-h-0 lg:h-[100dvh] flex flex-col pt-20 border-b border-[#e4e3e2]">
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
          <div className="relative flex flex-col justify-center px-6 md:px-16 lg:px-20 py-12 md:py-10 lg:border-r border-[#e4e3e2] overflow-hidden">
            <p
              className="text-[11px] tracking-[2px] text-[#797979] uppercase mb-6 md:mb-8"
            >
              Studio · Est. 2018
            </p>
            <p
              className="font-bold text-[clamp(26px,8vw,40px)] md:text-[40px] lg:text-[44px] xl:text-[56px] leading-[1.08] tracking-[-0.015em] text-[#383838]"
            >
              Architecture is for
              <br />
              the <span className="text-[#797979] whitespace-nowrap">End Users</span>,
              <br />
              not for the Designers.
            </p>
            <div className="mt-6 md:mt-8 flex flex-col gap-4 md:gap-5">
              <p className="text-sm md:text-base lg:text-[16px] text-[#797979] leading-[1.6] max-w-[34rem] [text-wrap:balance]">
                Rooted in a deep understanding of context — the culture, history, and aspirations of the people and places they design for.
              </p>
              <p className="text-sm md:text-base lg:text-[16px] text-[#797979] leading-[1.6] max-w-[34rem] [text-wrap:balance]">
                Guided by intuition and a sensitivity to both form and function, they create spaces that are purposeful, poetic, and responsive.
              </p>
            </div>
          </div>

          {/* Right: image panel */}
          <div className="hidden lg:block overflow-hidden relative">
            <img
              src="/images/about/studio-hero.webp"
              alt="S Residence, the entry passage between stone and timber"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-[#383838]/10" />
          </div>
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
          <div className="relative w-full aspect-square md:aspect-[5/4] lg:aspect-auto lg:min-h-[700px] overflow-hidden">
            <img
              src="/images/jonathan-cruz.webp"
              alt="Ar. Jonathan Cruz"
              className="absolute inset-0 w-full h-full object-cover object-[83%_50%] md:object-[100%_50%] lg:object-[76%_50%]"
            />
            <div className="absolute bottom-0 left-0 right-0 px-6 md:px-16 lg:px-8 pb-6 md:pb-8 pt-20 bg-gradient-to-t from-[#383838]/80 via-[#383838]/40 to-transparent">
              <p
                className="font-bold text-[26px] md:text-[32px] leading-tight tracking-[-0.02em] text-white"
              >
                Ar. Jonathan Cruz
              </p>
              <p
                className="text-[11px] tracking-[1.5px] text-[#e4e3e2] uppercase mt-1"
              >
                Principal Architect &amp; Founder
              </p>
            </div>
          </div>

          {/* Right: quote + credentials */}
          <div className="flex flex-col px-6 md:px-16 py-14 md:py-20 lg:py-16 lg:min-h-[700px]">
            {/* Pull quote */}
            <div className="mb-8 pb-8 lg:mb-6 lg:pb-14 border-b border-[#e4e3e2]">
              <div className="flex items-start gap-3">
                <span
                  className="font-bold text-[48px] md:text-[72px] leading-[0.8] text-[#e4e3e2] flex-shrink-0 select-none mt-1"
                  aria-hidden="true"
                >
                  &ldquo;
                </span>
                <p
                  className="font-bold text-quote text-[#383838]"
                >
                  Architecture must listen<br />before it speaks.
                </p>
              </div>
            </div>

            <p
              className="text-[14px] md:text-[15px] text-[#797979] leading-[1.6] mb-4 md:mb-8"
            >
              A licensed architect with a practice rooted in cultural sensitivity, spatial precision, and award-winning design.
            </p>
            <p
              className="text-[14px] md:text-base text-[#797979] leading-[1.6] mb-10 md:mb-12"
            >
              Trained at the University of San Carlos and internationally at the University of Pécs, Hungary, Ar. Jonathan Cruz brings a global perspective to deeply local contexts. His work spans residential, hospitality, interior, and monumental typologies.
            </p>

            {/* Tab switcher */}
            <div className="flex gap-6 md:gap-8 border-b border-[#e4e3e2] mb-6 md:mb-8">
              {(['awards', 'work', 'education'] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setCredTab(tab)}
                  className={[
                    'text-[11px] tracking-[1.5px] uppercase min-h-[44px] pt-4 pb-3 border-b-2 -mb-px transition-colors duration-200 cursor-pointer whitespace-nowrap',
                    credTab === tab
                      ? 'text-[#383838] border-[#383838]'
                      : 'text-[#797979] border-transparent hover:text-[#383838]',
                  ].join(' ')}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div className="flex flex-col gap-4 md:gap-5 md:min-h-[240px]">
              {CREDENTIALS[credTab].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start justify-between gap-4 border-b border-[#e4e3e2] pb-4 md:pb-5 last:border-0 last:pb-0"
                  style={{
                    opacity: founderReveal.visible ? 1 : 0,
                    transform: founderReveal.visible ? 'translateX(0px)' : 'translateX(20px)',
                    transition: `opacity 600ms ease ${200 + i * 100}ms, transform 600ms ease ${200 + i * 100}ms`,
                  }}
                >
                  <div className="flex flex-col gap-1">
                    <span
                      className="text-[15px] md:text-base font-bold leading-snug tracking-[-0.01em] text-[#383838]"
                    >
                      {item.title}
                    </span>
                    <span
                      className="text-[13px] text-[#797979] tracking-[0.3px]"
                    >
                      {item.sub}
                    </span>
                  </div>
                  <span
                    className="text-[12px] tracking-[1.5px] text-[#797979] whitespace-nowrap flex-shrink-0 mt-0.5"
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
      <FormulaSequence items={MANIFESTO} />

      {/* ══════════════════════════════════════════
          06 — PROJECT PROPOSAL — pages lift off a stack as you scroll
      ══════════════════════════════════════════ */}
      <ProposalStack pdf="/casa-rossi-proposal.pdf" pages={PROPOSAL_PAGES} />
      {/* ══════════════════════════════════════════
          07 — DESIGN TEAM
      ══════════════════════════════════════════ */}
      <div ref={teamReveal.ref}>
        <section
          className="px-6 md:px-16 lg:px-20 py-16 md:py-24"
          style={{
            opacity: teamReveal.visible ? 1 : 0,
            transform: teamReveal.visible ? 'translateY(0px)' : 'translateY(40px)',
            transition: 'opacity 900ms cubic-bezier(0.4, 0, 0.2, 1), transform 900ms cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 md:mb-14">
            <h2 className="font-bold text-heading text-[#383838]">
              Design <span className="font-display font-thin italic">Team</span>
            </h2>
            <p className="text-[14px] leading-[1.6] text-[#797979] max-w-[22rem] md:text-right [text-wrap:balance]">
              A focused team of designers and architects working together to shape meaningful spaces.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-3 md:gap-x-5 gap-y-8 md:gap-y-10">
            {(TEAM.length ? TEAM : TEAM_PLACEHOLDER).map((m, i) => (
              <figure
                key={`${m.name}-${i}`}
                className="flex flex-col"
                style={{
                  opacity: teamReveal.visible ? 1 : 0,
                  transform: teamReveal.visible ? 'translateY(0)' : 'translateY(24px)',
                  transition: `opacity 700ms ease ${i * 70}ms, transform 800ms cubic-bezier(0.22, 1, 0.36, 1) ${i * 70}ms`,
                }}
              >
                <div className="aspect-[4/5] overflow-hidden bg-[#e4e3e2]">
                  {m.photo ? (
                    <img src={m.photo} alt={m.name} loading="lazy" decoding="async" className="w-full h-full object-cover object-top" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <i className="ri-user-3-line text-[48px] lg:text-[64px] text-white" />
                    </div>
                  )}
                </div>
                <figcaption className="pt-3 md:pt-4">
                  <p className="text-[14px] lg:text-[16px] font-bold tracking-[-0.01em] text-[#383838] leading-tight">{m.name}</p>
                  <p className="text-[12px] lg:text-[14px] text-[#797979] mt-1 leading-snug">{m.role}</p>
                </figcaption>
              </figure>
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
