import { getScreenContentComponents } from '@rnstudy/react-native-navigation';

import config from './config';

export const { StackScreenContent, ModalScreenContent } =
  getScreenContentComponents(config);
