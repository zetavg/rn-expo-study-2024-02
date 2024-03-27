/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Text, View } from 'react-native';

export const EXAMPLE_CHILDREN = (
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
