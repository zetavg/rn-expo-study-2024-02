import React from 'react';
import { View } from 'react-native';

import type { Meta } from '@rnstudy/storybook-rn-types';

import Text from '../Text';

import Button from './Button';

const meta: Meta<typeof Button> = {
  title: 'UI/Components/Button',
  component: Button,
  args: {
    label: 'Button',
  },
  parameters: {
    actions: { argTypesRegex: '^on.*' },
  },
};

export default meta;

export const Default: Meta<typeof Button> = {
  args: {},
  parameters: {},
};

export const All: Meta<typeof Button> = {
  render: (args) => (
    <>
      {/* eslint-disable-next-line react-native/no-inline-styles */}
      <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 8 }}>
        <Button {...args} plain small />
        <Button {...args} plain regular />
        <Button {...args} plain medium />
        <Button {...args} plain large />
      </View>

      {/* eslint-disable-next-line react-native/no-inline-styles */}
      <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 8 }}>
        <Button {...args} bordered small />
        <Button {...args} bordered regular />
        <Button {...args} bordered medium />
        <Button {...args} bordered large />
      </View>

      {/* eslint-disable-next-line react-native/no-inline-styles */}
      <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 8 }}>
        <Button {...args} tinted small />
        <Button {...args} tinted regular />
        <Button {...args} tinted medium />
        <Button {...args} tinted large />
      </View>

      {/* eslint-disable-next-line react-native/no-inline-styles */}
      <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 8 }}>
        <Button {...args} prominent small />
        <Button {...args} prominent regular />
        <Button {...args} prominent medium />
        <Button {...args} prominent large />
      </View>

      <Text />

      {/* eslint-disable-next-line react-native/no-inline-styles */}
      <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 8 }}>
        <Button {...args} plain disabled />
        <Button {...args} bordered disabled />
        <Button {...args} tinted disabled />
        <Button {...args} prominent disabled />
      </View>
    </>
  ),
  argTypes: {},
  parameters: {
    containerStyle: {
      gap: 16,
    },
  },
};
