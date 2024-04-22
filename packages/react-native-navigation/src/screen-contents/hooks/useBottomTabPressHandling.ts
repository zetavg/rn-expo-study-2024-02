import React, { useCallback, useContext, useRef } from 'react';
import {
  StackActions,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';

import { BottomTabNavigationContext, ScrollViewRef } from '../contexts';

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
