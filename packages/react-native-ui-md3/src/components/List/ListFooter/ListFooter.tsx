import React from 'react';
import { StyleSheet, View } from 'react-native';

import {
  type ReactNodePropWithPropDefaultValuesContext,
  usePropsWithContextualDefaultValues,
  withPropDefaultValuesContext,
} from '@rnstudy/react-utils';

import Text, { TextPropsContext } from '../../Text';
import { DEFAULT_LIST_STYLE } from '../consts';

import ListFooterPropsContext from './ListFooterPropsContext';

type ListStyle = 'plain' | 'grouped' | 'insetGrouped';

export type Props = {
  listStyle?: ListStyle;
  text?:
    | string
    | ReactNodePropWithPropDefaultValuesContext<{
        textProps: Partial<React.ComponentProps<typeof Text>>;
      }>;
};

export function ListFooter(props: Props) {
  const { listStyle = DEFAULT_LIST_STYLE, text } =
    usePropsWithContextualDefaultValues(props, ListFooterPropsContext);
  const textProps = TEXT_PROPS;

  return (
    <View style={containerStyles[listStyle]}>
      {!!text && (
        <View style={styles.textContainer}>
          <Text {...textProps}>
            {typeof text === 'string'
              ? text
              : withPropDefaultValuesContext(text, {
                  textProps: {
                    value: textProps,
                    context: TextPropsContext,
                  },
                })}
          </Text>
        </View>
      )}
    </View>
  );
}

const TEXT_PROPS: Partial<React.ComponentProps<typeof Text>> = {
  variant: 'bodySmall',
  color: 'secondary',
};

const styles = StyleSheet.create({
  textContainer: {
    paddingHorizontal: 16,
    paddingTop: 5,
  },
});

const containerStyles = StyleSheet.create({
  plain: {
    paddingBottom: 8,
  },
  grouped: {},
  insetGrouped: {
    paddingHorizontal: 14,
  },
});

export default ListFooter;
