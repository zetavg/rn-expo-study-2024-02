import { useContext } from 'react';
import { BottomTabBarHeightContext } from '@react-navigation/bottom-tabs';

import { useUIPlatform } from '@rnstudy/react-native-ui';

import { TabBarPositionContext } from './TabBarPositionContext';

/**
 * Hook to get the height of the bottom tab bar in the current screen.
 *
 * * `undefined` means that the bottom tab bar is not shown or should not be considered on the current platform.
 * * `0` means that the bottom tab bar is shown but is static.
 * * Any other number is the height of the absolute (fixed) bottom tab bar.
 */
export function useBottomTabBarHeight() {
  const position = useContext(TabBarPositionContext);
  const height = useContext(BottomTabBarHeightContext);

  const uiPlatform = useUIPlatform();

  if (position && position !== 'bottom') {
    // The tab bar is not at the bottom, so it should not be considered as a bottom tab bar.
    return undefined;
  }

  if (uiPlatform === 'android' && typeof height === 'number') {
    // With the current implementation, the bottom tab bar is always static on Android.
    return 0;
  }

  return height;
}
