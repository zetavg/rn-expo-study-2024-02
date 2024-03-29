import React, { useCallback } from 'react';
import { Animated, Pressable, StyleSheet } from 'react-native';

import { useUIColors } from '../../../../contexts';
import { CONTENT_CONTAINER_GAP } from '../consts';
import { useBackgroundColor } from '../hooks';
import type { Props as ListItemProps } from '../ListItem';
import {
  editButtonHiddenTranslateXValue,
  useListItemAnimationContext,
} from '../ListItemAnimationContext';

export type Props = {
  children: React.ReactNode;

  listStyle: ListItemProps['listStyle'];

  minHeight: number;
  height?: number;

  onPress?: ListItemProps['onPress'];
  onLongPress?: ListItemProps['onLongPress'];

  disableOnPress?: ListItemProps['disableOnPress'];

  dragActive?: ListItemProps['dragActive'];

  backgroundColor: string;
};

export const ContentContainer = ({
  children,
  listStyle,
  minHeight,
  height,
  onPress,
  onLongPress,
  disableOnPress,
  dragActive,
  backgroundColor,
}: Props): JSX.Element => {
  const bgc = useBackgroundColor({ backgroundColor, dragActive, listStyle });
  const uiColors = useUIColors();

  const onPressTimerRef = React.useRef<null | ReturnType<typeof setTimeout>>(
    null,
  );
  const handlePress = useCallback(() => {
    if (!onPress) return;
    if (onPressTimerRef.current) return;

    // Let the UI update to the pressed state before calling the onPress handler, in case if the onPress handler took a long time to execute and hangs the UI, confusing the user if the press was handled or not.
    onPressTimerRef.current = setTimeout(() => {
      onPress();
      onPressTimerRef.current = null;
    }, 1);
  }, [onPress]);

  const { editButtonTranslateXAnim, isEditButtonAnimationPlaying } =
    useListItemAnimationContext();

  const containerStyle = [
    styles.container,
    { minHeight },
    !!height && { height },
    isEditButtonAnimationPlaying && {
      transform: [{ translateX: editButtonTranslateXAnim }],
      marginRight: editButtonHiddenTranslateXValue,
    },
  ];

  if ((onPress || onLongPress) && !dragActive) {
    return (
      <Pressable
        unstable_pressDelay={75}
        onPress={handlePress}
        onLongPress={onLongPress}
        style={styles.wrapper}
        disabled={disableOnPress}
      >
        {({ pressed }) => (
          <Animated.View
            style={[
              ...containerStyle,
              { backgroundColor: pressed ? uiColors.systemGray5 : bgc },
            ]}
          >
            {children}
          </Animated.View>
        )}
      </Pressable>
    );
  }

  return (
    <Animated.View
      style={[
        styles.wrapper,
        ...containerStyle,
        !dragActive && { backgroundColor: bgc },
      ]}
    >
      {children}
    </Animated.View>
  );
};

ContentContainer.displayName = 'ListItem_ContentContainer';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flexDirection: 'row',
    paddingLeft: 16,
    gap: CONTENT_CONTAINER_GAP,
  },
});

export default ContentContainer;
