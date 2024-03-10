import React, { ReactNode } from 'react';

import { ThemeProvider as IOSThemeProvider } from '@rnstudy/react-native-ios-ui';

import { Theme } from './themes/type';
import UIPlatformContext, {
  AVAILABLE_UI_PLATFORMS,
  type UIPlatform,
} from './UIPlatformContext';

export const ThemeProvider = ({
  theme,
  platform = AVAILABLE_UI_PLATFORMS[0],
  children,
}: {
  theme: Theme;
  platform?: UIPlatform;
  children: ReactNode;
}) => {
  const validatedPlatform = AVAILABLE_UI_PLATFORMS.includes(platform)
    ? platform
    : AVAILABLE_UI_PLATFORMS[0];

  return (
    <UIPlatformContext.Provider value={validatedPlatform}>
      <IOSThemeProvider theme={theme.ios}>{children}</IOSThemeProvider>
    </UIPlatformContext.Provider>
  );
};
