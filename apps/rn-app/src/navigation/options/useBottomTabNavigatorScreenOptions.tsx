import React, { useMemo } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';

import useColorScheme from '@/hooks/useColorScheme';

export function useBottomTabNavigatorScreenOptions() {
  const colorScheme = useColorScheme();

  const screenOptions = useMemo<
    React.ComponentProps<
      ReturnType<typeof createBottomTabNavigator>['Navigator']
    >['screenOptions']
  >(
    () => ({
      headerShown: false,
      ...(Platform.OS === 'ios'
        ? {
            tabBarStyle: {
              position: 'absolute',
              borderTopColor: (() => {
                switch (colorScheme) {
                  case 'light':
                    return 'rgba(0, 0, 0, 0.3)';
                  case 'dark':
                    return 'rgba(255, 255, 255, 0.15)';
                }
              })(),
            },
            tabBarBackground: () => (
              <BlurView
                tint={colorScheme}
                intensity={100}
                style={StyleSheet.absoluteFill}
              />
            ),
          }
        : {}),
    }),
    [colorScheme],
  );

  return screenOptions;
}
