import React, { useMemo } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { createBottomTabNavigator as rnCreateBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';

import { BottomTabNavigationContext } from './screen-contents/contexts';
import {
  AnyBottomTabNavigatorScreens,
  GeneratedBottomTabNavigator,
  NavigationConfig,
} from './types';

/**
 * Creates a pre-configured bottom-tab navigator.
 */
export function createBottomTabNavigator<
  ID extends string,
  S extends AnyBottomTabNavigatorScreens,
>({
  id,
  screens,
  config,
}: {
  /** The ID of the navigator. It should be unique within the app. */
  id: ID;
  /** Screens in the navigator. */
  screens: S;
  /** Config object. */
  config: NavigationConfig;
}): GeneratedBottomTabNavigator<ID, S> {
  const BottomTab = rnCreateBottomTabNavigator();

  const { useColorScheme } = config;

  const navigator: Partial<GeneratedBottomTabNavigator<ID, S>> =
    function BottomTabNavigator() {
      const colorScheme = useColorScheme();

      const screenOptions = useMemo<
        React.ComponentProps<
          ReturnType<typeof rnCreateBottomTabNavigator>['Navigator']
        >['screenOptions']
      >(
        () => ({
          headerShown: false,
          ...(() => {
            switch (Platform.OS) {
              case 'ios': {
                return {
                  tabBarStyle: {
                    position: 'absolute',
                    borderTopColor: (() => {
                      switch (colorScheme) {
                        case 'light':
                          return 'rgba(0, 0, 0, 0.3)';
                        case 'dark':
                          return 'rgba(255, 255, 255, 0.15)';
                      }
                    })(),
                  },
                  tabBarBackground: () => (
                    <BlurView
                      tint={colorScheme}
                      intensity={100}
                      style={StyleSheet.absoluteFill}
                    />
                  ),
                };
              }

              default:
                return {};
            }
          })(),
        }),
        [colorScheme],
      );

      return (
        <BottomTab.Navigator id={id} screenOptions={screenOptions}>
          {useMemo(
            () =>
              Object.entries(screens).map(
                ([name, { screen: Screen, options }]) => {
                  return (
                    <BottomTab.Screen key={name} name={name} options={options}>
                      {(props) => (
                        <BottomTabNavigationContext.Provider
                          value={props.navigation}
                        >
                          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                          <Screen {...(props as any)} />
                        </BottomTabNavigationContext.Provider>
                      )}
                    </BottomTab.Screen>
                  );
                },
              ),
            [],
          )}
        </BottomTab.Navigator>
      );
    };

  navigator._id = id;
  navigator._screens = screens;

  return navigator as GeneratedBottomTabNavigator<ID, S>;
}

export default createBottomTabNavigator;
