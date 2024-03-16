import IconDefinitions from '../../IconDefinitions';
import { IconColor } from '../../types';

export type IconName = keyof typeof IconDefinitions;

export type IconProps = {
  name: IconName;
  size?: number;
  color?: IconColor | string;

  bordered?: boolean;

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

  /** Opacity. */
  opacity?: number;
};
