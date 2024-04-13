import { useMemo } from 'react';
import Color from 'color';

import { useColors } from '../../../contexts';

import type { Props as ListItemProps } from './ListItem';

export function useBackgroundColor({
  backgroundColor,
  listStyle,
  dragActive,
  _isNested,
}: {
  backgroundColor: string;
  listStyle: ListItemProps['listStyle'];
  dragActive: ListItemProps['dragActive'];
  _isNested: ListItemProps['_isNested'];
}) {
  const colors = useColors();

  const color = useMemo(() => {
    if (_isNested) return 'transparent';

    const backgroundColorBase =
      listStyle === 'plain' ? colors.surface : backgroundColor;

    return dragActive
      ? Color(backgroundColorBase).lightness() > 50
        ? backgroundColorBase
        : Color(backgroundColorBase).lighten(0.5).hexa()
      : backgroundColorBase;
  }, [_isNested, backgroundColor, colors.surface, dragActive, listStyle]);

  return color;
}
