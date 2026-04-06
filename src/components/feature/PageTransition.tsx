import {
  useState,
  useRef,
  useCallback,
  useEffect,
  ReactNode,
} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  PageTransitionContext,
  FlipDirection,
  getFlipDirection,
} from '@/hooks/usePageTransition';

interface Props {
  children: ReactNode;
}

const DURATION = 520;

/*
  Book page turn:
  - Forward (going to a later page): current slides OUT to the left, new slides IN from the right
  - Backward (going to an earlier page): current slides OUT to the right, new slides IN from the left
  
  We keep TWO rendered layers:
    - "leaving" = snapshot of the old page (frozen div, slides out)
    - "entering" = the new page (slides in)
  
  We capture the old page's scroll position and render it as a fixed overlay
  so it looks like the actual page sliding away.
*/

const easing = 'cubic-bezier(0.76, 0, 0.24, 1)';

const PageTransition = ({ children }: Props) => {
  const rawNavigate = useNavigate();
  const location = useLocation();

  const [phase, setPhase] = useState<'idle' | 'animating'>('idle');
  const [direction, setDirection] = useState<FlipDirection>('none');

  // The outgoing page's HTML snapshot
  const [leavingHtml, setLeavingHtml] = useState<string>('');
  const [leavingScroll, setLeavingScroll] = useState(0);

  // Animation progress: 0 = start, 1 = end
  const [progress, setProgress] = useState(0);

  const isAnimating = useRef(false);
  const pageContentRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  const navigate = useCallback(
    (to: string) => {
      if (isAnimating.current) return;
      const dir = getFlipDirection(location.pathname, to);

      if (dir === 'none') {
        rawNavigate(to);
        return;
      }

      // 1. Capture the current page
      const scrollY = window.scrollY;
      const html = pageContentRef.current?.innerHTML ?? '';

      setLeavingHtml(html);
      setLeavingScroll(scrollY);
      setDirection(dir);
      setProgress(0);
      setPhase('animating');
      isAnimating.current = true;

      // 2. Navigate immediately so new page renders underneath
      rawNavigate(to);

      // 3. On next frame, kick off the animation
      requestAnimationFrame(() => {
        setProgress(1);
      });

      // 4. Clean up after animation
      setTimeout(() => {
        setPhase('idle');
        setDirection('none');
        setLeavingHtml('');
        setProgress(0);
        isAnimating.current = false;
      }, DURATION + 40);
    },
    [location.pathname, rawNavigate]
  );

  // Safety reset
  useEffect(() => {
    if (!isAnimating.current) {
      setPhase('idle');
    }
  }, [location.pathname]);

  // Cleanup RAF on unmount
  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  // Slide distances
  const leavingX = direction === 'forward' ? '-100%' : '100%';
  const enteringStartX = direction === 'forward' ? '100%' : '-100%';

  return (
    <PageTransitionContext.Provider value={{ navigate }}>
      <div style={{ position: 'relative', overflow: 'hidden', minHeight: '100vh' }}>

        {/* ── LEAVING PAGE (slides out) ── */}
        {phase === 'animating' && leavingHtml && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 100,
              overflow: 'hidden',
              pointerEvents: 'none',
              transform: progress === 1 ? `translateX(${leavingX})` : 'translateX(0)',
              transition: progress === 1 ? `transform ${DURATION}ms ${easing}` : 'none',
              willChange: 'transform',
              background: '#fff',
            }}
          >
            {/* Render the frozen snapshot at its scroll position */}
            <div
              style={{ transform: `translateY(-${leavingScroll}px)` }}
              dangerouslySetInnerHTML={{ __html: leavingHtml }}
            />
            {/* Shadow on the trailing edge — sells the page-turn feel */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                width: '80px',
                pointerEvents: 'none',
                [direction === 'forward' ? 'right' : 'left']: 0,
                background:
                  direction === 'forward'
                    ? 'linear-gradient(to left, rgba(0,0,0,0.12) 0%, transparent 100%)'
                    : 'linear-gradient(to right, rgba(0,0,0,0.12) 0%, transparent 100%)',
              }}
            />
          </div>
        )}

        {/* ── ENTERING PAGE (slides in) ── */}
        <div
          ref={pageContentRef}
          style={
            phase === 'animating'
              ? {
                  transform: progress === 1 ? 'translateX(0)' : `translateX(${enteringStartX})`,
                  transition: progress === 1 ? `transform ${DURATION}ms ${easing}` : 'none',
                  willChange: 'transform',
                  // Shadow on the leading edge
                  boxShadow:
                    direction === 'forward'
                      ? '-6px 0 24px rgba(0,0,0,0.08)'
                      : '6px 0 24px rgba(0,0,0,0.08)',
                }
              : {}
          }
        >
          {children}
        </div>
      </div>
    </PageTransitionContext.Provider>
  );
};

export default PageTransition;
