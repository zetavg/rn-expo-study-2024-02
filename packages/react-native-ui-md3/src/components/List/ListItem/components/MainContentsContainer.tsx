import React from 'react';
import { StyleSheet, View } from 'react-native';

import {
  COMPACT_CONTAINER_PADDING_VERTICAL,
  CONTAINER_PADDING_VERTICAL,
  GRABBER_CONTAINER_WIDTH,
} from '../consts';
import type { Props as ListItemProps } from '../ListItem';
import { useListItemAnimationContext } from '../ListItemAnimationContext';

export type Props = {
  children: React.ReactNode;

  listStyle: NonNullable<ListItemProps['listStyle']>;
  listPosition: NonNullable<ListItemProps['listPosition']>;

  compact?: ListItemProps['compact'];
};

export const MainContentsContainer = ({
  children,
  listStyle,
  listPosition,
  compact,
}: Props): JSX.Element => {
  // const colors = useColors();
  const { isGrabberShown } = useListItemAnimationContext();

  return (
    <View
      style={[
        styles.container,
        compact && styles.container_compact,
        isGrabberShown && styles.container_grabberShown,
        mainContentContainerStyles[
          `${listStyle}_${listPosition}` as keyof typeof mainContentContainerStyles
        ],
        React.Children.count(children) === 1 && styles.container_onlyOneChild,
        // Border is now set in OuterContainer
        // { borderColor: colors.outlineVariant },
      ]}
    >
      {children}
    </View>
  );
};

MainContentsContainer.displayName = 'ListItem_MainContentsContainer';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: CONTAINER_PADDING_VERTICAL,
    paddingRight: 24,
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
  container_grabberShown: {
    paddingRight: 20 + GRABBER_CONTAINER_WIDTH,
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
