import React, { useImperativeHandle } from 'react';
import {
  ScrollView as RNScrollView,
  ScrollViewBase,
  ScrollViewProps,
} from 'react-native';

import useScrollToStartHelpers from '../../hooks/useScrollToStartHelpers';

export type Props = ScrollViewProps;

type ScrollToStart = (options?: { animated?: boolean }) => void;
type IsScrolledToStart = () => boolean;

export type RefObject = Exclude<RNScrollView, typeof ScrollViewBase> & {
  /**
   * Scrolls to the top of the scroll view.
   *
   * With scroll views that have top inset, `scrollTo({ y: 0 })` may not as expected to scroll to the top, since the top inset may cause the scroll offset while scrolled to top be a negative value.
   */
  scrollToStart: ScrollToStart;
  isScrolledToStart: IsScrolledToStart;
};

export const ScrollView = React.forwardRef<RefObject, Props>(
  function ScrollView(props, ref) {
    const originalRef = React.useRef<RNScrollView>(null);

    const {
      stsScrollViewProps,
      getCurrentScrollOffset,
      getScrollOffsetForScrollToTop,
    } = useScrollToStartHelpers({ scrollViewProps: props });

    useImperativeHandle(
      ref,
      () => {
        return new Proxy<RefObject>({} as RefObject, {
          get(_, p: keyof RefObject) {
            if (p === 'scrollToStart') {
              const scrollToStart: ScrollToStart = (options) => {
                originalRef.current?.scrollTo({
                  y: getScrollOffsetForScrollToTop(),
                  ...options,
                });
              };

              return scrollToStart;
            }

            if (p === 'isScrolledToStart') {
              const isScrolledToStart: IsScrolledToStart = () => {
                return (
                  getCurrentScrollOffset() - 1 <=
                  getScrollOffsetForScrollToTop()
                );
              };

              return isScrolledToStart;
            }

            return originalRef.current?.[p] || (() => {});
          },
        });
      },
      [getCurrentScrollOffset, getScrollOffsetForScrollToTop],
    );

    return (
      <RNScrollView ref={originalRef} {...props} {...stsScrollViewProps} />
    );
  },
);

export default ScrollView;
