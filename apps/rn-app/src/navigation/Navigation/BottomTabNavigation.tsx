import { createBottomTabNavigator } from '@rnstudy/react-native-navigation';

import config from '../config';

import { MainStackNavigation } from './MainStackNavigation';

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
  config,
});

export type BottomTabNavigationType = typeof BottomTabNavigation;
