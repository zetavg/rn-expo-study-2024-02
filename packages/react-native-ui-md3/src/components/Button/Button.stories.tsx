import React from 'react';
import { Image, TouchableOpacity, View, ViewStyle } from 'react-native';

import { IconDefinitions } from '@rnstudy/react-icons';
import type { Meta } from '@rnstudy/storybook-rn-types';

import Text from '../Text';

import Button from './Button';

const meta: Meta<typeof Button> = {
  title: 'MD3 UI/Button',
  component: Button,
  parameters: {
    actions: { argTypesRegex: '^on.*' },
  },
  argTypes: {
    icon: {
      control: 'select',
      options: [undefined, ...Object.keys(IconDefinitions)],
    },
  },
  args: {
    text: 'Button',
  },
};

export default meta;

export const Default: Meta<typeof Button> = {};

export const All: Meta<typeof Button> = {
  render: (args) => (
    <>
      {/* eslint-disable-next-line react-native/no-inline-styles */}
      <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 8 }}>
        <Button {...args} mode="text" size="small" />
        <Button {...args} mode="text" size="regular" />
        <Button {...args} mode="text" size="medium" />
        <Button {...args} mode="text" size="large" />
      </View>

      {/* eslint-disable-next-line react-native/no-inline-styles */}
      <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 8 }}>
        <Button {...args} mode="outlined" size="small" />
        <Button {...args} mode="outlined" size="regular" />
        <Button {...args} mode="outlined" size="medium" />
        <Button {...args} mode="outlined" size="large" />
      </View>

      {/* eslint-disable-next-line react-native/no-inline-styles */}
      <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 8 }}>
        <Button {...args} mode="contained-tonal" size="small" />
        <Button {...args} mode="contained-tonal" size="regular" />
        <Button {...args} mode="contained-tonal" size="medium" />
        <Button {...args} mode="contained-tonal" size="large" />
      </View>

      {/* eslint-disable-next-line react-native/no-inline-styles */}
      <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 8 }}>
        <Button {...args} mode="contained" size="small" />
        <Button {...args} mode="contained" size="regular" />
        <Button {...args} mode="contained" size="medium" />
        <Button {...args} mode="contained" size="large" />
      </View>

      {/* eslint-disable-next-line react-native/no-inline-styles */}
      <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 8 }}>
        <Button {...args} mode="elevated" size="small" />
        <Button {...args} mode="elevated" size="regular" />
        <Button {...args} mode="elevated" size="medium" />
        <Button {...args} mode="elevated" size="large" />
      </View>

      <Text />

      {/* eslint-disable-next-line react-native/no-inline-styles */}
      <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 8 }}>
        <Button {...args} mode="text" disabled />
        <Button {...args} mode="outlined" disabled />
        <Button {...args} mode="contained-tonal" disabled />
        <Button {...args} mode="contained" disabled />
        <Button {...args} mode="elevated" disabled />
      </View>
    </>
  ),
  parameters: {
    containerStyle: {
      gap: 16,
    },
  },
};

export const IconOnly: Meta<typeof Button> = {
  args: {
    text: undefined,
    icon: 'camera',
  },
};
