import React from 'react';
import { View } from 'react-native';

import { getListPadding, ListPaddingConditions } from './utils';

type Props = ListPaddingConditions;

export function ListPadding(props: Props) {
  return <View style={getPaddingStyle(props)} />;
}

function getPaddingStyle(props: Props) {
  return {
    height: getListPadding(props),
  };
}

export default ListPadding;
