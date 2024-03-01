import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import {
  type MainStackParamList as ExampleFeature1MainStackParamList,
  MainStackScreens as ExampleFeature1MainStackScreens,
} from '@/features/example-feature-1/screens';
import {
  type MainStackParamList as ExampleFeature2MainStackParamList,
  MainStackScreens as ExampleFeature2MainStackScreens,
} from '@/features/example-feature-2/screens';

import { useStackNavigatorScreenOptions } from './options/useStackNavigatorScreenOptions';
import { MainStack, mainStackNavigatorID } from './navigators';

// 1. Compose MainStackNavigation by including MainStackScreens from each feature
export function MainStackNavigation({
  initialRouteName,
}: {
  initialRouteName: keyof MainStackParamList;
}) {
  const screenOptions = useStackNavigatorScreenOptions();

  return (
    <MainStack.Navigator
      id={mainStackNavigatorID}
      initialRouteName={initialRouteName}
      screenOptions={screenOptions}
    >
      {ExampleFeature1MainStackScreens}
      {ExampleFeature2MainStackScreens}
    </MainStack.Navigator>
  );
}

// 2. Create MainStackParamList by combining MainStackParamList from each feature
export type MainStackParamList = ExampleFeature1MainStackParamList &
  ExampleFeature2MainStackParamList;

export type MainStackScreenProps<
  RouteName extends keyof MainStackParamList,
  NavigatorID extends string | undefined = undefined,
> = NativeStackScreenProps<MainStackParamList, RouteName, NavigatorID>;

const cachedMainStackNavigation = new Map<keyof MainStackParamList, React.FC>();
export function getMainStackNavigationWithInitialRouteName(
  initialRouteName: keyof MainStackParamList,
): React.FC {
  if (cachedMainStackNavigation.has(initialRouteName)) {
    return cachedMainStackNavigation.get(initialRouteName) as React.FC;
  }

  const navigation = function MainStackNavigationWithInitialRouteName() {
    return <MainStackNavigation initialRouteName={initialRouteName} />;
  };

  cachedMainStackNavigation.set(initialRouteName, navigation);
  return navigation;
}

export default MainStackNavigation;
