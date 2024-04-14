import { createBottomTabNavigator } from '@rnstudy/react-native-navigation';

import { MainStackNavigation } from './MainStackNavigation';
import { ModalStackNavigation } from './ModalStackNavigation';

export const BottomTabNavigation = createBottomTabNavigator({
  id: 'bottom-tab',
  screens: {
    Home: {
      screen: ModalStackNavigation.withMainScreen(
        MainStackNavigation.withInitialRouteName('ExampleScreensList'),
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
});

export type BottomTabNavigationType = typeof BottomTabNavigation;
