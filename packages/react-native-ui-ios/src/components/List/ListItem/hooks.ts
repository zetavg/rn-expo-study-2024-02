import { useMemo } from 'react';
import Color from 'color';

import { useUIColors } from '../../../contexts';

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
  const uiColors = useUIColors();
  const color = useMemo(() => {
    if (_isNested) return 'transparent';

    const backgroundColorBase =
      listStyle === 'plain' ? uiColors.systemBackground : backgroundColor;

    if (listStyle === 'plain' && !dragActive) {
      return 'transparent';
    }

    return dragActive
      ? Color(backgroundColorBase).lightness() > 50
        ? Color(backgroundColorBase).alpha(0.5).hexa()
        : Color(backgroundColorBase).lighten(1).alpha(0.5).hexa()
      : backgroundColorBase;
  }, [
    _isNested,
    backgroundColor,
    dragActive,
    listStyle,
    uiColors.systemBackground,
  ]);

  return color;
}
