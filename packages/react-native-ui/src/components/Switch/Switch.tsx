import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import { Switch as SwitchIOS } from '@rnstudy/react-native-ui-ios';
import { Switch as SwitchMD3 } from '@rnstudy/react-native-ui-md3';

import { useUIPlatform } from '../../contexts';

export type Props = {
  /**
   * The value of the switch. If true the switch will be turned on.
   * Default value is false.
   */
  value?: boolean;

  /**
   * Invoked with the new value when the value changes.
   */
  onValueChange?: (value: boolean) => void;

  /**
   * If true the user won't be able to toggle the switch.
   * Default value is false.
   */
  disabled?: boolean | undefined;

  size?: 'small';

  style?: StyleProp<ViewStyle>;
};

export function Switch(props: Props) {
  const uiPlatform = useUIPlatform();

  switch (uiPlatform) {
    case 'android':
      return <SwitchMD3 {...props} />;

    default:
      return <SwitchIOS {...props} />;
  }
}

export default Switch;
