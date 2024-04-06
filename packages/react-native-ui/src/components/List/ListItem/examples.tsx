/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Alert, View } from 'react-native';

import { Icon } from '@rnstudy/react-icons';

import { ExampleUncontrolledSelect } from '../../Select/examples';
import { ExampleUncontrolledSwitch } from '../../Switch/examples';
import Text from '../../Text';

import { AccessoryButton } from './AccessoryButton';

export const EMPTY_FUNCTION = () => {};
export const FUNCTION_WITH_PRESSED_ALERT = () => {
  Alert.alert('Pressed');
};

export const EXAMPLE_ICONS = {
  undefined,
  '<Icon name="_listitem_person" />': <Icon name="_listitem_person" />,
  '({ backgroundColor }: { backgroundColor: string }) => <Icon name="airplane" color={backgroundColor} backgroundColor="orange" />':
    ({ backgroundColor }: { backgroundColor: string }) => (
      <Icon name="airplane" color={backgroundColor} backgroundColor="orange" />
    ),
  '<Icon name="heart" color="red" />': <Icon name="heart" color="red" />,
};

export const EXAMPLE_ACCESSORIES = {
  undefined,
  'Icon Button': <AccessoryButton icon="_info" onPress={() => {}} />,
  Button: <AccessoryButton label="Button" onPress={() => {}} />,
  'Button with Icon': (
    <AccessoryButton label="Info" icon="_info" onPress={() => {}} />
  ),
  'Detail Text and Icon Button': (
    <>
      <Text>Detail</Text>
      <AccessoryButton icon="_info" onPress={() => {}} />
    </>
  ),
  Switch: <ExampleUncontrolledSwitch />,
  Select: <ExampleUncontrolledSelect />,
};

export const EXAMPLE_CHILDREN = (
  <View
    style={{
      backgroundColor: '#88888888',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Text style={{ color: 'black', fontSize: 14 }}>This is the children.</Text>
  </View>
);

export const EXAMPLE_CHILDREN_TALL = (
  <View
    style={{
      backgroundColor: '#88888888',
      height: 100,
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Text style={{ color: 'black', fontSize: 14 }}>This is the children.</Text>
  </View>
);
