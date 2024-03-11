import {
  MD3DarkTheme as MD3DefaultDarkTheme,
  MD3LightTheme as MD3DefaultLightTheme,
} from 'react-native-paper';

import {
  colors as iosColors,
  textStyles as iosTextStyles,
} from '@rnstudy/react-native-ios-ui';

import { Theme } from './types';

export const blue: Theme = {
  ios: {
    light: {
      colors: iosColors.light.colors,
      uiColors: iosColors.light.uiColors,
      textStyles: iosTextStyles,
    },
    dark: {
      colors: iosColors.dark.colors,
      uiColors: iosColors.dark.uiColors,
      textStyles: iosTextStyles,
    },
  },
  md3: {
    light: MD3DefaultLightTheme,
    dark: MD3DefaultDarkTheme,
  },
};

export const themes = {
  blue,
};

export default themes;
