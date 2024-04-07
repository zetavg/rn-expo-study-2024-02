import React from 'react';
import {
  ActivityIndicator as RNActivityIndicator,
  ActivityIndicatorProps as RNActivityIndicatorProps,
} from 'react-native-paper';

export type Props = RNActivityIndicatorProps;

export function ActivityIndicator(props: Props) {
  return <RNActivityIndicator {...props} />;
}

export default ActivityIndicator;
