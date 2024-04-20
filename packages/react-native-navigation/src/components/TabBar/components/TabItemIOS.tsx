import React from 'react';
import {
  type GestureResponderEvent,
  Platform,
  type StyleProp,
  StyleSheet,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import {
  BottomTabBarButtonProps,
  BottomTabBarProps,
} from '@react-navigation/bottom-tabs';
import { getLabel, Label, PlatformPressable } from '@react-navigation/elements';
import { type Route, useTheme } from '@react-navigation/native';
import Color from 'color';

import { Menu, MenuItems } from '@rnstudy/react-native-ui';

import TabBarIcon from './TabBarIconIOS';

type Props = {
  /**
   * The route object which should be specified by the tab.
   */
  route: Route<string>;
  /**
   * The `href` to use for the anchor tag on web
   */
  href?: string;
  /**
   * Whether the tab is focused.
   */
  focused: boolean;
  /**
   * The descriptor object for the route.
   */
  descriptor: BottomTabBarProps['descriptors'][number];
  /**
   * The label text of the tab.
   */
  label:
    | string
    | ((props: {
        focused: boolean;
        color: string;
        position: 'beside-icon' | 'below-icon';
        children: string;
      }) => React.ReactNode);
  /**
   * Icon to display for the tab.
   */
  icon: (props: {
    focused: boolean;
    size: number;
    color: string;
  }) => React.ReactNode;
  /**
   * Text to show in a badge on the tab icon.
   */
  badge?: number | string;
  /**
   * Custom style for the badge.
   */
  badgeStyle?: StyleProp<TextStyle>;
  /**
   * The button for the tab. Uses a `Pressable` by default.
   */
  button?: (props: BottomTabBarButtonProps) => React.ReactNode;
  /**
   * The accessibility label for the tab.
   */
  accessibilityLabel?: string;
  /**
   * An unique ID for testing for the tab.
   */
  testID?: string;
  /**
   * Function to execute on press in React Native.
   * On the web, this will use onClick.
   */
  onPress: (
    e: React.MouseEvent<HTMLElement, MouseEvent> | GestureResponderEvent,
  ) => void;
  /**
   * Function to execute on long press.
   */
  onLongPress: (e: GestureResponderEvent) => void;
  /**
   * Whether the label should be aligned with the icon horizontally.
   */
  horizontal: boolean;
  /**
   * Color for the icon and label when the item is active.
   */
  activeTintColor?: string;
  /**
   * Color for the icon and label when the item is inactive.
   */
  inactiveTintColor?: string;
  /**
   * Background color for item when its active.
   */
  activeBackgroundColor?: string;
  /**
   * Background color for item when its inactive.
   */
  inactiveBackgroundColor?: string;
  /**
   * Whether to show the label text for the tab.
   */
  showLabel?: boolean;
  /**
   * Whether to allow scaling the font for the label for accessibility purposes.
   */
  allowFontScaling?: boolean;
  /**
   * Style object for the label element.
   */
  labelStyle?: StyleProp<TextStyle>;
  /**
   * Style object for the icon element.
   */
  iconStyle?: StyleProp<ViewStyle>;
  /**
   * Style object for the wrapper element.
   */
  style?: StyleProp<ViewStyle>;

  containerStyle?: StyleProp<ViewStyle>;

  longPressMenuItems?: MenuItems;
};

export function BottomTabItemIOS({
  route,
  href,
  focused,
  descriptor,
  label,
  icon,
  badge,
  badgeStyle,
  button = ({
    href: btnHref,
    children,
    style: btnStyle,
    onPress: btnOnPress,
    accessibilityRole,
    ...rest
  }: BottomTabBarButtonProps) => {
    return (
      <PlatformPressable
        {...rest}
        android_ripple={{ borderless: true }}
        pressOpacity={1}
        href={btnHref}
        accessibilityRole={accessibilityRole}
        onPress={btnOnPress}
        style={btnStyle}
      >
        {children}
      </PlatformPressable>
    );
  },
  accessibilityLabel,
  testID,
  onPress,
  onLongPress,
  horizontal,
  activeTintColor: customActiveTintColor,
  inactiveTintColor: customInactiveTintColor,
  activeBackgroundColor = 'transparent',
  inactiveBackgroundColor = 'transparent',
  showLabel = true,
  allowFontScaling,
  labelStyle,
  iconStyle,
  style,
  containerStyle,
  longPressMenuItems,
}: Props) {
  const { colors } = useTheme();

  const activeTintColor =
    customActiveTintColor === undefined
      ? colors.primary
      : customActiveTintColor;

  const inactiveTintColor =
    customInactiveTintColor === undefined
      ? Color(colors.text).mix(Color(colors.card), 0.5).hex()
      : customInactiveTintColor;

  const renderLabel = ({ focused: focused_ }: { focused: boolean }) => {
    if (showLabel === false) {
      return null;
    }

    const color = focused_ ? activeTintColor : inactiveTintColor;

    if (typeof label !== 'string') {
      const { options } = descriptor;
      const children = getLabel(
        {
          label:
            typeof options.tabBarLabel === 'string'
              ? options.tabBarLabel
              : undefined,
          title: options.title,
        },
        route.name,
      );

      return label({
        focused: focused_,
        color,
        position: horizontal ? 'beside-icon' : 'below-icon',
        children,
      });
    }

    return (
      <Label
        style={[
          horizontal ? styles.labelBeside : styles.labelBeneath,
          labelStyle,
        ]}
        allowFontScaling={allowFontScaling}
        tintColor={color}
      >
        {label}
      </Label>
    );
  };

  const renderIcon = ({ focused: focused_ }: { focused: boolean }) => {
    if (icon === undefined) {
      return null;
    }

    const activeOpacity = focused_ ? 1 : 0;
    const inactiveOpacity = focused_ ? 0 : 1;

    return (
      <TabBarIcon
        route={route}
        horizontal={horizontal}
        badge={badge}
        badgeStyle={badgeStyle}
        activeOpacity={activeOpacity}
        inactiveOpacity={inactiveOpacity}
        activeTintColor={activeTintColor}
        inactiveTintColor={inactiveTintColor}
        renderIcon={icon}
        style={iconStyle}
      />
    );
  };

  const scene = { route, focused };

  const backgroundColor = focused
    ? activeBackgroundColor
    : inactiveBackgroundColor;

  const buttonProps: BottomTabBarButtonProps = {
    href,
    onPress,
    onLongPress,
    testID,
    accessibilityLabel,
    // FIXME: accessibilityRole: 'tab' doesn't seem to work as expected on iOS
    accessibilityRole: Platform.select({ ios: 'button', default: 'tab' }),
    accessibilityState: { selected: focused },
    // @ts-expect-error: keep for compatibility with older React Native versions
    accessibilityStates: focused ? ['selected'] : [],
    style: [
      styles.tab,
      { backgroundColor },
      horizontal ? styles.tabLandscape : styles.tabPortrait,
      style,
      containerStyle,
    ],
    children: (
      <>
        {renderIcon(scene)}
        {renderLabel(scene)}
      </>
    ),
  };

  if (longPressMenuItems) {
    return (
      <Menu items={longPressMenuItems} openOnLongPress style={containerStyle}>
        {(openMenu) => button({ ...buttonProps, onLongPress: openMenu })}
      </Menu>
    );
  }

  return button(buttonProps) as React.ReactElement;
}

const styles = StyleSheet.create({
  tab: {
    alignItems: 'center',
  },
  tabPortrait: {
    justifyContent: 'flex-end',
    flexDirection: 'column',
  },
  tabLandscape: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  labelBeneath: {
    fontSize: 10,
  },
  labelBeside: {
    fontSize: 13,
    marginStart: 20,
  },
});

export default BottomTabItemIOS;
