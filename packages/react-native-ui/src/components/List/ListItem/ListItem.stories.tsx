import React from 'react';

import type { Meta, StoryObj } from '@rnstudy/storybook-rn-types';

import Text from '../../Text';
import { ExampleUncontrolledTextInput } from '../../TextInput/examples';

import {
  EMPTY_FUNCTION,
  EXAMPLE_ACCESSORIES,
  EXAMPLE_CHILDREN_S,
  EXAMPLE_CHILDREN_TALL,
  EXAMPLE_CHILDREN_WITH_PADDING_CANCELING,
  EXAMPLE_IMAGES,
  FUNCTION_WITH_PRESSED_ALERT,
} from './examples';
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
    image: {
      control: 'select',
      options: Object.keys(EXAMPLE_IMAGES),
      mapping: EXAMPLE_IMAGES,
    },
    onPress: {
      control: 'select',
      options: ['undefined', 'Function with Alert', 'Empty Function'],
      mapping: {
        undefined,
        'Function with Alert': FUNCTION_WITH_PRESSED_ALERT,
        'Empty Function': EMPTY_FUNCTION,
      },
    },
    accessories: {
      control: 'select',
      options: Object.keys(EXAMPLE_ACCESSORIES),
      mapping: EXAMPLE_ACCESSORIES,
    },
    children: {
      control: 'select',
      options: Object.keys(EXAMPLE_CHILDREN_S),
      mapping: EXAMPLE_CHILDREN_S,
    },
  },
  args: {
    title: 'Title',
  },
};

export default meta;

type Story = StoryObj<typeof ListItem>;

export const A1_Default: Story = {};

export const B1_IsNavigationLink: Story = {
  args: {
    navigationLink: true,
  },
};

export const B2_Pressable: Story = {
  args: {
    title: 'Press Me',
    onPress: FUNCTION_WITH_PRESSED_ALERT,
  },
};

export const B3_PressableButtonStyle: Story = {
  args: {
    ...B2_Pressable.args,
    button: true,
  },
};

export const B4_PressableDestructiveStyle: Story = {
  args: {
    ...B2_Pressable.args,
    destructive: true,
  },
};

export const B5_PressableDisabled: Story = {
  args: {
    ...B2_Pressable.args,
    disabled: true,
  },
};

export const B6_WithIcon: Story = {
  args: {
    image: Object.values(EXAMPLE_IMAGES)[1],
  },
};

export const B7_Checked: Story = {
  args: {
    checked: true,
  },
};

export const B9_Loading: Story = {
  args: {
    loading: true,
  },
};

export const BL1_WithSingleLineLongTitleAndIconAndIsNavigationLink: Story = {
  parameters: {
    containerStyle: {
      width: 360,
      alignSelf: 'center',
    },
  },
  args: {
    ...B1_IsNavigationLink.args,
    ...B6_WithIcon.args,
    singleLine: true,
    title: 'This is a long title that will be truncated.',
  },
};

export const BL2_WithMultipleLineLongTitleAndIconAndIsNavigationLink: Story = {
  parameters: {
    containerStyle: {
      width: 360,
      alignSelf: 'center',
    },
  },
  args: {
    ...B1_IsNavigationLink.args,
    ...B6_WithIcon.args,
    singleLine: false,
    title: 'This is a long title that will expand to multiple lines.',
  },
};

export const C1_WithSubtitle: Story = {
  args: {
    title: 'Title',
    subtitle: 'Subtitle',
  },
};

export const C2_WithSubtitleCompact: Story = {
  args: {
    ...C1_WithSubtitle.args,
    compact: true,
  },
};

export const C3_WithSubtitleAndIsNavigationLink: Story = {
  args: {
    ...C1_WithSubtitle.args,
    navigationLink: true,
  },
};

export const C4_WithSubtitleAndIsNavigationLinkCompact: Story = {
  args: {
    ...C3_WithSubtitleAndIsNavigationLink.args,
    compact: true,
  },
};

export const C5_WithSubtitleAndIcon: Story = {
  args: {
    ...C1_WithSubtitle.args,
    image: Object.values(EXAMPLE_IMAGES)[1],
  },
};

export const C6_WithSubtitleAndIconCompact: Story = {
  args: {
    ...C5_WithSubtitleAndIcon.args,
    compact: true,
  },
};

export const CB1_WithSubtitleOnTop: Story = {
  args: {
    title: 'Title',
    subtitle: 'Subtitle',
    subtitleOnTop: true,
  },
};

