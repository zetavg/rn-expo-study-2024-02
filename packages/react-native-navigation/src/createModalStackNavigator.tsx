import React, { useMemo } from 'react';
import { Platform, useColorScheme } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  createStackNavigator,
  createStackNavigator as rnCreateStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import * as NavigationBar from 'expo-navigation-bar';
import { StatusBar } from 'expo-status-bar';

import { useBackgroundColor, useUIPlatform } from '@rnstudy/react-native-ui';

import useStackNavigatorScreenOptions from './hooks/useStackNavigatorScreenOptions';
import { ModalContentContext } from './screen-contents/contexts';
import {
  AnyStackNavigatorScreens,
  GeneratedStackNavigator,
  StackParamListOfScreens,
  StackScreenProps,
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
      const backgroundColor = useBackgroundColor({
        grouped: undefined,
      });

      const screenOptions = useMemo<
        React.ComponentProps<
          ReturnType<typeof createStackNavigator>['Navigator']
        >['screenOptions']
      >(
        () => ({
          headerShown: false,
          presentation: 'modal',
          ...TransitionPresets.ModalPresentationIOS,
          detachPreviousScreen: false, // This also fixes the "navigation header stuck outside of safe area when re-mounted" issue on iOS
          gestureEnabled: true,
          gestureResponseDistance: 4000, // Let the dismissible(ScrollView) determine if it should capture the scroll event, or let the navigator handle it and use the gesture to close the modal.
          contentStyle: {
            // Although the scene will be filled with opaque elements and this background color will not be visible in most cases, setting a background color here will prevent flashes of the default light background color when switching to a lazy-loaded screen.
            backgroundColor,
          },
        }),
        [backgroundColor],
      );

      const modalContentContextValue = useMemo(() => ({}), []);

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

                const wrappedScreen =
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  (screen as any)._type === 'stack-navigator'
                    ? screen
                    : wrapWithStackNavigator(screen);

                const options =
                  'options' in screenDefinition
                    ? screenDefinition.options
                    : undefined;

                // eslint-disable-next-line @typescript-eslint/no-explicit-any, react/no-unstable-nested-components
                const Component = (...props: any) => {
                  const colorScheme = useColorScheme();

                  useFocusEffect(
                    React.useCallback(() => {
                      colorScheme;
                      // NavigationBar.setBackgroundColorAsync(
                      //   `${(() => {
                      //     switch (colorScheme) {
                      //       case 'dark':
                      //         return '#00000001';
                      //       case 'light':
                      //         return '#00000022';
                      //     }
                      //   })()}`,
                      // );
                      // return () => {
                      //   NavigationBar.setBackgroundColorAsync(
                      //     `${(() => {
                      //       switch (colorScheme) {
                      //         case 'dark':
                      //           return '#000000';
                      //         case 'light':
                      //           return '#FFFFFF';
                      //       }
                      //     })()}01`,
                      //   );
                      // };
                    }, [colorScheme]),
                  );

                  return (
                    <ModalContentContext.Provider
                      value={modalContentContextValue}
                    >
                      {wrappedScreen(...props)}
                      <StatusBar style="light" />
                    </ModalContentContext.Provider>
                  );
                };
                Component.displayName = 'WrappedModalContentComponent';

                return (
                  <Stack.Screen
                    key={name}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    name={name as any}
                    component={Component}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    options={options as any}
                  />
                );
              }),
            [modalContentContextValue],
          )}
        </Stack.Navigator>
      );
    };

  type Navigator = GeneratedStackNavigator<ID, S> & {
    withMainScreen: (mainScreen: React.ComponentType) => () => JSX.Element;
  };

  const ModalStackNavigator: Partial<Navigator> = getNavigatorWithMainScreen(
    mainScreen,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ) as any;
  ModalStackNavigator._id = id;
  ModalStackNavigator._screens = screens;
  ModalStackNavigator.withMainScreen = getNavigatorWithMainScreen;

  return ModalStackNavigator as Navigator;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function wrapWithStackNavigator(screen: React.ComponentType<any>) {
  const Stack =
    Platform.OS === 'ios'
      ? createNativeStackNavigator()
      : rnCreateStackNavigator();

  function ModalStackInnerStackNavigator({ route }: StackScreenProps) {
    const uiPlatform = useUIPlatform();
    const screenOptions = useStackNavigatorScreenOptions();

    return (
      <Stack.Navigator
        initialRouteName="default"
        screenOptions={screenOptions}
        // We include `uiPlatform` in the key to have a clean reset of screen options when `uiPlatform` changes.
        key={`stack-navigator-${uiPlatform}`}
      >
        <Stack.Screen
          name="default"
          component={screen}
          initialParams={route.params}
        />
      </Stack.Navigator>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return ModalStackInnerStackNavigator as any;
}

export default createModalStackNavigator;
