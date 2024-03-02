import { getScreenContentComponents } from '@rnstudy/react-native-navigation';

import { navConfig } from './navConfig';

export const { StackScreenContent, ModalScreenContent } =
  getScreenContentComponents(navConfig);
