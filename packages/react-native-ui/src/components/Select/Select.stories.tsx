import React, { useState } from 'react';
import { Alert, View } from 'react-native';

import type { Meta, StoryObj } from '@rnstudy/storybook-rn-types';

import { Button } from '../Button';
import Text from '../Text';

import { ExampleUncontrolledSelect } from './examples';
import Select, { Props } from './Select';

const meta: Meta<typeof Select> = {
  title: 'UI/Components/Select',
  component: Select,
  parameters: {
    actions: { argTypesRegex: '^on.*' },
  },
  args: {
    options: {
      js: { label: 'JavaScript' },
      ts: { label: 'TypeScript', icon: 'star.outline' as const },
      swift: { label: 'Swift' },
      kotlin: { label: 'Kotlin' },
    },
  },
  render: (args) => <ExampleUncontrolledSelect {...args} />,
};

export default meta;

type Story = StoryObj<typeof Select>;

export const A1_Default: Story = {};

export const A2_CustomPlaceholder: Story = {
  args: {
    placeholder: 'Choose your favorite language',
  },
};

export const A3_WithAdditionalActions: Story = {
  args: {
    additionalActions: [
      {
        label: 'More Languages...',
        handler: () => {
          Alert.alert('"More Languages..." Pressed');
        },
      },
      {
        label: 'Edit Languages',
        icon: '_edit',
        handler: () => {
          Alert.alert('"Edit Languages" Pressed');
        },
      },
    ],
  },
};

export const X1_Interactive: Story = {
  render: (args) => <ExampleUncontrolledSelect showInfo {...args} />,
};

export const D1_Alignment: Story = {
  render: (args) => (
    <View
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        width: 300,
        borderWidth: 1,
        borderColor: '#555555',
        padding: 8,
        borderRadius: 4,
      }}
    >
      <Text variant="subheadline">Align: start</Text>
      <ExampleUncontrolledSelect {...args} align="start" />

      <Text />

      <Text variant="subheadline">Align: center</Text>
      <ExampleUncontrolledSelect {...args} align="center" />

      <Text />

      <Text variant="subheadline">Align: end</Text>
      <ExampleUncontrolledSelect {...args} align="end" />
    </View>
  ),
};

export const L1_LongLabel: Story = {
  args: {
    options: {
      long: {
        label:
          'This is a very very very very long label that should be truncated',
      },
      long2: {
        label:
          'This is another very very very very long label that should be truncated',
        icon: 'star.outline',
      },
    },
    value: 'long',
    style: { maxWidth: 300 },
  },
};

export const L2_LongListOfOptions: Story = {
  args: {
    options: {
      ...Object.fromEntries(
        Array.from({ length: 100 }, (_, i) => [
          `option-${i}`,
          { label: `Option ${i}` },
        ]),
      ),
    },
    value: 'option-0',
  },
};
