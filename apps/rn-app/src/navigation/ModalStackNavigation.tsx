import { modalStackScreens as feature1ModalStackScreens } from '@/features/example1/screens';
import { createModalStackNavigator } from '@/navigation-lib';

import { BottomTabNavigation } from './BottomTabNavigation';
import { registerModalStackNavigation } from './hooks';
import { navConfig } from './navConfig';

export const ModalStackNavigation = createModalStackNavigator({
  id: 'modal-stack',
  screens: {
    Main: BottomTabNavigation,
    ...feature1ModalStackScreens,
  },
  defaultInitialRouteName: 'Main',
  config: navConfig,
});

export type ModalStackNavigationType = typeof ModalStackNavigation;

registerModalStackNavigation(ModalStackNavigation);
