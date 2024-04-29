import React, { useCallback } from 'react';
import { Animated, Pressable, StyleSheet } from 'react-native';

import { useUIColors } from '../../../../contexts';
import { CONTENT_CONTAINER_GAP } from '../consts';
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

  const { contentContainerWrapperStyle, contentContainerStyle } =
    useListItemAnimationContext();

  const containerStyle = [
    styles.container,
    { minHeight },
    !!height && { height },
    contentContainerStyle,
  ];

  if ((onPress || onLongPress) && !dragActive) {
    return (
      <AnimatedPressable
        unstable_pressDelay={75}
        onPress={handlePress}
        onLongPress={onLongPress}
        style={[styles.wrapper, contentContainerWrapperStyle]}
        disabled={disabled || disableOnPress}
      >
        {({ pressed }) => (
          <Animated.View
            style={[
              ...containerStyle,
              loading && styles.loadingContent,
              { backgroundColor: pressed ? uiColors.systemGray5 : bgc },
            ]}
          >
            {children}
          </Animated.View>
        )}
      </AnimatedPressable>
    );
  }

  return (
    <Animated.View style={[styles.wrapper, contentContainerWrapperStyle]}>
      <Animated.View
        style={[
          ...containerStyle,
          loading && styles.loadingContent,
          !dragActive && { backgroundColor: bgc },
        ]}
      >
        {children}
      </Animated.View>
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
    paddingStart: 16,
    gap: CONTENT_CONTAINER_GAP,
  },
  loadingContent: {
    opacity: 0.5,
  },
});

export default ContentContainer;
