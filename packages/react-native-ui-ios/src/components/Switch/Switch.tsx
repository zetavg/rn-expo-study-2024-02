import React from 'react';
import { StyleSheet, Switch as RNSwitch } from 'react-native';

import { useColors } from '../../contexts';

export type Props = React.ComponentProps<typeof RNSwitch> & {
  size?: 'small';
};

export function Switch({ size, style, ...restProps }: Props) {
  const colors = useColors();
  return (
    <RNSwitch
      trackColor={{ true: colors.green }}
      style={[size && styles[size], style]}
      {...restProps}
    />
  );
}

const styles = StyleSheet.create({
  small: { transform: [{ scale: 0.8 }] },
});

export default Switch;
