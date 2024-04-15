import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Icon, IconPropsContext } from '@rnstudy/react-icons';
import { withPropDefaultValuesContext } from '@rnstudy/react-utils';

import { useUIColors } from '../../../../contexts';
import {
  SegmentedControlProps,
  SegmentedControlPropsContext,
} from '../../../SegmentedControl';
import { type SelectProps, SelectPropsContext } from '../../../Select';
import Text, { type TextProps, TextPropsContext } from '../../../Text';
import { type TextInputProps, TextInputPropsContext } from '../../../TextInput';
import CheckmarkIcon from '../icons/CheckmarkIcon';
import type { Props as ListItemProps } from '../ListItem';
import { useListItemAnimationContext } from '../ListItemAnimationContext';

export type Props = {
  accessories: ListItemProps['accessories'];
  detail: ListItemProps['detail'];
  checked: ListItemProps['checked'];
  accessoriesContainsTextInput: ListItemProps['accessoriesContainsTextInput'];
  hasSubtitleAndNotCompact: boolean;
  hide?: boolean;
};

export function propsSelector(p: ListItemProps): Props {
  return {
    accessories: p.accessories,
    detail: p.detail,
    checked: p.checked,
    accessoriesContainsTextInput: p.accessoriesContainsTextInput,
    hasSubtitleAndNotCompact: !!p.subtitle && !p.compact,
  };
}

export const TrailingContents = React.memo(
  ({
    accessories,
    detail,
    checked,
    accessoriesContainsTextInput,
    hasSubtitleAndNotCompact,
    hide,
  }: Props): JSX.Element | null => {
    const uiColors = useUIColors();

    const { delayedHideTrailingContents } = useListItemAnimationContext();

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
            value: TRAILING_ACCESSORIES_SELECT_PROPS,
            context: SelectPropsContext,
          },
          segmentedControlProps: {
            value: TRAILING_ACCESSORIES_SEGMENTED_CONTROL_PROPS,
            context: SegmentedControlPropsContext,
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
        return <CheckmarkIcon fill={uiColors.tintColor} />;
      }

      return null;
    })();

    if (trailingContents) {
      return (
        <View
          style={[
            styles.trailingContentsContainer,
            accessoriesContainsTextInput &&
              styles.trailingContentsContainer_withTextInput,
            (hide || delayedHideTrailingContents) && styles.hidden,
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

const TRAILING_DETAIL_TEXT_PROPS: Partial<TextProps> = {
  textStyle: 'body',
  color: 'secondary',
  numberOfLines: 1,
};

const TRAILING_ACCESSORIES_TEXT_INPUT_PROPS: Partial<TextInputProps> = {
  textAlign: 'right' as const,
};

const TRAILING_ACCESSORIES_SELECT_PROPS: Partial<SelectProps<string>> = {
  style: {
    flexShrink: 1,
    flexGrow: 1,
    marginStart: -12,
  },
  innerContainerStyle: {
    paddingStart: 12,
    paddingVertical: 8,
  },
  align: 'end' as const,
};

const TRAILING_ACCESSORIES_SEGMENTED_CONTROL_PROPS: Partial<
  SegmentedControlProps<string>
> = {
  height: 28,
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
  trailingContentsContainer_withTextInput: {
    flexGrow: 200,
    maxWidth: '80%',
    minWidth: '50%',
  },
  hidden: {
    display: 'none',
  },
});

export default TrailingContents;
