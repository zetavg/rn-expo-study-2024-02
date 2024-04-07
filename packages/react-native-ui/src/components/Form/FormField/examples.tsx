/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View } from 'react-native';

import { ExampleUncontrolledSelect } from '../../Select/examples';
import { ExampleUncontrolledSwitch } from '../../Switch/examples';
import { ExampleUncontrolledTextInput } from '../../TextInput/examples';

export const EXAMPLE_CHILDREN = {
  undefined,
  Example: <View style={{ height: 24, backgroundColor: '#888', flex: 1 }} />,
  Switch: <ExampleUncontrolledSwitch />,
  Select: <ExampleUncontrolledSelect />,
  TextInput: <ExampleUncontrolledTextInput placeholder="Text Input" />,
};
