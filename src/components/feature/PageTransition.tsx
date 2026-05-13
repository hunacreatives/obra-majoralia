import { ReactNode, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageTransitionContext } from '@/hooks/usePageTransition';

interface Props {
  children: ReactNode;
}

const PageTransition = ({ children }: Props) => {
  const rawNavigate = useNavigate();

  const value = useMemo(
    () => ({
      navigate: (to: string) => rawNavigate(to),
    }),
    [rawNavigate]
  );

  return (
    <PageTransitionContext.Provider value={value}>
      {children}
    </PageTransitionContext.Provider>
  );
};

export default PageTransition;
