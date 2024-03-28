import { type Animated } from 'react-native';

import IconDefinitions from '../../IconDefinitions';
import { IconColor } from '../../types';

export type IconName = keyof typeof IconDefinitions;

export type IconImage = {
  uri: string;
};

export type IconProps = {
  name: IconName;

  size?: number;
  color?: IconColor | string;

  bordered?: boolean;

  /** Display a label below the icon. */
  label?: string;

  /** If specified, will display this image instead of the icon. */
  image?: IconImage;

  /** Specifies the background color of the icon. Will only take effect if the icon is `bordered`. */
  backgroundColor?: IconColor | string;

  /** Specifies the border color of the icon. Will only take effect if the icon is `bordered`. */
  borderColor?: IconColor | string;

  /** Specifies the border width of the icon. Will only take effect if the icon is `bordered`. */
  borderWidth?: number;

  /** Margin. */
  m?: number | Animated.AnimatedNode;
  /** Margin vertical. */
  mv?: number | Animated.AnimatedNode;
  /** Margin horizontal. */
  mh?: number | Animated.AnimatedNode;
  /** Margin top. */
  mt?: number | Animated.AnimatedNode;
  /** Margin bottom. */
  mb?: number | Animated.AnimatedNode;
  /** Margin left. */
  ml?: number | Animated.AnimatedNode;
  /** Margin right. */
  mr?: number | Animated.AnimatedNode;

  /** Align. */
  align?: 'center' | 'start' | 'end';

  /** Opacity. */
  opacity?: number | Animated.AnimatedNode;
};
