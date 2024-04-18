import React, { forwardRef, useEffect, useState } from 'react';
import { Keyboard, Platform, ScrollView } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import bottomTabPressReactive from '../bottomTabPressReactive';
import { useContentInset } from '../hooks';

const BottomTabPressReactiveScrollView = bottomTabPressReactive(ScrollView);

export const StackScreenContentScrollView = forwardRef<
  ScrollView,
  React.ComponentProps<typeof ScrollView>
>(function StackScreenContentScrollView(
  props: React.ComponentProps<typeof ScrollView>,
  ref,
) {
  const contentInset = useContentInset(props.contentInset);
  const focused = useIsFocused();

  return (
    <BottomTabPressReactiveScrollView
      ref={ref}
      keyboardDismissMode="interactive"
      keyboardShouldPersistTaps="handled"
      // On iOS, make `automaticallyAdjustKeyboardInsets` defaults to `true` when focused. Disabling it when not focused can prevent the scroll position from changing for unfocused screens when the keyboard has been shown.
      automaticallyAdjustKeyboardInsets={
        Platform.OS === 'ios'
          ? focused
          : false /* On Android, KeyboardAvoidingView in ScreenContent is used instead. */
      }
      // For `headerLargeTitle` to work. See: https://reactnavigation.org/docs/7.x/native-stack-navigator#headerlargetitle
      // This also handles insets for safe area and bottom tab bar automatically on iOS.
      contentInsetAdjustmentBehavior={
        Platform.OS === 'ios' ? 'automatic' : undefined
      }
      {...props}
      // Seems that `contentInset` and `scrollIndicatorInsets` are not working on Android. Fallback to padding instead.
      // https://github.com/facebook/react-native/issues/30533
      contentInset={Platform.OS === 'ios' ? contentInset : undefined}
      scrollIndicatorInsets={Platform.OS === 'ios' ? contentInset : undefined}
      contentContainerStyle={[
        props.contentContainerStyle,
        Platform.OS === 'android' && {
          paddingTop: contentInset?.top,
          paddingBottom: contentInset?.bottom,
        },
      ]}
    />
  );
});

StackScreenContentScrollView.displayName = 'StackScreenContentScrollView';

export default StackScreenContentScrollView;
