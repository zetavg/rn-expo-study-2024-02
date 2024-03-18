import React, { useContext, useMemo } from 'react';
import {
  PixelRatio,
  StyleSheet,
  Text as RNText,
  useWindowDimensions,
  View,
} from 'react-native';

import {
  type ReactNodePropWithPropDefaultValuesContext,
  withPropDefaultValuesContext,
} from '@rnstudy/react-utils';

import { useTextStyles, useUIColors } from '../../contexts';
import { textStyles } from '../../tokens/text-styles';
import BackgroundColor from '../BackgroundColor';
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

  /** The text to display on the right side of the list item. Will be ignored if `accessories` is provided. */
  detail?: string;

  /** The accessories to display on the right side of the list item, such as icon, switch, select or other components. */
  accessories?: ReactNodePropWithPropDefaultValuesContext<{
    textProps: Partial<React.ComponentProps<typeof Text>>;
  }>;

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
  detail,
  accessories,
  navigationLink,
  showGrabber,
  listStyle = 'insetGrouped',
}: Props) {
  const uiColors = useUIColors();
  const textStyles = useTextStyles();
  const windowDimensions = useWindowDimensions();
  const uiScale = Math.max(windowDimensions.fontScale, 1);

  return (
    <BackgroundColor>
      {(backgroundColor) => (
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
                      return (
                        <Text key="title" {...TITLE_TEXT_PROPS}>
                          {typeof title !== 'function'
                            ? title
                            : withPropDefaultValuesContext(title, {
                                textProps: {
                                  value: TITLE_TEXT_PROPS,
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
                          {typeof subtitle !== 'function'
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
      )}
    </BackgroundColor>
  );
}

const TITLE_TEXT_PROPS: Partial<React.ComponentProps<typeof Text>> = {
  textStyle: 'body',
  color: 'default',
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

const styles = StyleSheet.create({
  container: {
    minHeight: 44,
    alignSelf: 'stretch',
    flexDirection: 'row',
    paddingLeft: 16,
    gap: 4,
    overflow: 'hidden',
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
