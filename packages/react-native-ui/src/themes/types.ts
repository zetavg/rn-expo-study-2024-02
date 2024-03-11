import { MD3Theme } from 'react-native-paper';

import {
  Colors,
  TextStyleTokens,
  UIColors,
} from '@rnstudy/react-native-ios-ui';

export type IOSTheme = {
  colors: Colors;
  uiColors: UIColors;
  textStyles: TextStyleTokens;
};

export type Theme = {
  ios: {
    dark: IOSTheme;
    light: IOSTheme;
  };
  md3: {
    dark: MD3Theme;
    light: MD3Theme;
  };
};

export type { MD3Theme };
