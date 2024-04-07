import React from 'react';
import {
  ActivityIndicator as RNActivityIndicator,
  ActivityIndicatorProps as RNActivityIndicatorProps,
} from 'react-native';

import { useUIColors } from '../../contexts';

export type Props = RNActivityIndicatorProps;

export function ActivityIndicator(props: Props) {
  const uiColors = useUIColors();

  return <RNActivityIndicator color={uiColors.secondaryLabel} {...props} />;
}

export default ActivityIndicator;
