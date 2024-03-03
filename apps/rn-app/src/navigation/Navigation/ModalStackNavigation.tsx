import { modalStackScreens as feature1ModalStackScreens } from '@/features/example1/screens';
import { createModalStackNavigator } from '@rnstudy/react-native-navigation';

import config from '../config';
import { registerModalStackNavigation } from '../hooks';

import { BottomTabNavigation } from './BottomTabNavigation';

export const ModalStackNavigation = createModalStackNavigator({
  id: 'modal-stack',
  mainScreen: BottomTabNavigation,
  screens: {
    ...feature1ModalStackScreens,
  },
  config,
});

export type ModalStackNavigationType = typeof ModalStackNavigation;

registerModalStackNavigation(ModalStackNavigation);
