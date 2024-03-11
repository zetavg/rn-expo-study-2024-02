import React, { ReactNode } from 'react';

import { ContextProvider as IosUIContextProvider } from '@rnstudy/react-native-ios-ui';

import { Theme } from './themes/types';
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
      <IosUIContextProvider
        colors={theme.ios.colors[colorScheme]}
        uiColors={theme.ios.uiColors[colorScheme]}
      >
        {children}
      </IosUIContextProvider>
    </UIPlatformContext.Provider>
  );
};
