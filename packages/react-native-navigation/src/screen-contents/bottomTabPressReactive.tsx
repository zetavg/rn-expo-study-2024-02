import React, { forwardRef, useCallback, useContext, useRef } from 'react';
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  SectionList,
} from 'react-native';
import {
  FlatList as GHFlatList,
  ScrollView as GHScrollView,
} from 'react-native-gesture-handler';
import { StackActions, useIsFocused } from '@react-navigation/native';

import { useInterceptedRef } from '@rnstudy/react-hooks';

import { BottomTabNavigationContext } from './contexts';
import { useNearestStackNavigation } from './hooks';
type ScrollViewComponentType =
  | typeof ScrollView
  | typeof FlatList
  | typeof SectionList
  | typeof GHScrollView
  | typeof GHFlatList;

/**
 * Makes a `ScrollView`-like component reactive to the bottom tab press event.
 *
 * The expected native behavior of "tapping again on the active tab" is to:
 *
 * * If the screen for the tab renders a scroll view, and that scroll view is not scrolled to the top, the scroll view will be scrolled to the top.
 * * Otherwise, if the screen for the tab renders a stack navigator, a popToTop action is performed on the stack.
 *
 * This function makes the wrapped `ScrollView`-like component responses to the "tapping again on the active tab" event as described above.
 */
export default function bottomTabPressReactive<
  S extends ScrollViewComponentType,
>(ScrollViewComponent: S) {
  return forwardRef<
    S extends React.ForwardRefExoticComponent<React.RefAttributes<infer C>>
      ? C
      : // eslint-disable-next-line @typescript-eslint/no-explicit-any
        S extends abstract new (...args: any) => any
        ? InstanceType<S>
        : never,
    React.ComponentProps<S>
  >(function DismissibleScrollableComponent(
    props: React.ComponentProps<S>,
    ref,
  ) {
    const { onScroll, scrollEventThrottle } = props;

    const [scrollViewRef, scrollViewRefObject] = useInterceptedRef(ref);

    const bottomTabNavigation = useContext(BottomTabNavigationContext);

    const isScrolledToTopRef = useRef(true);
    const initialScrollOffsetRef = useRef<undefined | number>(undefined);
    const handleScroll = useCallback(
      (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        if (onScroll) onScroll(event);

        const offset = event.nativeEvent.contentOffset.y;
        if (typeof initialScrollOffsetRef.current !== 'number') {
          initialScrollOffsetRef.current = offset;
        }
        const shouldBeScrolledToTop =
          offset <= (initialScrollOffsetRef.current || 0);

        isScrolledToTopRef.current = shouldBeScrolledToTop;
      },
      [onScroll],
    );

    const isFocused = useIsFocused();
    const stackNavigation = useNearestStackNavigation();
    React.useEffect(() => {
      if (!bottomTabNavigation) return;
      if (!isFocused) return;

      const unsubscribe = bottomTabNavigation.addListener('tabPress', (e) => {
        e.preventDefault();

        if (isScrolledToTopRef.current) {
          // Already scrolled to top. Pop to top if there's a parent stack navigator and it has more than 1 screen.
          if ((stackNavigation?.getState()?.routes.length || 0) > 1) {
            stackNavigation?.dispatch(StackActions.popToTop());
          }
        } else {
          // Not scrolled to top. Scroll to top.
          const scrollable = scrollViewRefObject.current;
          if (scrollable) {
            if ('scrollTo' in scrollable) {
              scrollable.scrollTo({
                y: initialScrollOffsetRef.current || 0,
                animated: true,
              });
            } else if ('scrollToOffset' in scrollable) {
              scrollable.scrollToOffset({
                offset: initialScrollOffsetRef.current || 0,
                animated: true,
              });
            } else {
              scrollable.scrollToLocation({
                itemIndex: 0,
                sectionIndex: 0,
                viewOffset: initialScrollOffsetRef.current || 0,
                animated: true,
              });
            }
          }
        }
      });

      return unsubscribe;
    }, [
      isFocused,
      bottomTabNavigation,
      scrollViewRef,
      scrollViewRefObject,
      stackNavigation,
    ]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const GeneralScrollViewComponent = ScrollViewComponent as any;

    return (
      <GeneralScrollViewComponent
        ref={scrollViewRef}
        {...props}
        scrollToOverflowEnabled={true}
        onScroll={handleScroll}
        scrollEventThrottle={Math.min(scrollEventThrottle || Infinity, 16)}
      />
    );
  });
}
