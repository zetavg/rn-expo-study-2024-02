import React from 'react';
import { Animated, StyleSheet } from 'react-native';

import { invertedListPosition } from '@rnstudy/react-utils';

import {
  COMPACT_CONTAINER_PADDING_VERTICAL,
  CONTAINER_PADDING_END,
  CONTAINER_PADDING_VERTICAL,
} from '../consts';
import type { Props as ListItemProps } from '../ListItem';
import { useListItemAnimationContext } from '../ListItemAnimationContext';

export type Props = {
  children: React.ReactNode;

  listStyle: NonNullable<ListItemProps['listStyle']>;
  listPosition: NonNullable<ListItemProps['listPosition']>;

  compact?: ListItemProps['compact'];

  inverted?: ListItemProps['inverted'];
};

export const MainContentsContainer = ({
  children,
  listStyle,
  listPosition: listPositionProp,
  compact,
  inverted,
}: Props): JSX.Element => {
  const { mainContentsContainerStyle } = useListItemAnimationContext();

  const listPosition = inverted
    ? invertedListPosition(listPositionProp)
    : listPositionProp;

  return (
    <Animated.View
      style={[
        styles.container,
        compact && styles.container_compact,
        mainContentContainerStyles[
          `${listStyle}_${listPosition}` as keyof typeof mainContentContainerStyles
        ],
        React.Children.count(children) === 1 && styles.container_onlyOneChild,
        // Border is now set in OuterContainer
        // { borderColor: colors.outlineVariant },
        mainContentsContainerStyle,
      ]}
    >
      {children}
    </Animated.View>
  );
};

MainContentsContainer.displayName = 'ListItem_MainContentsContainer';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: CONTAINER_PADDING_VERTICAL,
    paddingEnd: CONTAINER_PADDING_END,
    gap: 5,
  },
  container_onlyOneChild: {
    // justifyContent: 'center' is not working properly on Android, so if there is only one child, switch to flexDirection: 'row' and use alignItems: 'center' for vertical centering.
    flexDirection: 'row',
    alignItems: 'center',
  },
  container_compact: {
    paddingVertical: COMPACT_CONTAINER_PADDING_VERTICAL,
  },
});

const mainContentContainerStyles = StyleSheet.create({
  insetGrouped_first: {},
  insetGrouped_middle: {
    // Border is now set in OuterContainer
    // borderTopWidth: StyleSheet.hairlineWidth,
  },
  insetGrouped_last: {
    // Border is now set in OuterContainer
    // borderTopWidth: StyleSheet.hairlineWidth,
  },
  insetGrouped_only: {},
});

export default MainContentsContainer;
