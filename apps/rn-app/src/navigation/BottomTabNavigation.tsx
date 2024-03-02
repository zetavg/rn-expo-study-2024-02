import { createBottomTabNavigator } from '@rnstudy/react-native-navigation';

import { MainStackNavigation } from './MainStackNavigation';
import { navConfig } from './navConfig';

export const BottomTabNavigation = createBottomTabNavigator({
  id: 'bottom-tab',
  screens: {
    Home: {
      screen: MainStackNavigation.withInitialRouteName('Example1List'),
      options: {},
    },
    Details: {
      screen: MainStackNavigation.withInitialRouteName('Example1Details'),
      options: {},
    },
  },
  config: navConfig,
});

export type BottomTabNavigationType = typeof BottomTabNavigation;
