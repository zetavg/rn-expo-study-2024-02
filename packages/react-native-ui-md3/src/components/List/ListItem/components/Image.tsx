import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

import { IconPropsContext } from '@rnstudy/react-icons';
import { withPropDefaultValuesContext } from '@rnstudy/react-utils';

import { useColors } from '../../../../contexts';
import {
  COMPACT_CONTAINER_PADDING_VERTICAL,
  CONTAINER_PADDING_VERTICAL,
} from '../consts';
import type { Props as ListItemProps } from '../ListItem';

export type Props = {
  icon?: ListItemProps['icon'];
  subtitle?: ListItemProps['subtitle'];
  singleLine?: ListItemProps['singleLine'];
  compact?: ListItemProps['compact'];
  children?: ListItemProps['children'];
  alignIconWithTitle?: ListItemProps['alignIconWithTitle'];
  backgroundColor: string;
  style?: ViewStyle;
};

export const Image = React.memo(
  ({
    icon,
    subtitle,
    singleLine,
    compact,
    children,
    alignIconWithTitle,
    backgroundColor,
    style,
  }: Props): JSX.Element => {
    const colors = useColors();

    const iconAlignStart = !singleLine || !!(children && alignIconWithTitle);

    return (
      <View
        style={[
          styles.iconContainer,
          compact && styles.iconContainer_compact,
          iconAlignStart &&
            !subtitle &&
            styles.iconContainer_iconAlignStartWithoutSubtitle,
          style,
        ]}
      >
        {withPropDefaultValuesContext(icon, {
          iconProps: {
            value: {
              align: iconAlignStart ? 'start' : 'center',
              color: colors.onSurfaceVariant,
              size: 24,
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
  },
);

Image.displayName = 'ListItem_Image';

const styles = StyleSheet.create({
  iconContainer: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: CONTAINER_PADDING_VERTICAL,
  },
  iconContainer_compact: {
    paddingVertical: COMPACT_CONTAINER_PADDING_VERTICAL,
  },
  iconContainer_iconAlignStartWithoutSubtitle: {
    paddingVertical: COMPACT_CONTAINER_PADDING_VERTICAL + 4,
  },
});

export default Image;
