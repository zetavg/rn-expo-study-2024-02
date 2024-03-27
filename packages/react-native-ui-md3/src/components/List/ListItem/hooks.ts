import { useMemo } from 'react';
import Color from 'color';

import { useColors, useTheme } from '../../../contexts';

import type { Props as ListItemProps } from './ListItem';

export function useBackgroundColor({
  backgroundColor,
  listStyle,
  dragActive,
}: {
  backgroundColor: string;
  listStyle: ListItemProps['listStyle'];
  dragActive: ListItemProps['dragActive'];
}) {
  const colors = useColors();

  const color = useMemo(() => {
    const backgroundColorBase =
      listStyle === 'plain' ? colors.surface : backgroundColor;

    return dragActive
      ? Color(backgroundColorBase).lightness() > 50
        ? Color(backgroundColorBase).lighten(0.01).hexa()
        : Color(backgroundColorBase).lighten(0.01).hexa()
      : backgroundColorBase;
  }, [backgroundColor, colors.surface, dragActive, listStyle]);

  return color;
}
