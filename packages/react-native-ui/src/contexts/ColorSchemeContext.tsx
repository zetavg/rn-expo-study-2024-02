import { createContext, useContext } from 'react';

export const ColorSchemeContext = createContext<'light' | 'dark' | undefined>(
  undefined,
);

export function useColorScheme(): 'light' | 'dark' {
  return useContext(ColorSchemeContext) || 'light';
}

export default ColorSchemeContext;
