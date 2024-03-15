import type {
  MenuConfig as NativeMenuConfig,
  MenuElementConfig as NativeMenuElementConfig,
  OnPressMenuItemEventObject,
} from 'react-native-ios-context-menu';

export type MenuButton = {
  title: string;
  subtitle?: string;
  action?: (event: OnPressMenuItemEventObject) => void;
  /** The name of the SF Symbol to display on the item */
  systemImage?: string;
  /** Displays a check mark on the item. */
  checked?: boolean;
  /** An option indicating the menu's appearance represents a destructive action.*/
  destructive?: boolean;
};

export type SubMenu = {
  title?: string;
  subtitle?: string;
  items: readonly (MenuButton | SubMenu)[];
  /** The submenu will be displayed inline when set to true. */
  inline?: boolean;
};

export type MenuItems = readonly (MenuButton | SubMenu)[];

export function buildNativeMenuItems(
  items: readonly (MenuButton | SubMenu)[],
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
      const item = it as MenuButton;

      const menuItem: NonNullable<NativeMenuConfig['menuItems']>[number] = {
        type: 'action',
        actionKey: key,
        actionTitle: item.title,
        actionSubtitle: item.subtitle,
      };
      if (item.systemImage) {
        menuItem.icon = {
          type: 'IMAGE_SYSTEM',
          imageValue: {
            systemName: item.systemImage,
          },
        };
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
  items: readonly (MenuButton | SubMenu)[],
  path: readonly number[],
): MenuButton | SubMenu | undefined {
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
  items: readonly (MenuButton | SubMenu)[],
) {
  return (event: OnPressMenuItemEventObject) => {
    const {
      nativeEvent: { actionKey },
    } = event;
    const path = actionKey.split('.').map((index) => parseInt(index, 10));
    const item = getItem(items, path);
    (item as Partial<MenuButton>)?.action?.(event);
  };
}
