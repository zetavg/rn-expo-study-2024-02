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
import { useListItemAnimationContext } from '../ListItemAnimationContext';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

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

  _isNested?: ListItemProps['_isNested'];

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
  _isNested,
  backgroundColor,
}: Props): JSX.Element => {
  const bgc = useBackgroundColor({
    backgroundColor,
    dragActive,
    listStyle,
    _isNested,
  });
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

  const { contentContainerWrapperStyle, contentContainerStyle } =
    useListItemAnimationContext();

  const containerStyle = [
    styles.container,
    { minHeight },
    !!height && { height },
    loading && styles.loadingContent,
    !dragActive && { backgroundColor: bgc },
    contentContainerStyle,
  ];

  const wrapperStyle = [styles.wrapper, contentContainerWrapperStyle];

  if ((onPress || onLongPress) && !dragActive) {
    const rippleColor = Color(colors.onSurface).alpha(0.08).hexa();
    return (
      <AnimatedPressable
        unstable_pressDelay={75}
        onPress={handlePress}
        onLongPress={onLongPress}
        style={wrapperStyle}
        disabled={disabled || disableOnPress}
        android_ripple={{
          color: rippleColor,
          foreground: true,
        }}
      >
        {({ pressed }) => (
          <Animated.View style={containerStyle}>
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
      </AnimatedPressable>
    );
  }

  return (
    <Animated.View style={wrapperStyle}>
      <Animated.View style={containerStyle}>{children}</Animated.View>
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
