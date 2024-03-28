import React, { useRef } from 'react';
import {
  Animated,
  Platform,
  StyleProp,
  StyleSheet,
  Text as RNText,
  View,
  ViewStyle,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { usePropsWithContextualDefaultValues } from '@rnstudy/react-utils';

import { useColorScheme, useTheme } from '../../contexts';
import { Text } from '../Text';

import SelectPropsContext from './SelectPropsContext';

export type Option = { label: string };
export type Action = { label: string; handler: () => void };

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

  textPaddingVertical?: number;
  placeholderColor?: React.ComponentProps<typeof Text>['color'];
  textProps?: React.ComponentProps<typeof Text>;
  style?: StyleProp<ViewStyle>;
  innerContainerStyle?: StyleProp<ViewStyle>;
};

/** Since we are not sure about the height of the native select will be, so we use a generous value here then adjust the margin of the select to make it fit the desired height. */
const NATIVE_SELECT_HEIGHT = 60;

export function Select<T extends string>(rawProps: Props<T>) {
  const { options, value, onValueChange } = rawProps;
  const {
    placeholder,
    additionalActions,
    align,
    textPaddingVertical = 4,
    textProps,
    placeholderColor = 'outlineVariant',
    style,
    innerContainerStyle,
  } = usePropsWithContextualDefaultValues(rawProps, SelectPropsContext);

  const theme = useTheme();
  const colorScheme = useColorScheme();

  const textHeightAnim = useRef(new Animated.Value(14)).current;

  if (Platform.OS !== 'android') {
    return (
      <RNText style={[styles.unsupportedErrorText, style]}>
        [MD3 Select] Unsupported platform: {Platform.OS}
      </RNText>
    );
  }

  return (
    <View style={[styles.container, style]}>
      <Animated.View
        style={[
          styles.innerContainer,
          innerContainerStyle,
          {
            marginVertical: Animated.divide(
              Animated.subtract(textHeightAnim, NATIVE_SELECT_HEIGHT),
              2,
            ),
          },
        ]}
      >
        <Text
          {...textProps}
          numberOfLines={1}
          onLayout={(event) => {
            const { height } = event.nativeEvent.layout;
            textHeightAnim.setValue(height + textPaddingVertical * 2);
          }}
          color={value ? undefined : placeholderColor}
          style={[
            styles.text,
            {
              textAlign: (() => {
                switch (align) {
                  case 'start':
                    return 'left';
                  case 'end':
                    return 'right';
                  case 'center':
                    return 'center';
                }

                return 'left';
              })(),
            },
            textProps?.style,
          ]}
        >
          {value ? options[value].label : placeholder || 'Select...'}
        </Text>
        <Picker
          selectedValue={value || ('__undefined__' as const)}
          onValueChange={(v) => {
            if (v === '__undefined__') return;

            if (v.startsWith('__additional_action__')) {
              const i = parseInt(v.split('.')[1] || '0', 10);
              const action = additionalActions?.[i]?.handler;
              if (action) action();
              return;
            }

            onValueChange(v);
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
            // [TODO] A hack to allow the value to be undefined. This is not meant to be selected.
            <Picker.Item key="__undefined__" value="__undefined__" label="" />
          )}
        </Picker>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  innerContainer: {
    height: NATIVE_SELECT_HEIGHT,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 40,
  },
  text: {
    flexGrow: 1,
    flexShrink: 1,
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
