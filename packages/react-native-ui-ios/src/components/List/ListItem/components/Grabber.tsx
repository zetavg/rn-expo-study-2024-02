import React from 'react';
import { Animated, Pressable, StyleSheet } from 'react-native';

import { useUIColors } from '../../../../contexts';
import { GRABBER_CONTAINER_WIDTH } from '../consts';
import { useBackgroundColor } from '../hooks';
import GrabberIcon from '../icons/GrabberIcon';
import type { Props as ListItemProps } from '../ListItem';
import {
  hasTrailingContents,
  useListItemAnimationContext,
} from '../ListItemAnimationContext';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export type Props = {
  listStyle: ListItemProps['listStyle'];
  showGrabber: ListItemProps['showGrabber'];
  onGrabberHold: ListItemProps['onGrabberHold'];
  dragActive: ListItemProps['dragActive'];
  _isNested: ListItemProps['_isNested'];
  _htc: boolean;
  backgroundColor: string;
};

export function propsSelector(
  p: ListItemProps,
): Omit<Props, 'backgroundColor'> {
  return {
    listStyle: p.listStyle,
    showGrabber: p.showGrabber,
    onGrabberHold: p.onGrabberHold,
    dragActive: p.dragActive,
    _isNested: p._isNested,
    _htc: hasTrailingContents(p),
  };
}

export const Grabber = React.memo(
  ({
    listStyle,
    showGrabber,
    onGrabberHold,
    dragActive,
    _isNested,
    _htc,
    backgroundColor,
  }: Props): JSX.Element | null => {
    const uiColors = useUIColors();
    const bgc = useBackgroundColor({
      backgroundColor,
      dragActive,
      listStyle,
      _isNested,
    });

    const { shouldRenderGrabber, grabberStyle, grabberWrapperStyle } =
      useListItemAnimationContext();

    if (!showGrabber && !shouldRenderGrabber) return null;

    return (
      <Animated.View style={[styles.grabberWrapper, grabberWrapperStyle]}>
        <AnimatedPressable
          delayLongPress={80}
          onLongPress={onGrabberHold}
          style={[
            styles.grabberContainer,
            _htc && styles.grabberContainer_withTrailingContents,
            {
              borderLeftColor: uiColors.opaqueSeparator,
            },
            grabberStyle,
            !dragActive && { backgroundColor: bgc },
          ]}
        >
          <GrabberIcon fill={uiColors.tertiaryLabel} />
        </AnimatedPressable>
      </Animated.View>
    );
  },
);

Grabber.displayName = 'ListItem_Grabber';

const styles = StyleSheet.create({
  grabberWrapper: {
    position: 'absolute',
    top: StyleSheet.hairlineWidth,
    bottom: StyleSheet.hairlineWidth,
    end: 0,
  },
  grabberContainer: {
    flex: 1,
    width: GRABBER_CONTAINER_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    transformOrigin: 'right',
  },
  grabberContainer_withTrailingContents: {
    borderLeftWidth: StyleSheet.hairlineWidth,
  },
});

export default Grabber;
