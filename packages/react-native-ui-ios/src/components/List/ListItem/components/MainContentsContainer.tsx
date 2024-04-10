import React from 'react';
import { StyleSheet, View } from 'react-native';

import { useGroupLevel, useUIColors } from '../../../../contexts';
import { useIsElevatedBackground } from '../../../../contexts/IsElevatedBackgroundContext';
import { GRABBER_CONTAINER_WIDTH } from '../consts';
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

  const { isGrabberShown } = useListItemAnimationContext();

  // Hack: according to Figma spec, this should be `opaqueSeparator`, but seems that the opaqueSeparator color is not displayed correctly when used as a border color with hairline width in React Native, especially in dark mode with elevated background. With our experiments on some iOS devices, using the separator color (aka "Non-opaque separator color") will actually produce the correct color that matches the Figma spec.
  const borderColor = uiColors.separator;

  return (
    <View
      style={[
        styles.container,
        isGrabberShown && styles.container_grabberShown,
        (listStyle === 'plain'
          ? mainContentContainerStyles_plain
          : mainContentContainerStyles)[listPosition],
        dragActive && mainContentContainerStyles.dragActive,
        { borderColor },
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
    paddingRight: 16,
    justifyContent: 'center',
  },
  container_grabberShown: {
    paddingRight: 8 + GRABBER_CONTAINER_WIDTH,
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
