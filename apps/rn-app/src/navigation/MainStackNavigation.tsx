import { mainStackScreens as feature1MainStackScreens } from '@/features/example1/screens';
import { createStackNavigator } from '@rnstudy/react-native-navigation';

import { registerMainStackNavigation } from './hooks';
import { navConfig } from './navConfig';

export const MainStackNavigation = createStackNavigator({
  id: 'main-stack',
  screens: { ...feature1MainStackScreens },
  defaultInitialRouteName: 'Example1List',
  config: navConfig,
});

export type MainStackNavigationType = typeof MainStackNavigation;

registerMainStackNavigation(MainStackNavigation);
