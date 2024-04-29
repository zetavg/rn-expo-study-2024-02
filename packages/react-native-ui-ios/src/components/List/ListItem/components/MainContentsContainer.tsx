import React from 'react';
import { Animated, StyleSheet } from 'react-native';

import { useUIColors } from '../../../../contexts';
import {
  MAIN_CONTENTS_CONTAINER_PADDING_END,
  SEPARATOR_COLOR_NAME,
} from '../consts';
import type { Props as ListItemProps } from '../ListItem';
import { useListItemAnimationContext } from '../ListItemAnimationContext';

export type Props = {
  children: React.ReactNode;

  listStyle: NonNullable<ListItemProps['listStyle']>;
  listPosition: NonNullable<ListItemProps['listPosition']>;
  dragActive?: ListItemProps['dragActive'];
};

export const MainContentsContainer = ({
  children,
  listStyle,
  listPosition,
  dragActive,
}: Props): JSX.Element => {
  const uiColors = useUIColors();

  const { mainContentsContainerStyle } = useListItemAnimationContext();

  const borderColor = uiColors[SEPARATOR_COLOR_NAME];

  return (
    <Animated.View
      style={[
        styles.container,
        (listStyle === 'plain'
          ? mainContentContainerStyles_plain
          : mainContentContainerStyles)[listPosition],
        dragActive && mainContentContainerStyles.dragActive,
        { borderColor },
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
    paddingEnd: MAIN_CONTENTS_CONTAINER_PADDING_END,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mainContentContainerStyles = StyleSheet.create({
  first: {},
  middle: {
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  last: {
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  only: {},
  dragActive: { borderTopWidth: 0, borderBottomWidth: 0 },
});

const mainContentContainerStyles_plain = StyleSheet.create({
  first: {
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  middle: {
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  last: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  only: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default MainContentsContainer;
