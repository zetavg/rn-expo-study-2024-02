import { NavigationConfig } from '../types';

import { getModalScreenContentComponent } from './ModalScreenContent';
import { getStackScreenContentComponent } from './StackScreenContent';

export function getScreenContentComponents(config: NavigationConfig) {
  return {
    StackScreenContent: getStackScreenContentComponent(config),
    ModalScreenContent: getModalScreenContentComponent(config),
  };
}
