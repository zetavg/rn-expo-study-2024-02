import React from 'react';
import { StyleSheet, View } from 'react-native';
import { BlurView } from 'expo-blur';

import {
  type ReactNodePropWithPropDefaultValuesContext,
  withPropDefaultValuesContext,
} from '@rnstudy/react-utils';

import Text, { TextPropsContext } from '../Text';

type ListStyle = 'plain' | 'grouped' | 'insetGrouped';

type Props = {
  listStyle?: ListStyle;
  title?:
    | string
    | ReactNodePropWithPropDefaultValuesContext<{
        textProps: Partial<React.ComponentProps<typeof Text>>;
      }>;
  first?: boolean;
};

export function ListHeader({ listStyle = 'insetGrouped', title }: Props) {
  const titleTextProps =
    listStyle === 'plain' ? PLAIN_TITLE_TEXT_PROPS : TITLE_TEXT_PROPS;

  const ContainerViewComponent = listStyle === 'plain' ? BlurView : View;

  return (
    <ContainerViewComponent style={containerStyles[listStyle]}>
      {!!title && (
        <View style={styles.titleContainer}>
          <Text {...titleTextProps}>
            {typeof title === 'string'
              ? title
              : withPropDefaultValuesContext(title, {
                  textProps: {
                    value: titleTextProps,
                    context: TextPropsContext,
                  },
                })}
          </Text>
        </View>
      )}
    </ContainerViewComponent>
  );
}

const TITLE_TEXT_PROPS: Partial<React.ComponentProps<typeof Text>> = {
  color: 'secondary',
  style: {
    fontSize: 13,
    lineHeight: 16,
    fontWeight: '400',
    textTransform: 'uppercase',
  },
};

const PLAIN_TITLE_TEXT_PROPS: Partial<React.ComponentProps<typeof Text>> = {
  color: 'secondary',
  textStyle: 'subheadline',
  emphasized: true,
};

const styles = StyleSheet.create({
  titleContainer: {
    paddingHorizontal: 16,
    paddingBottom: 7,
  },
});

const containerStyles = StyleSheet.create({
  plain: {
    paddingTop: 7,
  },
  grouped: {},
  insetGrouped: {
    paddingHorizontal: 16,
  },
});

export default ListHeader;
