import React from 'react';

import { BackgroundColor as BackgroundColorIOS } from '@rnstudy/react-native-ui-ios';
import { BackgroundColor as BackgroundColorMD3 } from '@rnstudy/react-native-ui-md3';

import { useUIPlatform } from '../contexts';

/**
 * This component can be used in components that uses context-aware background colors.
 *
 * It increases the group level by 1 for the children components, so that children that also uses the `BackgroundColor` component or the `useBackgroundColor` hook will be able to use the color that corresponds to the correct group level.
 */
export function BackgroundColor({
  grouped,
  root,
  children,
}: {
  /** Whether to use *grouped* background colors. In general, grouped background colors should be used when you have a grouped table view. See: https://developer.apple.com/design/human-interface-guidelines/color#iOS-iPadOS. */
  grouped?: boolean;
  /** Whether this should be the root of your view - setting this will reset the group level context */
  root?: boolean;
  children: (backgroundColor: string) => React.ReactNode;
}): JSX.Element {
  const uiPlatform = useUIPlatform();

  switch (uiPlatform) {
    case 'ios':
      return (
        <BackgroundColorIOS grouped={grouped} root={root} children={children} />
      );
    case 'android':
    default:
      return (
        <BackgroundColorMD3 grouped={grouped} root={root} children={children} />
      );
  }
}

export default BackgroundColor;
