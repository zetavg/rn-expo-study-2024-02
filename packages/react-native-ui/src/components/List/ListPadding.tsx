import React from 'react';
import { View } from 'react-native';

import { useUIPlatform } from '../../contexts';

import { getListPadding, ListPaddingConditions } from './utils';

type Props = ListPaddingConditions;

export function ListPadding(props: Props) {
  const uiPlatform = useUIPlatform();
  return <View style={getPaddingStyle(uiPlatform, props)} />;
}

function getPaddingStyle(uiPlatform: 'ios' | 'android', props: Props) {
  return {
    height: getListPadding(uiPlatform, props),
  };
}

export default ListPadding;
