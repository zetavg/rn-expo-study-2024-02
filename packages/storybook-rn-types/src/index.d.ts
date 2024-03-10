import type { ViewStyle } from 'react-native';
import type { Meta as SBMeta } from '@storybook/react';
import type { Parameters as SBParameters } from '@storybook/types';

export type Parameters = SBParameters & {
  containerStyle?: ViewStyle;
};

export type Meta<T> = SBMeta<T> & {
  parameters?: Parameters;
  /** A React element which renders a specification of the component and can be displayed as an overlay in the Storybook UI. */
  specOverlay?: JSX.Element;
};
