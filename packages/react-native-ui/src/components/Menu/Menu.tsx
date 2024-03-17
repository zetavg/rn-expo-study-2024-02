import React from 'react';

import { IconName } from '@rnstudy/react-icons';
import { Menu as MenuIOS } from '@rnstudy/react-native-ui-ios';
import { Menu as MenuMD3 } from '@rnstudy/react-native-ui-md3';

import { useUIPlatform } from '../../contexts';

export type MenuButton = {
  title: string;
  /** [iOS Only] */
  subtitle?: string;
  /** The action to perform when the user presses on the item. */
  action?: () => void;
  /** The name of the icon to display on the item. Note that this will not use the SVG icon, and on iOS, it will only use the SF Symbol version of the icon, and will not fallback to Material Icon. */
  icon?: IconName;
  /** Displays a check mark on the item. */
  checked?: boolean;
  /** An option indicating the menu's appearance represents a destructive action. */
  destructive?: boolean;
};

export type SubMenu = {
  title?: string;
  /** [iOS Only] */
  subtitle?: string;
  items: readonly (MenuButton | SubMenu)[];
  /** [iOS Only] The submenu will be displayed inline when set to true. On Android, submenus are always displayed inline. */
  inline?: boolean;
};

export type MenuItems = readonly (MenuButton | SubMenu)[];

type Props = {
  /** [iOS Only] The title to display on the menu. */
  title?: string;
  items: readonly (MenuButton | SubMenu)[];
  children: (openMenu: () => void) => React.ReactNode;
};

const noop = () => {};

export function Menu({ title, items, children }: Props): JSX.Element {
  const uiPlatform = useUIPlatform();

  switch (uiPlatform) {
    case 'ios': {
      return (
        <MenuIOS title={title} items={items}>
          {children(noop)}
        </MenuIOS>
      );
    }
    case 'android': {
      return <MenuMD3 items={items}>{children}</MenuMD3>;
    }
  }
}

export default Menu;
