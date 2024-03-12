import { useTheme as usePaperTheme } from 'react-native-paper';

import { useUIColors as useIosUIColors } from '@rnstudy/react-native-ui-ios';

import { useUIPlatform } from '../UIPlatformContext';

export function useBackgroundColor({
  grouped = true,
  level,
}: {
  grouped?: boolean;
  level?: null | 'secondary' | 'tertiary';
  colorScheme?: 'light' | 'dark';
} = {}) {
  const uiPlatform = useUIPlatform();

  const iosUiColors = useIosUIColors();
  const paperTheme = usePaperTheme();

  switch (uiPlatform) {
    case 'ios': {
      switch (level) {
        case 'secondary':
          return iosUiColors[
            `secondarySystem${grouped ? 'Grouped' : ''}Background`
          ];
        case 'tertiary':
          return iosUiColors[
            `tertiarySystem${grouped ? 'Grouped' : ''}Background`
          ];
        default:
          return iosUiColors[`system${grouped ? 'Grouped' : ''}Background`];
      }
    }

    case 'android':
    default: {
      switch (level) {
        case 'secondary':
          return paperTheme.colors.primaryContainer;
        case 'tertiary':
          return paperTheme.colors.secondaryContainer;
        default:
          return paperTheme.colors.surface;
      }
    }
  }
}

export default useBackgroundColor;
