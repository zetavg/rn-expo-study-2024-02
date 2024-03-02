import React, { useMemo } from 'react';
import { Platform } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import * as iosColors from '@rnstudy/ios-colors';

import {
  AnyStackNavigatorScreens,
  GeneratedStackNavigator,
  NavigationConfig,
  StackParamListOfScreens,
} from './types';

/**
 * Creates a pre-configured stack navigator.
 */
export function createStackNavigator<
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
  config: NavigationConfig;
}) {
  const Stack = createNativeStackNavigator<StackParamListOfScreens<S>>();

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
          ReturnType<typeof createNativeStackNavigator>['Navigator']
        >['screenOptions']
      >(
        () => ({
          ...(() => {
            switch (Platform.OS) {
              case 'ios': {
                return {
                  headerTitleStyle: {
                    color: iosColors[colorScheme].uiColors.label,
                  },
                  // Blur effect.
                  headerTransparent: true,
                  headerBlurEffect: colorScheme,
                  headerShadowVisible: true,
                  // Set a close-to-transparent background to make `headerShadowVisible: true` work.
                  // See: https://github.com/react-navigation/react-navigation/issues/10845#issuecomment-1276312567
                  headerStyle: {
                    backgroundColor: 'rgba(255, 255, 255, 0.002)',
                  },
                  // We defaults `headerLargeTitle` to `true` on iOS, allowing screens that used `headerLargeTitle` to be initialized correctly.
                  ...{
                    headerLargeTitle: true,
                    headerLargeTitleShadowVisible: false,
                    headerLargeStyle: {
                      // There's no way to set the background color of the large title header as transparent, so we need to set it to the same color as the background here
                      backgroundColor,
                    },
                  },
                };
              }

              default:
                return {};
            }
          })(),
        }),
        [colorScheme, backgroundColor],
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

export default createStackNavigator;
