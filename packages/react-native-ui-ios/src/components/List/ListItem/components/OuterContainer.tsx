import React from 'react';
import { StyleSheet, View } from 'react-native';
import { BlurView } from 'expo-blur';

import { invertedListPosition } from '@rnstudy/react-utils';

import { useUIColors } from '../../../../contexts';
import { useColorSchemeType } from '../../../../contexts/tokens/ColorSchemeTypeContext';
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
  const uiColors = useUIColors();
  const colorSchemeType = useColorSchemeType();

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
          {
            backgroundColor: listItemBackgroundColor,
          },
        ],
        {
          borderColor: uiColors[SEPARATOR_COLOR_NAME],
        },
        dragActive && dragActiveStyles.default,
        dragActive && dragActiveStyles[colorSchemeType],
      ]}
    >
      {dragActive && (
        <View
          style={[
            containerBorderRadiusStyles[listStyle],
            containerBorderRadiusStyles[`${listStyle}_${listPosition}`],
            styles.backgroundBlurViewContainer,
          ]}
        >
          <BlurView tint={colorSchemeType} style={styles.backgroundBlurView} />
        </View>
      )}
      {children}
    </View>
  );
};

OuterContainer.displayName = 'ListItem_OuterContainer';

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    overflow: 'hidden',
  },
  backgroundBlurViewContainer: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  backgroundBlurView: {
    flex: 1,
  },
  noBackground: {
    backgroundColor: 'transparent',
  },
});

export const containerStyles = StyleSheet.create({
  plain: {},
  plain_first: {},
  plain_middle: {},
  plain_last: {},
  plain_only: {},

  grouped: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  grouped_first: {
    borderBottomWidth: 0,
  },
  grouped_middle: {
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  grouped_last: {
    borderTopWidth: 0,
  },
  grouped_only: {},

  insetGrouped: {
    marginHorizontal: 16,
  },
  insetGrouped_first: {},
  insetGrouped_middle: {},
  insetGrouped_last: {},
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
    borderRadius: 10,
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
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 18,
    overflow: 'visible', // Let shadow be visible outside of the container
  },
  light: {},
  dark: {
    shadowOpacity: 0.8,
  },
});

export default OuterContainer;
