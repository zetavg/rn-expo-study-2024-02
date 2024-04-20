import { modalStackScreens as exampleAppsModalStackScreens } from '@/features/example-apps/screens';
import { modalStackScreens as feature1ModalStackScreens } from '@/features/example1/screens';
import { modalStackScreens as exampleModalStackScreens } from '@/features/navigation-examples/screens';
import { createModalStackNavigator } from '@rnstudy/react-native-navigation';

import { registerModalStackNavigation } from '../hooks';

import { BottomTabNavigation } from './BottomTabNavigation';
import { MainStackNavigation } from './MainStackNavigation';

export const ModalStackNavigation = createModalStackNavigator({
  id: 'modal-stack',
  mainScreen: MainStackNavigation,
  screens: {
    ...feature1ModalStackScreens,
    ...exampleModalStackScreens,
    ...exampleAppsModalStackScreens,
  },
});

export type ModalStackNavigationType = typeof ModalStackNavigation;

registerModalStackNavigation(ModalStackNavigation);
