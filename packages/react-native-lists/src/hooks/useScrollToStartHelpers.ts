import { useCallback, useRef } from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  ScrollViewProps,
} from 'react-native';

/**
 * Get helpers for implementing the `scrollToStart` method for a scrollable component.
 */
export function useScrollToStartHelpers({
  scrollViewProps: {
    onScroll: onScrollProp,
    scrollEventThrottle: scrollEventThrottleProp,
    contentInset: contentInsetProp,
    contentInsetAdjustmentBehavior: contentInsetAdjustmentBehaviorProp,
  },
}: {
  scrollViewProps: {
    onScroll?: ScrollViewProps['onScroll'];
    scrollEventThrottle?: ScrollViewProps['scrollEventThrottle'];
    contentInset?: ScrollViewProps['contentInset'];
    contentInsetAdjustmentBehavior?: ScrollViewProps['contentInsetAdjustmentBehavior'];
  };
}): {
  /** Props that should be passed to the scrollable component. */
  stsScrollViewProps: Partial<ScrollViewProps>;
  /** A helper function that returns the current scroll offset of the scrollable component. */
  getCurrentScrollOffset(): number;
  /** A helper function that returns the scroll offset that should be used for scrolling to top. */
  getScrollOffsetForScrollToTop(): number;
} {
  const currentScrollOffsetRef = useRef(0);

  /**
   * For scroll views with top inset on iOS, the initial scroll offset may be a negative value, so we'll need to log it for determining whether the scroll view is scrolled to top or use it for scrolling to top.
   *
   * Why don't we just use `contentInset.top`? Because if `contentInsetAdjustmentBehavior` is set, there might be additional top inset added by the system, using `contentInset.top` will not be enough - since it will not include the additional top inset added by the system.
   */
  const initialScrollOffsetRefIOS = useRef<undefined | number>(undefined);
  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offset = event.nativeEvent.contentOffset.y;
      if (
        // HACK: Seems that on iOS, `ScrollView`s with `contentInsetAdjustmentBehavior` set will call `onScroll` once on the initial render. We leverage this to log the initial scroll offset.
        Platform.OS === 'ios' &&
        contentInsetAdjustmentBehaviorProp !== 'never' &&
        typeof initialScrollOffsetRefIOS.current !== 'number'
      ) {
        initialScrollOffsetRefIOS.current = offset;
      }

      currentScrollOffsetRef.current = offset;

      if (onScrollProp) onScrollProp(event);
    },
    [contentInsetAdjustmentBehaviorProp, onScrollProp],
  );

  const getCurrentScrollOffset = useCallback(
    () => currentScrollOffsetRef.current,
    [],
  );

  const getScrollOffsetForScrollToTop = useCallback(() => {
    if (Platform.OS !== 'ios') return 0;

    const candidates = [0];

    if (
      Platform.OS === 'ios' &&
      initialScrollOffsetRefIOS.current !== undefined
    ) {
      candidates.push(initialScrollOffsetRefIOS.current);
    }

    if (contentInsetProp?.top) {
      candidates.push(-contentInsetProp.top);
    }

    return Math.min(...candidates);
  }, [contentInsetProp?.top]);

  return {
    getCurrentScrollOffset,
    getScrollOffsetForScrollToTop,
    stsScrollViewProps: {
      onScroll: handleScroll,
      scrollEventThrottle: scrollEventThrottleProp || 32,
      contentInsetAdjustmentBehavior: contentInsetAdjustmentBehaviorProp,
      scrollToOverflowEnabled: true,
    },
  };
}

export default useScrollToStartHelpers;
