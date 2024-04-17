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

  // `automaticallyAdjustKeyboardInsets` is not supported on Android, so we need to handle it manually.
  const [isKeyboardVisible, setKeyboardVisible] = useState(
    Keyboard.isVisible(),
  );
  useEffect(() => {
    if (Platform.OS === 'ios') return;

    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
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
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <BottomTabPressReactiveScrollView
      ref={ref}
      {...props}
      contentContainerStyle={[
        props.contentContainerStyle,
        Platform.OS !== 'ios' &&
          // `automaticallyAdjustKeyboardInsets` is not supported on Android, so we need to handle it manually.
          isKeyboardVisible && {
            paddingBottom: Keyboard.metrics()?.height,
          },
      ]}
      keyboardDismissMode="interactive"
      keyboardShouldPersistTaps="handled"
      // Make `automaticallyAdjustKeyboardInsets` defaults to `true` when focused. Disabling it when not focused can prevent the scroll position from changing for unfocused screens when the keyboard has been shown.
      automaticallyAdjustKeyboardInsets={
        Platform.OS === 'ios' ? focused : false
      }
      // For `headerLargeTitle` to work. See: https://reactnavigation.org/docs/7.x/native-stack-navigator#headerlargetitle
      contentInsetAdjustmentBehavior={
        Platform.OS === 'ios' ? 'automatic' : undefined
      }
      contentInset={contentInset}
      scrollIndicatorInsets={contentInset}
    />
  );
});

StackScreenContentScrollView.displayName = 'StackScreenContentScrollView';

export default StackScreenContentScrollView;
