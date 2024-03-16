import React from 'react';

import { IconDefinitions } from '@rnstudy/react-icons';
import type { Meta } from '@rnstudy/storybook-rn-types';

import Text from '../Text';

import Icon from './Icon';

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
