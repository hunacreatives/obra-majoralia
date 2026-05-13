import { useState, type ReactNode } from 'react';

import { NightModeContext } from './useNightMode';

export const NightModeProvider = ({ children }: { children: ReactNode }) => {
  const [isNight, setIsNight] = useState(false);
  return (
    <NightModeContext.Provider value={{ isNight, setIsNight }}>
      {children}
    </NightModeContext.Provider>
  );
};
