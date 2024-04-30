import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';

import { invertedListPosition } from '@rnstudy/react-utils';

import { useColors, useColorScheme } from '../../../../contexts';
import { SEPARATOR_COLOR_NAME } from '../consts';
import { useBackgroundColor } from '../hooks';
import type { Props as ListItemProps } from '../ListItem';

export type Props = {
  children: React.ReactNode;

  listStyle: NonNullable<ListItemProps['listStyle']>;
  listPosition: NonNullable<ListItemProps['listPosition']>;

  dragActive?: ListItemProps['dragActive'];

  inverted?: ListItemProps['inverted'];

  _isInListComponent?: ListItemProps['_isInListComponent'];
  _isNested?: ListItemProps['_isNested'];

  backgroundColor: string;
};

export const OuterContainer = ({
  children,
  listStyle,
  listPosition: listPositionProp,
  dragActive,
  inverted,
  backgroundColor,
  _isInListComponent,
  _isNested,
}: Props): JSX.Element => {
  const colorScheme = useColorScheme();
  const colors = useColors();

  const listItemBackgroundColor = useBackgroundColor({
    backgroundColor,
    listStyle,
    dragActive,
    _isNested,
  });

  const listPosition = inverted
    ? invertedListPosition(listPositionProp)
    : listPositionProp;

  return (
    <View
      style={[
        styles.container,
        !_isInListComponent && [
          containerStyles[listStyle],
          containerStyles[`${listStyle}_${listPosition}`],
          containerBorderRadiusStyles[listStyle],
          containerBorderRadiusStyles[`${listStyle}_${listPosition}`],
          dragActive && dragActiveStyles.default,
          dragActive && dragActiveStyles[colorScheme],
          {
            backgroundColor: listItemBackgroundColor,
          },
        ],
        containerStylesForSeparator[listStyle],
        containerStylesForSeparator[`${listStyle}_${listPosition}`],
        {
          borderColor: colors[SEPARATOR_COLOR_NAME],
        },
      ]}
    >
      {children}
    </View>
  );
};

OuterContainer.displayName = 'ListItemMD3_OuterContainer';

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    overflow: 'hidden',
  },
});

export const containerStyles = StyleSheet.create({
  plain: {
    backgroundColor: 'transparent',
  },
  plain_first: {},
  plain_middle: {},
  plain_last: {},
  plain_only: {},

  grouped: {},
  grouped_first: {},
  grouped_middle: {},
  grouped_last: {},
  grouped_only: {},

  insetGrouped: {
    marginHorizontal: 16,
  },
  insetGrouped_first: {},
  insetGrouped_middle: {},
  insetGrouped_last: {},
  insetGrouped_only: {},
});

const containerStylesForSeparator = StyleSheet.create({
  plain: {},
  plain_first: {},
  plain_middle: {},
  plain_last: {},
  plain_only: {},

  grouped: {},
  grouped_first: {},
  grouped_middle: {},
  grouped_last: {},
  grouped_only: {},

  insetGrouped: {},
  insetGrouped_first: {},
  insetGrouped_middle: {
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  insetGrouped_last: {
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  insetGrouped_only: {},
});

export const containerBorderRadiusStyles = StyleSheet.create({
  plain: {},
  plain_first: {},
  plain_middle: {},
  plain_last: {},
  plain_only: {},

  grouped: {},
  grouped_first: {},
  grouped_middle: {},
  grouped_last: {},
  grouped_only: {},

  insetGrouped: {
    borderRadius: 16,
  },
  insetGrouped_first: {
    borderBottomStartRadius: 0,
    borderBottomEndRadius: 0,
  },
  insetGrouped_middle: {
    borderRadius: 0,
  },
  insetGrouped_last: {
    borderTopStartRadius: 0,
    borderTopEndRadius: 0,
  },
  insetGrouped_only: {},
});

const dragActiveStyles = StyleSheet.create({
  default: {
    borderTopWidth: 0,
    ...Platform.select({
      android: {
        elevation: 10,
      },
      ios: {
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 10,
        overflow: 'visible', // Let shadow be visible outside of the container
      },
    }),
  },
  light: {},
  dark: {},
});

export default OuterContainer;
