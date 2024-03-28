import React from 'react';
import {
  Animated,
  StyleSheet,
  useWindowDimensions,
  View,
  ViewStyle,
} from 'react-native';

import { IconPropsContext } from '@rnstudy/react-icons';
import { withPropDefaultValuesContext } from '@rnstudy/react-utils';

import { useColors, useTheme } from '../../../../contexts';
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
  iconShouldAlignWithTitle: boolean;
  titleYAnim: Animated.AnimatedNode;
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
    iconShouldAlignWithTitle,
    titleYAnim,
    backgroundColor,
    style,
  }: Props): JSX.Element => {
    const windowDimensions = useWindowDimensions();
    const theme = useTheme();
    const colors = useColors();

    const iconSize =
      theme.fonts.bodyLarge.lineHeight * windowDimensions.fontScale;

    return (
      <View
        style={[
          styles.iconContainer,
          compact && styles.iconContainer_compact,
          iconShouldAlignWithTitle &&
            !subtitle &&
            styles.iconContainer_iconAlignStartWithoutSubtitle,
          style,
        ]}
      >
        {withPropDefaultValuesContext(icon, {
          iconProps: {
            value: (props) => {
              const iconShouldReallyAlignWithTitle =
                iconShouldAlignWithTitle && !props.backgroundColor;
              return {
                align: iconShouldReallyAlignWithTitle
                  ? ('start' as const)
                  : ('center' as const),
                mt: iconShouldReallyAlignWithTitle ? titleYAnim : undefined,
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
    // paddingVertical: CONTAINER_PADDING_VERTICAL,
  },
  iconContainer_compact: {
    // paddingVertical: COMPACT_CONTAINER_PADDING_VERTICAL,
  },
  iconContainer_iconAlignStartWithoutSubtitle: {
    // paddingVertical: COMPACT_CONTAINER_PADDING_VERTICAL + 4,
  },
});

export default Image;
