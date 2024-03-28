import React from 'react';
import { StyleSheet } from 'react-native';
import { Divider, Menu as RNMenu } from 'react-native-paper';

import { IconDefinitions, IconName } from '@rnstudy/react-icons';

import Text from '../components/Text';
import { useColorScheme, useTheme } from '../contexts';

export type MenuAction = {
  /** The title of the item. */
  title: string;
  /** [TODO: not implemented] An optional subtitle that will be displayed below the title. */
  subtitle?: string;
  /** The handler to be called when the item is pressed. */
  handler?: () => void;
  /** The name of the icon to display on the item. **Note that this will only use the Material Icon version of the icon, ignoring the SVG icon.** */
  icon?: IconName;
  /** Displays a check mark on the item. */
  checked?: boolean;
  /** An option indicating the menu's appearance represents a destructive action. */
  destructive?: boolean;
};

export type SubMenu = {
  /** The title of the submenu. */
  title?: string;
  /** [TODO: not implemented] An optional subtitle that will be displayed below the title. Note that this may not be shown if `inline` is set to true. */
  subtitle?: string;
  /** Items to be displayed in the submenu. */
  items: Readonly<MenuItems>;
  /** [TODO: not implemented, currently submenus will always be inline] The submenu will be displayed inline when set to true. */
  inline?: boolean;
};

export type MenuItems = (MenuAction | SubMenu)[];

export function buildMenuItems(
  items: readonly (MenuAction | SubMenu)[],
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

    const menuButton = item as MenuAction;
    const materialIcon =
      menuButton.icon && IconDefinitions[menuButton.icon]?.materialIconName;
    return [
      <RNMenu.Item
        key={`${keyPrefix}${index}`}
        onPress={() => {
          closeMenu();
          menuButton.handler?.();
        }}
        title={menuButton.subtitle ? menuButton.title : menuButton.title}
        leadingIcon={
          menuButton.checked
            ? 'check'
            : materialIcon && typeof materialIcon === 'object'
              ? materialIcon.android || materialIcon.default
              : materialIcon
        }
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
