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
  onLayout?: React.ComponentProps<typeof View>['onLayout'];
};

export function propsSelector(p: ListItemProps): Omit<Props, 'onLayout'> {
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
    onLayout,
  }: Props): JSX.Element | null => {
    if (!title && !subtitle) return null;

    return (
      <View
        style={[styles.container, compact && styles.container_compact]}
        onLayout={onLayout}
      >
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
  variant: 'bodyLarge',
  color: 'onSurface',
};

const BUTTON_TITLE_TEXT_PROPS: Partial<React.ComponentProps<typeof Text>> = {
  variant: 'bodyLarge',
  color: 'primary',
};

const SUBTITLE_TEXT_PROPS: Partial<React.ComponentProps<typeof Text>> = {
  variant: 'bodyMedium',
  color: 'onSurfaceVariant',
};

const SMALL_SUBTITLE_TEXT_PROPS: Partial<React.ComponentProps<typeof Text>> = {
  variant: 'bodySmall',
  color: 'onSurfaceVariant',
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    alignSelf: 'center', // Necessary for `onLayout` to measure the correct Y position of the title, since this will ensure the container is not stretched to the full height of the parent which may adds extra space between the container and the title text.
    minWidth: '25%',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 0,
  },
  container_compact: {},
});

export default TitleAndSubtitle;
