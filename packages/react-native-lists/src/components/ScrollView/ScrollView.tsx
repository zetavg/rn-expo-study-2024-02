import React, { useImperativeHandle } from 'react';
import {
  ScrollView as RNScrollView,
  ScrollViewBase,
  ScrollViewProps,
} from 'react-native';

import { usePropsWithContextualDefaultValues } from '@rnstudy/react-utils';

import useScrollToHelpers, {
  IsScrolledToEnd,
  IsScrolledToStart,
  ScrollToEnd,
  ScrollToImperativeHandle,
  ScrollToStart,
} from '../../hooks/useScrollToHelpers';
import ScrollablePropsContext, {
  ScrollablePropsContextValue,
} from '../ScrollablePropsContext';

export type Props = ScrollViewProps & ScrollablePropsContextValue;

export type RefObject = Exclude<RNScrollView, typeof ScrollViewBase> &
  ScrollToImperativeHandle;

export const ScrollView = React.forwardRef<RefObject, Props>(
  function ScrollView(rawProps, ref) {
    const props = usePropsWithContextualDefaultValues(
      rawProps,
      ScrollablePropsContext,
    );

    const originalRef = React.useRef<RNScrollView>(null);

    const {
      stsScrollViewProps,
      getCurrentScrollOffset,
      getScrollToStartOffset,
      getScrollToOffset,
      getScrollToEndOffset,
      getScrollToEndPosition,
      isScrolledToStart,
      isScrolledToEnd,
    } = useScrollToHelpers({ scrollViewProps: props });

    useImperativeHandle(
      ref,
      () => {
        return new Proxy<RefObject>({} as RefObject, {
          get(_, p: keyof RefObject) {
            if (!originalRef.current) {
              console.warn(
                'Accessing ScrollView ref before it is ready. This may cause issues.',
              );
            }

            if (p === 'getScrollToStartOffset') {
              return getScrollToStartOffset;
            }

            if (p === 'scrollToStart') {
              const scrollToStart: ScrollToStart = (options) => {
                originalRef.current?.scrollTo({
                  y: getScrollToStartOffset(),
                  ...options,
                });
              };

              return scrollToStart;
            }

            if (p === 'isScrolledToStart') {
              return isScrolledToStart;
            }

            if (p === 'getScrollToOffset') {
              return getScrollToOffset;
            }

            if (p === 'scrollTo') {
              const scrollTo: RNScrollView['scrollTo'] = (
                options,
                ...restArgs
              ) => {
                if (
                  typeof options === 'object' &&
                  typeof options.y === 'number'
                ) {
                  options.y = options.y + getScrollToOffset();
                }

                originalRef.current?.scrollTo(options, ...restArgs);
              };

              return scrollTo;
            }

            if (p === 'getScrollToEndOffset') {
              return getScrollToEndOffset;
            }

            if (p === 'getScrollToEndPosition') {
              return getScrollToEndPosition;
            }

            if (p === 'scrollToEnd') {
              const scrollToEnd: ScrollToEnd = (options) => {
                originalRef.current?.scrollTo({
                  y: getScrollToEndPosition(),
                  ...options,
                });
              };

              return scrollToEnd;
            }

            if (p === 'isScrolledToEnd') {
              return isScrolledToEnd;
            }

            return originalRef.current?.[p] || (() => {});
          },
        });
      },
      [
        getScrollToEndOffset,
        getScrollToEndPosition,
        getScrollToOffset,
        getScrollToStartOffset,
        isScrolledToEnd,
        isScrolledToStart,
      ],
    );

    return (
      <RNScrollView ref={originalRef} {...props} {...stsScrollViewProps} />
    );
  },
);

export default ScrollView;
