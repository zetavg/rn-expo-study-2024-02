import React from 'react';

import { Icon as RIcon, IconProps as RIconProps } from '@rnstudy/react-icons';

type Props = {
  // Re-exposing common PressableProps so that they can be picked-up by react-docgen.
  size?: number;
  color?:
    | 'default'
    | 'secondary'
    | 'tertiary'
    | 'red'
    | 'orange'
    | 'yellow'
    | 'green'
    | 'teal'
    | 'cyan'
    | 'blue'
    | 'indigo'
    | 'purple'
    | 'pink'
    | 'brown'
    | 'gray';
  bordered?: boolean;
  label?: string;
} & RIconProps;

export function Icon({ ...restProps }: Props) {
  const element = <RIcon {...restProps} />;

  return element;
}
export default Icon;
