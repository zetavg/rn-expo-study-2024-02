import React from 'react';
import { Alert, View } from 'react-native';

import { Icon } from '@rnstudy/react-icons';
import type { Meta, StoryObj } from '@rnstudy/storybook-rn-types';

import Text from '../../Text';

import { EXAMPLE_CHILDREN } from './examples';
import ListItem from './ListItem';

const meta: Meta<typeof ListItem> = {
  title: 'UI/Components/ListItem',
  component: ListItem,
  parameters: {
    containerStyle: {
      alignSelf: 'stretch',
    },
    containerBackground: 'grouped',
  },
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
    icon: {
      control: 'select',
      options: ['undefined', 'star', 'airplane', 'heart'],
      mapping: {
        undefined,
        star: <Icon name="_listitem_person" />,
        airplane: ({ backgroundColor }: { backgroundColor: string }) => (
          <Icon
            name="airplane"
            color={backgroundColor}
            backgroundColor="orange"
          />
        ),
        heart: <Icon name="heart" color="red" />,
      },
    },
    onPress: {
      control: 'select',
      options: ['undefined', 'Function', 'Empty Function'],
      mapping: {
        undefined,
        Function: () => {
          Alert.alert('Pressed');
        },
        'Empty Function': () => {},
      },
    },
    children: {
      control: 'select',
      options: ['undefined', 'Example Children'],
      mapping: {
        undefined,
        'Example Children': EXAMPLE_CHILDREN,
      },
    },
  },
  args: {
    title: 'Title',
    navigationLink: true,
  },
};

export default meta;

type Story = StoryObj<typeof ListItem>;

export const Default: Story = {};

export const WithSubtitle: Story = {
  args: {
    title: 'Title',
    subtitle: 'Subtitle',
  },
};

export const WithSubtitleAndIcon: Story = {
  args: {
    ...WithSubtitle.args,
    icon: <Icon name="_listitem_person" />,
  },
};

export const WithSubtitleCompact: Story = {
  args: {
    ...WithSubtitle.args,
    compact: true,
  },
};

export const WithSubtitleAndIconCompact: Story = {
  args: {
    ...WithSubtitleAndIcon.args,
    compact: true,
  },
};

export const WithLongSubtitle: Meta<typeof ListItem> = {
  parameters: {
    containerStyle: {
      width: 360,
      alignSelf: 'center',
    },
  },
  args: {
    singleLine: false,
    subtitle: 'This is a long subtitle that will expand to multiple lines.',
    navigationLink: true,
  },
};

export const WithLongSubtitleAndIcon: Meta<typeof ListItem> = {
  parameters: {
    containerStyle: {
      width: 360,
      alignSelf: 'center',
    },
  },
  args: {
    ...WithLongSubtitle.args,
    icon: <Icon name="_listitem_person" />,
  },
};

export const WithChildrenAndIcon: Story = {
  args: {
    title: 'Title',
    icon: <Icon name="_listitem_person" />,
    children: EXAMPLE_CHILDREN,
  },
};

export const WithChildrenAndTitleAlignedIcon: Story = {
  args: {
    title: 'Title',
    icon: <Icon name="_listitem_person" />,
    alignIconWithTitle: true,
    children: EXAMPLE_CHILDREN,
  },
};

export const WithChildrenAndSubtitleAndTitleAlignedIcon: Story = {
  args: {
    title: 'Title',
    subtitle: 'This is the subtitle.',
    icon: <Icon name="_listitem_person" />,
    alignIconWithTitle: true,
    children: EXAMPLE_CHILDREN,
  },
};

export const DragActive: Story = {
  args: {
    dragActive: true,
  },
};
