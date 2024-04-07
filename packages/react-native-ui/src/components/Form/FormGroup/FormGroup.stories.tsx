import React from 'react';

import { argTypesFrom, collectPropsFromArgs } from '@rnstudy/react-utils';
import { Meta, StoryObj } from '@rnstudy/storybook-rn-types';

import { ListFooterProps, ListHeaderProps } from '../../List';
import ListFooterMeta from '../../List/ListFooter/ListFooter.stories';
import ListHeaderMeta from '../../List/ListHeader/ListHeader.stories';

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

    return (
      <>
        <FormGroup
          {...args}
          first
          header={useHeader ? <FormGroup.Header {...headerProps} /> : undefined}
          footer={useFooter ? <FormGroup.Footer {...footerProps} /> : undefined}
        >
          {args.children ? args.children : []}
        </FormGroup>
      </>
    );
  },
};

export default meta;

type Story = StoryObj<typeof FormGroup>;

export const A0_Default: Story = {};
