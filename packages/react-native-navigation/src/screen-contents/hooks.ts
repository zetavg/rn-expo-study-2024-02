import { useContext, useMemo } from 'react';
import { Insets } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomTabBarHeightContext } from '@react-navigation/bottom-tabs';

/**
 * Handles common content inset for bottom tab bar, etc.
 */
export function useContentInset(contentInsetFromProps: Insets | undefined) {
  const safeAreaInsets = useSafeAreaInsets();

  /**
   * Since we may be using a TabBar with BlurView as the background, `position: 'absolute'` will be set in such TabBar's style. as React Navigation will not add margins to the content to account for the absolute-positioned TabBar automatically, we will need to handle it ourselves.
   *
   * See:
   * * Using BlurView as `tabBarBackground`: https://reactnavigation.org/docs/7.x/bottom-tab-navigator#tabbarbackground
   * * Using `position: 'absolute'` in `tabBarStyle`: https://reactnavigation.org/docs/7.x/bottom-tab-navigator#tabbarstyle
   */
  const bottomTabBarHeight = useContext(BottomTabBarHeightContext) || 0;

  const contentInset = useMemo(
    () =>
      bottomTabBarHeight > 0
        ? {
            ...contentInsetFromProps,
            bottom:
              Math.max(0, bottomTabBarHeight - safeAreaInsets.bottom) +
              (contentInsetFromProps?.bottom || 0),
          }
        : undefined,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      bottomTabBarHeight,
      safeAreaInsets.bottom,
      // eslint-disable-next-line react-hooks/exhaustive-deps
      ...Object.values(contentInsetFromProps || {}),
    ],
  );

  return contentInset;
}
