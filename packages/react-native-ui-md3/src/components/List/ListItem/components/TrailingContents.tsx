import React from 'react';
import { StyleSheet, View } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Icon, IconPropsContext } from '@rnstudy/react-icons';
import { withPropDefaultValuesContext } from '@rnstudy/react-utils';

import { useColors, useTheme } from '../../../../contexts';
import { SelectProps, SelectPropsContext } from '../../../Select';
import Text, { TextPropsContext } from '../../../Text';
import { TextInputPropsContext } from '../../../TextInput';
import type { Props as ListItemProps } from '../ListItem';
import { useListItemAnimationContext } from '../ListItemAnimationContext';
export type Props = {
  accessories: ListItemProps['accessories'];
  detail: ListItemProps['detail'];
  checked: ListItemProps['checked'];
  singleLine: ListItemProps['singleLine'];
  accessoriesContainsTextInput: ListItemProps['accessoriesContainsTextInput'];
  compact: ListItemProps['compact'];
  hasSubtitle: boolean;
  hide?: boolean;
};

export function propsSelector(p: ListItemProps): Omit<Props, 'hide'> {
  return {
    accessories: p.accessories,
    detail: p.detail,
    checked: p.checked,
    singleLine: p.singleLine,
    accessoriesContainsTextInput: p.accessoriesContainsTextInput,
    compact: p.compact,
    hasSubtitle: !!p.subtitle,
  };
}

export const TrailingContents = React.memo(
  ({
    accessories,
    detail,
    checked,
    singleLine,
    accessoriesContainsTextInput,
    compact,
    hasSubtitle,
    hide,
  }: Props): JSX.Element | null => {
    const { delayedHideTrailingContents } = useListItemAnimationContext();
    const theme = useTheme();
    const colors = useColors();

    const hasSubtitleAndNotCompact = hasSubtitle && !compact;

    const trailingContents = (() => {
      if (accessories) {
        return withPropDefaultValuesContext(accessories, {
          textProps: {
            value: TRAILING_DETAIL_TEXT_PROPS,
            context: TextPropsContext,
          },
          textInputProps: {
            value: TRAILING_ACCESSORIES_TEXT_INPUT_PROPS,
            context: TextInputPropsContext,
          },
          selectProps: {
            value: {
              ...TRAILING_ACCESSORIES_SELECT_PROPS,
              textProps: {
                ...TRAILING_ACCESSORIES_SELECT_PROPS.textProps,
                style: [
                  TRAILING_ACCESSORIES_SELECT_PROPS.textProps?.style,
                  { lineHeight: theme.fonts.bodyLarge.lineHeight },
                ],
              },
            },
            context: SelectPropsContext,
          },
          iconProps: {
            value: hasSubtitleAndNotCompact
              ? TALL_TRAILING_ACCESSORIES_ICON_PROPS
              : TRAILING_ACCESSORIES_ICON_PROPS,
            context: IconPropsContext,
          },
        });
      }

      if (detail) {
        return <Text {...TRAILING_DETAIL_TEXT_PROPS}>{detail}</Text>;
      }

      if (checked) {
        return <MaterialIcon name="check" size={24} color={colors.primary} />;
      }

      return null;
    })();

    if (trailingContents) {
      return (
        <View
          style={[
            styles.trailingContentsContainer,
            !!accessories && styles.trailingContentsContainer_withAccessories,
            accessoriesContainsTextInput &&
              styles.trailingContentsContainer_withTextInput,
            (hide || delayedHideTrailingContents) && styles.hidden,
            !singleLine && hasSubtitle && styles.alignSelfFlexStart,
          ]}
        >
          {trailingContents}
        </View>
      );
    }

    return null;
  },
);

TrailingContents.displayName = 'ListItem_TrailingContents';

const TRAILING_DETAIL_TEXT_PROPS: Partial<React.ComponentProps<typeof Text>> = {
  variant: 'labelSmall',
  color: 'onSurfaceVariant',
  numberOfLines: 1,
};

const TRAILING_ACCESSORIES_TEXT_INPUT_PROPS = {
  textAlign: 'right' as const,
};

const TRAILING_ACCESSORIES_SELECT_PROPS: Partial<SelectProps<string>> = {
  style: {
    marginLeft: -16,
    marginRight: -16,
  },
  align: 'end' as const,
  textPaddingVertical: 0,
  textProps: {
    variant: 'labelLarge' as const,
    color: 'onSurfaceVariant' as const,
  },
};

const TRAILING_ACCESSORIES_ICON_PROPS: Partial<
  React.ComponentProps<typeof Icon>
> = {
  bordered: true,
  size: 30,
};

const TALL_TRAILING_ACCESSORIES_ICON_PROPS: Partial<
  React.ComponentProps<typeof Icon>
> = {
  bordered: true,
  size: 36,
};

const styles = StyleSheet.create({
  trailingContentsContainer: {
    flexGrow: 1,
    flexShrink: 0,
    maxWidth: '60%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 14,
  },
  trailingContentsContainer_withAccessories: {
    marginEnd: -8,
  },
  trailingContentsContainer_withTextInput: {
    flexGrow: 200,
    maxWidth: '70%',
    minWidth: '50%',
  },
  alignSelfFlexStart: {
    alignSelf: 'flex-start',
  },
  hidden: {
    display: 'none',
  },
});

export default TrailingContents;
