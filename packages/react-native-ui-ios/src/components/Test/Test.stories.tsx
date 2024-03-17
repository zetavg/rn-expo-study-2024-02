import type { Meta } from '@rnstudy/storybook-rn-types';

import Test from './Test';

const meta: Meta<typeof Test> = {
  title: 'iOS UI/Test',
  component: Test,
  args: {},
  parameters: {},
};

export default meta;

export const Default: Meta<typeof Test> = {
  args: {},
  parameters: {},
};
