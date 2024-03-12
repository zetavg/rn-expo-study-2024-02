import React, { ReactNode, useMemo } from 'react';
import {
  MD3DarkTheme as PaperMD3DefaultDarkTheme,
  MD3LightTheme as PaperMD3DefaultLightTheme,
  MD3Theme as PaperMD3Theme,
  PaperProvider,
} from 'react-native-paper';

import { ContextProvider as IosUIContextProvider } from '@rnstudy/react-native-ui-ios';

import { Theme } from './themes/types';
import ColorSchemeContext from './ColorSchemeContext';
import MD3ThemeContext from './MD3ThemeContext';
import themes from './themes';
import UIPlatformContext, {
  AVAILABLE_UI_PLATFORMS,
  type UIPlatform,
} from './UIPlatformContext';

export const ThemeProvider = ({
  colorScheme,
  platform = AVAILABLE_UI_PLATFORMS[0],
  theme = themes.blue,
  children,
}: {
  theme?: Theme;
  colorScheme: 'light' | 'dark';
  platform?: UIPlatform;
  children: ReactNode;
}) => {
  const validatedPlatform = AVAILABLE_UI_PLATFORMS.includes(platform)
    ? platform
    : AVAILABLE_UI_PLATFORMS[0];

  const paperTheme = useMemo<PaperMD3Theme>(
    () => ({
      version: 3,
      isV3: true,
      dark: colorScheme === 'dark',
      ...theme.md3,
      colors: {
        ...(colorScheme === 'dark'
          ? PaperMD3DefaultDarkTheme
          : PaperMD3DefaultLightTheme
        ).colors,
        ...theme.md3.schemes[colorScheme],
      },
    }),
    [theme.md3, colorScheme],
  );

  return (
    <UIPlatformContext.Provider value={validatedPlatform}>
      <ColorSchemeContext.Provider value={colorScheme}>
        <MD3ThemeContext.Provider value={theme.md3}>
          <PaperProvider theme={paperTheme}>
            <IosUIContextProvider
              colors={theme.ios.schemes[colorScheme].colors}
              uiColors={theme.ios.schemes[colorScheme].uiColors}
              textStyles={theme.ios.textStyles}
            >
              {children}
            </IosUIContextProvider>
          </PaperProvider>
        </MD3ThemeContext.Provider>
      </ColorSchemeContext.Provider>
    </UIPlatformContext.Provider>
  );
};
