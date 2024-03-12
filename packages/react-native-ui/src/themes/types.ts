import { MD3Theme as PaperMD3Theme } from 'react-native-paper';

import {
  Colors,
  TextStyleTokens,
  UIColors,
} from '@rnstudy/react-native-ui-ios';

import { MD3Theme } from './md3/types';

export type Theme = {
  ios: {
    schemes: {
      light: {
        colors: Colors;
        uiColors: UIColors;
      };
      dark: {
        colors: Colors;
        uiColors: UIColors;
      };
    };
    textStyles: TextStyleTokens;
  };
  md3: MD3Theme;
};

export type { PaperMD3Theme };
