import type { Meta, StoryObj } from '@rnstudy/storybook-rn-types';

import ActivityIndicator from './ActivityIndicator';

const meta: Meta<typeof ActivityIndicator> = {
  title: 'UI/Components/ActivityIndicator',
  component: ActivityIndicator,
  argTypes: {
    size: {
      control: 'radio',
      options: ['small', 'large'],
    },
  },
  args: {},
};

export default meta;

type Story = StoryObj<typeof ActivityIndicator>;

export const A0_Default: Story = {};
