import { Colors, UIColors } from '@rnstudy/react-native-ios-ui';

export type Theme = {
  ios: {
    colors: {
      dark: Colors;
      light: Colors;
    };
    uiColors: {
      dark: UIColors;
      light: UIColors;
    };
  };
};
