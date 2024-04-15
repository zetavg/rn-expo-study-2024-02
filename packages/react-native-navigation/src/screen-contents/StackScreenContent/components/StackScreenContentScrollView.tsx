import React, { forwardRef } from 'react';
import { ScrollView } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import bottomTabPressReactive from '../../bottomTabPressReactive';
import { useContentInset } from '../../hooks';

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
      {...props}
      keyboardDismissMode="interactive"
      keyboardShouldPersistTaps="handled"
      // Make `automaticallyAdjustKeyboardInsets` defaults to `true` when focused. Disabling it when not focused can prevent the scroll position from changing for unfocused screens when the keyboard has been shown.
      automaticallyAdjustKeyboardInsets={focused}
      // For `headerLargeTitle` to work. See: https://reactnavigation.org/docs/7.x/native-stack-navigator#headerlargetitle
      contentInsetAdjustmentBehavior="automatic"
      contentInset={contentInset}
      scrollIndicatorInsets={contentInset}
    />
  );
});

StackScreenContentScrollView.displayName = 'StackScreenContentScrollView';

export default StackScreenContentScrollView;
