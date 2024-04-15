import React from 'react';

import type { Meta, StoryObj } from '@rnstudy/storybook-rn-types';

import NavigationContainer from '../../NavigationContainer';

import { ExampleStackNavigation } from './ExampleStackNavigation';

const meta: Meta<typeof ExampleStackNavigation> = {
  title: 'Navigation/ExampleStackNavigation',
  component: ExampleStackNavigation,
  parameters: {
    storyContainer: 'basic',
  },
  argTypes: {},
  args: {},
};

export default meta;

type Story = StoryObj<typeof ExampleStackNavigation>;

export const A0_Default: Story = {
  render: () => (
    <NavigationContainer>
      <ExampleStackNavigation />
    </NavigationContainer>
  ),
};
