import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import { IconName } from '@rnstudy/react-icons';
import { Menu as MenuIOS } from '@rnstudy/react-native-ui-ios';
import { Menu as MenuMD3 } from '@rnstudy/react-native-ui-md3';

import { useUIPlatform } from '../../contexts';

export type MenuAction = {
  /** The title of the item. */
  title: string;
  /** [TODO: Android not implemented, iOS only] An optional subtitle that will be displayed below the title. */
  subtitle?: string;
  /** The handler to be called when the item is pressed. */
  handler?: () => void;
  /** The name of the icon to display on the item. **Note that on iOS, this will only use the SF Symbol version of the icon, and will not fallback to Material Icon nor use the SVG icon, and on Android, this will only use the Material Icon version of the icon, ignoring the SVG icon.** */
  icon?: IconName;
  /** Displays a check mark on the item. */
  checked?: boolean;
  /** An option indicating the menu's appearance represents a destructive action. */
  destructive?: boolean;
};

export type SubMenu = {
  /** The title of the submenu. */
  title?: string;
  /** [TODO: Android not implemented, iOS only] An optional subtitle that will be displayed below the title. Note that this may not be shown if `inline` is set to true. */
  subtitle?: string;
  /** The name of the icon to display on the item. **Note that on iOS, this will only use the SF Symbol version of the icon, and will not fallback to Material Icon nor use the SVG icon, and on Android, this will only use the Material Icon version of the icon, ignoring the SVG icon.** */
  icon?: IconName;
  /** Items to be displayed in the submenu. */
  items: Readonly<MenuItems>;
  /** [TODO: Android not implemented, currently submenus will always be inline on Android] The submenu will be displayed inline when set to true. */
  inline?: boolean;
};

export type MenuItems = (MenuAction | SubMenu)[];

export type Props = {
  /** A render prop that should render a button that will open the menu. */
  children: (openMenu: () => void) => React.ReactNode;
  /** An array of items to be displayed in the menu. */
  items: Readonly<MenuItems>;
  /** [TODO: Android not implemented, iOS only] An optional title that will be displayed on top of the opened menu. */
  title?: string;
  /** Should the menu open on long press instead of press. This is required for things to work correctly on iOS. */
  openOnLongPress?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function Menu({
  title,
  items,
  openOnLongPress,
  style,
  children,
}: Props): JSX.Element {
  const uiPlatform = useUIPlatform();

  switch (uiPlatform) {
    case 'ios': {
      return (
        <MenuIOS
          title={title}
          items={items}
          openOnLongPress={openOnLongPress}
          style={style}
        >
          {children}
        </MenuIOS>
      );
    }
    case 'android': {
      return (
        <MenuMD3 title={title} items={items} style={style}>
          {children}
        </MenuMD3>
      );
    }
  }
}

export default Menu;
