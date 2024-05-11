import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Platform } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  createStackNavigator as rnCreateStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';

import {
  useBackgroundColor,
  useColorScheme,
  useIOSUIColors,
  useUIPlatform,
} from '@rnstudy/react-native-ui';
import { typedMemo } from '@rnstudy/react-utils';

import useStackNavigatorScreenOptions from './hooks/useStackNavigatorScreenOptions';
import {
  AnyStackNavigatorScreens,
  GeneratedStackNavigator,
  GeneratedStackNavigatorProps,
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
      const screenOptions = useStackNavigatorScreenOptions();

      return (
        <Stack.Navigator
          // FIXME
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          id={id as any}
          initialRouteName={initialRouteName || defaultInitialRouteName}
          screenOptions={screenOptions}
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
    ) => Navigator;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const GeneratedNavigator: Navigator = typedMemo(generateNavigator()) as any;

  GeneratedNavigator._id = id;
  GeneratedNavigator._screens = screens;
  GeneratedNavigator._type = 'stack-navigator';

  const withInitialRouteName: Navigator['withInitialRouteName'] = (
    initialRouteName,
  ) => {
    const StackNavigatorWithInitialRouteName = (
      props: React.ComponentProps<typeof GeneratedNavigator>,
    ) => <GeneratedNavigator {...props} initialRouteName={initialRouteName} />;

    StackNavigatorWithInitialRouteName._id = id;
    StackNavigatorWithInitialRouteName._screens = screens;
    StackNavigatorWithInitialRouteName._type = 'stack-navigator' as const;
    StackNavigatorWithInitialRouteName.withInitialRouteName =
      withInitialRouteName;

    return StackNavigatorWithInitialRouteName;
  };

  GeneratedNavigator.withInitialRouteName = withInitialRouteName;

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
