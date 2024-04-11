import {
  colorSchemes as iosColorSchemes,
  textStyles as iosTextStyles,
} from '@rnstudy/react-native-ui-ios';
import { md3BaselineTheme } from '@rnstudy/react-native-ui-md3/src';

import { Theme } from '../types';

export const baselineTheme: Theme = {
  ios: {
    schemes: {
      light: iosColorSchemes.light,
      dark: iosColorSchemes.dark,
    },
    textStyles: iosTextStyles,
  },
  md3: md3BaselineTheme,
};

export default baselineTheme;
