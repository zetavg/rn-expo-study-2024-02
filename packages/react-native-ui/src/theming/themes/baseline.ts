import {
  colorSchemes as iosColorSchemes,
  textStyles as iosTextStyles,
} from '@rnstudy/react-native-ui-ios';
import { md3BaselineTheme } from '@rnstudy/react-native-ui-md3/src';

import { Theme } from '../types';

export const baselineTheme: Theme = {
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
  md3: md3BaselineTheme,
};

export default baselineTheme;
