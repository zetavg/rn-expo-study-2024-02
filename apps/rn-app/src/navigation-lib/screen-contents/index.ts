import { NavConfig } from '../types';

import { getModalScreenContentComponent } from './ModalScreenContent';
import { getStackScreenContentComponent } from './StackScreenContent';

export function getScreenContentComponents(config: NavConfig) {
  return {
    StackScreenContent: getStackScreenContentComponent(config),
    ModalScreenContent: getModalScreenContentComponent(config),
  };
}
