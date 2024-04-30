import React, { useCallback, useState } from 'react';
import { LayoutChangeEvent, Platform, StyleSheet, View } from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { BottomNavigation, Menu } from 'react-native-paper';
import { CommonActions } from '@react-navigation/native';

import {
  buildMenuItems,
  useColorScheme,
  useTheme,
} from '@rnstudy/react-native-ui-md3';

import { BottomTabNavigationOptions } from '../../types';

import type { Props } from './TabBar';

export function TabBarMD3({
  navigation,
  descriptors,
  state,
  insets,
  shifting,
}: Props) {
  const theme = useTheme();
  const colorScheme = useColorScheme();

  const [menuVisible, setMenuVisible] = React.useState<Record<string, boolean>>(
    {},
  );

  const [
    longPressMenusContainerLayoutHeight,
    setLongPressMenusContainerLayoutHeight,
  ] = useState(0);
  const handleLongPressMenusContainerLayout = useCallback(
    (event: LayoutChangeEvent) => {
      setLongPressMenusContainerLayoutHeight(event.nativeEvent.layout.height);
    },
    [],
  );

  return (
    <>
      <View>
        <View
          onLayout={handleLongPressMenusContainerLayout}
          style={styles.longPressMenusContainer}
        >
          {Object.entries(descriptors).map(([key, descriptor]) => {
            const anchor = (
              <View key={key} style={styles.longPressMenuAnchor} />
            );

            const options = descriptor.options as BottomTabNavigationOptions;

            if (!options.tabButtonMenu) {
              // Return a placeholder anchor without a menu
              return anchor;
            }

            const closeMenu = () =>
              setMenuVisible((v) => ({ ...v, [key]: false }));

            const tabButtonMenuItems = [...options.tabButtonMenu];
            // Reverse the menu items to let it be consistent with the iOS implementation, which the menu items are laid out from bottom to top - the same direction as the menu will open.
            tabButtonMenuItems.reverse();

            return (
              <Menu
                key={key}
                visible={menuVisible[key] || false}
                onDismiss={closeMenu}
                anchor={anchor}
                anchorPosition="top"
                contentStyle={[
                  styles.longPressMenuContent,
                  {
                    // HACK: Magic formula to position the menu just above the bottom navigation bar.
                    marginBottom:
                      longPressMenusContainerLayoutHeight -
                      (Platform.OS === 'android' ? insets.bottom : 0),
                  },
                ]}
              >
                {buildMenuItems(tabButtonMenuItems, {
                  theme,
                  colorScheme,
                  closeMenu,
                })}
              </Menu>
            );
          })}
        </View>
        <View style={styles.navigationBarContainer}>
          <BottomNavigation.Bar
            shifting={shifting}
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
                ReactNativeHapticFeedback.trigger('impactMedium');
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
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  longPressMenusContainer: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  longPressMenuAnchor: {
    height: 1,
    width: 80,
  },
  longPressMenuContent: {},
  navigationBarContainer: {
    backgroundColor: '#777', // For shadow, not actually visible.
    ...Platform.select({
      android: {
        elevation: 7,
      },
      ios: {
        shadowColor: 'black',
        shadowOpacity: 0.12,
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 2,
      },
    }),
  },
});

export default TabBarMD3;
