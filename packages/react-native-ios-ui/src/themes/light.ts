import { light as lightColorDefinitions } from '@rnstudy/ios-colors';

import { Theme } from './type';

export const light: Theme = {
  colors: {
    ...lightColorDefinitions.colors,
    ...lightColorDefinitions.uiColors,
  },
};

export default light;
