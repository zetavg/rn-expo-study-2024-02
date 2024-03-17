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

type Props<T extends string> = {
  options: {
    [key in T]: { label: string };
  };
  value: T | undefined;
  onChangeValue: (value: T) => void;
  style?: ViewStyle;
};

export function Dropdown<T extends string>({
  options,
  value,
  onChangeValue,
  style,
}: Props<T>) {
  const theme = useTheme();
  const colorScheme = useColorScheme();

  if (Platform.OS !== 'android') {
    return (
      <RNText style={[styles.unsupportedErrorText, style]}>
        [MD3 Dropdown] Unsupported platform: {Platform.OS}
      </RNText>
    );
  }

  return (
    <View style={[styles.container, style]}>
      <Text numberOfLines={1} color={value ? 'onSurface' : 'outline'}>
        {value ? options[value].label : 'Select...'}
      </Text>
      <Picker
        selectedValue={value || ('__undefined__' as const)}
        onValueChange={(v) => {
          if (v !== '__undefined__') onChangeValue(v);
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

export default Dropdown;
