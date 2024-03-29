import React from 'react';
import { StyleSheet, View } from 'react-native';

import { withPropDefaultValuesContext } from '@rnstudy/react-utils';

import { SelectPropsContext } from '../../../Select';
import Text, { TextPropsContext } from '../../../Text';
import type { Props as ListItemProps } from '../ListItem';
import { useListItemAnimationContext } from '../ListItemAnimationContext';

export type Props = {
  accessories: ListItemProps['accessories'];
  detail: ListItemProps['detail'];
  hide?: boolean;
};

export const TrailingContents = React.memo(
  ({ accessories, detail, hide }: Props): JSX.Element | null => {
    const { delayedHideTrailingContents } = useListItemAnimationContext();

    const trailingContents = (() => {
      if (accessories) {
        return withPropDefaultValuesContext(accessories, {
          textProps: {
            value: TRAILING_DETAIL_TEXT_PROPS,
            context: TextPropsContext,
          },
          selectProps: {
            value: TRAILING_ACCESSORIES_SELECT_PROPS,
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

const TRAILING_DETAIL_TEXT_PROPS: Partial<React.ComponentProps<typeof Text>> = {
  textStyle: 'body',
  color: 'secondary',
  numberOfLines: 1,
};

const TRAILING_ACCESSORIES_SELECT_PROPS = {
  style: {
    flexShrink: 1,
    marginStart: -12,
  },
  innerContainerStyle: {
    paddingStart: 12,
    paddingVertical: 8,
  },
  align: 'end' as const,
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
  hidden: {
    display: 'none',
  },
});

export default TrailingContents;
