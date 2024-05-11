import React, {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  Keyboard,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { GestureHandlerRefContext } from '@react-navigation/stack';

import {
  FlatList as AppFlatList,
  ScrollView as AppScrollView,
} from '@rnstudy/react-native-lists';

type ScrollViewComponentType =
  | typeof ScrollView
  | typeof FlatList
  | typeof AppScrollView
  | typeof AppFlatList;

type DismissibleScrollableComponentProps<T extends ScrollViewComponentType> = {
  /** Disable the overscroll-to-dismiss behavior. */
  disableScrollToDismiss?: boolean;
  scrollToDismissOffset?: number;
  /** Show debug info on the screen. */
  debug?: boolean;
} & React.ComponentProps<T>;

/**
 * Makes a `ScrollView`-like component allowing parent gesture handler to handle the modal dismissing gesture when over-scrolled.
 *
 * Note that you will need to set the `gestureResponseDistance` in the screen options to a much larger value for this to have noticeable effect.
 */
export default function dismissible<S extends ScrollViewComponentType>(
  ScrollViewComponent: S,
) {
  return forwardRef<
    S extends React.ForwardRefExoticComponent<React.RefAttributes<infer C>>
      ? C
      : never,
    DismissibleScrollableComponentProps<S>
  >(function DismissibleScrollableComponent(
    {
      disableScrollToDismiss,
      scrollToDismissOffset = 0,
      debug = false,
      ...props
    }: DismissibleScrollableComponentProps<S>,
    ref,
  ) {
    const {
      onScroll,
      onScrollBeginDrag,
      onScrollEndDrag,
      onMomentumScrollEnd,
      scrollEventThrottle,
    } = props;

    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    useEffect(() => {
      const keyboardWillShowListener = Keyboard.addListener(
        'keyboardWillShow',
        () => {
          setKeyboardVisible(true);
        },
      );
      const keyboardDidHideListener = Keyboard.addListener(
        'keyboardDidHide',
        () => {
          setKeyboardVisible(false);
        },
      );

      return () => {
        keyboardWillShowListener.remove();
        keyboardDidHideListener.remove();
      };
    }, []);

    const [isScrolledToTop, setIsScrolledToTop] = useState(true);
    const isScrolledToTopRef = useRef(true);
    const [delayedIsScrolledToTop, setDelayedIsScrolledToTop] = useState(
      !scrollToDismissOffset,
    );
    const delayedIsScrolledToTopRef = useRef(delayedIsScrolledToTop);
    delayedIsScrolledToTopRef.current = delayedIsScrolledToTop;

    const scrollOffsetRef = useRef(0);
    const initialScrollOffsetRef = useRef<undefined | number>(undefined);
    const handleScroll = useCallback(
      (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (onScroll) onScroll(event as any);

        const offset =
          event.nativeEvent.contentOffset.y +
          (event.nativeEvent.contentInset.top || 0);
        if (debug) console.log(`dismissible scroll view offset: ${offset}`);
        if (typeof initialScrollOffsetRef.current !== 'number') {
          initialScrollOffsetRef.current = offset;
        }
        scrollOffsetRef.current = offset;
        const shouldBeScrolledToTop =
          offset - (initialScrollOffsetRef.current || 0) <=
          (scrollToDismissOffset || 0);

        if (isScrolledToTopRef.current !== shouldBeScrolledToTop) {
          isScrolledToTopRef.current = shouldBeScrolledToTop;
          setIsScrolledToTop(shouldBeScrolledToTop);
        }
      },
      [debug, onScroll, scrollToDismissOffset],
    );

    const isScrollingRef = useRef(false);

    const handleScrollBeginDrag = useCallback(
      (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        isScrollingRef.current = true;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (onScrollBeginDrag) onScrollBeginDrag(event as any);
      },
      [onScrollBeginDrag],
    );

    const handleScrollEndDrag = useCallback(
      (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        isScrollingRef.current = false;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (onScrollEndDrag) onScrollEndDrag(event as any);

        const shouldBeScrolledToTop = isScrolledToTopRef.current;

        // Set delayedIsScrolledToTop to false immediately if it changes from true to false
        if (
          !shouldBeScrolledToTop &&
          delayedIsScrolledToTopRef.current !== shouldBeScrolledToTop
        ) {
          setDelayedIsScrolledToTop(shouldBeScrolledToTop);
        }

        // Otherwise wait for MomentumScrollEnd to set it back to true
      },
      [onScrollEndDrag],
    );

    const handleMomentumScrollEnd = useCallback(
      (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (onMomentumScrollEnd) onMomentumScrollEnd(event as any);

        // Wait for some time in case the scroll is ended by another scroll event (isScrollingRef.current will not be set to true on time when onMomentumScrollEnd is called).
        setTimeout(() => {
          if (isScrollingRef.current) return;

          setDelayedIsScrolledToTop(isScrolledToTopRef.current);
        }, 50);
      },
      [onMomentumScrollEnd],
    );

    const shouldScrollToDismissTakeAction =
      !disableScrollToDismiss && !isKeyboardVisible && delayedIsScrolledToTop;

    const shouldScrollViewBounce =
      !isScrolledToTop || !shouldScrollToDismissTakeAction;

    return (
      <GestureHandlerRefContext.Consumer>
        {(gestureHandlerRef) => {
          const scrollViewElement = (
            <ScrollViewComponent
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              {...(props as any)}
              ref={ref}
              onScroll={disableScrollToDismiss ? onScroll : handleScroll}
              onScrollBeginDrag={handleScrollBeginDrag}
              onScrollEndDrag={handleScrollEndDrag}
              onMomentumScrollEnd={handleMomentumScrollEnd}
              simultaneousHandlers={
                shouldScrollToDismissTakeAction ? gestureHandlerRef : undefined
              }
              bounces={shouldScrollViewBounce}
              scrollEventThrottle={Math.min(
                scrollEventThrottle || Infinity,
                16,
              )}
            />
          );
          if (debug)
            return (
              <>
                {scrollViewElement}
                <View style={styles.debugInfoView}>
                  <Text style={styles.debugInfoTitle}>
                    Dismissible Scrolling View Debugging Info
                  </Text>
                  <Text>
                    &nbsp;•&nbsp;isKeyboardVisible:{' '}
                    {JSON.stringify(isKeyboardVisible)}
                  </Text>
                  <Text>
                    &nbsp;•&nbsp;isScrolledToTop:{' '}
                    {JSON.stringify(isScrolledToTop)}
                  </Text>
                  <Text>
                    &nbsp;•&nbsp;delayedIsScrolledToTop:{' '}
                    {JSON.stringify(delayedIsScrolledToTop)}
                  </Text>
                  {!!scrollToDismissOffset && (
                    <Text>
                      &nbsp;•&nbsp;scrollToDismissOffset:{' '}
                      {JSON.stringify(scrollToDismissOffset)}
                    </Text>
                  )}
                </View>
              </>
            );

          return scrollViewElement;
        }}
      </GestureHandlerRefContext.Consumer>
    );
  });
}

const styles = StyleSheet.create({
  debugInfoView: {
    position: 'absolute',
    top: 100,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    zIndex: 100,
    padding: 10,
    borderRadius: 10,
    pointerEvents: 'none',
  },
  debugInfoTitle: { fontWeight: 'bold' },
});
