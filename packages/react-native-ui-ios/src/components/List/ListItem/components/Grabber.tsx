import React, { useEffect, useState } from 'react';
import { Animated, Pressable, StyleSheet } from 'react-native';

import { useUIColors } from '../../../../contexts';
import { GRABBER_CONTAINER_WIDTH, LAYOUT_ANIMATION_DURATION } from '../consts';
import { useBackgroundColor } from '../hooks';
import GrabberIcon from '../icons/GrabberIcon';
import type { Props as ListItemProps } from '../ListItem';
import {
  editButtonHiddenTranslateXValue,
  useListItemAnimationContext,
} from '../ListItemAnimationContext';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export type Props = {
  listStyle: ListItemProps['listStyle'];
  showGrabber: ListItemProps['showGrabber'];
  onGrabberHold: ListItemProps['onGrabberHold'];
  dragActive: ListItemProps['dragActive'];
  navigationLink: ListItemProps['navigationLink'];
  hideTrailingContents: ListItemProps['hideTrailingContents'];
  hasAccessories: boolean;
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
    navigationLink: p.navigationLink,
    hideTrailingContents: p.hideTrailingContents,
    hasAccessories: !!p.accessories,
  };
}

export const Grabber = React.memo(
  ({
    listStyle,
    showGrabber,
    onGrabberHold,
    dragActive,
    navigationLink,
    hideTrailingContents,
    hasAccessories,
    backgroundColor,
  }: Props): JSX.Element | null => {
    const uiColors = useUIColors();
    const bgc = useBackgroundColor({ backgroundColor, dragActive, listStyle });

    const [delayedHideTrailingContents, setDelayedHideTrailingContents] =
      useState(hideTrailingContents);
    useEffect(() => {
      const timer = setTimeout(
        () => {
          setDelayedHideTrailingContents(hideTrailingContents);
        },
        hideTrailingContents ? 0 : LAYOUT_ANIMATION_DURATION + 10,
      );
      return () => clearTimeout(timer);
    }, [hideTrailingContents]);

    const {
      grabberTranslateXAnim,
      renderGrabberForAnim,
      isEditButtonAnimationPlaying,
      editButtonTranslateXAnim,
    } = useListItemAnimationContext();

    if (!showGrabber && !renderGrabberForAnim) return null;

    return (
      <AnimatedPressable
        delayLongPress={80}
        onLongPress={onGrabberHold}
        style={[
          styles.grabberContainer,
          !!(navigationLink || hasAccessories) &&
            !(hideTrailingContents || delayedHideTrailingContents) &&
            styles.grabberContainer_withAccessories,
          {
            borderLeftColor: uiColors.opaqueSeparator,
          },
          isEditButtonAnimationPlaying
            ? {
                transform: [
                  {
                    translateX: Animated.add(
                      Animated.subtract(
                        grabberTranslateXAnim,
                        editButtonTranslateXAnim,
                      ),
                      editButtonHiddenTranslateXValue,
                    ),
                  },
                ],
              }
            : {
                transform: [{ translateX: grabberTranslateXAnim }],
              },
          !dragActive && { backgroundColor: bgc },
        ]}
      >
        <GrabberIcon fill={uiColors.tertiaryLabel} />
      </AnimatedPressable>
    );
  },
);

Grabber.displayName = 'ListItem_Grabber';

const styles = StyleSheet.create({
  grabberContainer: {
    position: 'absolute',
    top: StyleSheet.hairlineWidth,
    bottom: StyleSheet.hairlineWidth,
    right: 0,
    width: GRABBER_CONTAINER_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    transformOrigin: 'right',
  },
  grabberContainer_withAccessories: {
    borderLeftWidth: StyleSheet.hairlineWidth,
  },
});

export default Grabber;
