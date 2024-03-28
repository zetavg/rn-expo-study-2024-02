import React from 'react';
import { StyleSheet, View } from 'react-native';

import { withPropDefaultValuesContext } from '@rnstudy/react-utils';

import { useTheme } from '../../../../contexts';
import { SelectProps, SelectPropsContext } from '../../../Select';
import Text, { TextPropsContext } from '../../../Text';
import type { Props as ListItemProps } from '../ListItem';
import { useListItemAnimationContext } from '../ListItemAnimationContext';

export type Props = {
  accessories: ListItemProps['accessories'];
  detail: ListItemProps['detail'];
  singleLine: ListItemProps['singleLine'];
  hasSubtitle: boolean;
  hide?: boolean;
};

export function propsSelector(p: ListItemProps): Omit<Props, 'hide'> {
  return {
    accessories: p.accessories,
    detail: p.detail,
    singleLine: p.singleLine,
    hasSubtitle: !!p.subtitle,
  };
}

export const TrailingContents = React.memo(
  ({
    accessories,
    detail,
    singleLine,
    hasSubtitle,
    hide,
  }: Props): JSX.Element | null => {
    const { delayedHideTrailingContents } = useListItemAnimationContext();
    const theme = useTheme();

    const trailingContents = (() => {
      if (accessories) {
        return withPropDefaultValuesContext(accessories, {
          textProps: {
            value: TRAILING_DETAIL_TEXT_PROPS,
            context: TextPropsContext,
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
        });
      }

      if (detail) {
        return <Text {...TRAILING_DETAIL_TEXT_PROPS}>{detail}</Text>;
      }

      return null;
    })();

    if (trailingContents) {
      return (
        <View
          style={[
            styles.trailingContentsContainer,
            !!accessories && styles.trailingContentsContainer_withAccessories,
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
  alignSelfFlexStart: {
    alignSelf: 'flex-start',
  },
  hidden: {
    display: 'none',
  },
});

export default TrailingContents;
