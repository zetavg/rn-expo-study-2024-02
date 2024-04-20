import React, { useCallback } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
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

  style?: StyleProp<ViewStyle>;
};

export function Menu({ items, style, children }: Props) {
  const theme = useTheme();
  const colorScheme = useColorScheme();
  const [visible, setVisible] = React.useState(false);

  const openMenu = useCallback(() => setVisible(true), []);
  const closeMenu = useCallback(() => setVisible(false), []);

  const element = (
    <RNMenu
      visible={visible}
      onDismiss={closeMenu}
      anchor={children(openMenu)}
      // statusBarHeight={50}
    >
      {buildMenuItems(items, { theme, colorScheme, closeMenu })}
    </RNMenu>
  );

  if (style) {
    // This is not ideal, but the `Menu` component from `react-native-paper` does not support setting the style of the anchor wrapper view.
    return <View style={[styles.container, style]}>{element}</View>;
  }

  return element;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
});

export default Menu;
