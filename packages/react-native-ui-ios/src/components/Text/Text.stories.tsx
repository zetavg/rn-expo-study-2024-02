import type { Meta } from '@rnstudy/storybook-rn-types';

import Text from './Text';

const meta: Meta<typeof Text> = {
  title: 'iOS UI/Text',
  component: Text,
  parameters: {},
  args: {
    children: 'Text',
  },
};

export default meta;

export const Default: Meta<typeof Text> = {};
