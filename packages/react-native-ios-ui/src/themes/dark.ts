import { dark as darkColorDefinitions } from '@rnstudy/ios-colors';

import { Theme } from './type';

export const dark: Theme = {
  colors: {
    ...darkColorDefinitions.colors,
    ...darkColorDefinitions.uiColors,
  },
};

export default dark;
