import { useBackgroundColor as useBackgroundColorIOS } from '@rnstudy/react-native-ui-ios/src/hooks';

import { useColorScheme } from '../ColorSchemeContext';
import { useGroupLevelMD3 } from '../contexts/GroupLevelContextMD3';
import { useIsGroupedBackgroundMD3 } from '../contexts/IsGroupedBackgroundContextMD3';
import { useUIPlatform } from '../UIPlatformContext';

import useMD3Scheme from './useMD3Scheme';

/**
 * Returns the color that can be used as a view or container's background.
 *
 * @private It is not recommended to use this hook directly. Instead, use the `WithBackgroundColor` component.
 */
export function useBackgroundColor({
  grouped,
  level,
}: {
  grouped?: boolean;
  level?: null | number;
} = {}): string {
  const uiPlatform = useUIPlatform();
  const colorScheme = useColorScheme();

  const md3Scheme = useMD3Scheme();

  const iosBackgroundColor = useBackgroundColorIOS({ grouped, level });

  const md3LevelFromContext = useGroupLevelMD3();
  const md3IsGroupedBackgroundFromContext = useIsGroupedBackgroundMD3();

  switch (uiPlatform) {
    case 'ios':
      return iosBackgroundColor;
    case 'android':
    default: {
      if (level === undefined) {
        level = md3LevelFromContext;
      }

      if (grouped === undefined) {
        grouped = md3IsGroupedBackgroundFromContext;
      }

      const currentLevel = typeof level === 'number' ? level + 1 : 0;
      if (colorScheme !== 'dark') {
        if (currentLevel <= 0) {
          return grouped ? md3Scheme.surfaceContainer : md3Scheme.surface;
        } else if (currentLevel % 2 === 1) {
          return grouped ? md3Scheme.surfaceBright : md3Scheme.surfaceContainer;
        } else {
          return grouped
            ? md3Scheme.surfaceContainer
            : md3Scheme.surfaceContainerHighest;
        }
      } else {
        if (currentLevel <= 0) {
          return md3Scheme.surface;
        } else if (currentLevel % 2 === 1) {
          return md3Scheme.surfaceContainer;
        } else {
          return md3Scheme.surfaceContainerHigh;
        }
      }
    }
  }
}

export default useBackgroundColor;
