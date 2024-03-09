import type { ViewStyle } from 'react-native';
import type { Meta as SBMeta } from '@storybook/react';
import type { Parameters as SBParameters } from '@storybook/types';

export type Parameters = SBParameters & {
  containerStyle?: ViewStyle;
};

export type Meta<T> = SBMeta<T> & {
  parameters?: Parameters;
};
