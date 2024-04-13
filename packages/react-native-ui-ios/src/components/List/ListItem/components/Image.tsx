import React, { useCallback, useEffect, useRef } from 'react';
import { Animated, LayoutChangeEvent, StyleSheet } from 'react-native';

import { IconPropsContext } from '@rnstudy/react-icons';
import { withPropDefaultValuesContext } from '@rnstudy/react-utils';

import type { Props as ListItemProps } from '../ListItem';

export type Props = {
  image?: ListItemProps['image'];
  alignImageWithTitle?: ListItemProps['alignImageWithTitle'];
  subtitle?: ListItemProps['subtitle'];
  compact?: ListItemProps['compact'];
  backgroundColor: string;
  style?: React.ComponentProps<(typeof Animated)['View']>['style'];
  titleAndTrailingContentsContainerHeightAnim: Animated.AnimatedNode;
  titleAndTrailingContentsContainerYAnim: Animated.AnimatedNode;
  _isNested?: ListItemProps['_isNested'];
};

export const Image = ({
  image,
  alignImageWithTitle,
  subtitle,
  compact,
  backgroundColor,
  style,
  titleAndTrailingContentsContainerHeightAnim,
  titleAndTrailingContentsContainerYAnim,
  _isNested,
}: Props): JSX.Element => {
  const imageHeightAnim = useRef(new Animated.Value(0)).current;

  const handleImageLayout = useCallback(
    (event: LayoutChangeEvent) => {
      imageHeightAnim.setValue(event.nativeEvent.layout.height);
    },
    [imageHeightAnim],
  );

  /** Used to eliminate the image flicker when aligning with the title. */
  const imageOpacityForAlignWithTitleAnim = useRef(
    new Animated.Value(
      alignImageWithTitle
        ? 1 /* Should be `0`, but seems that layouts is performant on iOS so this is not needed. */
        : 1,
    ),
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
      onLayout={handleImageLayout}
      style={[
        styles.imageContainer,
        alignImageWithTitle && [
          styles.imageContainer_alignedWithTitle,
          {
            transform: [
              {
                translateY: Animated.subtract(
                  Animated.add(
                    titleAndTrailingContentsContainerYAnim,
                    Animated.divide(
                      titleAndTrailingContentsContainerHeightAnim,
                      2,
                    ),
                  ),
                  Animated.divide(imageHeightAnim, 2),
                ),
              },
            ],
            opacity: imageOpacityForAlignWithTitleAnim,
          },
        ],
        _isNested && styles.imageContainer_isInNestedList,
        style,
      ]}
    >
      {withPropDefaultValuesContext(image, {
        iconProps: {
          value: {
            color: 'gray',
            bordered: true,
            size: subtitle && !compact ? 44 : 30,
            mv: 5,
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
};

Image.displayName = 'ListItem_Image';

const styles = StyleSheet.create({
  imageContainer: {
    paddingEnd: 8,
    justifyContent: 'center',
  },
  imageContainer_alignedWithTitle: {
    alignSelf: 'flex-start',
  },
  imageContainer_isInNestedList: {
    marginStart: -8,
  },
});

export default Image;
