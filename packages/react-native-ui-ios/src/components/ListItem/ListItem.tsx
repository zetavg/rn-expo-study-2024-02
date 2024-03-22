import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Animated,
  PixelRatio,
  Pressable,
  StyleSheet,
  Text as RNText,
  useWindowDimensions,
  View,
} from 'react-native';
import Color from 'color';
import { BlurView } from 'expo-blur';

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

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const LAYOUT_ANIMATION_DURATION = 200;

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
  grabberProps?: React.ComponentProps<typeof AnimatedPressable>;
  onGrabberActive?: () => void;

  listPosition?: 'first' | 'middle' | 'last' | 'only';

  fixedHeight?: boolean;
  dragActive?: boolean;
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
  onGrabberActive,
  grabberProps,
  listStyle = 'insetGrouped',
  listPosition = 'only',
  fixedHeight,
  dragActive,
}: Props) {
  const uiColors = useUIColors();
  const textStyles = useTextStyles();
  const windowDimensions = useWindowDimensions();
  const uiScale = Math.max(windowDimensions.fontScale, 1);

  const grabberTranslateXAnim = useRef(
    new Animated.Value(showGrabber ? 0 : styles.grabberContainer.width),
  ).current;
  const prevShowGrabber = useRef(showGrabber);
  const [animRenderGrabber, setAnimRenderGrabber] = useState(showGrabber);
  useEffect(() => {
    if (showGrabber === prevShowGrabber.current) return;

    Animated.timing(grabberTranslateXAnim, {
      toValue: showGrabber ? 0 : styles.grabberContainer.width,
      duration: LAYOUT_ANIMATION_DURATION,
      useNativeDriver: true,
    }).start();

    const setAnimRenderGrabberTimer = setTimeout(
      () => {
        setAnimRenderGrabber(showGrabber);
      },
      showGrabber ? 0 : LAYOUT_ANIMATION_DURATION,
    );

    prevShowGrabber.current = showGrabber;

    return () => {
      clearTimeout(setAnimRenderGrabberTimer);
    };
  }, [grabberTranslateXAnim, showGrabber]);

  const grabberDragTimerRef = React.useRef<null | ReturnType<
    typeof setTimeout
  >>(null);

  const content = (backgroundColor: string) => (
    <View
      style={[
        styles.container,
        containerStyles[listStyle],
        containerStyles[`${listStyle}_${listPosition}`],
        containerBorderRadiusStyles[listStyle],
        containerBorderRadiusStyles[`${listStyle}_${listPosition}`],
        {
          backgroundColor: dragActive
            ? Color(backgroundColor).lightness() > 50
              ? Color(backgroundColor).alpha(0.5).hexa()
              : Color(backgroundColor).lighten(1).alpha(0.5).hexa()
            : backgroundColor,
          borderColor: uiColors.opaqueSeparator,
        },
        fixedHeight
          ? {
              height: getItemHeight({ subtitle, compact, uiScale }),
            }
          : {
              minHeight: getItemHeight({ subtitle, compact, uiScale }),
            },
        dragActive &&
          styles[
            `container_dragActive_${Color(backgroundColor).lightness() > 50 ? 'light' : 'dark'}`
          ],
      ]}
    >
      {dragActive && (
        <View
          style={[
            containerBorderRadiusStyles[listStyle],
            containerBorderRadiusStyles[`${listStyle}_${listPosition}`],
            styles.backgroundBlurView,
          ]}
        >
          <BlurView
            tint={
              Color(backgroundColor).lightness() > 50 ? 'extraLight' : 'dark'
            }
            style={[
              containerBorderRadiusStyles[listStyle],
              containerBorderRadiusStyles[`${listStyle}_${listPosition}`],
              styles.backgroundBlurView,
            ]}
          />
        </View>
      )}

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

      <View
        style={[
          styles.titleAndTrailingAccessoriesContainer,
          (listStyle === 'plain'
            ? titleAndTrailingAccessoriesContainerStyles_plain
            : titleAndTrailingAccessoriesContainerStyles)[listPosition],
          dragActive && titleAndTrailingAccessoriesContainerStyles.dragActive,
          {
            minHeight: getItemHeight({ subtitle, compact, uiScale }),
            borderColor: uiColors.opaqueSeparator,
          },
        ]}
      >
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
                  let titleTextProps = button
                    ? BUTTON_TITLE_TEXT_PROPS
                    : TITLE_TEXT_PROPS;

                  if (fixedHeight) {
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

                  if (fixedHeight) {
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

        {(() => {
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
              <View style={styles.trailingContentsContainer}>
                {trailingContents}
              </View>
            );
          }

          return null;
        })()}

        <View style={styles.drillInIconAndGrabberContainer}>
          {navigationLink && (
            <DrillInIcon
              style={styles.drillInIcon}
              fill={uiColors.tertiaryLabel}
            />
          )}
          {(showGrabber || animRenderGrabber) && (
            <AnimatedPressable
              {...grabberProps}
              delayLongPress={80}
              onLongPress={(event) => {
                onGrabberActive?.();
                grabberProps?.onLongPress?.(event);
              }}
              style={[
                styles.grabberContainer,
                !!(navigationLink || accessories) &&
                  styles.grabberContainer_withAccessories,
                dragActive && styles.grabberContainer_dragActive,
                {
                  borderLeftColor: uiColors.opaqueSeparator,
                  transform: [{ translateX: grabberTranslateXAnim }],
                },
              ]}
            >
              <GrabberIcon fill={uiColors.tertiaryLabel} />
            </AnimatedPressable>
          )}
        </View>
      </View>
    </View>
  );

  const onPressTimerRef = React.useRef<null | ReturnType<typeof setTimeout>>(
    null,
  );
  const handlePress = useCallback(() => {
    if (!onPress) return;
    if (onPressTimerRef.current) return;

    // Let the UI update to the pressed state before calling the onPress handler, in case if the onPress handler took a long time to execute and hangs the UI, confusing the user if the press was handled or not.
    onPressTimerRef.current = setTimeout(() => {
      onPress();
      onPressTimerRef.current = null;
    }, 1);
  }, [onPress]);

  if ((onPress || onLongPress) && !dragActive) {
    return (
      <Pressable
        unstable_pressDelay={75}
        onPress={handlePress}
        onLongPress={onLongPress}
      >
        {({ pressed }) => (
          <BackgroundColor>
            {(backgroundColor) =>
              content(
                pressed
                  ? uiColors.systemGray5
                  : listStyle === 'plain'
                    ? uiColors.systemBackground
                    : backgroundColor,
              )
            }
          </BackgroundColor>
        )}
      </Pressable>
    );
  }

  return <BackgroundColor>{content}</BackgroundColor>;
}

