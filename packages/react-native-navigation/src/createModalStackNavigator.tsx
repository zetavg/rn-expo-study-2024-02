import React, { useMemo, useState } from 'react';
import { Platform, Text } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import * as iosColors from '@rnstudy/ios-colors';

import {
  AnyStackNavigatorScreens,
  GeneratedStackNavigator,
  NavigationConfig,
  StackParamListOfScreens,
} from './types';

const MAIN_SCREEN_NAME = 'MAIN';

/**
 * Creates a pre-configured modal stack navigator.
 */
export function createModalStackNavigator<
  ID extends string,
  S extends AnyStackNavigatorScreens,
>({
  id,
  mainScreen,
  screens,
  config,
}: {
  /** The ID of the navigator. It should be unique within the app. */
  id: ID;
  /** A component to be rendered as the base screen. */
  mainScreen: () => JSX.Element;
  /** Screens in the navigator. */
  screens: S;
  /** Config object. */
  config: NavigationConfig;
}) {
  const Stack = createStackNavigator<StackParamListOfScreens<S>>();

  const { useColorScheme } = config;

  const getNavigatorWithMainScreen = (MainScreenComponent: () => JSX.Element) =>
    function StackNavigator() {
      const colorScheme = useColorScheme();

      const backgroundColor = useMemo(() => {
        switch (Platform.OS) {
          default:
          case 'ios':
            return iosColors[colorScheme].uiColors.systemGroupedBackground;
        }
      }, [colorScheme]);

      const screenOptions = useMemo<
        React.ComponentProps<
          ReturnType<typeof createStackNavigator>['Navigator']
        >['screenOptions']
      >(
        () => ({
          headerShown: false,
          presentation: 'modal',
          detachPreviousScreen: false, // This also fixes the "navigation header stuck outside of safe area when re-mounted" issue on iOS
        }),
        [],
      );

      return (
        <Stack.Navigator
          id={id}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          initialRouteName={MAIN_SCREEN_NAME as any}
          screenOptions={screenOptions}
        >
          <Stack.Screen
            name={MAIN_SCREEN_NAME}
            component={MainScreenComponent}
          />
          {Object.entries(screens).map(([name, screenDefinition]) => {
            const screen =
              'screen' in screenDefinition
                ? screenDefinition.screen
                : screenDefinition;

            const options =
              'options' in screenDefinition
                ? screenDefinition.options
                : undefined;

            return (
              <Stack.Screen
                key={name}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                name={name as any}
                component={screen}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                options={options as any}
              />
            );
          })}
        </Stack.Navigator>
      );
    };

  type Navigator = GeneratedStackNavigator<ID, S> & {
    withMainScreen: (mainScreen: () => JSX.Element) => () => JSX.Element;
  };

  const navigator: Partial<Navigator> = getNavigatorWithMainScreen(
    mainScreen,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ) as any;
  navigator._id = id;
  navigator._screens = screens;
  navigator.withMainScreen = getNavigatorWithMainScreen;

  return navigator as Navigator;
}

export default createModalStackNavigator;
