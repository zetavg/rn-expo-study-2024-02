import React, { useContext, useMemo } from 'react';
import {
  PixelRatio,
  Pressable,
  StyleSheet,
  Text as RNText,
  useWindowDimensions,
  View,
} from 'react-native';

import { Icon, IconPropsContext } from '@rnstudy/react-icons';
import {
  type ReactNodePropWithPropDefaultValuesContext,
  withPropDefaultValuesContext,
} from '@rnstudy/react-utils';

import { useTextStyles, useUIColors } from '../../contexts';
import { textStyles } from '../../tokens/text-styles';
import BackgroundColor from '../BackgroundColor';
import Select, { SelectPropsContext } from '../Select';
import Text, { TextPropsContext } from '../Text';

import DrillInIcon from './DrillInIcon';
import GrabberIcon from './GrabberIcon';

type ListStyle = 'plain' | 'grouped' | 'insetGrouped';

type Props = {
  /** The style of the list. */
  listStyle?: ListStyle;
  title:
    | string
    | ReactNodePropWithPropDefaultValuesContext<{
        textProps: Partial<React.ComponentProps<typeof Text>>;
      }>;
  /** The text to display below the title. */
  subtitle?:
    | string
    | ReactNodePropWithPropDefaultValuesContext<{
        textProps: Partial<React.ComponentProps<typeof Text>>;
      }>;

  /** Compact style, use a smaller font size for subtitle and decrease vertical padding. */
  compact?: boolean;

  /** Display the subtitle on top of the title. */
  subtitleOnTop?: boolean;

  icon?: ReactNodePropWithPropDefaultValuesContext<{
    iconProps: Partial<React.ComponentProps<typeof Icon>>;
    backgroundColor: string;
  }>;

  /** The text to display on the right side of the list item. Will be ignored if `accessories` is provided. */
  detail?: string;

  /** The accessories to display on the right side of the list item, such as icon, switch, select or other components. */
  accessories?: ReactNodePropWithPropDefaultValuesContext<{
    textProps: Partial<React.ComponentProps<typeof Text>>;
    selectProps: Partial<React.ComponentProps<typeof Select>>;
  }>;

  onPress?: () => void;
  onLongPress?: () => void;

  button?: boolean;

  /** Displays a navigation arrow on the right side of the list item if set to true. */
  navigationLink?: boolean;

  /** Show a grabber on the right side of the list item. */
  showGrabber?: boolean;
};

export function ListItem({
  title,
  subtitle,
  compact,
  subtitleOnTop,
  icon,
  detail,
  accessories,
  onPress,
  onLongPress,
  button,
  navigationLink,
  showGrabber,
  listStyle = 'insetGrouped',
}: Props) {
  const uiColors = useUIColors();
  const textStyles = useTextStyles();
  const windowDimensions = useWindowDimensions();
  const uiScale = Math.max(windowDimensions.fontScale, 1);

  const content = (backgroundColor: string) => (
    <View
      style={[
        styles.container,
        containerStyles[listStyle],
        {
          backgroundColor,
          // minHeight: 44 * Math.max(1, Math.min(uiScale, 1.2)),
        },
      ]}
    >
      {(() => {
        if (!icon) return null;

        return (
          <View style={styles.iconContainer}>
            {withPropDefaultValuesContext(icon, {
              iconProps: {
                value: {
                  bordered: true,
                  size: subtitle && !compact ? 44 : 30,
                },
                context: IconPropsContext,
              },
              backgroundColor: {
                value: backgroundColor,
                context: null,
              },
            })}
          </View>
        );
      })()}
      <View style={styles.titleAndTrailingAccessoriesContainer}>
        <View
          style={[
            styles.titleContainer,
            compact && styles.titleContainer_compact,
          ]}
        >
          {(() => {
            return (
              subtitleOnTop ? ['subtitle', 'title'] : ['title', 'subtitle']
            ).map((n) => {
              switch (n) {
                case 'title': {
                  const titleTextProps = button
                    ? BUTTON_TITLE_TEXT_PROPS
                    : TITLE_TEXT_PROPS;

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

                  const subtitleTextProps = compact
                    ? SMALL_SUBTITLE_TEXT_PROPS
                    : SUBTITLE_TEXT_PROPS;

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

        <View style={styles.trailingContentsContainer}>
          {(() => {
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
          })()}
        </View>

        <View style={styles.drillInIconAndGrabberContainer}>
          {navigationLink && (
            <DrillInIcon
              style={styles.drillInIcon}
              fill={uiColors.tertiaryLabel}
            />
          )}
          {showGrabber && (
            <View
              style={[
                styles.grabberContainer,
                { borderLeftColor: uiColors.opaqueSeparator },
              ]}
            >
              <GrabberIcon fill={uiColors.tertiaryLabel} />
            </View>
          )}
        </View>
      </View>
    </View>
  );

  if (onPress || onLongPress) {
    return (
      <Pressable onPress={onPress} onLongPress={onLongPress}>
        {({ pressed }) => (
          <BackgroundColor>
            {(backgroundColor) =>
              content(pressed ? uiColors.systemGray5 : backgroundColor)
            }
          </BackgroundColor>
        )}
      </Pressable>
    );
  }

  return <BackgroundColor>{content}</BackgroundColor>;
}

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
  container: {
    minHeight: 44,
    alignSelf: 'stretch',
    flexDirection: 'row',
    paddingLeft: 16,
    gap: 4,
    overflow: 'hidden',
  },
  iconContainer: {
    paddingEnd: 8,
    justifyContent: 'center',
  },
  titleAndTrailingAccessoriesContainer: {
    flexGrow: 1,
    flexShrink: 1,
    flexDirection: 'row',
    gap: 16,
  },
  titleContainer: {
    flexGrow: 1,
    flexShrink: 1,
    minWidth: '25%',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingVertical: 8,
    gap: 0,
  },
  titleContainer_compact: {
    paddingVertical: 4,
    gap: -2,
  },
  trailingContentsContainer: {
    flexGrow: 1,
    flexShrink: 2,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 14,
  },
  drillInIconAndGrabberContainer: {
    flexGrow: 0,
    flexShrink: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  drillInIcon: {
    marginRight: 16,
  },
  grabberContainer: {
    alignSelf: 'stretch',
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: StyleSheet.hairlineWidth,
  },
});

const containerStyles = StyleSheet.create({
  plain: {},
  grouped: {},
  insetGrouped: {
    marginHorizontal: 16,
    borderRadius: 10,
  },
});

export default ListItem;
