import React, { useImperativeHandle } from 'react';
import {
  ScrollView as RNScrollView,
  ScrollViewBase,
  ScrollViewProps,
} from 'react-native';

import useScrollToStartHelpers, {
  IsScrolledToStart,
  ScrollToStart,
  ScrollToTopImperativeHandle,
} from '../../hooks/useScrollToStartHelpers';

export type Props = ScrollViewProps;

export type RefObject = Exclude<RNScrollView, typeof ScrollViewBase> &
  ScrollToTopImperativeHandle;

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
