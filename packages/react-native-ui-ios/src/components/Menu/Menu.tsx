import React, { useMemo } from 'react';
import { Platform, StyleSheet, Text } from 'react-native';
import type {
  ContextMenuButtonProps as NativeContextMenuButtonProps,
  MenuConfig as NativeMenuConfig,
} from 'react-native-ios-context-menu';

import {
  buildNativeMenuItems,
  buildNativePressMenuItemHandler,
  MenuButton,
  SubMenu,
} from '../../utils/ios-menu';

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

type Props = {
  items: readonly (MenuButton | SubMenu)[];
  children: React.ReactNode;
  title?: string;

  // onMenuWillShow: NativeContextMenuButtonProps['onMenuWillShow'];
  // onMenuWillHide: NativeContextMenuButtonProps['onMenuWillHide'];
  // onMenuWillCancel: NativeContextMenuButtonProps['onMenuWillCancel'];
  // onMenuDidShow: NativeContextMenuButtonProps['onMenuDidShow'];
  // onMenuDidHide: NativeContextMenuButtonProps['onMenuDidHide'];
  // onMenuDidCancel: NativeContextMenuButtonProps['onMenuDidCancel'];
};

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
        {children}
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
