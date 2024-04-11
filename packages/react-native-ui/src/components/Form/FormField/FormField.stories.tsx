import React from 'react';

import { Meta, StoryObj } from '@rnstudy/storybook-rn-types';

import { EXAMPLE_CHILDREN } from './examples';
import FormField from './FormField';

const meta: Meta<typeof FormField> = {
  title: 'UI/Components/FormField',
  component: FormField,
  parameters: {
    containerStyle: {
      alignSelf: 'stretch',
    },
    containerBackground: 'grouped',
  },
  argTypes: {
    children: {
      control: 'select',
      options: Object.keys(EXAMPLE_CHILDREN),
      mapping: EXAMPLE_CHILDREN,
    },
  },
  args: {
    label: 'Label',
    children: EXAMPLE_CHILDREN.Example,
  },
};

export default meta;

type Story = StoryObj<typeof FormField>;

export const A0_Default: Story = {};

export const A1_Vertical: Story = {
  args: {
    vertical: true,
  },
};

export const D1_WithDescription: Story = {
  parameters: {
    containerStyle: {
      alignSelf: 'center',
      width: 320,
    },
  },
  args: {
    description:
      'This is a description of the form field. It can be used to provide additional context or instructions.',
  },
};

export const DV1_WithDescriptionVertical: Story = {
  ...D1_WithDescription,
  args: {
    ...D1_WithDescription.args,
    vertical: true,
  },
};

export const E1_WithErrorMessage: Story = {
  parameters: {
    containerStyle: {
      alignSelf: 'center',
      width: 320,
    },
  },
  args: {
    errorMessage: 'This is an error message.',
  },
};

export const EV1_WithErrorMessageVertical: Story = {
  ...E1_WithErrorMessage,
  args: {
    ...E1_WithErrorMessage.args,
    vertical: true,
  },
};
