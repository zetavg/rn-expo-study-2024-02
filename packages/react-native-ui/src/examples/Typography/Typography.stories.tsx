import React from 'react';
import { Image, Text, View, ViewStyle } from 'react-native';

import type { Meta } from '@rnstudy/storybook-rn-types';

import Typography from './Typography';

const meta: Meta<typeof Typography> = {
  title: 'UI/Typography',
  component: Typography,
  args: {
    children: 'Title',
  },
  parameters: {
    containerStyle: {
      marginTop: 16,
      marginHorizontal: 20,
      alignSelf: 'stretch',
    },
  },
};

export default meta;

export const Default: Meta<typeof Typography> = {
  args: {},
};
