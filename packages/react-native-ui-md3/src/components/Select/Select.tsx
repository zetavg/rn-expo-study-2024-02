import React from 'react';
import {
  Platform,
  StyleSheet,
  Text as RNText,
  View,
  ViewStyle,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { useColorScheme, useTheme } from '../../contexts';
import { Text } from '../Text';

export type Option = { label: string };
export type Action = { label: string; action: () => void };

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

export function Select<T extends string>({
  options,
  value,
  onChangeValue,
  placeholder,
  additionalActions,
  align,
  style,
}: Props<T>) {
  const theme = useTheme();
  const colorScheme = useColorScheme();

  if (Platform.OS !== 'android') {
    return (
      <RNText style={[styles.unsupportedErrorText, style]}>
        [MD3 Select] Unsupported platform: {Platform.OS}
      </RNText>
    );
  }

  return (
    <View style={[styles.container, style]}>
      <Text
        numberOfLines={1}
        color={value ? 'onSurface' : 'outline'}
        style={[styles.text, { textAlign: align }]}
      >
        {value ? options[value].label : placeholder || 'Select...'}
      </Text>
      <Picker
        selectedValue={value || ('__undefined__' as const)}
        onValueChange={(v) => {
          if (v === '__undefined__') return;

          if (v.startsWith('__additional_action__')) {
            const i = parseInt(v.split('.')[1] || '0', 10);
            const action = additionalActions?.[i]?.action;
            if (action) action();
            return;
          }

          onChangeValue(v);
        }}
        style={[styles.picker]}
        mode="dropdown"
        dropdownIconColor={theme.schemes[colorScheme].outline}
      >
        {Object.entries(options).map(([val, d]) => (
          <Picker.Item
            key={val}
            value={val}
            label={(d as { label: string }).label}
          />
        ))}
        {additionalActions &&
          additionalActions.map((action, i) => (
            <Picker.Item
              key={`__additional_action__.${i}`}
              value={`__additional_action__.${i}`}
              label={action.label}
              style={theme.fonts.labelMedium}
              color={theme.schemes[colorScheme].outline}
            />
          ))}
        {!value && (
          // A hack to allow value to be undefined. This is not meant to be selected.
          <Picker.Item key="__undefined__" value="__undefined__" label="" />
        )}
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 50,
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 40,
  },
  text: {
    flex: 1,
  },
  picker: {
    color: 'transparent',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  unsupportedErrorText: {
    backgroundColor: 'red',
    color: 'white',
  },
});

export default Select;
