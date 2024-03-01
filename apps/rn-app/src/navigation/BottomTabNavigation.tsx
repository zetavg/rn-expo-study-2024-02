import React, { useMemo } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';

import { useBottomTabNavigatorScreenOptions } from './options/useBottomTabNavigatorScreenOptions';
import { getMainStackNavigationWithInitialRouteName } from './MainStackNavigation';
import { BottomTab } from './navigators';

export function BottomTabNavigation() {
  const screenOptions = useBottomTabNavigatorScreenOptions();

  return (
    <BottomTab.Navigator screenOptions={screenOptions}>
      <BottomTab.Screen
        name="Example1"
        component={getMainStackNavigationWithInitialRouteName('Example1List')}
      />
      <BottomTab.Screen
        name="Example2"
        component={getMainStackNavigationWithInitialRouteName('Example2List')}
      />
    </BottomTab.Navigator>
  );
}

export default BottomTabNavigation;
