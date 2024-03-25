import React from 'react';
import { StyleSheet, View } from 'react-native';

import { IconPropsContext } from '@rnstudy/react-icons';
import { withPropDefaultValuesContext } from '@rnstudy/react-utils';

import type { Props as ListItemProps } from '../ListItem';

export type Props = {
  icon: ListItemProps['icon'];
  subtitle: ListItemProps['subtitle'];
  compact: ListItemProps['compact'];
  backgroundColor: string;
};

export const Image: React.FC<Props> = React.memo(
  ({ icon, subtitle, compact, backgroundColor }) => (
    <View style={[styles.iconContainer]}>
      {withPropDefaultValuesContext(icon, {
        iconProps: {
          value: {
            bordered: true,
            size: subtitle && !compact ? 44 : 30,
          },
          context: IconPropsContext,
        },
        backgroundColor: {
          value: backgroundColor,
          context: null,
        },
      })}
    </View>
  ),
);

Image.displayName = 'ListItem_Image';

const styles = StyleSheet.create({
  iconContainer: {
    paddingEnd: 8,
    justifyContent: 'center',
  },
});

export default Image;
