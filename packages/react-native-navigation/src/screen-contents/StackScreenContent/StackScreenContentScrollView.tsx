import React, { forwardRef, useEffect, useState } from 'react';
import { Platform, ScrollView } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import bottomTabPressReactive from '../bottomTabPressReactive';
import { useScrollViewContentInset } from '../hooks';

import { KeyboardAvoidingViewAndroid } from './components/KeyboardAvoidingViewAndroid';

const BottomTabPressReactiveScrollView = bottomTabPressReactive(ScrollView);

export const StackScreenContentScrollView = forwardRef<
  ScrollView,
  React.ComponentProps<typeof ScrollView>
>(function StackScreenContentScrollView(
  {
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
  const focused = useIsFocused();
  const contentInset = useScrollViewContentInset(contentInsetProp, {
    contentInsetAdjustmentBehavior,
  });

  const view = (
    <BottomTabPressReactiveScrollView
      ref={ref}
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
      contentInset={Platform.OS === 'ios' ? contentInset : undefined}
      contentContainerStyle={[
        restProps.contentContainerStyle,
        Platform.OS === 'android' && {
          paddingTop: contentInset?.top,
          paddingBottom: contentInset?.bottom,
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
