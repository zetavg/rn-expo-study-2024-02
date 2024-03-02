import { generateUseNavigationHook } from '@rnstudy/react-native-navigation';

import type { MainStackNavigationType } from './MainStackNavigation';
import type { ModalStackNavigationType } from './ModalStackNavigation';

export const [registerMainStackNavigation, useMainStackNavigation] =
  generateUseNavigationHook<MainStackNavigationType>();

export const [registerModalStackNavigation, useModalStackNavigation] =
  generateUseNavigationHook<ModalStackNavigationType>();
