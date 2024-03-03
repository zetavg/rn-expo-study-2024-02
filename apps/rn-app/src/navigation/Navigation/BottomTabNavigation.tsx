import { createBottomTabNavigator } from '@rnstudy/react-native-navigation';

import config from '../config';

import { MainStackNavigation } from './MainStackNavigation';
import { ModalStackNavigation } from './ModalStackNavigation';

export const BottomTabNavigation = createBottomTabNavigator({
  id: 'bottom-tab',
  screens: {
    Home: {
      screen: ModalStackNavigation.withMainScreen(
        MainStackNavigation.withInitialRouteName('Example1List'),
      ),
      options: {},
    },
    Details: {
      screen: ModalStackNavigation.withMainScreen(
        MainStackNavigation.withInitialRouteName('Example1Details'),
      ),
      options: {},
    },
  },
  config,
});

export type BottomTabNavigationType = typeof BottomTabNavigation;
