import React from 'react';

import type { Meta, StoryObj } from '@rnstudy/storybook-rn-types';

import { ExampleUncontrolledSwitch } from './examples';
import Switch from './Switch';

const meta: Meta<typeof Switch> = {
  title: 'UI/Components/Switch',
  component: Switch,
  argTypes: {},
  args: {},
};

export default meta;

type Story = StoryObj<typeof Switch>;

export const A1_Default: Story = {};

export const X1_Interactive: Story = {
  render: (args) => {
    return <ExampleUncontrolledSwitch {...args} />;
  },
};
