import type { Meta } from '@rnstudy/storybook-rn-types';

import BackgroundColors from './BackgroundColors';

const meta: Meta<typeof BackgroundColors> = {
  title: 'UI/Background Colors',
  component: BackgroundColors,
  parameters: {
    containerBackground: 'none',
    containerStyle: {
      marginTop: 16,
      alignSelf: 'stretch',
    },
  },
};

export default meta;

export const Default: Meta<typeof BackgroundColors> = {};
