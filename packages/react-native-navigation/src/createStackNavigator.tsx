import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Platform } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  createStackNavigator as rnCreateStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';

import {
  useColorScheme,
  useIOSUIColors,
  useUIPlatform,
} from '@rnstudy/react-native-ui';

import {
  AnyStackNavigatorScreens,
  GeneratedStackNavigator,
  GeneratedStackNavigatorProps,
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
  defaultInitialRouteName: Extract<keyof S, string>;
}) {
  const Stack =
    Platform.OS === 'ios'
      ? createNativeStackNavigator<StackParamListOfScreens<S>>()
      : rnCreateStackNavigator<StackParamListOfScreens<S>>();

  const generateNavigator = () => {
    const stackScreens = Object.entries(screens).map(
      ([name, screenDefinition]) => {
        const screen =
          'screen' in screenDefinition
            ? screenDefinition.screen
            : screenDefinition;

        const options =
          'options' in screenDefinition ? screenDefinition.options : undefined;

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
      },
    );

    function StackNavigator({
      initialRouteName,
    }: {
      initialRouteName?: Extract<keyof S, string>;
    }) {
      const uiPlatform = useUIPlatform();

      const colorScheme = useColorScheme();
      const iosUIColors = useIOSUIColors();

      const screenOptions = useMemo<ScreenOptions>(
        () => ({
          ...(() => {
            switch (uiPlatform) {
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
                return {
                  headerShown: false, // We use our own header component in screens.
                  gestureEnabled: true,
                  cardShadowEnabled: false, // `cardShadowEnabled: true` is not working as expected, `cardStyle: { elevation: 5 }` is used instead.
                  cardOverlayEnabled: true,
                  cardStyle: { elevation: 5 },
                  ...TransitionPresets.SlideFromRightIOS,
                };
            }
          })(),
        }),
        [uiPlatform, colorScheme, iosUIColors],
      );

      // To have a clean reset of screen options when `uiPlatform` changes.
      const [resettingUIPlatform, setResettingUIPlatform] = useState(false);
      const prevUIPlatformRef = useRef(uiPlatform);
      useEffect(() => {
        if (prevUIPlatformRef.current === uiPlatform) {
          return;
        }

        setResettingUIPlatform(true);
        setTimeout(() => {
          setResettingUIPlatform(false);
        }, 500);

        prevUIPlatformRef.current = uiPlatform;
      }, [uiPlatform]);

      return (
        <Stack.Navigator
          // FIXME
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          id={id as any}
          initialRouteName={initialRouteName || defaultInitialRouteName}
          screenOptions={
            resettingUIPlatform ? { headerShown: false } : screenOptions
          }
          // We include `uiPlatform` in the key to have a clean reset of screen options when `uiPlatform` changes.
          key={`stack-navigator-${id}-${uiPlatform}`}
        >
          {stackScreens}
        </Stack.Navigator>
      );
    }

    return StackNavigator;
  };

  type Navigator = GeneratedStackNavigator<ID, S> & {
    withInitialRouteName: (
      initialRouteName: Extract<keyof S, string>,
    ) => (props: GeneratedStackNavigatorProps<S>) => JSX.Element;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const GeneratedNavigator: Navigator = generateNavigator() as any;

  GeneratedNavigator._id = id;
  GeneratedNavigator._screens = screens;
  GeneratedNavigator.withInitialRouteName = (initialRouteName) => (props) => (
    <GeneratedNavigator {...props} initialRouteName={initialRouteName} />
  );

  return GeneratedNavigator as Navigator;
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
