import { MD3LightTheme as PaperMD3DefaultLightTheme } from 'react-native-paper';

import {
  colors as iosColors,
  textStyles as iosTextStyles,
} from '@rnstudy/react-native-ui-ios';

import { blue as md3Blue, red as md3Red } from './md3/schemes';
import { Theme } from './types';

export const blue: Theme = {
  ios: {
    schemes: {
      light: {
        colors: iosColors.light.colors,
        uiColors: iosColors.light.uiColors,
      },
      dark: {
        colors: iosColors.dark.colors,
        uiColors: iosColors.dark.uiColors,
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
        colors: iosColors.light.colors,
        uiColors: {
          ...iosColors.light.uiColors,
          tintColor: iosColors.light.colors.red,
        },
      },
      dark: {
        colors: iosColors.dark.colors,
        uiColors: {
          ...iosColors.dark.uiColors,
          tintColor: iosColors.dark.colors.red,
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
