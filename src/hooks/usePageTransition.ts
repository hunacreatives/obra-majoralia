import { createContext, useContext } from 'react';

export type FlipDirection = 'forward' | 'backward' | 'none';

export interface PageTransitionContextValue {
  navigate: (to: string) => void;
}

export const PageTransitionContext = createContext<PageTransitionContextValue>({
  navigate: () => {},
});

export const usePageTransition = () => useContext(PageTransitionContext);

// Nav order — determines flip direction
export const NAV_ORDER = ['/home', '/projects', '/about', '/news', '/careers', '/contact'];

export const getFlipDirection = (from: string, to: string): FlipDirection => {
  // Normalize: strip trailing slash, handle sub-paths like /projects/:id
  const normalize = (p: string) => {
    const base = '/' + p.replace(/^\//, '').split('/')[0];
    return base;
  };
  const fromBase = normalize(from);
  const toBase = normalize(to);

  const fromIdx = NAV_ORDER.indexOf(fromBase);
  const toIdx = NAV_ORDER.indexOf(toBase);

  if (fromIdx === -1 || toIdx === -1 || fromIdx === toIdx) return 'none';
  return toIdx > fromIdx ? 'forward' : 'backward';
};
