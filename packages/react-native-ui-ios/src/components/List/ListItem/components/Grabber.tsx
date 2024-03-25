import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  PixelRatio,
  Pressable,
  StyleSheet,
  Text as RNText,
  useWindowDimensions,
  View,
} from 'react-native';
import {
  Gesture,
  GestureDetector,
  HandlerStateChangeEvent,
  PanGestureHandler,
  State,
} from 'react-native-gesture-handler';
import Color from 'color';
import { BlurView } from 'expo-blur';

import { IconPropsContext } from '@rnstudy/react-icons';
import { withPropDefaultValuesContext } from '@rnstudy/react-utils';

import { useColors, useTextStyles, useUIColors } from '../../../../contexts';
import { Colors } from '../../../../tokens/colors/types';
import { textStyles } from '../../../../tokens/text-styles';
import BackgroundColor from '../../../BackgroundColor';
import Select, { SelectPropsContext } from '../../../Select';
import Text, { TextPropsContext } from '../../../Text';
import { GRABBER_CONTAINER_WIDTH, LAYOUT_ANIMATION_DURATION } from '../consts';
import { useBackgroundColor } from '../hooks';
import AddButton from '../icons/AddButton';
import DrillInIcon from '../icons/DrillInIcon';
import GrabberIcon from '../icons/GrabberIcon';
import RemoveButton from '../icons/RemoveButton';
import SelectedButton from '../icons/SelectedButton';
import UnselectedButton from '../icons/UnselectedButton';
import type { Props as ListItemProps } from '../ListItem';
import {
  ListItemAnimationContext,
  useListItemAnimationContext,
} from '../ListItemAnimationContext';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export type Props = {
  listStyle: ListItemProps['listStyle'];
  showGrabber: ListItemProps['showGrabber'];
  onGrabberActive: ListItemProps['onGrabberActive'];
  dragActive: ListItemProps['dragActive'];
  navigationLink: ListItemProps['navigationLink'];
  hasAccessories: boolean;
  backgroundColor: string;
};

export const Grabber = React.memo(
  ({
    listStyle,
    showGrabber,
    onGrabberActive,
    dragActive,
    navigationLink,
    hasAccessories,
    backgroundColor,
  }: Props): JSX.Element | null => {
    const uiColors = useUIColors();
    const bgc = useBackgroundColor({ backgroundColor, dragActive, listStyle });

    const { grabberTranslateXAnim, renderGrabberForAnim } =
      useListItemAnimationContext();

    if (!showGrabber && !renderGrabberForAnim) return null;

    return (
      <AnimatedPressable
        delayLongPress={80}
        onLongPress={() => {
          onGrabberActive?.();
        }}
        style={[
          styles.grabberContainer,
          !!(navigationLink || hasAccessories) &&
            styles.grabberContainer_withAccessories,
          {
            borderLeftColor: uiColors.opaqueSeparator,
            transform: [{ translateX: grabberTranslateXAnim }],
          },
          dragActive && styles.grabberContainer_dragActive,
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
    top: 1,
    bottom: 1,
    right: 0,
    width: GRABBER_CONTAINER_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    transformOrigin: 'right',
  },
  grabberContainer_withAccessories: {
    borderLeftWidth: StyleSheet.hairlineWidth,
  },
  grabberContainer_dragActive: {
    // Hack: the BlurView adds a mysterious padding on the right side of the grabber, so we need to compensate for it.
    // marginRight: -4,
  },
});

export default Grabber;
