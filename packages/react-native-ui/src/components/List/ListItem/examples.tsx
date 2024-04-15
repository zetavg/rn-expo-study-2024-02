/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Alert, View } from 'react-native';

import { Icon } from '@rnstudy/react-icons';

import { ExampleUncontrolledSegmentedControl } from '../../SegmentedControl/examples';
import { ExampleUncontrolledSelect } from '../../Select/examples';
import { ExampleUncontrolledSwitch } from '../../Switch/examples';
import Text from '../../Text';
import { ExampleUncontrolledTextInput } from '../../TextInput/examples';

import { AccessoryButton } from './AccessoryButton';
import ListItem from './ListItem';

export const EMPTY_FUNCTION = () => {};
export const FUNCTION_WITH_PRESSED_ALERT = () => {
  Alert.alert('Pressed');
};

export const EXAMPLE_IMAGES = {
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
  SegmentedControl: <ExampleUncontrolledSegmentedControl />,
  TextInput: <ExampleUncontrolledTextInput placeholder="Text Input" />,
  'TextInput with Long Value': (
    <ExampleUncontrolledTextInput
      placeholder="Text Input"
      value="The quick brown fox jumps over the lazy dog."
    />
  ),
  'TextInput with Clear Button': (
    <ExampleUncontrolledTextInput
      placeholder="Text Input"
      value="Value"
      clearButtonMode="always"
    />
  ),
  'TextInput with Clear Button While Editing': (
    <ExampleUncontrolledTextInput
      placeholder="Text Input"
      value="Value"
      clearButtonMode="while-editing"
    />
  ),
  Icon: <Icon name="cat" color="orange" />,
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

export const EXAMPLE_CHILDREN_WITH_PADDING_CANCELING = (
  <ListItem.ChildrenPaddingCancelingContainer
    style={{
      borderColor: '#88888888',
      borderWidth: 1,
      backgroundColor: '#88888855',
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Text style={{ color: 'black', fontSize: 14 }}>This is the children.</Text>
  </ListItem.ChildrenPaddingCancelingContainer>
);

export const EXAMPLE_CHILDREN_S = {
  'Example Children': EXAMPLE_CHILDREN,
  'Example Children Tall': EXAMPLE_CHILDREN_TALL,
  'Example Children with Padding Canceling':
    EXAMPLE_CHILDREN_WITH_PADDING_CANCELING,
};
