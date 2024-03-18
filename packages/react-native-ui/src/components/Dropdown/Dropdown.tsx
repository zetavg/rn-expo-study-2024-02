import React from 'react';
import { ViewStyle } from 'react-native';

import { IconName } from '@rnstudy/react-icons';
import { Dropdown as DropdownIOS } from '@rnstudy/react-native-ui-ios';
import { Dropdown as DropdownMD3 } from '@rnstudy/react-native-ui-md3';

import { useUIPlatform } from '../../contexts';

export type Option = { label: string; icon?: IconName };
export type Action = { label: string; icon?: IconName; action: () => void };

export type Props<T extends string> = {
  options: Readonly<{
    [key in T]: Option;
  }>;
  value: T | undefined;
  onChangeValue: (value: T) => void;
  placeholder?: string;
  additionalActions?: readonly Action[];
  align?: 'left' | 'right' | 'center';
  style?: ViewStyle;
};

export function Dropdown<T extends string>(props: Props<T>) {
  const uiPlatform = useUIPlatform();

  switch (uiPlatform) {
    case 'ios': {
      return <DropdownIOS {...props} />;
    }
    case 'android': {
      return <DropdownMD3 {...props} />;
    }
  }

  return null;
}

export default Dropdown;
