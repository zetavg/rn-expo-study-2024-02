import { createContext, useContext } from 'react';

export const SettingsContext = createContext<
  | {
      colorScheme: 'system' | 'dark' | 'light';
      setColorScheme: (colorScheme: 'system' | 'dark' | 'light') => void;
      uiPlatform: 'ios' | 'android';
      setUIPlatform: (uiPlatform: 'ios' | 'android') => void;
    }
  | undefined
>(undefined);

export function useSettings() {
  const settings = useContext(SettingsContext);
  return settings;
}
