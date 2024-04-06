import React from 'react';

import type { IconName } from '@rnstudy/react-icons';
import { ListItem as ListItemIOS } from '@rnstudy/react-native-ui-ios';
import { ListItem as ListItemMD3 } from '@rnstudy/react-native-ui-md3';

import { useUIPlatform } from '../../../contexts';

export type Props = {
  label?: string;
  icon?: IconName;
  onPress?: () => void;
};

export function AccessoryButton(props: Props): JSX.Element {
  const uiPlatform = useUIPlatform();

  switch (uiPlatform) {
    case 'ios': {
      return <ListItemIOS.AccessoryButton {...props} />;
    }
    case 'android': {
      return <ListItemMD3.AccessoryButton {...props} />;
    }
  }
}

export default AccessoryButton;
