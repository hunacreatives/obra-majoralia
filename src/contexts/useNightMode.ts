import { createContext, useContext } from 'react';

export interface NightModeContextValue {
  isNight: boolean;
  setIsNight: (value: boolean) => void;
}

export const NightModeContext = createContext<NightModeContextValue>({
  isNight: false,
  setIsNight: () => {},
});

export const useNightMode = () => useContext(NightModeContext);
