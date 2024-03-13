import React, { ReactNode } from 'react';

import { TokensContextProvider as TokensContextProviderIOS } from '@rnstudy/react-native-ui-ios';
import { ThemeProvider as ThemeProviderMD3 } from '@rnstudy/react-native-ui-md3';

import {
  AVAILABLE_UI_PLATFORMS,
  ColorSchemeContext,
  type UIPlatform,
  UIPlatformContext,
} from './contexts';
import { baselineTheme, type Theme } from './theming';

export const UIContextProvider = ({
  colorScheme,
  platform = AVAILABLE_UI_PLATFORMS[0],
  theme = baselineTheme,
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

  return (
    <UIPlatformContext.Provider value={validatedPlatform}>
      <ColorSchemeContext.Provider value={colorScheme}>
        <ThemeProviderMD3 theme={theme.md3} colorScheme={colorScheme}>
          <TokensContextProviderIOS
            colors={theme.ios.schemes[colorScheme].colors}
            uiColors={theme.ios.schemes[colorScheme].uiColors}
            textStyles={theme.ios.textStyles}
          >
            {children}
          </TokensContextProviderIOS>
        </ThemeProviderMD3>
      </ColorSchemeContext.Provider>
    </UIPlatformContext.Provider>
  );
};

export default UIContextProvider;
