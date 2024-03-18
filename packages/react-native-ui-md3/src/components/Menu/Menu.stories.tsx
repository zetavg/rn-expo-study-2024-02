import React from 'react';
import { Alert } from 'react-native';

import type { Meta } from '@rnstudy/storybook-rn-types';

import { Button } from '../Button';

import Menu from './Menu';

const meta: Meta<typeof Menu> = {
  title: 'MD3 UI/Menu',
  component: Menu,
  parameters: {
    actions: { argTypesRegex: '^on.*' },
  },
  args: {
    title: 'Menu Title',
    items: [
      { title: 'Item' },
      { title: 'Item with Icon', icon: 'star.outline' },
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
      {
        title: 'Submenu With Checked Items',
        items: [
          { title: 'Checked Submenu Item 1', checked: true },
          { title: 'Submenu Item 2', checked: false },
          { title: 'Submenu Item 3', checked: false },
        ],
      },
    ],
    children: (openMenu) => (
      <Button
        text="Press to Show Menu"
        mode="contained"
        onPress={openMenu}
        onLongPress={openMenu}
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
        handler: () => {
          Alert.alert('Item 1 Pressed');
        },
      },
      {
        title: 'Item 2',
        handler: () => {
          Alert.alert('Item 2 Pressed');
        },
      },
      {
        title: 'Submenu 1',
        items: [
          {
            title: 'Submenu Item 1-1',
            handler: () => {
              Alert.alert('Submenu Item 1-1 Pressed');
            },
          },
          {
            title: 'Submenu Item 1-2',
            handler: () => {
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
            handler: () => {
              Alert.alert('Submenu Item 2-1 Pressed');
            },
          },
          {
            title: 'Submenu Item 2-2',
            handler: () => {
              Alert.alert('Submenu Item 2-2 Pressed');
            },
          },
        ],
      },
    ],
  },
};
