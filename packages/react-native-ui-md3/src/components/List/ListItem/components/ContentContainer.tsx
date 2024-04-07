import React, { useCallback } from 'react';
import { Animated, Platform, Pressable, StyleSheet, View } from 'react-native';
import Color from 'color';

import { useColors } from '../../../../contexts';
import {
  CONTENT_CONTAINER_GAP,
  CONTENT_CONTAINER_PADDING_START,
} from '../consts';
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

  disabled?: ListItemProps['disabled'];
  disableOnPress?: ListItemProps['disableOnPress'];

  loading?: ListItemProps['loading'];

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
  disabled,
  disableOnPress,
  loading,
  dragActive,
  backgroundColor,
}: Props): JSX.Element => {
  const bgc = useBackgroundColor({ backgroundColor, dragActive, listStyle });
  const colors = useColors();

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
    const rippleColor = Color(colors.onSurface).alpha(0.08).hexa();
    return (
      <Pressable
        unstable_pressDelay={75}
        onPress={handlePress}
        onLongPress={onLongPress}
        style={styles.wrapper}
        disabled={disabled || disableOnPress}
        android_ripple={{
          color: rippleColor,
          foreground: true,
        }}
      >
        {({ pressed }) => (
          <Animated.View
            style={[
              ...containerStyle,
              loading && styles.loadingContent,
              { backgroundColor: bgc },
            ]}
          >
            {children}
            {pressed && Platform.OS !== 'android' && (
              <View
                style={[
                  StyleSheet.absoluteFill,
                  { backgroundColor: rippleColor },
                ]}
              />
            )}
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
        loading && styles.loadingContent,
        !dragActive && { backgroundColor: bgc },
      ]}
    >
      {children}
    </Animated.View>
  );
};

ContentContainer.displayName = 'ListItemMD3_ContentContainer';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingStart: CONTENT_CONTAINER_PADDING_START,
    gap: CONTENT_CONTAINER_GAP,
  },
  loadingContent: {
    opacity: 0.5,
  },
});

export default ContentContainer;
