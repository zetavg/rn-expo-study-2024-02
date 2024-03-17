import React from 'react';
import { Menu as RNMenu } from 'react-native-paper';

import { useColorScheme, useTheme } from '../../contexts';
import { buildMenuItems, MenuButton, SubMenu } from '../../utils/md3-menu';

type Props = {
  items: readonly (MenuButton | SubMenu)[];
  children: (openMenu: () => void) => React.ReactNode;
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
