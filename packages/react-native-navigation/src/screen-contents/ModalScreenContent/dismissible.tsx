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

type ScrollViewComponentType = typeof ScrollView | typeof FlatList;

type DismissibleScrollableComponentProps<T extends ScrollViewComponentType> = {
  /** Disable the overscroll-to-dismiss behavior. */
  disableScrollToDismiss?: boolean;
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
      debug,
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
    const [delayedIsScrolledToTop, setDelayedIsScrolledToTop] = useState(true);
    const delayedIsScrolledToTopRef = useRef(delayedIsScrolledToTop);
    delayedIsScrolledToTopRef.current = delayedIsScrolledToTop;

    const scrollOffsetRef = useRef(0);
    const initialScrollOffsetRef = useRef<undefined | number>(undefined);
    const handleScroll = useCallback(
      (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        if (onScroll) onScroll(event);

        const offset =
          event.nativeEvent.contentOffset.y +
          (event.nativeEvent.contentInset.top || 0);
        if (typeof initialScrollOffsetRef.current !== 'number') {
          initialScrollOffsetRef.current = offset;
        }
        scrollOffsetRef.current = offset;
        const shouldBeScrolledToTop =
          offset <= (initialScrollOffsetRef.current || 0);

        if (isScrolledToTopRef.current !== shouldBeScrolledToTop) {
          isScrolledToTopRef.current = shouldBeScrolledToTop;
          setIsScrolledToTop(shouldBeScrolledToTop);
        }
      },
      [onScroll],
    );

    const isScrollingRef = useRef(false);

    const handleScrollBeginDrag = useCallback(
      (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        isScrollingRef.current = true;
        if (onScrollBeginDrag) onScrollBeginDrag(event);
      },
      [onScrollBeginDrag],
    );

    const handleScrollEndDrag = useCallback(
      (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        isScrollingRef.current = false;
        if (onScrollEndDrag) onScrollEndDrag(event);

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
        if (onMomentumScrollEnd) onMomentumScrollEnd(event);

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
              scrollEventThrottle={Math.min(scrollEventThrottle || Infinity, 4)}
            />
          );
          if (debug)
            return (
              <>
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
                </View>
                {scrollViewElement}
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
  },
  debugInfoTitle: { fontWeight: 'bold' },
});
