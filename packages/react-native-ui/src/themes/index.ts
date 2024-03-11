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
};

export const themes = {
  blue,
};

export default themes;
