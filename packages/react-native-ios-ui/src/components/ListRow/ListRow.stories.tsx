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
  // args: {
  //   listStyle: 'insetGrouped',
  // },
  // argTypes: {
  //   listStyle: {
  //     description: 'The style of the list',
  //     options: ['plain', 'grouped', 'insetGrouped'],
  //     control: 'radio',
  //   },
  // },
  parameters: {
    containerStyle,
  },
};

export default meta;

export const Default: Meta<typeof ListRow> = {
  args: {},
};

export const InsetGrouped: Meta<typeof ListRow> = {
  args: {
    listStyle: 'insetGrouped',
  },
};
