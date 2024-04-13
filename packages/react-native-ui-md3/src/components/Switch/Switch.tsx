import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { Switch as RNSwitch } from 'react-native-paper';

export type Props = React.ComponentProps<typeof RNSwitch> & {
  size?: 'small';
};

export function Switch({ size, style, ...restProps }: Props) {
  return <RNSwitch style={[size && styles[size], style]} {...restProps} />;
}

const styles = StyleSheet.create({
  small: {
    ...Platform.select({
      ios: { transform: [{ scale: 0.8 }] },
      // Android native switch is already small enough.
    }),
  },
});

export default Switch;
