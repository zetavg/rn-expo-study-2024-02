import React, { useMemo } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';

export function useBottomTabNavigatorScreenOptions() {
  const screenOptions = useMemo<
    React.ComponentProps<
      ReturnType<typeof createBottomTabNavigator>['Navigator']
    >['screenOptions']
  >(
    () => ({
      headerShown: false,
      ...(Platform.OS === 'ios'
        ? {
            tabBarStyle: { position: 'absolute' },
            tabBarBackground: () => (
              <BlurView
                tint="light"
                intensity={100}
                style={StyleSheet.absoluteFill}
              />
            ),
          }
        : {}),
    }),
    [],
  );

  return screenOptions;
}
