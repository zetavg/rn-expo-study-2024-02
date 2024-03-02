import { generateUseNavigationHook } from '@rnstudy/react-native-navigation';

import type { MainStackNavigationType } from './Navigation/MainStackNavigation';
import type { ModalStackNavigationType } from './Navigation/ModalStackNavigation';

export const [registerMainStackNavigation, useMainStackNavigation] =
  generateUseNavigationHook<MainStackNavigationType>();

export const [registerModalStackNavigation, useModalStackNavigation] =
  generateUseNavigationHook<ModalStackNavigationType>();
