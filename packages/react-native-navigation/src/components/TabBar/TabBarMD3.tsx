import React, { useCallback, useRef } from 'react';
import { View } from 'react-native';
import { BottomNavigation, Menu } from 'react-native-paper';
import { CommonActions } from '@react-navigation/native';

import {
  buildMenuItems,
  useColorScheme,
  useTheme,
} from '@rnstudy/react-native-ui-md3';

import { BottomTabNavigationOptions } from '../../types';

import type { Props } from './TabBar';

export function TabBarMD3({ navigation, descriptors, state, insets }: Props) {
  const theme = useTheme();
  const colorScheme = useColorScheme();

  const [menuVisible, setMenuVisible] = React.useState<Record<string, boolean>>(
    {},
  );

  const containerRef = useRef<View>(null);
  const containerLayoutInWindowRef = useRef<
    | {
        x: number;
        y: number;
        width: number;
        height: number;
      }
    | undefined
  >(undefined);
  const handleContainerLayout = useCallback(() => {
    containerRef.current?.measureInWindow((x, y, width, height) => {
      containerLayoutInWindowRef.current = { x, y, width, height };
    });
  }, []);

  return (
    <>
      <View ref={containerRef} onLayout={handleContainerLayout}>
        <BottomNavigation.Bar
          navigationState={state}
          safeAreaInsets={insets}
          onTabPress={({ route, preventDefault }) => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (event.defaultPrevented) {
              preventDefault();
            } else {
              navigation.dispatch({
                ...CommonActions.navigate(route.name, route.params),
                target: state.key,
              });
            }
          }}
          onTabLongPress={({ route }) => {
            const key = route.key;
            const descriptor = descriptors[key];
            const options = (descriptor?.options ||
              {}) as BottomTabNavigationOptions;

            if (options.tabButtonMenu) {
              setMenuVisible((v) => ({ ...v, [key]: true }));
              return;
            }

            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          }}
          renderIcon={({ route, focused, color }) => {
            const { options } = descriptors[route.key] || {};
            if (options?.tabBarIcon) {
              return options.tabBarIcon({ focused, color, size: 24 });
            }

            return null;
          }}
          getLabelText={({ route }) => {
            const { options } = descriptors[route.key] || {};
            const label = options?.title;

            return label;
          }}
        />
      </View>
      {Object.entries(descriptors).map(([key, descriptor], i, arr) => {
        const options = descriptor.options as BottomTabNavigationOptions;
        if (!options.tabButtonMenu) return null;

        const closeMenu = () => setMenuVisible((v) => ({ ...v, [key]: false }));

        const tabButtonMenuItems = [...options.tabButtonMenu];
        tabButtonMenuItems.reverse();

        const cX = containerLayoutInWindowRef.current?.x || 0;
        const cY = containerLayoutInWindowRef.current?.y || 0;
        const cW = containerLayoutInWindowRef.current?.width || 0;

        const tabButtonX = cX + (cW / arr.length) * i;
        const tabButtonWidth = cW / arr.length;
        const distanceToTabButtonCenter = tabButtonWidth / 2;
        const menuAnchorX = tabButtonX + distanceToTabButtonCenter - 32;

        return (
          <Menu
            key={key}
            visible={menuVisible[key] || false}
            onDismiss={closeMenu}
            anchor={{
              x: menuAnchorX,
              y: cY + 16,
            }}
          >
            {buildMenuItems(tabButtonMenuItems, {
              theme,
              colorScheme,
              closeMenu,
            })}
          </Menu>
        );
      })}
    </>
  );
}

export default TabBarMD3;
