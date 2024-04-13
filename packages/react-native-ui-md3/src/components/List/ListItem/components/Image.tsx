import React, { useCallback, useEffect, useRef } from 'react';
import {
  Animated,
  LayoutChangeEvent,
  StyleSheet,
  useWindowDimensions,
  ViewStyle,
} from 'react-native';

import { IconPropsContext } from '@rnstudy/react-icons';
import { withPropDefaultValuesContext } from '@rnstudy/react-utils';

import { useColors, useTheme } from '../../../../contexts';
import type { Props as ListItemProps } from '../ListItem';

export type Props = {
  image?: ListItemProps['image'];
  subtitle?: ListItemProps['subtitle'];
  compact?: ListItemProps['compact'];
  imageShouldAlignWithTitle: boolean;
  titleTextYAnim: Animated.AnimatedNode;
  titleTextHeightAnim: Animated.AnimatedNode;
  backgroundColor: string;
  style?: ViewStyle;
};

export const Image = React.memo(
  ({
    image,
    subtitle,
    compact,
    imageShouldAlignWithTitle,
    titleTextYAnim,
    titleTextHeightAnim,
    backgroundColor,
    style,
  }: Props): JSX.Element => {
    const windowDimensions = useWindowDimensions();
    const theme = useTheme();
    const colors = useColors();

    const iconSize =
      theme.fonts.bodyLarge.lineHeight * windowDimensions.fontScale;

    const imageHeightAnim = useRef(new Animated.Value(0)).current;

    const handleImageLayout = useCallback(
      (event: LayoutChangeEvent) => {
        imageHeightAnim.setValue(event.nativeEvent.layout.height);
      },
      [imageHeightAnim],
    );

    /** Used to eliminate the image flicker when aligning with the title. */
    const imageOpacityForAlignWithTitleAnim = useRef(
      new Animated.Value(imageShouldAlignWithTitle ? 0 : 1),
    ).current;
    useEffect(() => {
      Animated.timing(imageOpacityForAlignWithTitleAnim, {
        toValue: 1,
        duration: 150,
        delay: 50,
        useNativeDriver: true,
      }).start();
    }, [imageOpacityForAlignWithTitleAnim]);

    return (
      <Animated.View
        style={[
          styles.imageContainer,
          imageShouldAlignWithTitle && [
            styles.imageContainer_alignedWithTitle,
            {
              transform: [
                {
                  translateY: Animated.subtract(
                    Animated.add(
                      titleTextYAnim,
                      Animated.divide(titleTextHeightAnim, 2),
                    ),
                    Animated.divide(imageHeightAnim, 2),
                  ),
                },
              ],
              opacity: imageOpacityForAlignWithTitleAnim,
            },
          ],
          style,
        ]}
        onLayout={handleImageLayout}
      >
        {withPropDefaultValuesContext(image, {
          iconProps: {
            value: (props) => {
              return {
                color: colors.onSurfaceVariant,
                size: !props.backgroundColor
                  ? iconSize
                  : iconSize + (subtitle && !compact ? 12 : 8),
                bordered: !!props.backgroundColor,
              };
            },
            context: IconPropsContext,
          },
          backgroundColor: {
            value: backgroundColor,
            context: null,
          },
        })}
      </Animated.View>
    );
  },
);

Image.displayName = 'ListItem_Image';

const styles = StyleSheet.create({
  imageContainer: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer_alignedWithTitle: {
    alignSelf: 'flex-start',
  },
});

export default Image;
