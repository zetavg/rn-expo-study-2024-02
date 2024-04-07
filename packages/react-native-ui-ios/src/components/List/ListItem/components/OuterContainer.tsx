import React from 'react';
import { StyleSheet, View } from 'react-native';
import Color from 'color';
import { BlurView } from 'expo-blur';

import { useUIColors } from '../../../../contexts';
import { useBackgroundColor } from '../hooks';
import type { Props as ListItemProps } from '../ListItem';

export type Props = {
  children: React.ReactNode;

  listStyle: NonNullable<ListItemProps['listStyle']>;
  listPosition: NonNullable<ListItemProps['listPosition']>;

  dragActive?: ListItemProps['dragActive'];

  backgroundColor: string;
};

export const OuterContainer = ({
  children,
  listStyle,
  listPosition,
  dragActive,
  backgroundColor,
}: Props): JSX.Element => {
  const uiColors = useUIColors();

  return (
    <View
      style={[
        styles.container,
        containerStyles[listStyle],
        containerStyles[`${listStyle}_${listPosition}`],
        containerBorderRadiusStyles[listStyle],
        containerBorderRadiusStyles[`${listStyle}_${listPosition}`],
        {
          backgroundColor: useBackgroundColor({
            backgroundColor,
            listStyle,
            dragActive,
          }),
          borderColor: uiColors.opaqueSeparator,
        },
        dragActive && dragActiveStyles.default,
        dragActive &&
          dragActiveStyles[
            Color(backgroundColor).lightness() > 50 ? 'light' : 'dark'
          ],
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
          <BlurView
            tint={
              Color(backgroundColor).lightness() > 50 ? 'extraLight' : 'dark'
            }
            style={styles.backgroundBlurView}
          />
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
  grouped_first: {
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  grouped_middle: {},
  grouped_last: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  grouped_only: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

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
