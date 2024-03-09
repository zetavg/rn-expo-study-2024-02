import React from 'react';
import { ViewStyle } from 'react-native';

import type { Meta } from '@rnstudy/storybook-rn-types';

import ListRow from './ListRow';

const containerStyle: ViewStyle = {
  marginTop: 16,
};

const meta: Meta<typeof ListRow> = {
  title: 'iOS UI/ListRow',
  component: ListRow,
  parameters: {
    containerStyle,
  },
};

export default meta;

export const Default = {
  args: {},
};
