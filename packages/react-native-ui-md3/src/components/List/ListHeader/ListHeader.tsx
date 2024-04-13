import React from 'react';
import { StyleSheet, View } from 'react-native';
import Color from 'color';
import { BlurView } from 'expo-blur';

import {
  type ReactNodePropWithPropDefaultValuesContext,
  usePropsWithContextualDefaultValues,
  withPropDefaultValuesContext,
} from '@rnstudy/react-utils';

// import { useUIColors } from '../../../contexts';
import { Button } from '../../Button';
import ButtonPropsContext from '../../Button/ButtonPropsContext';
import Text, { TextPropsContext } from '../../Text';
import { DEFAULT_LIST_STYLE } from '../consts';

import ListHeaderPropsContext from './ListHeaderPropsContext';

type ListStyle = 'plain' | 'grouped' | 'insetGrouped';

export type Props = {
  listStyle?: ListStyle;
  title?:
    | string
    | ReactNodePropWithPropDefaultValuesContext<{
        textProps: Partial<React.ComponentProps<typeof Text>>;
      }>;
  titleStyle?: 'default' | 'prominent';

  /** Optional description that will show under the title. This will only show if `titleStyle` is `prominent`. */
  description?:
    | string
    | ReactNodePropWithPropDefaultValuesContext<{
        textProps: Partial<React.ComponentProps<typeof Text>>;
      }>;

  accessories?: ReactNodePropWithPropDefaultValuesContext<{
    textProps: Partial<React.ComponentProps<typeof Text>>;
    buttonProps: Partial<React.ComponentProps<typeof Button>>;
  }>;

  first?: boolean;
};

export function ListHeader(props: Props) {
  const {
    listStyle = DEFAULT_LIST_STYLE,
    title,
    titleStyle = 'default',
    description,
    accessories,
  } = usePropsWithContextualDefaultValues(props, ListHeaderPropsContext);

  const titleTextProps = (() => {
    if (titleStyle === 'prominent') {
      return PROMINENT_TITLE_TEXT_PROPS;
    }

    if (listStyle === 'plain') {
      return PLAIN_TITLE_TEXT_PROPS;
    }

    return TITLE_TEXT_PROPS;
  })();

  return (
    <View
      style={[
        styles.container,
        containerStyles[listStyle],
        containerStyles[titleStyle],
        containerStyles[
          `${listStyle}_${titleStyle}` as keyof typeof containerStyles
        ],
      ]}
    >
      {!!title && (
        <View style={[styles.titleContainer]}>
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
          {!!description && titleStyle === 'prominent' && (
            <Text {...DESCRIPTION_TEXT_PROPS}>
              {typeof description === 'string'
                ? description
                : withPropDefaultValuesContext(description, {
                    textProps: {
                      value: DESCRIPTION_TEXT_PROPS,
                      context: TextPropsContext,
                    },
                  })}
            </Text>
          )}
        </View>
      )}

      {!!accessories && (
        <View
          style={[
            styles.accessoriesContainer,
            styles[`accessoriesContainer_${titleStyle}` as keyof typeof styles],
          ]}
        >
          {withPropDefaultValuesContext(accessories, {
            textProps: {
              value: {},
              context: TextPropsContext,
            },
            buttonProps: {
              value:
                titleStyle === 'prominent'
                  ? ({ mode }) =>
                      mode === 'text'
                        ? PROMINENT_ACCESSORIES_TEXT_BUTTON_PROPS
                        : PROMINENT_ACCESSORIES_BUTTON_PROPS
                  : ACCESSORIES_BUTTON_PROPS,
              context: ButtonPropsContext,
            },
          })}
        </View>
      )}
    </View>
  );
}

const TITLE_TEXT_PROPS: Partial<React.ComponentProps<typeof Text>> = {
  variant: 'labelLarge',
  color: 'onSurfaceVariant',
};

const PROMINENT_TITLE_TEXT_PROPS: Partial<React.ComponentProps<typeof Text>> = {
  variant: 'titleLarge',
  color: 'onSurface',
};

const PLAIN_TITLE_TEXT_PROPS: Partial<React.ComponentProps<typeof Text>> = {
  variant: 'labelLarge',
  color: 'secondary',
};

const DESCRIPTION_TEXT_PROPS: Partial<React.ComponentProps<typeof Text>> = {};

const ACCESSORIES_BUTTON_PROPS: Partial<React.ComponentProps<typeof Button>> = {
  size: 'small',
  style: {
    marginVertical: -6,
  },
};

const PROMINENT_ACCESSORIES_BUTTON_PROPS: Partial<
  React.ComponentProps<typeof Button>
> = {
  mode: 'contained-tonal',
  size: 'small',
};

const PROMINENT_ACCESSORIES_TEXT_BUTTON_PROPS: Partial<
  React.ComponentProps<typeof Button>
> = {
  size: 'small',
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'stretch',
    paddingBottom: 7,
  },
  titleContainer: {
    flexGrow: 1,
    paddingHorizontal: 16,
    gap: 3,
    justifyContent: 'flex-end',
  },
  accessoriesContainer: {
    paddingEnd: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  accessoriesContainer_prominent: {
    paddingEnd: 16,
  },
});

const containerStyles = StyleSheet.create({
  default: {},
  prominent: {
    paddingBottom: 5,
  },

  plain: {
    paddingTop: 24,
    paddingBottom: 4,
  },
  grouped: {},
  insetGrouped: {
    paddingHorizontal: 14,
  },

  insetGrouped_prominent: {
    paddingHorizontal: 4,
  },
});

export default ListHeader;
