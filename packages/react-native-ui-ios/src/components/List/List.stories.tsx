import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, Switch, ViewStyle } from 'react-native';

import { Icon } from '@rnstudy/react-icons';
import { collectPropsFromArgs } from '@rnstudy/react-utils/src';
import { Meta } from '@rnstudy/storybook-rn-types';

import { Button } from '../Button';
import Select from '../Select';

import List from './List';
import ListFooter, { ListFooterProps } from './ListFooter';
import ListHeader, { ListHeaderProps } from './ListHeader';
import ListItem, { ListItemProps } from './ListItem';

const meta: Meta<typeof List> = {
  title: 'iOS UI/List',
  component: List,
  parameters: {
    containerStyle: {
      alignSelf: 'stretch',
    },
    containerBackground: 'grouped',
  },
  argTypes: {
    first: { control: false },
    children: { control: false },

    '__props:header:ListHeader': { control: 'boolean' },
    '__props:header:ListHeader.title': {
      control: 'text',
    },
    '__props:header:ListHeader.titleStyle': {
      control: 'select',
      options: ['default', 'prominent'],
    },
    '__props:header:ListHeader.accessories': {
      control: 'select',
      options: [
        'undefined',
        'singleButton',
        'singleButtonWithIcon',
        'multipleButtons',
      ],
      mapping: {
        undefined,
        singleButton: <Button label="Button" />,
        singleButtonWithIcon: <Button label="Add" icon="_plus" />,
        multipleButtons: (
          <>
            <Button buttonStyle="gray" icon="_list_edit" />
            <Button buttonStyle="tinted" label="Add" icon="_plus" />
          </>
        ),
      },
    },

    '__props:footer:ListFooter': { control: 'boolean' },
    '__props:footer:ListFooter.text': {
      control: 'text',
    },

    '__props:children:ListItem.title': { control: 'text' },
    '__props:children:ListItem.subtitle': { control: 'text' },
    '__props:children:ListItem.icon': {
      control: 'select',
      options: ['undefined', 'star', 'airplane', 'heart'],
      mapping: {
        undefined,
        star: <Icon name="star" color="gray" />,
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
    '__props:children:ListItem.compact': { control: 'boolean' },
    '__props:children:ListItem.subtitleOnTop': { control: 'boolean' },
    '__props:children:ListItem.detail': { control: 'text' },
    '__props:children:ListItem.accessories': {
      control: 'select',
      options: ['undefined', 'switch', 'select'],
      mapping: {
        undefined,
        switch: <Switch value={true} />,
        select: (
          <Select
            options={{
              js: { label: 'JavaScript' },
              ts: { label: 'TypeScript', icon: 'star.outline' as const },
              swift: { label: 'Swift' },
              kotlin: { label: 'Kotlin' },
            }}
            value={undefined}
            onValueChange={() => {}}
          />
        ),
      },
    },
    '__props:children:ListItem.navigationLink': { control: 'boolean' },
    '__props:children:ListItem.onPress': {
      control: 'select',
      options: ['undefined', 'function'],
      mapping: {
        undefined,
        function: () => {
          Alert.alert('Pressed');
        },
      },
    },
    '__props:children:ListItem.showGrabber': { control: 'boolean' },
    '__props:children:ListItem.editButton': {
      control: 'select',
      options: [undefined, 'unselected', 'selected', 'add', 'remove'],
    },
  },
  args: {
    '__props:header:ListHeader.title': 'Header Title',
    '__props:footer:ListFooter.text': 'This is the footer text.',
  },
  render: (args) => {
    const listHeaderProps = collectPropsFromArgs<ListHeaderProps>(
      args,
      '__props:header:ListHeader.',
    );

    const listFooterProps = collectPropsFromArgs<ListFooterProps>(
      args,
      '__props:footer:ListFooter.',
    );

    const listItemProps = collectPropsFromArgs<ListItemProps>(
      args,
      '__props:children:ListItem.',
    );

    return (
      <>
        <List
          {...args}
          first
          header={
            args['__props:header:ListHeader'] ? (
              <ListHeader {...listHeaderProps} />
            ) : undefined
          }
          footer={
            args['__props:footer:ListFooter'] ? (
              <ListFooter {...listFooterProps} />
            ) : undefined
          }
        >
          <ListItem title="First Item" {...listItemProps} />
          <ListItem title="Middle Item" {...listItemProps} />
          <ListItem title="Last Item" {...listItemProps} />
        </List>
        <List
          {...args}
          header={
            args['__props:header:ListHeader'] ? (
              <ListHeader {...listHeaderProps} />
            ) : undefined
          }
          footer={
            args['__props:footer:ListFooter'] ? (
              <ListFooter {...listFooterProps} />
            ) : undefined
          }
        >
          <ListItem title="Only Item" {...listItemProps} />
        </List>
      </>
    );
  },
};

export default meta;

export const Default: Meta<typeof List> = {};
