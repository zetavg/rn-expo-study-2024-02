import React from 'react';
import { View } from 'react-native';

import { SegmentedControl as SegmentedControlIOS } from '@rnstudy/react-native-ui-ios';
import { SegmentedControl as SegmentedControlMD3 } from '@rnstudy/react-native-ui-md3';

import { useUIPlatform } from '../../contexts';

export type Props<T extends string> = {
  disabled?: boolean;

  /**
   * The control's segment buttons. An object of values as keys and labels as values, in order.
   */
  options: { [key in T]: string };

  value: T | undefined;

  /**
   * Callback that is called when the user taps a segment; passes the segment's value as an argument
   */
  onValueChange?: (value: T) => void;

  size?: 'small';

  style?: React.ComponentProps<typeof View>['style'];

  disableAdvancedAutoSizing?: boolean;
};

export function SegmentedControl<T extends string>(props: Props<T>) {
  const uiPlatform = useUIPlatform();

  switch (uiPlatform) {
    case 'ios': {
      return <SegmentedControlIOS {...props} />;
    }
    case 'android': {
      return <SegmentedControlMD3 {...props} />;
    }
  }
}

export default SegmentedControl;
