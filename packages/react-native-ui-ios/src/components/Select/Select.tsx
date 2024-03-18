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

import { useTextStyles, useUIColors } from '../../contexts';
import Menu, { MenuAction, SubMenu } from '../Menu';
import { Text } from '../Text';

import PopUpMenuIndicator from './PopUpMenuIndicator';

const AnimatedText = Animated.createAnimatedComponent(Text);

export type Option = { label: string; icon?: IconName };
export type Action = { label: string; icon?: IconName; action: () => void };

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
  const uiColors = useUIColors();
  const textStyle = useTextStyles();

  const menuItems = useMemo(() => {
    const menuActions = Object.entries(options).map(([v, d]) => {
      const { label, icon } = d as Option;
      const menuItem: MenuAction = {
        title: label,
        icon,
        handler: () => {
          onChangeValue(v as T);
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
        action: action.action,
      })),
      inline: true,
    };
    return [...menuActions, additionalActionsMenu];
  }, [value, options, onChangeValue, additionalActions]);

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
                    case 'left':
                      return 'flex-start';
                    case 'center':
                      return 'center';
                    default:
                    case 'right':
                      return 'flex-end';
                  }
                })(),
              },
              style,
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
  );
}

const styles = StyleSheet.create({
  container: {
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
