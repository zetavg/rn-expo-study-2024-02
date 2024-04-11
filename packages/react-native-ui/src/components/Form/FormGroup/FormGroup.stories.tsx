import React from 'react';

import { argTypesFrom, collectPropsFromArgs } from '@rnstudy/react-utils';
import { Meta, StoryObj } from '@rnstudy/storybook-rn-types';

import { ListFooterProps, ListHeaderProps } from '../../List';
import ListFooterMeta from '../../List/ListFooter/ListFooter.stories';
import ListHeaderMeta from '../../List/ListHeader/ListHeader.stories';
import { FormFieldProps } from '../FormField';
import FormFieldMeta from '../FormField/FormField.stories';

import { ExampleFormGroup } from './examples';
import FormGroup from './FormGroup';

const meta: Meta<typeof FormGroup> = {
  title: 'UI/Components/FormGroup',
  component: FormGroup,
  parameters: {
    containerStyle: {
      alignSelf: 'stretch',
    },
    containerBackground: 'grouped',
  },
  argTypes: {
    first: { control: false },
    header: { control: false },
    footer: { control: false },
    children: { control: false },

    placeholder: { control: 'text' },

    '__props:header': {
      control: 'radio',
      options: ['undefined', 'Header'],
    },
    ...argTypesFrom(ListHeaderMeta, {
      prefix: '__props:header:Header.',
      exclude: ['listStyle', 'first'],
    }),

    '__props:footer': {
      control: 'radio',
      options: ['undefined', 'Footer'],
    },
    ...argTypesFrom(ListFooterMeta, {
      prefix: '__props:footer:Footer.',
      exclude: ['listStyle'],
    }),

    ...argTypesFrom(FormFieldMeta, {
      prefix: '__props:children:FormField.',
      exclude: ['vertical'],
    }),
  },
  args: {
    placeholder: 'Placeholder text.',
    '__props:header:ListHeader.title': 'Header Title',
    '__props:footer:ListFooter.text': 'This is the footer text.',
  },
  render: (args) => {
    const useHeader = args['__props:header'] === 'Header';
    const headerProps = collectPropsFromArgs<ListHeaderProps>(
      args,
      '__props:header:Header.',
    );

    const useFooter = args['__props:footer'] === 'Footer';
    const footerProps = collectPropsFromArgs<ListFooterProps>(
      args,
      '__props:footer:Footer.',
    );

    const formFieldProps = collectPropsFromArgs<FormFieldProps>(
      args,
      '__props:children:FormField.',
    );

    return (
      <ExampleFormGroup
        {...args}
        first
        header={useHeader ? <FormGroup.Header {...headerProps} /> : undefined}
        footer={useFooter ? <FormGroup.Footer {...footerProps} /> : undefined}
        formFieldProps={formFieldProps}
      />
    );
  },
};

export default meta;

type Story = StoryObj<typeof FormGroup>;

export const A0_Default: Story = {};

export const D1_FieldsWithDescriptions: Story = {
  parameters: {
    containerStyle: {
      alignSelf: 'center',
      width: 360,
    },
  },
  args: {
    '__props:children:FormField.description':
      'This is a description of the form field.',
  },
};

export const E1_FieldsWithErrorMessages: Story = {
  parameters: {
    containerStyle: {
      alignSelf: 'center',
      width: 360,
    },
  },
  args: {
    '__props:children:FormField.errorMessage': 'This is an error message.',
  },
};
