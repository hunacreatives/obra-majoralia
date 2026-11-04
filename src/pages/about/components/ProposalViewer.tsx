import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface Page { src: string; label: string }

interface Props {
  pages: Page[];
  start: number;
  onClose: () => void;
}

const hd = (src: string) => src.replace('/proposal/', '/proposal/hd/');

// Phones and tablets: one proposal page, full screen and large enough to read.
// The page is wider than the screen, so a swipe pans across it. The small copy
// shows straight away while the sharp one loads.
const ProposalViewer = ({ pages, start, onClose }: Props) => {
  const [i, setI] = useState(start);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const N = pages.length;

  useEffect(() => {
    const html = document.documentElement;
    const prevOverflow = html.style.overflow;
    const prevFocus = document.activeElement as HTMLElement | null;
    html.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setI(v => Math.min(N - 1, v + 1));
      if (e.key === 'ArrowLeft') setI(v => Math.max(0, v - 1));
    };
    window.addEventListener('keydown', onKey);
    return () => {
      html.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
      prevFocus?.focus({ preventScroll: true });
    };
  }, [N, onClose]);

  // each page starts from its top left
  useEffect(() => { scrollerRef.current?.scrollTo(0, 0); }, [i]);

  const arrow = 'w-11 h-11 rounded-full border border-white/30 flex items-center justify-center transition-opacity duration-200 disabled:opacity-30';

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Proposal page ${i + 1} of ${N}: ${pages[i].label}`}
      className="fixed inset-0 z-[70] flex flex-col bg-[#383838] text-white"
    >
      <div className="shrink-0 flex items-center justify-between gap-4 pl-6 pr-3.5 pt-[max(0.75rem,env(safe-area-inset-top))] pb-3">
        <p className="flex items-baseline gap-2 min-w-0 text-[13px]">
          <span className="font-bold tabular-nums">{i + 1}</span>
          <span className="text-[#e4e3e2] tabular-nums">/ {N}</span>
          <span className="font-bold ml-1 truncate">{pages[i].label}</span>
        </p>
        <button ref={closeRef} type="button" onClick={onClose} aria-label="Close" className="shrink-0 w-11 h-11 flex items-center justify-center">
          <i className="ri-close-line text-[24px]" />
        </button>
      </div>

      <div ref={scrollerRef} className="flex-1 min-h-0 flex overflow-auto overscroll-contain">
        <div
          className="m-auto shrink-0 w-[max(100vw,1100px)] aspect-[16/9] bg-white bg-cover"
          style={{ backgroundImage: `url(${pages[i].src})` }}
        >
          <img key={pages[i].src} src={hd(pages[i].src)} alt={pages[i].label} className="w-full h-full object-cover" draggable={false} />
        </div>
      </div>

      <div className="shrink-0 flex items-center justify-between px-6 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))]">
        <button type="button" onClick={() => setI(v => v - 1)} disabled={i === 0} aria-label="Previous page" className={arrow}>
          <i className="ri-arrow-left-line text-[18px]" />
        </button>
        <button type="button" onClick={() => setI(v => v + 1)} disabled={i === N - 1} aria-label="Next page" className={arrow}>
          <i className="ri-arrow-right-line text-[18px]" />
        </button>
      </div>
    </div>,
    document.body,
  );
};

export default ProposalViewer;