export function getItemHeight({
  subtitle,
  compact,
  uiScale,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  subtitle?: React.ReactNode | ((...args: any) => void) | boolean;
  compact?: boolean;
  uiScale: number;
}): number {
  const baseHeight = (() => {
    if (!subtitle || compact) {
      return 44;
    } else {
      return 58;
    }
  })();

  return Math.floor(baseHeight * Math.max(1, Math.min(uiScale, 1.2)));
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
  container_dragActive_light: {
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 18,
    overflow: 'visible', // Let shadow be visible outside of the container
  },
  container_dragActive_dark: {
    shadowColor: 'black',
    shadowOpacity: 0.8,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 18,
    overflow: 'visible', // Let shadow be visible outside of the container
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
    gap: -4,
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
    transformOrigin: 'right',
  },
  grabberContainer_withAccessories: {
    borderLeftWidth: StyleSheet.hairlineWidth,
  },
  grabberContainer_dragActive: {
    // Hack: the BlurView adds a mysterious padding on the right side of the grabber, so we need to compensate for it.
    marginRight: -4,
  },
  backgroundBlurView: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
  },
});

const containerStyles = StyleSheet.create({
  plain: {},
  plain_first: {},
  plain_middle: {},
  plain_last: {},
  plain_only: {},

  grouped: {},
  grouped_first: {
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  grouped_middle: {},
  grouped_last: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  grouped_only: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

  insetGrouped: {
    marginHorizontal: 16,
  },
  insetGrouped_first: {},
  insetGrouped_middle: {},
  insetGrouped_last: {},
  insetGrouped_only: {},
});

const containerBorderRadiusStyles = StyleSheet.create({
  plain: {},
  plain_first: {},
  plain_middle: {},
  plain_last: {},
  plain_only: {},

  grouped: {},
  grouped_first: {},
  grouped_middle: {},
  grouped_last: {},
  grouped_only: {},

  insetGrouped: {
    borderRadius: 10,
  },
  insetGrouped_first: {
    borderBottomStartRadius: 0,
    borderBottomEndRadius: 0,
  },
  insetGrouped_middle: {
    borderRadius: 0,
  },
  insetGrouped_last: {
    borderTopStartRadius: 0,
    borderTopEndRadius: 0,
  },
  insetGrouped_only: {},
});

const titleAndTrailingAccessoriesContainerStyles = StyleSheet.create({
  first: {
    // borderBottomWidth: StyleSheet.hairlineWidth,
  },
  middle: {
    // borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  last: {
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  only: {},
  dragActive: { borderTopWidth: 0, borderBottomWidth: 0 },
});

const titleAndTrailingAccessoriesContainerStyles_plain = StyleSheet.create({
  first: {
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  middle: {
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  last: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  only: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default ListItem;
