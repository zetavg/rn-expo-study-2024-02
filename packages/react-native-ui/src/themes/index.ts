import { MD3LightTheme as PaperMD3DefaultLightTheme } from 'react-native-paper';

import {
  colorSchemes as iosColorSchemes,
  textStyles as iosTextStyles,
} from '@rnstudy/react-native-ui-ios';

import { blue as md3Blue, red as md3Red } from './md3/schemes';
import { Theme } from './types';

export const blue: Theme = {
  ios: {
    schemes: {
      light: {
        colors: iosColorSchemes.light.colors,
        uiColors: iosColorSchemes.light.uiColors,
      },
      dark: {
        colors: iosColorSchemes.dark.colors,
        uiColors: iosColorSchemes.dark.uiColors,
      },
    },
    textStyles: iosTextStyles,
  },
  md3: {
    schemes: md3Blue,
    fonts: PaperMD3DefaultLightTheme.fonts,
    roundness: PaperMD3DefaultLightTheme.roundness,
    animation: PaperMD3DefaultLightTheme.animation,
  },
};

export const red: Theme = {
  ios: {
    schemes: {
      light: {
        colors: iosColorSchemes.light.colors,
        uiColors: {
          ...iosColorSchemes.light.uiColors,
          tintColor: iosColorSchemes.light.colors.red,
        },
      },
      dark: {
        colors: iosColorSchemes.dark.colors,
        uiColors: {
          ...iosColorSchemes.dark.uiColors,
          tintColor: iosColorSchemes.dark.colors.red,
        },
      },
    },
    textStyles: iosTextStyles,
  },
  md3: {
    schemes: md3Red,
    fonts: PaperMD3DefaultLightTheme.fonts,
    roundness: PaperMD3DefaultLightTheme.roundness,
    animation: PaperMD3DefaultLightTheme.animation,
  },
};

export const themes = {
  blue,
  red,
};

export default themes;
