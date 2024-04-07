import React from 'react';
import { StyleProp, ViewProps, ViewStyle } from 'react-native';

import { ActivityIndicator as ActivityIndicatorIOS } from '@rnstudy/react-native-ui-ios';
import { ActivityIndicator as ActivityIndicatorMD3 } from '@rnstudy/react-native-ui-md3';

import { useUIPlatform } from '../../contexts';

export type Props = ViewProps & {
  /**
   * Whether to show the indicator (true, the default) or hide it (false).
   */
  animating?: boolean;

  /**
   * Whether the indicator should hide when not animating (true by default).
   */
  hidesWhenStopped?: boolean;

  /**
   * Size of the indicator.
   * Small has a height of 20, large has a height of 36.
   *
   * enum('small', 'large')
   */
  size?: number | 'small' | 'large';
};

export function ActivityIndicator(props: Props) {
  const uiPlatform = useUIPlatform();

  switch (uiPlatform) {
    case 'ios':
      return <ActivityIndicatorIOS {...props} />;

    default:
      return <ActivityIndicatorMD3 {...props} />;
  }
}

export default ActivityIndicator;
