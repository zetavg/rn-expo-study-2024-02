import { mainStackScreens as exampleAppsMainStackScreens } from '@/features/example-apps/screens';
import { mainStackScreens as feature1MainStackScreens } from '@/features/example1/screens';
import { mainStackScreens as exampleMainStackScreens } from '@/features/navigation-examples/screens';
import { mainStackScreens as settingsMainStackScreens } from '@/features/settings/screens';
import { createStackNavigator } from '@rnstudy/react-native-navigation';

import { registerMainStackNavigation } from '../hooks';

export const MainStackNavigation = createStackNavigator({
  id: 'main-stack',
  screens: {
    ...feature1MainStackScreens,
    ...exampleMainStackScreens,
    ...exampleAppsMainStackScreens,
    ...settingsMainStackScreens,
  },
  defaultInitialRouteName: 'ExampleScreensList',
});

export type MainStackNavigationType = typeof MainStackNavigation;

registerMainStackNavigation(MainStackNavigation);
