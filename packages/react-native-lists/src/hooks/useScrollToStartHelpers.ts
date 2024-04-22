import { useCallback, useImperativeHandle, useRef } from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  ScrollViewProps,
} from 'react-native';

export type ScrollToStart = (options?: { animated?: boolean }) => void;
export type IsScrolledToStart = () => boolean;

export type ScrollToTopImperativeHandle = {
  /**
   * Scrolls to the top of the scroll view.
   *
   * With scroll views that have top inset, `scrollTo({ y: 0 })` may not as expected to scroll to the top, since the top inset may cause the scroll offset while scrolled to top be a negative value.
   */
  scrollToStart: ScrollToStart;
  isScrolledToStart: IsScrolledToStart;
};

/**
 * Get helpers for implementing the `scrollToStart` method for a scrollable component.
 */
export function useScrollToStartHelpers({
  scrollViewProps: {
    onScroll: onScrollProp,
    scrollEventThrottle: scrollEventThrottleProp,
    contentInset: contentInsetProp,
    contentInsetAdjustmentBehavior: contentInsetAdjustmentBehaviorProp,
    handleScrollOffsetChange: handleScrollOffsetChangeProp,
  },
}: {
  scrollViewProps: {
    onScroll?: ScrollViewProps['onScroll'];
    scrollEventThrottle?: ScrollViewProps['scrollEventThrottle'];
    contentInset?: ScrollViewProps['contentInset'];
    contentInsetAdjustmentBehavior?: ScrollViewProps['contentInsetAdjustmentBehavior'];
    handleScrollOffsetChange?: (offset: number) => void;
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

  const handleScrollOffset = useCallback(
    (offset: number) => {
      if (
        // HACK: Seems that on iOS, `ScrollView`s with `contentInsetAdjustmentBehavior` set will call `onScroll` once on the initial render. We leverage this to log the initial scroll offset.
        Platform.OS === 'ios' &&
        contentInsetAdjustmentBehaviorProp !== 'never' &&
        typeof initialScrollOffsetRefIOS.current !== 'number'
      ) {
        initialScrollOffsetRefIOS.current = offset;
      }

      currentScrollOffsetRef.current = offset;
    },
    [contentInsetAdjustmentBehaviorProp],
  );

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offset = event.nativeEvent.contentOffset.y;

      handleScrollOffset(offset);

      if (onScrollProp) onScrollProp(event);
    },
    [handleScrollOffset, onScrollProp],
  );
  const isHandleScrollOffsetChangeFirstRun = useRef(true);
  const handleScrollOffsetChange = useCallback(
    (offset: unknown) => {
      // HACK: Seems that the first call to `onScrollOffsetChange` by react-native-draggable-flatlist will always have 0 as the offset, and the immediate next call will have the correct offset. So we'll skip the first call.
      if (isHandleScrollOffsetChangeFirstRun.current) {
        isHandleScrollOffsetChangeFirstRun.current = false;
        return;
      }

      if (typeof offset === 'number') {
        handleScrollOffset(offset);

        if (handleScrollOffsetChangeProp) handleScrollOffsetChangeProp(offset);
      }
    },
    [handleScrollOffset, handleScrollOffsetChangeProp],
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
      ...({ onScrollOffsetChange: handleScrollOffsetChange } as object),
      scrollEventThrottle: scrollEventThrottleProp || 32,
      contentInsetAdjustmentBehavior: contentInsetAdjustmentBehaviorProp,
      scrollToOverflowEnabled: true,
    },
  };
}

export default useScrollToStartHelpers;
