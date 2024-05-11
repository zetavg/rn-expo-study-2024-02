import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TransitionPresets } from '@react-navigation/stack';

import {
  useBackgroundColor,
  useColorScheme,
  useIOSUIColors,
  useUIPlatform,
} from '@rnstudy/react-native-ui';

type ScreenOptions = React.ComponentProps<
  ReturnType<typeof createNativeStackNavigator>['Navigator']
>['screenOptions'];

export function useStackNavigatorScreenOptions(): ScreenOptions {
  const uiPlatform = useUIPlatform();

  const colorScheme = useColorScheme();
  const iosUIColors = useIOSUIColors();

  const backgroundColor = useBackgroundColor({
    grouped: undefined,
  });

  const screenOptions = useMemo<ScreenOptions>(
    () => ({
      contentStyle: {
        // Although the scene will be filled with opaque elements and this background color will not be visible in most cases, setting a background color here will prevent flashes of the default light background color when switching to a lazy-loaded screen.
        backgroundColor,
      },
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
    [uiPlatform, colorScheme, backgroundColor, iosUIColors],
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

  return resettingUIPlatform ? { headerShown: false } : screenOptions;
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

export default useStackNavigatorScreenOptions;
