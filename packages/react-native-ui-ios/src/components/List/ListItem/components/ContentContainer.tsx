import React, { useCallback } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { useUIColors } from '../../../../contexts';
import { useBackgroundColor } from '../hooks';
import type { Props as ListItemProps } from '../ListItem';

export type Props = {
  children: React.ReactNode;

  listStyle: ListItemProps['listStyle'];

  minHeight: number;
  height?: number;

  onPress: ListItemProps['onPress'];
  onLongPress: ListItemProps['onLongPress'];

  dragActive: ListItemProps['dragActive'];

  backgroundColor: string;
};

export const ContentContainer = ({
  children,
  listStyle,
  minHeight,
  height,
  onPress,
  onLongPress,
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

  const containerStyle = [
    styles.container,
    { minHeight },
    !!height && { height },
  ];

  if ((onPress || onLongPress) && !dragActive) {
    return (
      <Pressable
        unstable_pressDelay={75}
        onPress={handlePress}
        onLongPress={onLongPress}
        style={styles.wrapper}
      >
        {({ pressed }) => (
          <View
            style={[
              ...containerStyle,
              { backgroundColor: pressed ? uiColors.systemGray5 : bgc },
            ]}
          >
            {children}
          </View>
        )}
      </Pressable>
    );
  }

  return (
    <View
      style={[
        styles.wrapper,
        ...containerStyle,
        !dragActive && { backgroundColor: bgc },
      ]}
    >
      {children}
    </View>
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
    gap: 4,
  },
});

export default ContentContainer;