export const CL1_WithLongSubtitleAndNotSingleLine: Story = {
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

export const CL2_WithLongSubtitleAndNotSingleLineAndIcon: Story = {
  parameters: {
    containerStyle: {
      width: 360,
      alignSelf: 'center',
    },
  },
  args: {
    ...CL1_WithLongSubtitleAndNotSingleLine.args,
    image: Object.values(EXAMPLE_IMAGES)[1],
  },
};

export const CL3_WithLongSubtitleAndIsSingleLine: Story = {
  parameters: {
    containerStyle: {
      width: 360,
      alignSelf: 'center',
    },
  },
  args: {
    subtitle: 'This is a long subtitle that will expand to multiple lines.',
    singleLine: true,
  },
};

export const CL4_WithLongSubtitleAndIsSingleLineAndIcon: Story = {
  parameters: {
    containerStyle: {
      width: 360,
      alignSelf: 'center',
    },
  },
  args: {
    ...CL3_WithLongSubtitleAndIsSingleLine.args,
    image: Object.values(EXAMPLE_IMAGES)[1],
  },
};

export const D1_WithTrailingDetailText: Story = {
  args: {
    title: 'Title',
    detail: 'Detail',
  },
};

export const D2_WithTrailingDetailTextAndNavigationLink: Story = {
  args: {
    ...D1_WithTrailingDetailText.args,
    navigationLink: true,
  },
};

export const D3_WithTrailingDetailTextSingleLineSubtitle: Story = {
  parameters: {
    containerStyle: {
      width: 360,
      alignSelf: 'center',
    },
  },
  args: {
    ...D1_WithTrailingDetailText.args,
    singleLine: true,
    subtitle: 'This is a long subtitle that will be truncated.',
  },
};

export const D4_WithTrailingDetailTextMultipleLineSubtitle: Story = {
  parameters: {
    containerStyle: {
      width: 360,
      alignSelf: 'center',
    },
  },
  args: {
    ...D1_WithTrailingDetailText.args,
    singleLine: false,
    subtitle: 'This is a long subtitle that will expand to multiple lines.',
  },
};

export const DL1_WithLongTrailingDetailTextAndNavigationLink: Story = {
  parameters: {
    containerStyle: {
      width: 360,
      alignSelf: 'center',
    },
  },
  args: {
    ...D2_WithTrailingDetailTextAndNavigationLink.args,
    detail: 'This is a long detail that will be truncated.',
  },
};

export const DL2_WithSingleLineLongTitleAndLongTrailingDetailTextAndNavigationLink: Story =
  {
    parameters: {
      containerStyle: {
        width: 360,
        alignSelf: 'center',
      },
    },
    args: {
      ...DL1_WithLongTrailingDetailTextAndNavigationLink.args,
      title: 'This is a long title that will be truncated.',
      singleLine: true,
    },
  };

export const DL3_WithMultipleLineLongTitleAndLongTrailingDetailTextAndNavigationLink: Story =
  {
    parameters: {
      containerStyle: {
        width: 360,
        alignSelf: 'center',
      },
    },
    args: {
      ...DL1_WithLongTrailingDetailTextAndNavigationLink.args,
      title: 'This is a long title that will expand to multiple lines.',
      singleLine: false,
    },
  };

export const DL4_WithMultipleLineLongSubtitleAndLongTrailingDetailTextAndNavigationLink: Story =
  {
    parameters: {
      containerStyle: {
        width: 360,
        alignSelf: 'center',
      },
    },
    args: {
      ...DL1_WithLongTrailingDetailTextAndNavigationLink.args,
      subtitle: 'This is a long subtitle that will expand to multiple lines.',
      singleLine: false,
    },
  };

export const EA1_WithIconButtonAsAccessory: Story = {
  args: {
    title: 'Title',
    accessories: EXAMPLE_ACCESSORIES['Icon Button'],
  },
};

export const EA2_WithDetailTextAndIconButtonAsAccessory: Story = {
  args: {
    title: 'Title',
    accessories: EXAMPLE_ACCESSORIES['Detail Text and Icon Button'],
  },
};

export const EA3_WithButtonAsAccessory: Story = {
  args: {
    title: 'Title',
    accessories: EXAMPLE_ACCESSORIES.Button,
  },
};

export const EA4_WithButtonWithIconAsAccessory: Story = {
  args: {
    title: 'Title',
    accessories: EXAMPLE_ACCESSORIES['Button with Icon'],
  },
};

export const EB1_WithSwitchAsAccessory: Story = {
  args: {
    title: 'Title',
    accessories: EXAMPLE_ACCESSORIES.Switch,
  },
};

export const EB2_WithSwitchAsAccessoryAndSingleLineSubtitle: Story = {
  parameters: {
    containerStyle: {
      width: 360,
      alignSelf: 'center',
    },
  },
  args: {
    ...EB1_WithSwitchAsAccessory.args,
    singleLine: true,
    subtitle: 'This is a long subtitle that will be truncated.',
  },
};

export const EB3_WithSwitchAsAccessoryAndMultipleLineSubtitle: Story = {
  parameters: {
    containerStyle: {
      width: 360,
      alignSelf: 'center',
    },
  },
  args: {
    ...EB1_WithSwitchAsAccessory.args,
    singleLine: false,
    subtitle: 'This is a long subtitle that will expand to multiple lines.',
  },
};

export const EC1_WithSelectAsAccessory: Story = {
  args: {
    title: 'Title',
    accessories: EXAMPLE_ACCESSORIES.Select,
  },
};

export const EC2_WithSelectAsAccessoryAndSingleLineSubtitle: Story = {
  parameters: {
    containerStyle: {
      width: 360,
      alignSelf: 'center',
    },
  },
  args: {
    ...EC1_WithSelectAsAccessory.args,
    singleLine: true,
    subtitle: 'This is a long subtitle that will be truncated.',
  },
};

export const EC3_WithSelectAsAccessoryAndMultipleLineSubtitle: Story = {
  parameters: {
    containerStyle: {
      width: 360,
      alignSelf: 'center',
    },
  },
  args: {
    ...EC1_WithSelectAsAccessory.args,
    singleLine: false,
    subtitle: 'This is a long subtitle that will expand to multiple lines.',
  },
};

export const ED1_WithTextInputAsAccessory: Story = {
  args: {
    title: 'Title',
    accessories: EXAMPLE_ACCESSORIES.TextInput,
    accessoriesContainsTextInput: true,
  },
};

export const ED2_WithTextInputWithClearButtonAsAccessory: Story = {
  args: {
    title: 'Title',
    accessories: EXAMPLE_ACCESSORIES['TextInput with Clear Button'],
    accessoriesContainsTextInput: true,
  },
};

export const ED8_WithTextInputThatContainsALongValueAsAccessory: Story = {
  parameters: {
    containerStyle: {
      width: 360,
      alignSelf: 'center',
    },
  },
  args: {
    title: 'Title',
    accessories: EXAMPLE_ACCESSORIES['TextInput with Long Value'],
    accessoriesContainsTextInput: true,
  },
};

export const ED9_WithLongTitleAndTextInputThatContainsALongValueAsAccessory: Story =
  {
    parameters: {
      containerStyle: {
        width: 360,
        alignSelf: 'center',
      },
    },
    args: {
      ...ED8_WithTextInputThatContainsALongValueAsAccessory.args,
      title: 'This is a long title',
    },
  };

export const EI1_WithIconAsAccessory: Story = {
  args: {
    title: 'Title',
    accessories: EXAMPLE_ACCESSORIES.Icon,
    accessoriesContainsTextInput: true,
  },
};

export const EI2_WithSubtitleAndIconAsAccessory: Story = {
  args: {
    title: 'Title',
    subtitle: 'Subtitle',
    accessories: EXAMPLE_ACCESSORIES.Icon,
    accessoriesContainsTextInput: true,
  },
};

export const EI3_WithSubtitleCompactAndIconAsAccessory: Story = {
  args: {
    title: 'Title',
    subtitle: 'Subtitle',
    compact: true,
    accessories: EXAMPLE_ACCESSORIES.Icon,
    accessoriesContainsTextInput: true,
  },
};

export const I2_WithColoredIcon: Story = {
  args: {
    image:
      EXAMPLE_IMAGES[
        Object.keys(EXAMPLE_IMAGES).find((s) =>
          s.match('color="'),
        ) as keyof typeof EXAMPLE_IMAGES
      ],
  },
};

export const I3_WithIconUsingBackgroundColor: Story = {
  args: {
    image:
      EXAMPLE_IMAGES[
        Object.keys(EXAMPLE_IMAGES).find((s) =>
          s.match('backgroundColor'),
        ) as keyof typeof EXAMPLE_IMAGES
      ],
  },
};

export const I31_WithIconUsingBackgroundColorAndSingleLineSubtitle: Story = {
  parameters: {
    containerStyle: {
      width: 360,
      alignSelf: 'center',
    },
  },
  args: {
    ...I3_WithIconUsingBackgroundColor.args,
    subtitle: 'This is a long subtitle that will be truncated.',
    singleLine: true,
  },
};

export const I32_WithIconUsingBackgroundColorAndSingleLineSubtitleCompact: Story =
  {
    parameters: {
      containerStyle: {
        width: 360,
        alignSelf: 'center',
      },
    },
    args: {
      ...I31_WithIconUsingBackgroundColorAndSingleLineSubtitle.args,
      compact: true,
    },
  };

export const I33_WithIconUsingBackgroundColorAndMultipleLineSubtitle: Story = {
  parameters: {
    containerStyle: {
      width: 360,
      alignSelf: 'center',
    },
  },
  args: {
    ...I3_WithIconUsingBackgroundColor.args,
    subtitle: 'This is a long subtitle that will expand to multiple lines.',
    singleLine: false,
  },
};

export const N11_WithChildrenAndIcon: Story = {
  args: {
    title: 'Title',
    image: Object.values(EXAMPLE_IMAGES)[1],
    children: EXAMPLE_CHILDREN_TALL,
  },
};

export const N12_WithChildrenAndTitleAlignedIcon: Story = {
  args: {
    title: 'Title',
    image: Object.values(EXAMPLE_IMAGES)[1],
    alignImageWithTitle: true,
    children: EXAMPLE_CHILDREN_TALL,
  },
};

export const N13_WithChildrenAndSubtitleAndTitleAlignedIcon: Story = {
  args: {
    title: 'Title',
    subtitle: 'This is the subtitle.',
    image: Object.values(EXAMPLE_IMAGES)[1],
    alignImageWithTitle: true,
    children: EXAMPLE_CHILDREN_TALL,
  },
};

export const N91_WithPaddingCancelingChildren: Story = {
  args: {
    title: 'Title',
    image: Object.values(EXAMPLE_IMAGES)[1],
    children: EXAMPLE_CHILDREN_WITH_PADDING_CANCELING,
  },
};

export const MG1_GrabberShown: Story = {
  args: {
    showGrabber: true,
  },
};

export const MG1_GrabberShownWithMultilineSubtitle: Story = {
  parameters: {
    containerStyle: {
      width: 360,
      alignSelf: 'center',
    },
  },
  args: {
    showGrabber: true,
    singleLine: false,
    subtitle: 'This is a long subtitle that will expand to multiple lines.',
  },
};

export const MG3_GrabberShownWithDetailText: Story = {
  args: {
    showGrabber: true,
    detail: 'Detail',
  },
};

export const MG4_GrabberShownWithSwitch: Story = {
  args: {
    showGrabber: true,
    accessories: EXAMPLE_ACCESSORIES.Switch,
  },
};

export const ME1_EditButtonUnselected: Story = {
  args: {
    editButton: 'unselected',
    onEditButtonPress: FUNCTION_WITH_PRESSED_ALERT,
  },
};

export const ME2_EditButtonSelected: Story = {
  args: {
    editButton: 'selected',
    onEditButtonPress: FUNCTION_WITH_PRESSED_ALERT,
  },
};

export const ME3_EditButtonAdd: Story = {
  args: {
    editButton: 'add',
    onEditButtonPress: FUNCTION_WITH_PRESSED_ALERT,
  },
};

export const ME4_EditButtonRemove: Story = {
  args: {
    editButton: 'remove',
    onEditButtonPress: FUNCTION_WITH_PRESSED_ALERT,
  },
};

export const NT1_TextInputAsChildren: Story = {
  args: {
    children: (
      <ExampleUncontrolledTextInput
        placeholder="Enter text here"
        clearButtonMode="while-editing"
      />
    ),
  },
};

export const NT2_TextInputAsChildrenWithoutTitle: Story = {
  args: {
    ...NT1_TextInputAsChildren.args,
    title: '',
  },
};

export const NT3_TextInputAsChildrenWithCustomTitle: Story = {
  args: {
    title: <Text variant="footnote">Title</Text>,
    children: (
      <ExampleUncontrolledTextInput
        placeholder="Enter text here"
        // eslint-disable-next-line react-native/no-inline-styles
        style={{ marginTop: -4 }}
      />
    ),
  },
};

export const S1_DragActive: Story = {
  args: {
    dragActive: true,
  },
};
