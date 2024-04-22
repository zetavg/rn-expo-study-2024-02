import { useMemo } from 'react';
import { Insets, Platform, ScrollViewPropsIOS } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useUIPlatform } from '@rnstudy/react-native-ui';
import { useMemoValue } from '@rnstudy/react-utils';

import { useBottomTabBarHeight } from '../../contexts/BottomTabBarHeightContext';
import { useHeaderHeight } from '../../contexts/HeaderHeightContext';

/**
 * Handles common content inset for bottom tab bar, etc.
 */
export function useScrollViewContentInset(
  /** The content inset passed from props. */
  contentInsetFromProps: Insets | undefined,
  {
    contentInsetAdjustmentBehavior,
  }: {
    contentInsetAdjustmentBehavior: ScrollViewPropsIOS['contentInsetAdjustmentBehavior'];
  },
): Insets | undefined {
  const uiPlatform = useUIPlatform();
  const safeAreaInsets = useSafeAreaInsets();

  const headerHeight = useHeaderHeight();
  const bottomTabBarHeight = useBottomTabBarHeight();

  const memoizedContentInsetFromProps = useMemoValue(contentInsetFromProps);

  const contentInset = useMemo(() => {
    const iosContentInsetAdjustmentEnabled =
      contentInsetAdjustmentBehavior &&
      contentInsetAdjustmentBehavior !== 'never';

    let calculatedContentInset = memoizedContentInsetFromProps;

    if (
      Platform.OS !== 'ios' ||
      uiPlatform !== 'ios' || // I don't know why we need this here, in theory we should only check `Platform.OS !== 'ios'` since `contentInsetAdjustmentBehavior` depends only on the native platform, not the UI platform.
      !iosContentInsetAdjustmentEnabled
    ) {
      calculatedContentInset = {
        ...calculatedContentInset,
        top: (calculatedContentInset?.top || 0) + safeAreaInsets.top,
        bottom: (calculatedContentInset?.bottom || 0) + safeAreaInsets.bottom,
      };
    }

    if (typeof headerHeight === 'number') {
      calculatedContentInset = {
        ...calculatedContentInset,
        top:
          (calculatedContentInset?.top || 0) +
          headerHeight -
          // Since in normal cases the header bar will handle top safe area inset and include it in its height, to prevent counting this twice (since the top inset for safe area will always be added, no matter manually with `safeAreaInsets.top` in this hook, or by iOS contentInsetAdjustment), we will subtract the top safe area inset from the header height.
          safeAreaInsets.top,
      };
    }

    if (typeof bottomTabBarHeight === 'number') {
      calculatedContentInset = {
        ...calculatedContentInset,
        bottom:
          (calculatedContentInset?.bottom || 0) +
          bottomTabBarHeight -
          // Since in normal cases the bottom tab bar will handle bottom safe area inset and include it in its height, to prevent counting this twice (since the bottom inset for safe area will always be added, no matter manually with `safeAreaInsets.bottom` in this hook, or by iOS contentInsetAdjustment), we will subtract the bottom safe area inset from the bottom tab bar height.
          safeAreaInsets.bottom,
      };
    }

    return calculatedContentInset;
  }, [
    bottomTabBarHeight,
    contentInsetAdjustmentBehavior,
    headerHeight,
    memoizedContentInsetFromProps,
    safeAreaInsets.bottom,
    safeAreaInsets.top,
    uiPlatform,
  ]);

  return contentInset;
}
