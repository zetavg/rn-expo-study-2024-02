import React from 'react';

import type { Meta, StoryObj } from '@rnstudy/storybook-rn-types';

import ExampleStacksInTabNavigationApp from './ExampleStacksInTabNavigationApp';

const meta: Meta<typeof ExampleStacksInTabNavigationApp> = {
  title: 'Navigation/ExampleStacksInTabNavigationApp',
  component: ExampleStacksInTabNavigationApp,
  parameters: {
    storyContainer: 'basic',
  },
  argTypes: {},
  args: {},
};

export default meta;

type Story = StoryObj<typeof ExampleStacksInTabNavigationApp>;

export const A0_Default: Story = {
  render: () => <ExampleStacksInTabNavigationApp />,
};
