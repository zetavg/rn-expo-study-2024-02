import React, { useMemo } from 'react';
import { Platform } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  useColorScheme,
  useIOSColors,
  useIOSUIColors,
} from '@rnstudy/react-native-ui';

import {
  AnyStackNavigatorScreens,
  GeneratedStackNavigator,
  StackParamListOfScreens,
} from './types';

type ScreenOptions = React.ComponentProps<
  ReturnType<typeof createNativeStackNavigator>['Navigator']
>['screenOptions'];

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
}: {
  /** The ID of the navigator. It should be unique within the app. */
  id: ID;
  /** Screens in the navigator. */
  screens: S;
  /** The default initial route name of the navigator. */
  defaultInitialRouteName: keyof S;
}) {
  const Stack = createNativeStackNavigator<StackParamListOfScreens<S>>();

  const getNavigatorWithInitialRouteName = (initialRouteName: keyof S) =>
    function StackNavigator() {
      const colorScheme = useColorScheme();
      const iosUIColors = useIOSUIColors();

      const screenOptions = useMemo<ScreenOptions>(
        () => ({
          ...(() => {
            switch (Platform.OS) {
              case 'ios': {
                return {
                  headerTintColor: iosUIColors.tintColor,
                  headerTitleStyle: getHeaderTitleStyleIOS({ iosUIColors }),
                  ...getScreenOptionsForHeaderBackgroundAndBorderIOS({
                    colorScheme,
                  }),
                  // We defaults `headerLargeTitle` to `true` on iOS, allowing screens that used `headerLargeTitle` to be initialized correctly.
                  ...{
                    headerLargeTitle: true,
                    headerLargeTitleShadowVisible: false,
                  },
                };
              }

              default:
                return {};
            }
          })(),
        }),
        [colorScheme, iosUIColors],
      );

      return (
        <Stack.Navigator
          // FIXME
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          id={id as any}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          initialRouteName={initialRouteName as any}
          screenOptions={screenOptions}
        >
          {useMemo(
            () =>
              Object.entries(screens).map(([name, screenDefinition]) => {
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
              }),
            [],
          )}
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

export function getHeaderTitleStyleIOS({
  iosUIColors,
}: {
  iosUIColors: ReturnType<typeof useIOSUIColors>;
}) {
  return {
    color: iosUIColors.label,
  };
}

export function getScreenOptionsForHeaderBackgroundAndBorderIOS({
  colorScheme,
}: {
  colorScheme: 'light' | 'dark';
}) {
  return {
    // Blur effect.
    headerTransparent: true,
    headerBlurEffect: colorScheme,
    headerShadowVisible: true,
    // Set a close-to-transparent background to make `headerShadowVisible: true` work.
    // See: https://github.com/react-navigation/react-navigation/issues/10845#issuecomment-1276312567
    headerStyle: {
      backgroundColor: 'rgba(255, 255, 255, 0.002)',
    },
  };
}

export default createStackNavigator;
