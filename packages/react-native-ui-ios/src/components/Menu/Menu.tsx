import React, { useMemo } from 'react';
import { Platform, StyleSheet, Text } from 'react-native';
import type {
  ContextMenuButtonProps as NativeContextMenuButtonProps,
  MenuConfig as NativeMenuConfig,
} from 'react-native-ios-context-menu';

import {
  buildNativeMenuItems,
  buildNativePressMenuItemHandler,
  MenuAction,
  MenuItems,
  SubMenu,
} from '../../utils/ios-menu';

export type { MenuAction, MenuItems, SubMenu };

const NativeContextMenuButton: (
  props: NativeContextMenuButtonProps,
) => JSX.Element = (() => {
  // Use dynamic import to avoid loading the module on unsupported platforms.
  if (Platform.OS === 'ios') {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    return require('react-native-ios-context-menu').ContextMenuButton;
  } else {
    return () => (
      <Text style={styles.unsupportedPlatformErrorText}>
        iOS Menu: ContextMenuButton is not supported on this platform.
      </Text>
    );
  }
})();

export type Props = {
  /** A render prop that should render a button that will open the menu. */
  children: (openMenu: () => void) => React.ReactNode;
  /** An array of items to be displayed in the menu. */
  items: Readonly<MenuItems>;
  /** An optional title that will be displayed on top of the opened menu. */
  title?: string;
};

const noop = () => {};

export function Menu({ title, items, children, ...restProps }: Props) {
  const menuConfig = useMemo<NativeMenuConfig>(
    () => ({
      menuTitle: title || '',
      menuItems: buildNativeMenuItems(items),
    }),
    [title, items],
  );

  const handlePressMenuItem = useMemo(
    () => buildNativePressMenuItemHandler(items),
    [items],
  );

  return (
    <>
      <NativeContextMenuButton
        menuConfig={menuConfig}
        onPressMenuItem={handlePressMenuItem}
        {...restProps}
      >
        {
          // With the current implementation, pressing any content that is wrapped by the NativeContextMenuButton will open the menu, so the openMenu callback is not actually needed.
          children(noop)
        }
      </NativeContextMenuButton>
    </>
  );
}

const styles = StyleSheet.create({
  unsupportedPlatformErrorText: {
    fontSize: 16,
    backgroundColor: 'red',
    color: 'white',
  },
});

export default Menu;
