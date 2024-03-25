import { useMemo } from 'react';
import Color from 'color';

import { useUIColors } from '../../../contexts';

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
  const uiColors = useUIColors();
  const color = useMemo(() => {
    const backgroundColorBase =
      listStyle === 'plain' ? uiColors.systemBackground : backgroundColor;

    return dragActive
      ? Color(backgroundColorBase).lightness() > 50
        ? Color(backgroundColorBase).alpha(0.5).hexa()
        : Color(backgroundColorBase).lighten(1).alpha(0.5).hexa()
      : backgroundColorBase;
  }, [backgroundColor, dragActive, listStyle, uiColors.systemBackground]);

  return color;
}
