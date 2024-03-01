import { createContext, ReactNode } from 'react';

import { Theme } from './themes/type';
import themes from './themes';

export const ThemeContext = createContext(themes.light);

export const ThemeProvider = ({
  theme,
  children,
}: {
  theme: Theme;
  children: ReactNode;
}) => <ThemeContext.Provider value={theme} children={children} />;

export default ThemeContext;
