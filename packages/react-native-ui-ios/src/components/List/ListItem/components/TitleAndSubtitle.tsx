import React from 'react';
import { StyleSheet, View } from 'react-native';

import { withPropDefaultValuesContext } from '@rnstudy/react-utils';

import Text, { TextPropsContext } from '../../../Text';
import type { Props as ListItemProps } from '../ListItem';

export type Props = {
  title: ListItemProps['title'];
  subtitle: ListItemProps['subtitle'];
  singleLine: ListItemProps['singleLine'];
  button: ListItemProps['button'];
  compact: ListItemProps['compact'];
  subtitleOnTop: ListItemProps['subtitleOnTop'];
  fixedHeight: ListItemProps['fixedHeight'];
};

export function propsSelector(p: ListItemProps): Props {
  return {
    title: p.title,
    subtitle: p.subtitle,
    singleLine: p.singleLine,
    button: p.button,
    compact: p.compact,
    subtitleOnTop: p.subtitleOnTop,
    fixedHeight: p.fixedHeight,
  };
}

export const TitleAndSubtitle = React.memo(
  ({
    title,
    subtitle,
    singleLine,
    button,
    compact,
    subtitleOnTop,
    fixedHeight,
  }: Props): JSX.Element | null => {
    if (!title && !subtitle) return null;

    return (
      <View style={[styles.container, compact && styles.container_compact]}>
        {(() => {
          return (
            subtitleOnTop ? ['subtitle', 'title'] : ['title', 'subtitle']
          ).map((n) => {
            switch (n) {
              case 'title': {
                let titleTextProps = button
                  ? BUTTON_TITLE_TEXT_PROPS
                  : TITLE_TEXT_PROPS;

                if (fixedHeight || singleLine) {
                  titleTextProps = {
                    ...titleTextProps,
                    numberOfLines: 1,
                  };
                }

                return (
                  <Text key="title" {...titleTextProps}>
                    {typeof title === 'string'
                      ? title
                      : withPropDefaultValuesContext(title, {
                          textProps: {
                            value: titleTextProps,
                            context: TextPropsContext,
                          },
                        })}
                  </Text>
                );
              }

              case 'subtitle': {
                if (!subtitle) return null;

                let subtitleTextProps = compact
                  ? SMALL_SUBTITLE_TEXT_PROPS
                  : SUBTITLE_TEXT_PROPS;

                if (fixedHeight || singleLine) {
                  subtitleTextProps = {
                    ...subtitleTextProps,
                    numberOfLines: 1,
                  };
                }

                return (
                  <Text key="subtitle" {...subtitleTextProps}>
                    {typeof subtitle === 'string'
                      ? subtitle
                      : withPropDefaultValuesContext(subtitle, {
                          textProps: {
                            value: subtitleTextProps,
                            context: TextPropsContext,
                          },
                        })}
                  </Text>
                );
              }
            }
          });
        })()}
      </View>
    );
  },
);

TitleAndSubtitle.displayName = 'ListItem_TitleAndSubtitle';

const TITLE_TEXT_PROPS: Partial<React.ComponentProps<typeof Text>> = {
  textStyle: 'body',
  color: 'default',
};

const BUTTON_TITLE_TEXT_PROPS: Partial<React.ComponentProps<typeof Text>> = {
  textStyle: 'body',
  color: 'tint',
};

const SUBTITLE_TEXT_PROPS: Partial<React.ComponentProps<typeof Text>> = {
  textStyle: 'subheadline',
  color: 'secondary',
};

const SMALL_SUBTITLE_TEXT_PROPS: Partial<React.ComponentProps<typeof Text>> = {
  textStyle: 'footnote',
  color: 'secondary',
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    minWidth: '25%',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingVertical: 8,
    gap: 0,
  },
  container_compact: {
    paddingVertical: 4,
    gap: -4,
  },
});

export default TitleAndSubtitle;
