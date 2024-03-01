import React, { useMemo } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

export function useModalStackNavigatorScreenOptions() {
  const screenOptions = useMemo<
    React.ComponentProps<
      ReturnType<typeof createStackNavigator>['Navigator']
    >['screenOptions']
  >(
    () => ({
      headerShown: false,
      presentation: 'modal',
    }),
    [],
  );

  return screenOptions;
}
