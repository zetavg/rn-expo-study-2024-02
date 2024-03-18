import { Platform } from 'react-native';
import type {
  MenuConfig as NativeMenuConfig,
  MenuElementConfig as NativeMenuElementConfig,
  OnPressMenuItemEventObject,
} from 'react-native-ios-context-menu';

import { IconDefinitions, IconName } from '@rnstudy/react-icons';

export type MenuAction = {
  /** The title of the item. */
  title: string;
  /** An optional subtitle that will be displayed below the title. */
  subtitle?: string;
  /** The handler to be called when the item is pressed. */
  handler?: () => void;
  /** The name of the icon to display on the item. **Note that this will only use the SF Symbol version of the icon, and will not fallback to Material Icon nor use the SVG icon.** */
  icon?: IconName;
  /** Displays a check mark on the item. */
  checked?: boolean;
  /** An option indicating the menu's appearance represents a destructive action. */
  destructive?: boolean;
};

export type SubMenu = {
  /** The title of the submenu. */
  title?: string;
  /** An optional subtitle that will be displayed below the title. Note that this may not be shown if `inline` is set to true. */
  subtitle?: string;
  /** Items to be displayed in the submenu. */
  items: Readonly<MenuItems>;
  /** The submenu will be displayed inline when set to true. */
  inline?: boolean;
};

export type MenuItems = (MenuAction | SubMenu)[];

export function buildNativeMenuItems(
  items: readonly (MenuAction | SubMenu)[],
  keyPrefix: string = '',
): NativeMenuElementConfig[] {
  return items.map((it, index) => {
    const key = `${keyPrefix ? `${keyPrefix}.` : ''}${index}`;

    if ((it as SubMenu).items) {
      const subMenu = it as SubMenu;
      return {
        type: 'menu',
        menuTitle: subMenu.title || '',
        menuSubtitle: subMenu.subtitle,
        menuItems: buildNativeMenuItems(subMenu.items, key),
        menuOptions: [...(subMenu.inline ? ['displayInline' as const] : [])],
      };
    } else {
      const item = it as MenuAction;

      const menuItem: NonNullable<NativeMenuConfig['menuItems']>[number] = {
        type: 'action',
        actionKey: key,
        actionTitle: item.title,
        actionSubtitle: item.subtitle,
      };
      if (item.icon) {
        const iconDefinition = IconDefinitions[item.icon];
        const sfSymbolDefn = iconDefinition.sfSymbolDefinitions;

        if (sfSymbolDefn) {
          const osVersion =
            typeof Platform.Version === 'string'
              ? parseFloat(Platform.Version)
              : Platform.Version;
          for (const defn of sfSymbolDefn) {
            if (
              typeof defn.availability?.iOS === 'number' &&
              osVersion >= defn.availability.iOS
            ) {
              menuItem.icon = {
                type: 'IMAGE_SYSTEM',
                imageValue: {
                  systemName: defn.name,
                },
              };
              break;
            }
          }
        }
      }
      if (item.checked) {
        menuItem.menuState = 'on';
      }
      if (item.destructive) {
        menuItem.menuAttributes = [
          ...(menuItem.menuAttributes || []),
          'destructive',
        ];
      }
      return menuItem;
    }
  });
}

export function getItem(
  items: readonly (MenuAction | SubMenu)[],
  path: readonly number[],
): MenuAction | SubMenu | undefined {
  const [firstIndex] = path;
  if (typeof firstIndex !== 'number') {
    return undefined;
  }

  let currentItem = items[firstIndex];

  for (let i = 1; i < path.length; i += 1) {
    const index = path[i];
    if (typeof index !== 'number') return undefined;

    currentItem = (currentItem as Partial<SubMenu>)?.items?.[index];
  }

  return currentItem;
}

export function buildNativePressMenuItemHandler(
  items: readonly (MenuAction | SubMenu)[],
) {
  return (event: OnPressMenuItemEventObject) => {
    const {
      nativeEvent: { actionKey },
    } = event;
    const path = actionKey.split('.').map((index) => parseInt(index, 10));
    const item = getItem(items, path);
    (item as Partial<MenuAction>)?.handler?.();
  };
}
