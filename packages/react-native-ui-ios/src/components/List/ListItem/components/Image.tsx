import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

import { IconPropsContext } from '@rnstudy/react-icons';
import { withPropDefaultValuesContext } from '@rnstudy/react-utils';

import type { Props as ListItemProps } from '../ListItem';

export type Props = {
  icon?: ListItemProps['icon'];
  subtitle?: ListItemProps['subtitle'];
  compact?: ListItemProps['compact'];
  backgroundColor: string;
  style?: ViewStyle;
};

export const Image = ({
  icon,
  subtitle,
  compact,
  backgroundColor,
  style,
}: Props): JSX.Element => (
  <View style={[styles.iconContainer, style]}>
    {withPropDefaultValuesContext(icon, {
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
  </View>
);

Image.displayName = 'ListItem_Image';

const styles = StyleSheet.create({
  iconContainer: {
    paddingEnd: 8,
    justifyContent: 'center',
  },
});

export default Image;
