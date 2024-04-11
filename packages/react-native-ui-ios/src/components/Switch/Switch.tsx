import React from 'react';
import { Switch as RNSwitch } from 'react-native';

import { useColors } from '../../contexts';

export type Props = React.ComponentProps<typeof RNSwitch>;

export function Switch(props: Props) {
  const colors = useColors();
  return <RNSwitch trackColor={{ true: colors.green }} {...props} />;
}

export default Switch;
