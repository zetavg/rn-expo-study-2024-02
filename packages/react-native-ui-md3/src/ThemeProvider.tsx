import React, { ReactNode, useMemo } from 'react';
import {
  MD3DarkTheme as PaperMD3DefaultDarkTheme,
  MD3LightTheme as PaperMD3DefaultLightTheme,
  MD3Theme as PaperMD3Theme,
  PaperProvider,
} from 'react-native-paper';

import ThemeContext from './contexts/ThemeContext';
import { ColorSchemeContext } from './contexts';
import { md3BaselineTheme, MD3Theme } from './theming';

export const ThemeProvider = ({
  theme = md3BaselineTheme,
  colorScheme,
  children,
}: {
  theme?: MD3Theme;
  colorScheme: 'light' | 'dark';
  children: ReactNode;
}) => {
  const paperTheme = useMemo<PaperMD3Theme>(
    () => ({
      version: 3,
      isV3: true,
      dark: colorScheme === 'dark',
      ...theme,
      colors: {
        ...(colorScheme === 'dark'
          ? PaperMD3DefaultDarkTheme
          : PaperMD3DefaultLightTheme
        ).colors,
        ...theme.schemes[colorScheme],
      },
    }),
    [theme, colorScheme],
  );

  return (
    <ColorSchemeContext.Provider value={colorScheme}>
      <ThemeContext.Provider value={theme}>
        <PaperProvider theme={paperTheme}>{children}</PaperProvider>
      </ThemeContext.Provider>
    </ColorSchemeContext.Provider>
  );
};
