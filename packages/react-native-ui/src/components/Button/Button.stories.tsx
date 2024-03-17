import React from 'react';
import { View } from 'react-native';

import { IconDefinitions } from '@rnstudy/react-icons';
import type { Meta } from '@rnstudy/storybook-rn-types';

import Text from '../Text';

import Button from './Button';

const meta: Meta<typeof Button> = {
  title: 'UI/Components/Button',
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
    label: 'Button',
  },
};

export default meta;

export const Default: Meta<typeof Button> = {
  parameters: {},
  argTypes: {
    icon: {
      control: 'select',
      options: [
        undefined,
        'camera',
        'magnify',
        'heart',
        'arrow-left',
        'arrow-right',
      ],
    },
  },
  args: {},
};

export const All: Meta<typeof Button> = {
  argTypes: {
    buttonStyle: { control: false },
    size: { control: false },
  },
  parameters: {
    containerStyle: {
      gap: 16,
    },
  },
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
        <Button {...args} outlined small />
        <Button {...args} outlined regular />
        <Button {...args} outlined medium />
        <Button {...args} outlined large />
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
    </>
  ),
};

export const AllDisabled: Meta<typeof Button> = {
  ...All,
  args: {
    disabled: true,
  },
};

export const AllLoading: Meta<typeof Button> = {
  ...All,
  args: {
    loading: true,
  },
};

export const AllWithIcon: Meta<typeof Button> = {
  ...All,
  args: {
    icon: 'heart',
  },
};

export const AllWithIconAndLoading: Meta<typeof Button> = {
  ...All,
  args: {
    icon: 'heart',
    loading: true,
  },
};

export const AllWithIconAndLoadingAndDisabled: Meta<typeof Button> = {
  ...All,
  args: {
    icon: 'heart',
    loading: true,
    disabled: true,
  },
};

export const AllWithOnlyIcon: Meta<typeof Button> = {
  ...All,
  args: {
    label: undefined,
    icon: 'heart',
  },
};

export const AllWithOnlyIconAndLoading: Meta<typeof Button> = {
  ...All,
  args: {
    label: undefined,
    icon: 'heart',
    loading: true,
  },
};
