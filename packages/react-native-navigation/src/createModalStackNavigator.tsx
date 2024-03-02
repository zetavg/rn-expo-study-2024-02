import React, { useMemo } from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import * as iosColors from '@rnstudy/ios-colors';

import {
  AnyStackNavigatorScreens,
  GeneratedStackNavigator,
  NavConfig,
  StackParamListOfScreens,
} from './types';

/**
 * Creates a pre-configured modal stack navigator.
 */
export function createModalStackNavigator<
  ID extends string,
  S extends AnyStackNavigatorScreens,
>({
  id,
  screens,
  defaultInitialRouteName,
  config,
}: {
  /** The ID of the navigator. It should be unique within the app. */
  id: ID;
  /** Screens in the navigator. */
  screens: S;
  /** The default initial route name of the navigator. */
  defaultInitialRouteName: keyof S;
  /** Config object. */
  config: NavConfig;
}) {
  const Stack = createStackNavigator<StackParamListOfScreens<S>>();

  const { useColorScheme } = config;

  const getNavigatorWithInitialRouteName = (initialRouteName: keyof S) =>
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
        }),
        [],
      );

      return (
        <Stack.Navigator
          id={id}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          initialRouteName={initialRouteName as any}
          screenOptions={screenOptions}
        >
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
    withInitialRouteName: (initialRouteName: keyof S) => () => JSX.Element;
  };

  const navigator: Partial<Navigator> = getNavigatorWithInitialRouteName(
    defaultInitialRouteName,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ) as any;
  navigator._id = id;
  navigator._screens = screens;
  navigator.withInitialRouteName = getNavigatorWithInitialRouteName;

  return navigator as Navigator;
}

export default createModalStackNavigator;
