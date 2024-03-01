import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import {
  type ModalStackParamList as ExampleFeature1ModalStackParamList,
  ModalStackScreens as ExampleFeature1ModalStackScreens,
} from '@/features/example-feature-1/screens';

import { useModalStackNavigatorScreenOptions } from './options/useModalStackNavigatorScreenOptions';
import BottomTabNavigation from './BottomTabNavigation';
import { ModalStack, modalStackNavigatorID } from './navigators';

// 1. Compose ModalStackNavigation by including ModalStackScreens from each feature
export function ModalStackNavigation() {
  const screenOptions = useModalStackNavigatorScreenOptions();

  return (
    <ModalStack.Navigator
      id={modalStackNavigatorID}
      initialRouteName="Main"
      screenOptions={screenOptions}
    >
      <ModalStack.Screen name="Main" component={BottomTabNavigation} />

      {ExampleFeature1ModalStackScreens}
    </ModalStack.Navigator>
  );
}

// 2. Create ModalStackParamList by combining ModalStackParamList from each feature
export type ModalStackParamList = {
  Main: undefined;
} & ExampleFeature1ModalStackParamList;

export type ModalStackScreenProps<
  RouteName extends keyof ModalStackParamList,
  NavigatorID extends string | undefined = undefined,
> = NativeStackScreenProps<ModalStackParamList, RouteName, NavigatorID>;
