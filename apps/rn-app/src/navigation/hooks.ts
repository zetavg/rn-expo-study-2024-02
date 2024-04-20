import { generateUseNavigationHook } from '@rnstudy/react-native-navigation';

import { BottomTabNavigationType } from './Navigation/BottomTabNavigation';
import type { MainStackNavigationType } from './Navigation/MainStackNavigation';
import type { ModalStackNavigationType } from './Navigation/ModalStackNavigation';

export const [
  registerMainStackNavigation,
  useMainStackNavigation,
  getMainStackNavigation,
] = generateUseNavigationHook<MainStackNavigationType>();

export const [
  registerModalStackNavigation,
  useModalStackNavigation,
  getModalStackNavigation,
] = generateUseNavigationHook<ModalStackNavigationType>();

export const [registerTabNavigation, useTabNavigation, getTabNavigation] =
  generateUseNavigationHook<BottomTabNavigationType>();
