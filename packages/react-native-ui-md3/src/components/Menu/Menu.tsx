import React from 'react';
import { Menu as RNMenu } from 'react-native-paper';

import { useColorScheme, useTheme } from '../../contexts';
import {
  buildMenuItems,
  MenuAction,
  MenuItems,
  SubMenu,
} from '../../utils/md3-menu';

export type { MenuAction, MenuItems, SubMenu };

export type Props = {
  /** A render prop that should render a button that will open the menu. */
  children: (openMenu: () => void) => React.ReactNode;
  /** An array of items to be displayed in the menu. */
  items: readonly (MenuAction | SubMenu)[];
  /** [TODO: not implemented] An optional title that will be displayed on top of the opened menu. */
  title?: string;
};

export function Menu({ items, children }: Props) {
  const theme = useTheme();
  const colorScheme = useColorScheme();
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <RNMenu
      visible={visible}
      onDismiss={closeMenu}
      anchor={children(openMenu)}
      // statusBarHeight={50}
    >
      {buildMenuItems(items, { theme, colorScheme, closeMenu })}
    </RNMenu>
  );
}

export default Menu;
