import { createContext, useContext } from 'react';

import { md3BaselineTheme, MD3Theme } from '../theming';

export const ThemeContext = createContext<MD3Theme>(md3BaselineTheme);

export function useTheme(): MD3Theme {
  return useContext(ThemeContext);
}

export default ThemeContext;
