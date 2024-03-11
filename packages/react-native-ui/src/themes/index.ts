import {
  MD3DarkTheme as MD3DefaultDarkTheme,
  MD3LightTheme as MD3DefaultLightTheme,
} from 'react-native-paper';

import { colors as iosColors } from '@rnstudy/react-native-ios-ui';

import { Theme } from './types';

export const blue: Theme = {
  ios: {
    colors: {
      light: iosColors.light.colors,
      dark: iosColors.dark.colors,
    },
    uiColors: {
      light: iosColors.light.uiColors,
      dark: iosColors.dark.uiColors,
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
