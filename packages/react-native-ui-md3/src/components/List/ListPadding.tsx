import React from 'react';
import { View } from 'react-native';

import { useColors } from '../../contexts';

import { SEPARATOR_COLOR_NAME } from './ListItem/consts';
import { DEFAULT_LIST_STYLE } from './consts';
import { styles as listStyles } from './List';
import { getListPadding, ListPaddingConditions } from './utils';

type Props = ListPaddingConditions;

export function ListPadding(props: Props) {
  const { listStyle = DEFAULT_LIST_STYLE } = props;
  const colors = useColors();
  const itemSeparatorColor = colors[SEPARATOR_COLOR_NAME];

  return (
    <View
      style={[
        getPaddingStyle(props),

        listStyle === 'plain' &&
          props.position === 'top' &&
          !props.first && [
            { borderColor: itemSeparatorColor },
            listStyles.plainListNotFirstBorder,
          ],
      ]}
    />
  );
}

function getPaddingStyle(props: Props) {
  return {
    height: getListPadding(props),
  };
}

export default ListPadding;
