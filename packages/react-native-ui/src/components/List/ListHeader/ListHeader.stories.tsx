import { Meta, StoryObj } from '@rnstudy/storybook-rn-types';

import { ACCESSORIES_EXAMPLES } from './examples';
import { ListHeader } from './ListHeader';

const meta: Meta<typeof ListHeader> = {
  title: 'UI/Components/ListHeader',
  component: ListHeader,
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    accessories: {
      control: 'select',
      options: Object.keys(ACCESSORIES_EXAMPLES),
      mapping: ACCESSORIES_EXAMPLES,
    },
  },
  args: {
    title: 'Title',
  },
};

export default meta;

type Story = StoryObj<typeof ListHeader>;

export const Default: Story = {};
