import { mainStackScreens as feature1MainStackScreens } from '@/features/example1/screens';
import { createStackNavigator } from '@rnstudy/react-native-navigation';

import config from '../config';
import { registerMainStackNavigation } from '../hooks';

export const MainStackNavigation = createStackNavigator({
  id: 'main-stack',
  screens: { ...feature1MainStackScreens },
  defaultInitialRouteName: 'Example1List',
  config,
});

export type MainStackNavigationType = typeof MainStackNavigation;

registerMainStackNavigation(MainStackNavigation);
