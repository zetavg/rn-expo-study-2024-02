import { IconColor } from '../../types';

export function getColorValue(
  color: IconColor | string,
  colors: { [key in IconColor]: string },
) {
  if (color in colors) {
    return colors[color as keyof typeof colors];
  }

  return color;
}
