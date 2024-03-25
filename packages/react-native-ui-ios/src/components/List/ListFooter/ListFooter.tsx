import React from 'react';
import { StyleSheet, View } from 'react-native';

import {
  type ReactNodePropWithPropDefaultValuesContext,
  withPropDefaultValuesContext,
} from '@rnstudy/react-utils';

import Text, { TextPropsContext } from '../../Text';

type ListStyle = 'plain' | 'grouped' | 'insetGrouped';

export type Props = {
  listStyle?: ListStyle;
  text?:
    | string
    | ReactNodePropWithPropDefaultValuesContext<{
        textProps: Partial<React.ComponentProps<typeof Text>>;
      }>;
};

export function ListFooter({ listStyle = 'insetGrouped', text }: Props) {
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
  color: 'secondary',
  style: {
    fontSize: 13,
    lineHeight: 16,
    fontWeight: '400',
  },
};

const styles = StyleSheet.create({
  textContainer: {
    paddingHorizontal: 16,
    paddingTop: 5,
  },
});

const containerStyles = StyleSheet.create({
  plain: {},
  grouped: {},
  insetGrouped: {
    paddingHorizontal: 16,
  },
});

export default ListFooter;
