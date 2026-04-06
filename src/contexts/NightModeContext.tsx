import { createContext, useContext, useState } from 'react';

interface NightModeContextValue {
  isNight: boolean;
  setIsNight: (v: boolean) => void;
}

const NightModeContext = createContext<NightModeContextValue>({
  isNight: false,
  setIsNight: () => {},
});

export const NightModeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isNight, setIsNight] = useState(false);
  return (
    <NightModeContext.Provider value={{ isNight, setIsNight }}>
      {children}
    </NightModeContext.Provider>
  );
};

export const useNightMode = () => useContext(NightModeContext);
