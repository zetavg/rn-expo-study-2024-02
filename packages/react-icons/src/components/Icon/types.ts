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
  m?: number;
  /** Margin vertical. */
  mv?: number;
  /** Margin horizontal. */
  mh?: number;
  /** Margin top. */
  mt?: number;
  /** Margin bottom. */
  mb?: number;
  /** Margin left. */
  ml?: number;
  /** Margin right. */
  mr?: number;

  /** Align. */
  align?: 'center' | 'start' | 'end';

  /** Opacity. */
  opacity?: number;
};
