import React, { forwardRef, useContext, useMemo, useState } from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import {
  ScrollView,
  ScrollViewProps,
  ScrollViewRef,
} from '@rnstudy/react-native-lists';
import { useInterceptedRef } from '@rnstudy/react-utils';

import { ScrollViewContext } from '../contexts';
import { useScrollViewContentInset } from '../hooks';

import { KeyboardAvoidingViewAndroid } from './components/KeyboardAvoidingViewAndroid';

export type Props = ScrollViewProps;
export type RefObject = ScrollViewRef;

export const StackScreenContentScrollView = forwardRef<
  RefObject,
  ScrollViewProps
>(function StackScreenContentScrollView(
  {
    onScroll: onScrollProp,
    onScrollBeginDrag: onScrollBeginDragProp,
    contentInset: contentInsetProp,
    // On iOS, defaults `contentInsetAdjustmentBehavior` to `"automatic"` for `headerLargeTitle` to work. See: https://reactnavigation.org/docs/7.x/native-stack-navigator#headerlargetitle
    // This also handles insets for safe area and bottom tab bar automatically on iOS.
    contentInsetAdjustmentBehavior = Platform.OS === 'ios'
      ? 'automatic'
      : 'never',
    ...restProps
  }: React.ComponentProps<typeof ScrollView>,
  ref,
) {
  const [scrollViewRef, scrollViewRefObject] = useInterceptedRef(ref);

  const {
    scrollViewRefRef,
    onScroll: onScrollFromContext,
    onScrollBeginDrag: onScrollBeginDragFromContext,
  } = useContext(ScrollViewContext) || {};

  if (scrollViewRefRef) scrollViewRefRef.current = scrollViewRefObject;

  const handleScroll = useMemo(() => {
    if (!onScrollFromContext) return onScrollProp;

    return (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (onScrollProp) onScrollProp(event);
      onScrollFromContext(event);
    };
  }, [onScrollFromContext, onScrollProp]);

  const handleScrollBeginDrag = useMemo(() => {
    if (!onScrollBeginDragFromContext) return onScrollBeginDragProp;

    return (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (onScrollBeginDragProp) onScrollBeginDragProp(event);
      onScrollBeginDragFromContext(event);
    };
  }, [onScrollBeginDragFromContext, onScrollBeginDragProp]);

  const focused = useIsFocused();
  const contentInset = useScrollViewContentInset(contentInsetProp, {
    contentInsetAdjustmentBehavior,
  });

  // On iOS, changing `contentInset` after the initial render may cause the content in the scroll view to shift (users may encounter this when they rotate the device, which changes the screen width and makes the bottom tab bar to be moved to the side). To prevent this, we will log and use the initial content inset and always use it for the scroll view, and calculate the difference between the initial and the new content insets and apply the diff as `contentContainerStyle` padding.
  const [initialContentInset] = useState(contentInset);
  const contentInsetDiff = useMemo(() => {
    if (contentInset === initialContentInset) return null;

    const diff: typeof contentInset = {};

    for (const key of ['top', 'bottom', 'left', 'right'] as const) {
      if (contentInset?.[key] !== initialContentInset?.[key]) {
        diff[key] =
          (contentInset?.[key] || 0) - (initialContentInset?.[key] || 0);
      }
    }

    return diff;
  }, [contentInset, initialContentInset]);

  const view = (
    <ScrollView
      ref={scrollViewRef}
      onScroll={handleScroll}
      onScrollBeginDrag={handleScrollBeginDrag}
      keyboardDismissMode="interactive"
      keyboardShouldPersistTaps="handled"
      //
      // Handle keyboard avoiding behavior.
      // On iOS, make `automaticallyAdjustKeyboardInsets` defaults to `true` when focused. Disabling it when not focused can prevent the scroll position from changing for unfocused screens when the keyboard has been shown.
      // On Android, `automaticallyAdjustKeyboardInsets` is not supported, so `KeyboardAvoidingView` is used instead.
      automaticallyAdjustKeyboardInsets={
        Platform.OS === 'ios' ? focused : false
      }
      //
      {...restProps}
      contentInsetAdjustmentBehavior={contentInsetAdjustmentBehavior}
      //
      // Content insets.
      // Seems that `contentInset` and `scrollIndicatorInsets` are not working on Android. Fallback to `contentContainerStyle` padding instead.
      // https://github.com/facebook/react-native/issues/30533
      contentInset={Platform.OS === 'ios' ? initialContentInset : undefined}
      scrollIndicatorInsets={
        Platform.OS === 'ios' ? contentInsetDiff || undefined : undefined
      }
      contentContainerStyle={[
        restProps.contentContainerStyle,
        Platform.OS === 'android' && {
          paddingTop: contentInset?.top,
          paddingBottom: contentInset?.bottom,
        },
        Platform.OS === 'ios' && {
          paddingTop: contentInsetDiff?.top,
          paddingBottom: contentInsetDiff?.bottom,
          paddingLeft: contentInsetDiff?.left,
          paddingRight: contentInsetDiff?.right,
        },
      ]}
    />
  );

  if (Platform.OS === 'android') {
    return <KeyboardAvoidingViewAndroid>{view}</KeyboardAvoidingViewAndroid>;
  }

  return view;
});

StackScreenContentScrollView.displayName = 'StackScreenContentScrollView';

export default StackScreenContentScrollView;
