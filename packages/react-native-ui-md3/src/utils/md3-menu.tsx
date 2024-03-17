import React from 'react';
import { GestureResponderEvent, StyleSheet } from 'react-native';
import { Divider, Menu as RNMenu } from 'react-native-paper';

import { IconDefinitions, IconName } from '@rnstudy/react-icons';

import Text from '../components/Text';
import { useColorScheme, useTheme } from '../contexts';

export type MenuButton = {
  title: string;
  /** Note: This is currently not displayed. */
  subtitle?: string;
  action?: (event: GestureResponderEvent) => void;
  /** The name of the icon to display on the item. */
  icon?: IconName;
  /** Displays a check mark on the item. */
  checked?: boolean;
  /** An option indicating the menu's appearance represents a destructive action. */
  destructive?: boolean;
};

export type SubMenu = {
  title?: string;
  /** Note: This is currently not displayed. */
  subtitle?: string;
  items: readonly (MenuButton | SubMenu)[];
  /** The submenu will be displayed inline when set to true (Currently this is always treated as true since nested submenus are not implemented). */
  inline?: boolean;
};

export type MenuItems = readonly (MenuButton | SubMenu)[];

export function buildMenuItems(
  items: readonly (MenuButton | SubMenu)[],
  {
    theme,
    colorScheme,
    closeMenu,
    keyPrefix = '',
  }: {
    theme: ReturnType<typeof useTheme>;
    colorScheme: ReturnType<typeof useColorScheme>;
    closeMenu: () => void;
    keyPrefix?: string;
  },
): JSX.Element[] {
  return items.flatMap((item, index) => {
    if ((item as SubMenu).items) {
      const subMenu = item as SubMenu;
      return [
        <Divider />,
        ...(subMenu.title
          ? [
              <Text
                variant="labelSmall"
                color="outline"
                numberOfLines={1}
                style={styles.subMenuTitleText}
              >
                {subMenu.title}
              </Text>,
            ]
          : []),
        ...buildMenuItems(subMenu.items, {
          theme,
          colorScheme,
          closeMenu,
          keyPrefix: `${keyPrefix}${index}-`,
        }),
      ];
    }

    const menuButton = item as MenuButton;
    const materialIcon =
      menuButton.icon && IconDefinitions[menuButton.icon]?.materialIconName;
    return [
      <RNMenu.Item
        key={`${keyPrefix}${index}`}
        onPress={(event) => {
          closeMenu();
          menuButton.action?.(event);
        }}
        title={menuButton.subtitle ? menuButton.title : menuButton.title}
        leadingIcon={menuButton.checked ? 'check' : materialIcon}
        // trailingIcon={materialIcon}
        contentStyle={[
          styles.menuItemContent,
          menuButton.checked === false && styles.menuItemContent_notChecked,
        ]}
        titleStyle={
          menuButton.destructive && {
            color: theme.schemes[colorScheme].error,
          }
        }
      />,
    ];
  });
}

const styles = StyleSheet.create({
  menuItemContent: {
    flexGrow: 1,
    marginRight: 8,
  },
  menuItemContent_notChecked: {
    marginLeft: 24 + 12,
  },
  subMenuTitleText: {
    marginTop: 12,
    marginBottom: 4,
    marginHorizontal: 16,
  },
});
