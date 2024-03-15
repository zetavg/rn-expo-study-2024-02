import React from 'react';
import { Alert } from 'react-native';

import type { Meta } from '@rnstudy/storybook-rn-types';

import { Button } from '../Button';

import Menu from './Menu';

const meta: Meta<typeof Menu> = {
  title: 'iOS UI/Menu',
  component: Menu,
  parameters: {
    actions: { argTypesRegex: '^on.*' },
  },
  args: {
    items: [
      { title: 'Item 1' },
      { title: 'Item 2', systemImage: 'star' },
      { title: 'Checked Item', checked: true },
      { title: 'Destructive Item', destructive: true },
      {
        title: 'Item with Subtitle',
        subtitle: 'This is the subtitle',
      },
      {
        title: 'Submenu',
        items: [
          { title: 'Submenu Item 1' },
          { title: 'Submenu Item 2', subtitle: 'This is the subtitle' },
        ],
      },
      {
        title: 'Submenu with Subtitle',
        subtitle: 'This is the subtitle',
        items: [
          { title: 'Submenu Item 1' },
          { title: 'Submenu Item 2', subtitle: 'This is the subtitle' },
        ],
      },
      {
        title: 'Inline Submenu',
        inline: true,
        items: [
          { title: 'Submenu Item 1' },
          { title: 'Submenu Item 2', subtitle: 'This is the subtitle' },
        ],
      },
      {
        inline: true,
        items: [{ title: 'Inline Submenu without Title' }],
      },
    ],
    children: (
      <Button
        label="Press to Show Menu"
        buttonStyle="gray"
        controlSize="medium"
      />
    ),
  },
};

export default meta;

export const Default: Meta<typeof Menu> = {};

export const WithActionHandler: Meta<typeof Menu> = {
  args: {
    items: [
      {
        title: 'Item 1',
        action: () => {
          Alert.alert('Item 1 Pressed');
        },
      },
      {
        title: 'Item 2',
        action: () => {
          Alert.alert('Item 2 Pressed');
        },
      },
      {
        title: 'Submenu 1',
        items: [
          {
            title: 'Submenu Item 1-1',
            action: () => {
              Alert.alert('Submenu Item 1-1 Pressed');
            },
          },
          {
            title: 'Submenu Item 1-2',
            action: () => {
              Alert.alert('Submenu Item 1-2 Pressed');
            },
          },
        ],
      },
      {
        title: 'Submenu 2',
        items: [
          {
            title: 'Submenu Item 2-1',
            action: () => {
              Alert.alert('Submenu Item 2-1 Pressed');
            },
          },
          {
            title: 'Submenu Item 2-2',
            action: () => {
              Alert.alert('Submenu Item 2-2 Pressed');
            },
          },
        ],
      },
    ],
  },
};
