import React, { ReactNode, useMemo } from 'react';
import Color from 'color';

import { IconContextProvider, type IconTheme } from '@rnstudy/react-icons';
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

  const iconTheme = useMemo<IconTheme>(() => {
    switch (validatedPlatform) {
      case 'ios':
        return {
          colors: {
            ...theme.ios.schemes[colorScheme].colors,
            default: theme.ios.schemes[colorScheme].uiColors.label,
            secondary: theme.ios.schemes[colorScheme].uiColors.secondaryLabel,
            tertiary: theme.ios.schemes[colorScheme].uiColors.tertiaryLabel,
          },
          grayBackgroundColor:
            theme.ios.schemes[colorScheme].uiColors.tertiarySystemFill,
          imageGrayBackgroundColor:
            theme.ios.schemes[colorScheme].uiColors.secondarySystemFill,
          borderRadius: 7,
        };
      default:
        return {
          colors: {
            ...theme.md3.schemes[colorScheme],
            default: theme.md3.schemes[colorScheme].onSurface,
            secondary: theme.md3.schemes[colorScheme].onSurfaceVariant,
            tertiary: theme.md3.schemes[colorScheme].outline,
          },
          grayBackgroundColor: Color(theme.md3.schemes[colorScheme].surfaceDim)
            .alpha(0.5)
            .string(),
          imageGrayBackgroundColor: Color(
            theme.md3.schemes[colorScheme].surfaceDim,
          )
            .alpha(0.5)
            .string(),
          borderRadius: 8,
        };
    }
  }, [colorScheme, theme, validatedPlatform]);

  return (
    <UIPlatformContext.Provider value={validatedPlatform}>
      <ColorSchemeContext.Provider value={colorScheme}>
        <IconContextProvider platform={validatedPlatform} theme={iconTheme}>
          <ThemeProviderMD3 theme={theme.md3} colorScheme={colorScheme}>
            <TokensContextProviderIOS
              colorScheme={theme.ios.schemes[colorScheme]}
              textStyles={theme.ios.textStyles}
            >
              {children}
            </TokensContextProviderIOS>
          </ThemeProviderMD3>
        </IconContextProvider>
      </ColorSchemeContext.Provider>
    </UIPlatformContext.Provider>
  );
};

export default UIContextProvider;
