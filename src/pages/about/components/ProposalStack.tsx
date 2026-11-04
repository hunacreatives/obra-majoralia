import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import ProposalViewer from './ProposalViewer';

// The project proposal as a stack of pages on the desk. Scrolling lifts each
// page off the stack, turns it to face you, holds it, then slides it away to
// reveal the next. Static cover + link when motion is reduced. Below desktop
// the pages are too small to read, so tapping one opens it full screen.

interface Page { src: string; label: string }

interface Props {
  pages: Page[];
  pdf: string;
}

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const ease = (t: number) => 1 - Math.pow(1 - t, 3);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

// desk pose of the stack and the presented pose
const DESK = { rx: 56, rz: -32 };
const LIFT_END = 0.38;  // page has turned to face the viewer
const HOLD_END = 0.74;  // starts sliding away

const ProposalStack = ({ pages, pdf }: Props) => {
  const sectionRef = useRef<HTMLElement>(null);
  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const openIconRef = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(0);
  const [reduced, setReduced] = useState(false);
  const [viewing, setViewing] = useState<number | null>(null);
  const closeViewer = useCallback(() => setViewing(null), []);
  const N = pages.length;

  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) { setReduced(true); return; }
    let raf = 0;
    let smooth = 0;
    const frame = () => {
      const section = sectionRef.current;
      if (section) {
        const rect = section.getBoundingClientRect();
        const travel = rect.height - window.innerHeight;
        const target = clamp(-rect.top / Math.max(1, travel));
        smooth += (target - smooth) * 0.12;
        // the last page ends in its hold, not its exit
        const f = smooth * (N - 1 + HOLD_END);
        pageRefs.current.forEach((el, i) => {
          if (!el) return;
          const t = clamp(f - i);
          let rx: number, rz: number, y: number, s: number, o = 1;
          // pages still on the desk sit a few pixels apart, like a real stack
          const yStack = (i - (N - 1) / 2) * 0.9;
          if (t < LIFT_END) {
            const a = ease(t / LIFT_END);
            rx = lerp(DESK.rx, 0, a); rz = lerp(DESK.rz, 0, a);
            y = lerp(yStack, 0, a); s = lerp(0.86, 1, a);
          } else if (t < HOLD_END || i === N - 1) {
            rx = 0; rz = 0; y = 0; s = 1;
          } else {
            const b = ease((t - HOLD_END) / (1 - HOLD_END));
            rx = lerp(0, -12, b); rz = lerp(0, 4, b);
            y = lerp(0, -125, b); s = lerp(1, 1.04, b); o = 1 - b;
          }
          // own perspective per page (no shared 3D space), so pages can never
          // slice through each other; layering is by z-index alone
          el.style.transform =
            `translate(-50%, -50%) perspective(2200px) translateY(${y}%) rotateX(${rx}deg) rotateZ(${rz}deg) scale(${s})`;
          el.style.opacity = String(o);
          el.style.zIndex = String(t > 0 ? 100 + i : N - i);
          el.style.boxShadow = t > 0.02 && t < 1
            ? '0 40px 80px rgba(56,56,56,0.28)'
            : '0 2px 3px rgba(56,56,56,0.12)';
        });
        // a page is current from when it starts lifting until the one before it has left
        const idx = Math.min(N - 1, Math.max(0, Math.floor(f + 1 - HOLD_END)));
        setActive(prev => (prev === idx ? prev : idx));
        // the open icon only shows while the current page faces the viewer
        if (openIconRef.current) {
          const t = clamp(f - idx);
          const facing = t >= LIFT_END * 0.8 && (t < HOLD_END || idx === N - 1);
          openIconRef.current.style.opacity = facing ? '1' : '0';
        }
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [N]);

  const Header = (
    <div className="flex flex-col gap-5 md:gap-6">
      <h2 className="font-bold text-heading text-[#383838]">
        Project <span className="text-[#797979]">Proposal</span>
      </h2>
      <p className="text-[14px] leading-[1.6] text-[#797979] max-w-xs [text-wrap:balance]">
        How we present a project — from first conversation to handover.
      </p>
    </div>
  );

  const Link = (
    <a
      href={pdf}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-3 self-start bg-[#383838] hover:bg-[#797979] text-white px-6 py-4 text-[12px] font-bold tracking-[1.5px] uppercase whitespace-nowrap shadow-[0_10px_24px_rgba(56,56,56,0.25)] transition-colors duration-300"
    >
      <i className="ri-file-text-line text-[16px]" />
      View the full proposal
      <i className="ri-arrow-right-up-line text-[16px] transition-transform duration-300 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]" />
    </a>
  );

  const Viewer = viewing !== null && <ProposalViewer pages={pages} start={viewing} onClose={closeViewer} />;

  if (reduced) {
    return (
      <section className="bg-[#e4e3e2] px-6 md:px-16 lg:px-20 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10">
        <div className="flex flex-col gap-8">{Header}{Link}</div>
        <button type="button" onClick={() => setViewing(0)} aria-label={`Open ${pages[0].label} full screen`} className="block w-full lg:pointer-events-none">
          <img src={pages[0].src} alt={pages[0].label} className="w-full shadow-[0_20px_40px_rgba(56,56,56,0.2)]" />
        </button>
        {Viewer}
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#e4e3e2] h-[calc(100svh_+_var(--pages)_*_40svh)] lg:h-[calc(100svh_+_var(--pages)_*_55svh)]"
      style={{ '--pages': N } as CSSProperties}
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* copy + page counter */}
        <div className="absolute z-[200] left-0 top-0 bottom-0 lg:bottom-0 flex flex-col justify-between gap-6 px-6 md:px-16 lg:pl-20 lg:pr-8 pt-28 md:pt-32 pb-8 md:pb-12 lg:pb-16 w-full lg:w-[26vw] pointer-events-none [&_a]:pointer-events-auto">
          {Header}
          <div className="flex flex-col gap-4 lg:gap-6">
            <div className="flex items-baseline gap-3 md:gap-4">
              <span className="text-[44px] md:text-[64px] leading-none font-bold tracking-[-0.03em] text-[#383838] tabular-nums">
                {active + 1}
              </span>
              <span className="text-[14px] text-[#797979] tabular-nums">/ {N}</span>
              <span className="text-[13px] md:text-[14px] font-bold text-[#383838] ml-1 whitespace-nowrap">{pages[active].label}</span>
            </div>
            {Link}
          </div>
        </div>

        {/* the desk — full width behind the copy; pages sit right of centre on desktop */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0">
            {pages.map((p, i) => (
              <div
                key={p.src}
                ref={el => { pageRefs.current[i] = el; }}
                className="absolute left-1/2 top-[53%] md:top-[52%] lg:left-[61%] lg:top-[54%] w-[calc(100vw_-_32px)] md:w-[84vw] lg:w-[66vw] max-w-[1260px] aspect-[16/9] bg-white will-change-transform"
                style={{ transform: `translate(-50%, -50%) perspective(2200px) rotateX(${DESK.rx}deg) rotateZ(${DESK.rz}deg) scale(0.86)` }}
              >
                <img src={p.src} alt={p.label} loading={i < 2 ? 'eager' : 'lazy'} decoding="async" className="w-full h-full object-cover" draggable={false} />
              </div>
            ))}
          </div>
        </div>

        {/* below desktop: tap the current page to read it full screen */}
        <button
          type="button"
          onClick={() => setViewing(active)}
          aria-label={`Open page ${active + 1}, ${pages[active].label}, full screen`}
          className="lg:hidden absolute z-[150] left-1/2 top-[53%] md:top-[52%] w-[calc(100vw_-_32px)] md:w-[84vw] aspect-[16/9] -translate-x-1/2 -translate-y-1/2"
        >
          <span
            ref={openIconRef}
            className="absolute right-2 bottom-2 w-10 h-10 rounded-full bg-[#383838] text-white flex items-center justify-center opacity-0 transition-opacity duration-200"
          >
            <i className="ri-fullscreen-line text-[16px]" />
          </span>
        </button>
      </div>
      {Viewer}
    </section>
  );
};

export default ProposalStack;
