import React from 'react';
import { View } from 'react-native';

import { IconDefinitions } from '@rnstudy/react-icons';
import type { Meta } from '@rnstudy/storybook-rn-types';

import Text from '../Text';

import Icon from './Icon';
import {
  SAMPLE_NYAN_CAT_IMAGE_PNG_BASE64_URI,
  SAMPLE_YARN_CAT_IMAGE_JPG_BASE64_URI,
} from './sample-images';

const meta: Meta<typeof Icon> = {
  title: 'UI/Components/Icon',
  component: Icon,
  parameters: {
    actions: { argTypesRegex: '^on.*' },
  },
  argTypes: {
    name: {
      control: 'select',
      options: Object.keys(IconDefinitions),
    },
  },
  args: {
    name: 'heart',
    size: 32,
  },
};

export default meta;

export const Default: Meta<typeof Icon> = {};

export const SVGIcon: Meta<typeof Icon> = {
  args: {
    name: 'sample-svg-file-icon',
    color: 'blue',
  },
};

export const WithinText: Meta<typeof Icon> = {
  render: () => (
    <>
      <Text largeTitle>
        I <Icon name="heart" /> React Native
      </Text>
      <Text headline>
        I <Icon name="heart" /> React Native
      </Text>
      <Text subheadline>
        I <Icon name="heart" /> React Native
      </Text>
      <Text title1>
        I <Icon name="heart" /> React Native
      </Text>
      <Text title2>
        I <Icon name="heart" /> React Native
      </Text>
      <Text title3>
        I <Icon name="heart" /> React Native
      </Text>
      <Text body link>
        I <Icon name="heart" /> React Native
      </Text>
      <Text callout>
        I <Icon name="heart" /> React Native
      </Text>
      <Text footnote secondary>
        I <Icon name="heart" /> React Native
      </Text>
      <Text caption1 tertiary>
        I <Icon name="heart" /> React Native
      </Text>
      <Text caption2 tertiary>
        I <Icon name="heart" /> React Native
      </Text>
    </>
  ),
};

export const WithLabel: Meta<typeof Icon> = {
  args: {
    name: 'star',
    label: 'Star',
    color: 'blue',
  },
};

export const WithImage: Meta<typeof Icon> = {
  ...meta,
  argTypes: {
    name: {
      control: 'select',
      options: Object.keys(IconDefinitions),
    },
    image: {
      control: 'boolean',
    },
  },
  args: {
    name: 'cat',
    size: 40,
    bordered: true,
    color: 'gray',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    image: true as any,
  },
  render: ({ image, ...args }) => (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{ flexDirection: 'row', gap: 8 }}>
      <Icon
        {...args}
        image={image && { uri: SAMPLE_YARN_CAT_IMAGE_JPG_BASE64_URI }}
      />
      <Icon
        {...args}
        image={image && { uri: SAMPLE_NYAN_CAT_IMAGE_PNG_BASE64_URI }}
      />
    </View>
  ),
};
