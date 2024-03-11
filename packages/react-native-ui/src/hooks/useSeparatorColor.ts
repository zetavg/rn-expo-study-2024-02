import { useTheme as usePaperTheme } from 'react-native-paper';

import { useUIColors as useIosUIColors } from '@rnstudy/react-native-ios-ui';

import { useUIPlatform } from '../UIPlatformContext';

export function useSeparatorColor() {
  const uiPlatform = useUIPlatform();

  const iosUiColors = useIosUIColors();
  const paperTheme = usePaperTheme();

  switch (uiPlatform) {
    case 'ios': {
      return iosUiColors.separator;
    }

    case 'android':
    default: {
      return paperTheme.colors.outlineVariant;
    }
  }
}

export default useSeparatorColor;
