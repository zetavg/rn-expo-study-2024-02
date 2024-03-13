import {
  Colors,
  TextStyleTokens,
  UIColors,
} from '@rnstudy/react-native-ui-ios';
import { MD3Theme } from '@rnstudy/react-native-ui-md3/src';

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
