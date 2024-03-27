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
    listStyle = 'insetGrouped',
    title,
    titleStyle = 'default',
    description,
    accessories,
  } = usePropsWithContextualDefaultValues(props, ListHeaderPropsContext);

  // const uiColors = useUIColors();

  const titleTextProps =
    listStyle === 'plain'
      ? PLAIN_TITLE_TEXT_PROPS
      : titleStyle === 'prominent'
        ? PROMINENT_TITLE_TEXT_PROPS
        : TITLE_TEXT_PROPS;

  const ContainerViewComponent = listStyle === 'plain' ? BlurView : View;

  return (
    <ContainerViewComponent
      style={[
        styles.container,
        containerStyles[listStyle],
        containerStyles[titleStyle],
        containerStyles[
          `${listStyle}_${titleStyle}` as keyof typeof containerStyles
        ],
      ]}
      // tint={
      //   Color(uiColors.systemBackground).lightness() > 50 ? 'light' : 'dark'
      // }
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
              value: {},
              // titleStyle === 'prominent'
              //   ? ({ buttonStyle }) =>
              //       buttonStyle === 'plain'
              //         ? PROMINENT_ACCESSORIES_PLAIN_BUTTON_PROPS
              //         : PROMINENT_ACCESSORIES_BUTTON_PROPS
              //   : ACCESSORIES_BUTTON_PROPS,
              context: ButtonPropsContext,
            },
          })}
        </View>
      )}
    </ContainerViewComponent>
  );
}

const TITLE_TEXT_PROPS: Partial<React.ComponentProps<typeof Text>> = {
  // color: 'secondary',
  // style: {
  //   fontSize: 13,
  //   lineHeight: 16,
  //   fontWeight: '400',
  //   textTransform: 'uppercase',
  // },
};

const PROMINENT_TITLE_TEXT_PROPS: Partial<React.ComponentProps<typeof Text>> = {
  // textStyle: 'title3',
  // emphasized: true,
};

const PLAIN_TITLE_TEXT_PROPS: Partial<React.ComponentProps<typeof Text>> = {
  // color: 'secondary',
  // textStyle: 'subheadline',
  // emphasized: true,
};

const DESCRIPTION_TEXT_PROPS: Partial<React.ComponentProps<typeof Text>> = {
  // textStyle: 'subheadline',
  // color: 'secondary',
};

// const ACCESSORIES_BUTTON_PROPS: Partial<React.ComponentProps<typeof Button>> = {
//   controlSize: 'small',
//   style: {
//     marginBottom: -5,
//   },
// };

// const PROMINENT_ACCESSORIES_BUTTON_PROPS: Partial<
//   React.ComponentProps<typeof Button>
// > = {
//   buttonStyle: 'gray',
//   controlSize: 'small',
//   buttonBorderShape: 'rectangle',
//   style: {
//     marginBottom: 2,
//   },
// };

// const PROMINENT_ACCESSORIES_PLAIN_BUTTON_PROPS: Partial<
//   React.ComponentProps<typeof Button>
// > = {
//   controlSize: 'small',
//   buttonBorderShape: 'rectangle',
//   style: {
//     marginBottom: -2,
//   },
// };

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
    paddingTop: 7,
  },
  grouped: {},
  insetGrouped: {
    paddingHorizontal: 16,
  },

  insetGrouped_prominent: {
    paddingHorizontal: 4,
  },
});

export default ListHeader;
