import React from 'react';
import { Animated, StyleSheet, View, ViewStyle } from 'react-native';

import { IconPropsContext } from '@rnstudy/react-icons';
import { withPropDefaultValuesContext } from '@rnstudy/react-utils';

import type { Props as ListItemProps } from '../ListItem';

export type Props = {
  image?: ListItemProps['image'];
  subtitle?: ListItemProps['subtitle'];
  compact?: ListItemProps['compact'];
  backgroundColor: string;
  style?: React.ComponentProps<(typeof Animated)['View']>['style'];
};

export const Image = ({
  image,
  subtitle,
  compact,
  backgroundColor,
  style,
}: Props): JSX.Element => (
  <Animated.View style={[styles.iconContainer, style]}>
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

Image.displayName = 'ListItem_Image';

const styles = StyleSheet.create({
  iconContainer: {
    paddingEnd: 8,
    justifyContent: 'center',
  },
});

export default Image;
