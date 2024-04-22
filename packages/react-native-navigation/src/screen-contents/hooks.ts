import React, { useCallback, useContext, useMemo, useRef } from 'react';
import { Insets, Platform, ScrollViewPropsIOS } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  NavigationContext,
  ParamListBase,
  StackActions,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

import { useUIPlatform } from '@rnstudy/react-native-ui';
import { useMemoValue } from '@rnstudy/react-utils';

import { useBottomTabBarHeight } from '../contexts/BottomTabBarHeightContext';
import { useHeaderHeight } from '../contexts/HeaderHeightContext';

import { BottomTabNavigationContext, ScrollViewRef } from './contexts';

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

type StackNavigation = StackScreenProps<ParamListBase>['navigation'];
export function useNearestStackNavigation(): StackNavigation | null {
  const navigation = useContext(NavigationContext);

  return useMemo<StackNavigation | null>(() => {
    let currentNavigation = navigation;

    while (currentNavigation) {
      if (
        !currentNavigation
          .getId()
          ?.startsWith('modal-screen-content-navigator') &&
        currentNavigation.getState().type === 'stack'
      ) {
        return currentNavigation as StackNavigation;
      }

      currentNavigation = currentNavigation.getParent();
    }

    return null;
  }, [navigation]);
}

/**
 * The expected native behavior of "tapping again on the active tab" is to:
 *
 * * If the screen for the tab renders a scroll view, and that scroll view is not scrolled to the top, the scroll view will be scrolled to the top.
 * * Otherwise, if the screen for the tab renders a stack navigator, a `popToTop` action is performed on the stack.
 */
export function useBottomTabPressHandling({
  scrollViewRefRef,
}: {
  /** A ref object that holds the ref object of the scrollable element. */
  scrollViewRefRef: React.RefObject<ScrollViewRef>;
}): {
  /** The handleScrollBeginDrag prop that is required to be passed to the scroll view. */
  handleScrollBeginDrag: () => void;
} {
  const navigation = useNavigation();
  const bottomTabNavigation = useContext(BottomTabNavigationContext);

  /** It may be possible that the `isScrolledToStart` function did not return `true` correctly (or in time), and we still expect pressing the tab again to do the next thing: `popToTop` in the stack navigator. To address this, we we use a flag to track whether the tab has been pressed. */
  const hasBeenScrolledToTopByTabPress = useRef(false);
  const hasBeenScrolledToTopByTabPressTimer = useRef<null | ReturnType<
    typeof setTimeout
  >>(null);

  /** Used to reset `hasBeenScrolledToTopByTabPress` when the user scrolls the scroll view. */
  const handleScrollBeginDrag = useCallback(() => {
    if (hasBeenScrolledToTopByTabPressTimer.current) {
      clearTimeout(hasBeenScrolledToTopByTabPressTimer.current);
      hasBeenScrolledToTopByTabPressTimer.current = null;
    }
    hasBeenScrolledToTopByTabPress.current = false;
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (!bottomTabNavigation) return;

      const unsubscribe = bottomTabNavigation.addListener('tabPress', (e) => {
        e.preventDefault();

        const scrollViewRef = scrollViewRefRef.current;

        if (
          // The screen does not contain any supported scroll view.
          !scrollViewRef?.current ||
          // Already scrolled to top.
          scrollViewRef?.current?.isScrolledToStart() ||
          // The scroll view has been scrolled to top by tapping the tab.
          hasBeenScrolledToTopByTabPress.current
        ) {
          // Pop to top if there's a parent stack navigator and it has more than 1 screen.
          if ((navigation?.getState()?.routes.length || 0) > 1) {
            navigation?.dispatch(StackActions.popToTop());
          }
        } else {
          // Scroll to top.
          scrollViewRef?.current?.scrollToStart();

          // Set a flag to track that the tab has been pressed.
          // Use a timer to prevent unexpected behavior when the user accidentally taps the tab twice in a very short period of time.
          if (!hasBeenScrolledToTopByTabPressTimer.current) {
            hasBeenScrolledToTopByTabPressTimer.current = setTimeout(() => {
              hasBeenScrolledToTopByTabPress.current = true;
              hasBeenScrolledToTopByTabPressTimer.current = null;
            }, 250);
          }
        }
      });

      return unsubscribe;
    }, [bottomTabNavigation, navigation, scrollViewRefRef]),
  );

  return { handleScrollBeginDrag };
}
