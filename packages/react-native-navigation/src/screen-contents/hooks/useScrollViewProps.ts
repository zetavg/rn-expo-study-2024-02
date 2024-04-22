import { useMemo, useState } from 'react';
import { Animated, Platform, ScrollViewProps, StyleSheet } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import { useScrollViewContentInset } from './useScrollViewContentInset';

/**
 * Takes the props passed to a scrollable component and returns the props that should be passed to the scrollable component with common defaults and adjustments.
 */
export function useScrollViewProps<P extends ScrollViewProps>(props: P) {
  const {
    contentInset: contentInsetProp,
    // On iOS, defaults `contentInsetAdjustmentBehavior` to `"automatic"` for `headerLargeTitle` to work. See: https://reactnavigation.org/docs/7.x/native-stack-navigator#headerlargetitle
    // This also handles insets for safe area and bottom tab bar automatically on iOS.
    contentInsetAdjustmentBehavior = Platform.OS === 'ios'
      ? 'automatic'
      : 'never',
    ...restProps
  } = props;

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

  const flattenedContentContainerStyle = StyleSheet.flatten(
    props.contentContainerStyle,
  );

  return {
    keyboardDismissMode: 'interactive',
    keyboardShouldPersistTaps: 'handled',
    //
    // Handle keyboard avoiding behavior.
    // On iOS, make `automaticallyAdjustKeyboardInsets` defaults to `true` when focused. Disabling it when not focused can prevent the scroll position from changing for unfocused screens when the keyboard has been shown.
    // On Android, `automaticallyAdjustKeyboardInsets` is not supported, so `KeyboardAvoidingView` is used instead.
    automaticallyAdjustKeyboardInsets: Platform.OS === 'ios' ? focused : false,
    //
    // Other props. The defaults above will be simply overridden if they exist in `restProps`.
    ...restProps,
    contentInsetAdjustmentBehavior,
    //
    // Content insets.
    // Seems that `contentInset` and `scrollIndicatorInsets` are not working on Android. Fallback to `contentContainerStyle` padding instead.
    // https://github.com/facebook/react-native/issues/30533
    contentInset: Platform.OS === 'ios' ? initialContentInset : undefined,
    scrollIndicatorInsets:
      Platform.OS === 'ios' ? contentInsetDiff || undefined : undefined,
    contentContainerStyle: [
      restProps.contentContainerStyle,
      Platform.OS === 'android' && {
        paddingTop: add(
          flattenedContentContainerStyle?.paddingTop,
          contentInset?.top,
          'paddingTop',
        ),
        paddingBottom: add(
          flattenedContentContainerStyle?.paddingBottom,
          contentInset?.bottom,
          'paddingBottom',
        ),
      },
      Platform.OS === 'ios' && {
        paddingTop: add(
          flattenedContentContainerStyle?.paddingTop,
          contentInsetDiff?.top,
          'paddingTop',
        ),
        paddingBottom: add(
          flattenedContentContainerStyle?.paddingBottom,
          contentInsetDiff?.bottom,
          'paddingBottom',
        ),
        paddingLeft: add(
          flattenedContentContainerStyle?.paddingLeft,
          contentInsetDiff?.left,
          'paddingLeft',
        ),
        paddingRight: add(
          flattenedContentContainerStyle?.paddingRight,
          contentInsetDiff?.right,
          'paddingRight',
        ),
      },
    ],
  };
}

function add(
  a: string | number | Animated.AnimatedNode | null | undefined,
  b: number | undefined,
  propertyName: string,
): number | Animated.AnimatedNode | undefined {
  if (typeof a === 'number') {
    return a + (b || 0);
  }

  if (!a) {
    return b;
  }

  if (typeof a === 'object') {
    return Animated.add(a, b || 0);
  }

  if (typeof a === 'string') {
    if (__DEV__) {
      console.warn(
        `Using a string for \`${propertyName}\` is not supported by this component. Please use a number or an Animated value.`,
      );
    }
  }

  return b;
}

export default useScrollViewProps;
