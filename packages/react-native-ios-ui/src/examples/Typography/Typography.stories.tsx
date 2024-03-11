import type { Meta } from '@rnstudy/storybook-rn-types';

import Typography from './Typography';

const meta: Meta<typeof Typography> = {
  title: 'iOS UI/Typography',
  component: Typography,
  parameters: {
    containerGroupedBackground: false,
    containerStyle: {
      marginTop: 16,
      marginHorizontal: 20,
      alignSelf: 'stretch',
    },
  },
};

export default meta;

export const Default: Meta<typeof Typography> = {};
