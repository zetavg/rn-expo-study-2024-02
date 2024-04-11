import React, { useRef } from 'react';
import {
  Animated,
  Platform,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { Divider, Menu as RNMenu } from 'react-native-paper';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
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
  const props = usePropsWithContextualDefaultValues(
    rawProps,
    SelectPropsContext,
  );

  const { additionalActions } = props;

  const theme = useTheme();
  const colorScheme = useColorScheme();

  const [menuVisible, setMenuVisible] = React.useState(false);
  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  if (Platform.OS !== 'android') {
    return (
      <PickerContainer
        options={options}
        value={value}
        {...props}
        // eslint-disable-next-line react/no-unstable-nested-components
        contentWrapper={(content) => (
          <RNMenu
            visible={menuVisible}
            onDismiss={closeMenu}
            anchor={
              <TouchableOpacity onPress={openMenu}>{content}</TouchableOpacity>
            }
          >
            {Object.entries(options).map(([val, d]) => (
              <RNMenu.Item
                key={val}
                leadingIcon={value === val ? 'check' : undefined}
                title={(d as { label: string }).label}
                onPress={() => {
                  onValueChange(val as T);
                  closeMenu();
                }}
              />
            ))}
            {!!additionalActions && additionalActions.length > 0 && <Divider />}
            {additionalActions?.map((action, i) => (
              <RNMenu.Item
                key={i}
                title={action.label}
                onPress={action.handler}
              />
            ))}
          </RNMenu>
        )}
      >
        <View style={styles.dropdownIconContainer}>
          <MaterialIcon
            name="menu-down"
            size={24}
            color={theme.schemes[colorScheme].outline}
            style={styles.dropdownIcon}
          />
        </View>
      </PickerContainer>
    );
  }

  return (
    <PickerContainer options={options} value={value} {...props}>
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
    </PickerContainer>
  );
}

function PickerContainer({
  style,
  innerContainerStyle,
  textProps,
  textPaddingVertical = 4,
  value,
  placeholderColor,
  options,
  placeholder,
  align,
  contentWrapper = (content) => content,
  children,
}: Omit<Props<string>, 'onValueChange'> & {
  children: React.ReactElement;
  contentWrapper?: (content: React.ReactElement) => React.ReactElement;
}) {
  const textHeightAnim = useRef(new Animated.Value(14)).current;

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
        {contentWrapper(
          <>
            <Text
              {...textProps}
              numberOfLines={1}
              onLayout={(event) => {
                const { height } = event.nativeEvent.layout;
                textHeightAnim.setValue(height + textPaddingVertical * 2);
              }}
              color={value ? undefined : placeholderColor || 'secondaryVariant'}
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
              {value ? options[value]?.label : placeholder || 'Select...'}
            </Text>
            {children}
          </>,
        )}
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
    ...StyleSheet.absoluteFillObject,
  },
  dropdownIconContainer: {
    ...StyleSheet.absoluteFillObject,
    right: -32,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  dropdownIcon: {},
});

export default Select;
