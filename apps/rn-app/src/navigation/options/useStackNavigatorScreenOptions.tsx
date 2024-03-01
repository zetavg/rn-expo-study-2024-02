import React, { useMemo } from 'react';
import { Platform } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export function useStackNavigatorScreenOptions() {
  const isDarkMode = false;
  const screenOptions = useMemo<
    React.ComponentProps<
      ReturnType<typeof createNativeStackNavigator>['Navigator']
    >['screenOptions']
  >(
    () => ({
      ...(Platform.OS === 'ios'
        ? {
            // Blur effect.
            headerTransparent: true,
            headerBlurEffect: 'light',
            headerShadowVisible: true,
            // Set a close-to-transparent background to make `headerShadowVisible: true` work.
            // See: https://github.com/react-navigation/react-navigation/issues/10845#issuecomment-1276312567
            headerStyle: { backgroundColor: 'rgba(255, 255, 255, 0.002)' },
            // We defaults `headerLargeTitle` to `true` on iOS, allowing screens that used `headerLargeTitle` to be initialized correctly.
            ...{
              headerLargeTitle: true,
              headerLargeTitleShadowVisible: false,
            },

            // headerBackground: () => (
            //   <BlurView
            //     tint="light"
            //     intensity={100}
            //     style={[
            //       StyleSheet.absoluteFill,
            //       { borderBottomWidth: 1, borderBottomColor: 'red' },
            //     ]}
            //   />
            // ),
            // headerLargeTitle: true,

            // headerStyle: { backgroundColor: 'rgba(255, 255, 255, 0.002)' },
            // headerStyle: { borderBottomWidth: 1 },
            // headerLargeStyle: { backgroundColor: 'rgba(242, 242, 247, 1.0)' },
            // headerTintColor: 'rgba(0, 122, 255, 1.0)',
            // headerTitleStyle: { color: isDarkMode ? '#fff' : '#000' },
            // headerShadowVisible: true,
            // headerLargeTitleShadowVisible: false,
          }
        : {}),
    }),
    [isDarkMode],
  );

  return screenOptions;
}
