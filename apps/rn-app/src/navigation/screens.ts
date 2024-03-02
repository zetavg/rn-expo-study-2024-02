import { getScreenContentComponents } from '@/navigation-lib';

import { navConfig } from './navConfig';

export const { StackScreenContent, ModalScreenContent } =
  getScreenContentComponents(navConfig);
