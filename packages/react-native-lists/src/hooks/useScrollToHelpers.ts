import { useCallback, useRef } from 'react';
import {
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  ScrollViewProps,
} from 'react-native';

import { ScrollablePropsContextValue } from '../components';

export type ScrollToStart = (options?: { animated?: boolean }) => void;
export type IsScrolledToStart = () => boolean;
export type ScrollToEnd = (options?: { animated?: boolean }) => void;
export type IsScrolledToEnd = () => boolean;

export type ScrollToImperativeHandle = {
  /** Get the offset that should be used for scrolling to the start of the scroll view. */
  getScrollToStartOffset: () => number;
  /**
   * Scrolls to the top of the scroll view.
   *
   * With scroll views that have top inset, `scrollTo({ y: 0 })` may not as expected to scroll to the top, since the top inset may cause the scroll offset while scrolled to top be a negative value.
   */
  scrollToStart: ScrollToStart;
  isScrolledToStart: IsScrolledToStart;
  /** Get the offset that should be used for scrolling to a specific position of the scroll view. */
  getScrollToOffset: () => number;
  /** Get the offset that should be used for scrolling to the end of the scroll view. */
  getScrollToEndOffset: () => number;
  /** Get the position that should be used for scrolling to the end of the scroll view. */
  getScrollToEndPosition: () => number;
  scrollToEnd: ScrollToEnd;
  isScrolledToEnd: IsScrolledToEnd;
};

/**
 * Get helpers for implementing the `scrollToStart` method for a scrollable component.
 */
export function useScrollToHelpers({
  scrollViewProps: {
    onLayout: onLayoutProp,
    onContentSizeChange: onContentSizeChangeProp,
    onScroll: onScrollProp,
    scrollEventThrottle: scrollEventThrottleProp,
    contentInset: contentInsetProp,
    contentInsetAdjustmentBehavior: contentInsetAdjustmentBehaviorProp,
    handleScrollOffsetChange: handleScrollOffsetChangeProp,
    scrollToTopAndScrollToOffset,
    topInsetForScrolling,
    bottomInsetForScrolling,
    inverted,
  },
}: {
  scrollViewProps: ScrollViewProps &
    ScrollablePropsContextValue & {
      handleScrollOffsetChange?: (offset: number) => void;
      inverted?: boolean;
    };
}): {
  /** Props that should be passed to the scrollable component. */
  stsScrollViewProps: Partial<ScrollViewProps>;
  /** A helper function that returns the current scroll offset of the scrollable component. */
  getCurrentScrollOffset(): number;
  /** A helper function that returns the scroll offset that should be used for scrolling to start. */
  getScrollToStartOffset(): number;
  isScrolledToStart: IsScrolledToStart;
  /** A helper function that returns the scroll offset that should be used for scrolling to a specific point. */
  getScrollToOffset: () => number;
  /** A helper function that returns the scroll offset that should be used for scrolling to end. */
  getScrollToEndOffset: () => number;
  getScrollToEndPosition: () => number;
  isScrolledToEnd: IsScrolledToEnd;
} {
  const currentScrollOffsetRef = useRef(0);
  const sizeRef = useRef(0);
  const contentSizeRef = useRef(0);

  const handleLayout = useCallback(
    (event: LayoutChangeEvent) => {
      sizeRef.current = event.nativeEvent.layout.height;
      if (onLayoutProp) onLayoutProp(event);
    },
    [onLayoutProp],
  );

  const handleContentSizeChange = useCallback(
    (w: number, h: number) => {
      contentSizeRef.current = h;
      if (onContentSizeChangeProp) onContentSizeChangeProp(w, h);
    },
    [onContentSizeChangeProp],
  );

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

  const getScrollToStartOffset = useCallback(() => {
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

  const getScrollToOffset = useCallback(() => {
    const insetForScrolling = inverted
      ? bottomInsetForScrolling
      : topInsetForScrolling;
    return typeof insetForScrolling === 'number'
      ? -insetForScrolling
      : getScrollToStartOffset() + (scrollToTopAndScrollToOffset || 0);
  }, [
    bottomInsetForScrolling,
    getScrollToStartOffset,
    inverted,
    topInsetForScrolling,
    scrollToTopAndScrollToOffset,
  ]);

  const getScrollToEndOffset = useCallback(() => {
    return (inverted ? topInsetForScrolling : bottomInsetForScrolling) || 0;
  }, [bottomInsetForScrolling, inverted, topInsetForScrolling]);

  const getScrollToEndPosition = useCallback(() => {
    return contentSizeRef.current - sizeRef.current + getScrollToEndOffset();
  }, [getScrollToEndOffset]);

  const isScrolledToStart = useCallback<IsScrolledToStart>(() => {
    return getCurrentScrollOffset() - 1 <= getScrollToStartOffset();
  }, [getCurrentScrollOffset, getScrollToStartOffset]);

  const isScrolledToEnd = useCallback<IsScrolledToEnd>(() => {
    return getCurrentScrollOffset() + 1 >= getScrollToEndPosition();
  }, [getCurrentScrollOffset, getScrollToEndPosition]);

  return {
    getCurrentScrollOffset,
    getScrollToStartOffset,
    getScrollToOffset,
    getScrollToEndOffset,
    getScrollToEndPosition,
    isScrolledToStart,
    isScrolledToEnd,
    stsScrollViewProps: {
      onLayout: handleLayout,
      onContentSizeChange: handleContentSizeChange,
      onScroll: handleScroll,
      ...({ onScrollOffsetChange: handleScrollOffsetChange } as object),
      scrollEventThrottle: scrollEventThrottleProp || 32,
      contentInsetAdjustmentBehavior: contentInsetAdjustmentBehaviorProp,
      scrollToOverflowEnabled: true,
    },
  };
}

export default useScrollToHelpers;
