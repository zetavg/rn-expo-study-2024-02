import React from 'react';
import { StyleSheet } from 'react-native';
import { Button as RNButton } from 'react-native-paper';

import { useTheme } from '../../contexts';

type Props = {
  mode: 'text' | 'outlined' | 'contained' | 'elevated' | 'contained-tonal';
  size?: 'small' | 'regular' | 'medium' | 'large';
  compact?: boolean;
  loading?: boolean;
} & {
  // Re-exposing common PressableProps so that they can be picked-up by react-docgen.
  disabled?: React.ComponentProps<typeof RNButton>['disabled'];
  onPress?: React.ComponentProps<typeof RNButton>['onPress'];
  onPressIn?: React.ComponentProps<typeof RNButton>['onPressIn'];
  onPressOut?: React.ComponentProps<typeof RNButton>['onPressOut'];
  onLongPress?: React.ComponentProps<typeof RNButton>['onLongPress'];
} & React.ComponentProps<typeof RNButton>;

export function Button({ size = 'regular', style, ...restProps }: Props) {
  const theme = useTheme();
  return (
    <RNButton
      {...restProps}
      style={[styles.container, style]}
      labelStyle={[
        (() => {
          switch (size) {
            case 'small':
              return theme.fonts.labelMedium;
            case 'large':
              return theme.fonts.titleMedium;
          }
        })(),
        styles[`label_${size}`],
      ]}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
  },
  label_small: {
    marginVertical: 6,
    marginHorizontal: 12,
  },
  label_regular: {
    marginVertical: 8,
    marginHorizontal: 14,
  },
  label_medium: {},
  label_large: {
    marginVertical: 14,
    marginHorizontal: 24,
  },
});

export default Button;
