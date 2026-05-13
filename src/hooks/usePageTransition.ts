import { createContext, useContext } from 'react';

export interface PageTransitionContextValue {
  navigate: (to: string) => void;
}

export const PageTransitionContext = createContext<PageTransitionContextValue>({
  navigate: () => {},
});

export const usePageTransition = () => useContext(PageTransitionContext);
