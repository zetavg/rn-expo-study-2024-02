import React from 'react';
import { Image, Text, View, ViewStyle } from 'react-native';

import type { Meta } from '@rnstudy/storybook-rn-types';

import ListRow from './ListRow';

const containerStyle: ViewStyle = {
  // marginTop: 16,
  alignSelf: 'stretch',
};

const meta: Meta<typeof ListRow> = {
  title: 'iOS UI/ListRow',
  component: ListRow,
  args: {
    children: 'Title',
  },
  parameters: {
    containerStyle,
  },
};

export default meta;

export const Default: Meta<typeof ListRow> = {
  args: {},
  parameters: {
    containerBackground: 'grouped',
  },
};

export const Simple: Meta<typeof ListRow> = {
  args: {
    listStyle: 'insetGrouped',
    children: 'Title',
  },
};

export const Example1: Meta<typeof ListRow> = {
  args: {
    listStyle: 'insetGrouped',
  },
  render: (args) => (
    <ListRow {...args}>
      {({ textProps, textStyles }) => (
        <>
          <Text {...textProps}>Title Title Title Title Title</Text>
          <Text {...textProps} style={[textProps.style, textStyles.footnote]}>
            Details Details Details Details Details
          </Text>
        </>
      )}
    </ListRow>
  ),
  parameters: {
    containerStyle: {
      width: 393,
    },
    specOverlay: (
      <Image
        source={require('./specs/example-1.png')}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{ width: 393, height: 44 }}
      />
    ),
  },
};

export const Example2: Meta<typeof ListRow> = {
  args: {
    listStyle: 'insetGrouped',
  },
  parameters: {
    containerStyle: {
      width: 393,
    },
    specOverlay: (
      <Image
        source={require('./specs/example-2.png')}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{ width: 393, height: 44 }}
      />
    ),
  },
};

export const ExampleLG: Meta<typeof ListRow> = {
  args: {
    listStyle: 'insetGrouped',
  },
  parameters: {
    containerStyle: {
      width: 393,
    },
    specOverlay: (
      <Image
        source={require('./specs/example-lg.png')}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{ width: 393, height: 44 }}
      />
    ),
  },
};
