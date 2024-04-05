import { Meta, StoryObj } from '@rnstudy/storybook-rn-types';

import { ListFooter } from './ListFooter';

const meta: Meta<typeof ListFooter> = {
  title: 'UI/Components/ListFooter',
  component: ListFooter,
  argTypes: {
    text: { control: 'text' },
  },
  args: {
    text: 'This is the footer text.',
  },
};

export default meta;

type Story = StoryObj<typeof ListFooter>;

export const Default: Story = {};
