import React, { useMemo } from 'react';
import { Animated, Platform, useColorScheme } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  createStackNavigator,
  createStackNavigator as rnCreateStackNavigator,
  StackCardInterpolatedStyle,
  StackCardInterpolationProps,
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

  // TODO: Use the native stack navigator on iOS for a better UX once `usePreventRemove` works well with the native stack navigator (check `preventNativeDismiss`, `onNativeDismissCancelled` in react-native-screens).
  // const Stack =
  //   Platform.OS === 'ios'
  //     ? createNativeStackNavigator<StackParamListOfScreens<S>>()
  //     : rnCreateStackNavigator<StackParamListOfScreens<S>>();

  const getNavigatorWithMainScreen = (
    MainScreenComponent: React.ComponentType,
  ) =>
    function StackNavigator() {
      const uiPlatform = useUIPlatform();
      const colorScheme = useColorScheme();
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
          cardShadowEnabled: true,
          cardStyleInterpolator: getCardStyleInterpolator({
            elevatedOverlayColor: colorScheme?.startsWith('dark')
              ? uiPlatform === 'ios'
                ? '#FFFFFF'
                : '#FFFFFF11'
              : 'transparent',
          }),

          detachPreviousScreen: false, // This also fixes the "navigation header stuck outside of safe area when re-mounted" issue on iOS
          gestureEnabled: true,
          gestureResponseDistance: 4000, // Let the dismissible(ScrollView) determine if it should capture the scroll event, or let the navigator handle it and use the gesture to close the modal.
          contentStyle: {
            // Although the scene will be filled with opaque elements and this background color will not be visible in most cases, setting a background color here will prevent flashes of the default light background color when switching to a lazy-loaded screen.
            backgroundColor,
          },
        }),
        [backgroundColor, colorScheme, uiPlatform],
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
                  // const colorScheme = useColorScheme();

                  useFocusEffect(
                    React.useCallback(
                      () => {
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
                      },
                      [
                        // colorScheme
                      ],
                    ),
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

export const getCardStyleInterpolator = ({
  elevatedOverlayColor,
}: {
  elevatedOverlayColor: string;
}) => {
  // The card style interpolator function must have this name for some of the things to work.
  // See: https://github.com/react-navigation/react-navigation/blob/%40react-navigation/stack%407.0.0-alpha.20/packages/stack/src/views/Stack/CardStack.tsx#L147
  function forModalPresentationIOS({
    index,
    current,
    next,
    inverted,
    layouts: { screen },
    insets,
  }: StackCardInterpolationProps): StackCardInterpolatedStyle {
    const hasNotchIos =
      Platform.OS === 'ios' &&
      !Platform.isPad &&
      !Platform.isTV &&
      insets.top > 20;
    const isLargeScreen = screen.width > 1024;
    const topOffset = isLargeScreen ? 0 : 10;
    const statusBarHeight = insets.top;
    const aspectRatio = screen.height / screen.width;

    const progress = Animated.add(
      current.progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolate: 'clamp',
      }),
      next
        ? next.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolate: 'clamp',
          })
        : 0,
    );

    const isFirst = index === 0;

    const translateY = Animated.multiply(
      progress.interpolate({
        inputRange: [0, 1, 2],
        outputRange: [
          screen.height,
          isFirst ? 0 : topOffset,
          (isFirst && !isLargeScreen
            ? statusBarHeight
            : isLargeScreen && !isFirst
              ? -statusBarHeight
              : 0) -
            topOffset * aspectRatio,
        ],
      }),
      inverted,
    );

    const shadowOpacity =
      isFirst && !isLargeScreen
        ? // Give the first card a elevated overlay when it is at the back.
          progress.interpolate({
            inputRange: [0, 1, 2],
            outputRange: [0, 0, 0.11],
          })
        : 0;

    const overlayOpacity = progress.interpolate({
      inputRange: [0, 1, 1.0001, 2],
      outputRange: [0, 0.3, isFirst ? 1 : 0.3, isFirst ? 1 : 0.3],
    });

    const scale = isLargeScreen
      ? isFirst
        ? 1
        : progress.interpolate({
            inputRange: [0, 1, 2],
            outputRange: [1, 1, 0.98],
          })
      : progress.interpolate({
          inputRange: [0, 1, 2],
          outputRange: [
            1,
            1,
            screen.width ? 1 - (topOffset * 2) / screen.width : 1,
          ],
        });

    const borderRadius = isFirst
      ? isLargeScreen
        ? 0
        : progress.interpolate({
            inputRange: [0, 1, 1.0001, 2],
            outputRange: [0, 0, hasNotchIos ? 38 : 0, 10],
          })
      : 10;

    return {
      containerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        padding: isLargeScreen && !isFirst ? 32 : 0,
        paddingTop: isLargeScreen && !isFirst ? 16 : 0,
      },
      cardStyle: {
        overflow: 'hidden',
        borderTopLeftRadius: borderRadius,
        borderTopRightRadius: borderRadius,
        borderBottomLeftRadius: hasNotchIos || isLargeScreen ? borderRadius : 0,
        borderBottomRightRadius:
          hasNotchIos || isLargeScreen ? borderRadius : 0,
        marginTop: isFirst ? 0 : statusBarHeight,
        marginBottom: isFirst ? 0 : topOffset,
        transform: [{ translateY }, { scale }],
        maxWidth: isLargeScreen && !isFirst ? 640 : undefined,
        maxHeight: isLargeScreen && !isFirst ? 800 : undefined,
      },
      shadowStyle: {
        opacity: shadowOpacity,
        backgroundColor: elevatedOverlayColor,
        // ...StyleSheet.absoluteFillObject does not work here
        position: 'absolute',
        top: 0,
        left: 0,
        width: screen.width,
        height: screen.height,
        zIndex: 100,
      },
      overlayStyle: { opacity: overlayOpacity },
    };
  }
  forModalPresentationIOS.name = 'forModalPresentationIOS';

  return forModalPresentationIOS;
};

export default createModalStackNavigator;
