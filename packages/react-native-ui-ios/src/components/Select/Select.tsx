import React, { useCallback, useMemo } from 'react';
import {
  Animated,
  Platform,
  Pressable,
  StyleSheet,
  Text as RNText,
  View,
  ViewStyle,
} from 'react-native';

import { Icon, IconName } from '@rnstudy/react-icons';
import { usePropsWithContextualDefaultValues } from '@rnstudy/react-utils';

import { useTextStyles, useUIColors } from '../../contexts';
import Menu, { MenuAction, SubMenu } from '../Menu';
import { Text } from '../Text';

import PopUpMenuIndicator from './PopUpMenuIndicator';
import SelectPropsContext from './SelectPropsContext';

const AnimatedText = Animated.createAnimatedComponent(Text);

export type Option = { label: string; icon?: IconName };
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
  innerContainerStyle?: ViewStyle;
};

export function Select<T extends string>(props: Props<T>) {
  const { options, value, onValueChange } = props;
  const { placeholder, additionalActions, align, style, innerContainerStyle } =
    usePropsWithContextualDefaultValues(props, SelectPropsContext);

  const uiColors = useUIColors();
  const textStyle = useTextStyles();

  const menuItems = useMemo(() => {
    const menuActions = Object.entries(options).map(([v, d]) => {
      const { label, icon } = d as Option;
      const menuItem: MenuAction = {
        title: label,
        icon,
        handler: () => {
          onValueChange(v as T);
        },
        checked: v === value,
      };

      return menuItem;
    });

    if (!additionalActions) return menuActions;

    const additionalActionsMenu: SubMenu = {
      items: additionalActions.map((action) => ({
        title: action.label,
        icon: action.icon,
        action: action.handler,
      })),
      inline: true,
    };
    return [...menuActions, additionalActionsMenu];
  }, [value, options, onValueChange, additionalActions]);

  const contentOpacity = useMemo(() => new Animated.Value(1), []);
  const indicatorOpacity = useMemo(() => new Animated.Value(1), []);

  const handlePressIn = useCallback(() => {
    Animated.timing(contentOpacity, {
      toValue: 0.5,
      duration: 5,
      useNativeDriver: true,
    }).start();
    Animated.timing(indicatorOpacity, {
      toValue: 0.8,
      duration: 5,
      useNativeDriver: true,
    }).start();
  }, [contentOpacity, indicatorOpacity]);

  const handlePressOut = useCallback(() => {
    Animated.timing(contentOpacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
    Animated.timing(indicatorOpacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [contentOpacity, indicatorOpacity]);

  if (Platform.OS !== 'ios') {
    return (
      <RNText style={[styles.unsupportedErrorText, style]}>
        [iOS Select] Unsupported platform: {Platform.OS}
      </RNText>
    );
  }

  return (
    <View style={[styles.wrapper, style]}>
      <Menu items={menuItems}>
        {(openMenu) => (
          <Pressable
            onPress={openMenu}
            onLongPress={openMenu}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
          >
            <View
              style={[
                styles.container,
                {
                  justifyContent: (() => {
                    switch (align) {
                      case 'start':
                        return 'flex-start';
                      case 'end':
                        return 'flex-end';
                      case 'center':
                        return 'center';
                    }

                    return 'center';
                  })(),
                },
                innerContainerStyle,
              ]}
            >
              <AnimatedText
                textStyle="body"
                color={value ? 'secondary' : 'placeholder'}
                numberOfLines={1}
                style={[styles.text, { opacity: contentOpacity }]}
              >
                {(() => {
                  const iconName = value && options[value]?.icon;

                  if (iconName) {
                    return (
                      <>
                        <Icon name={iconName} size={textStyle.body.fontSize} />{' '}
                      </>
                    );
                  }

                  return null;
                })()}
                {value ? options[value].label : placeholder || 'Select...'}
              </AnimatedText>
              <Animated.View style={{ opacity: indicatorOpacity }}>
                <PopUpMenuIndicator color={uiColors.secondaryLabel} />
              </Animated.View>
            </View>
          </Pressable>
        )}
      </Menu>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {},
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
  },
  text: {},
  unsupportedErrorText: {
    backgroundColor: 'red',
    color: 'white',
  },
});

export default Select;
