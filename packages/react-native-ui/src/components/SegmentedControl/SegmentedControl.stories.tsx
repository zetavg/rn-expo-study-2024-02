/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import type { Meta, StoryObj } from '@rnstudy/storybook-rn-types';

import { ExampleUncontrolledSegmentedControl } from './examples';
import SegmentedControl from './SegmentedControl';

const meta: Meta<typeof SegmentedControl> = {
  title: 'UI/Components/SegmentedControl',
  component: SegmentedControl,
  args: {
    options: {
      js: 'JavaScript',
      ts: 'TypeScript',
      other: 'Other',
    },
  },
  render: (args) => <ExampleUncontrolledSegmentedControl {...args} />,
};

export default meta;

type Story = StoryObj<typeof SegmentedControl>;

export const A0_Default: Story = {};

export const A1_WithDefaultValue: Story = {
  args: {
    value: 'ts',
  },
};

export const S1_AutoWidth: Story = {
  parameters: {
    ...meta.parameters,
    containerStyle: {
      ...meta.parameters?.containerStyle,
      alignSelf: 'stretch',
    },
  },
  render: (args) => (
    <ExampleUncontrolledSegmentedControl
      {...args}
      style={{ alignSelf: 'center' }}
    />
  ),
};

export const S2_FullWidth: Story = {
  parameters: {
    ...meta.parameters,
    containerStyle: {
      ...meta.parameters?.containerStyle,
      alignSelf: 'stretch',
    },
  },
  render: (args) => (
    <ExampleUncontrolledSegmentedControl
      {...args}
      style={{ alignSelf: 'stretch' }}
    />
  ),
};
