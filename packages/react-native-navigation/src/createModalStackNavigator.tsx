import React, { useMemo } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import {
  AnyStackNavigatorScreens,
  GeneratedStackNavigator,
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
}: {
  /** The ID of the navigator. It should be unique within the app. */
  id: ID;
  /** A component to be rendered as the base screen. */
  mainScreen: React.ComponentType;
  /** Screens in the navigator. */
  screens: S;
}) {
  const Stack = createStackNavigator<StackParamListOfScreens<S>>();

  const getNavigatorWithMainScreen = (
    MainScreenComponent: React.ComponentType,
  ) =>
    function StackNavigator() {
      const screenOptions = useMemo<
        React.ComponentProps<
          ReturnType<typeof createStackNavigator>['Navigator']
        >['screenOptions']
      >(
        () => ({
          headerShown: false,
          presentation: 'modal',
          detachPreviousScreen: false, // This also fixes the "navigation header stuck outside of safe area when re-mounted" issue on iOS
          gestureEnabled: true,
          gestureResponseDistance: 4000, // Let the dismissible(ScrollView) determine if it should capture the scroll event, or let the navigator handle it and use the gesture to close the modal.
        }),
        [],
      );

      return (
        <Stack.Navigator
          // FIXME
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          id={id as any}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          initialRouteName={MAIN_SCREEN_NAME as any}
          screenOptions={screenOptions}
        >
          <Stack.Screen
            name={MAIN_SCREEN_NAME}
            component={MainScreenComponent}
          />
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
    withMainScreen: (mainScreen: React.ComponentType) => () => JSX.Element;
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
