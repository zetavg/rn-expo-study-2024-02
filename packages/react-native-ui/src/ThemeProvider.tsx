import React, { ReactNode } from 'react';
import { PaperProvider } from 'react-native-paper';

import { ContextProvider as IosUIContextProvider } from '@rnstudy/react-native-ios-ui';

import { Theme } from './themes/types';
import ColorSchemeContext from './ColorSchemeContext';
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

  return (
    <UIPlatformContext.Provider value={validatedPlatform}>
      <ColorSchemeContext.Provider value={colorScheme}>
        <PaperProvider theme={theme.md3[colorScheme]}>
          <IosUIContextProvider
            colors={theme.ios[colorScheme].colors}
            uiColors={theme.ios[colorScheme].uiColors}
            textStyles={theme.ios[colorScheme].textStyles}
          >
            {children}
          </IosUIContextProvider>
        </PaperProvider>
      </ColorSchemeContext.Provider>
    </UIPlatformContext.Provider>
  );
};
