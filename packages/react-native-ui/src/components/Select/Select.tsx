import React from 'react';
import { ViewStyle } from 'react-native';

import { IconName } from '@rnstudy/react-icons';
import { Select as SelectIOS } from '@rnstudy/react-native-ui-ios';
import { Select as SelectMD3 } from '@rnstudy/react-native-ui-md3';

import { useUIPlatform } from '../../contexts';

export type Option = { label: string; shortLabel?: string; icon?: IconName };
export type Action = { label: string; icon?: IconName; handler: () => void };

export type Props<T extends string> = {
  /** Options to be displayed in the select. */
  options: Readonly<{
    [key in T]: Option;
  }>;
  /** The value of the select. */
  value: T | undefined;
  /** The handler to be called when the value is changed. */
  onValueChange: (value: T) => void;
  /** Placeholder text to be displayed when no value is selected. */
  placeholder?: string;
  /** Additional actions to be displayed at the bottom of the select menu. */
  additionalActions?: readonly Action[];
  /** The alignment of the select. */
  align?: 'start' | 'end' | 'center';

  style?: ViewStyle;
};

export function Select<T extends string>(props: Props<T>) {
  const uiPlatform = useUIPlatform();

  switch (uiPlatform) {
    case 'ios': {
      return <SelectIOS {...props} />;
    }
    case 'android': {
      return <SelectMD3 {...props} />;
    }
  }

  return null;
}

export default Select;
