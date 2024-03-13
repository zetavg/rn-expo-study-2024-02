import { useUIColors as useIosUIColors } from '@rnstudy/react-native-ui-ios';
import { useTheme as useMD3Theme } from '@rnstudy/react-native-ui-md3';

import { useColorScheme, useUIPlatform } from '../contexts';

export function useSeparatorColor({ opaque }: { opaque?: boolean } = {}) {
  const uiPlatform = useUIPlatform();
  const colorScheme = useColorScheme();

  const iosUiColors = useIosUIColors();
  const md3Theme = useMD3Theme();

  switch (uiPlatform) {
    case 'ios': {
      return opaque ? iosUiColors.opaqueSeparator : iosUiColors.separator;
    }

    case 'android':
    default: {
      return opaque
        ? md3Theme.schemes[colorScheme].outline
        : md3Theme.schemes[colorScheme].outlineVariant;
    }
  }
}

export default useSeparatorColor;
