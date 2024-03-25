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
  Easing,
  PixelRatio,
  Pressable,
  StyleSheet,
  Text as RNText,
  useWindowDimensions,
  View,
} from 'react-native';
import {
  Gesture,
  GestureDetector,
  HandlerStateChangeEvent,
  PanGestureHandler,
  State,
} from 'react-native-gesture-handler';
import Color from 'color';
import { BlurView } from 'expo-blur';

import { Icon, IconPropsContext } from '@rnstudy/react-icons';
import {
  type ReactNodePropWithPropDefaultValuesContext,
  withPropDefaultValuesContext,
} from '@rnstudy/react-utils';

import { useColors, useTextStyles, useUIColors } from '../../contexts';
import { Colors } from '../../tokens/colors/types';
import { textStyles } from '../../tokens/text-styles';
import BackgroundColor from '../BackgroundColor';
import Select, { SelectPropsContext } from '../Select';
import Text, { TextPropsContext } from '../Text';

import AddButton from './AddButton';
import DrillInIcon from './DrillInIcon';
import GrabberIcon from './GrabberIcon';
import RemoveButton from './RemoveButton';
import SelectedButton from './SelectedButton';
import UnselectedButton from './UnselectedButton';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const LAYOUT_ANIMATION_DURATION = 200;

const SLIDE_BUTTON_WIDTH = 74;

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

  editButton?: 'unselected' | 'selected' | 'add' | 'remove';
  onEditButtonPress?: () => void;

  /** Show a grabber on the right side of the list item. */
  showGrabber?: boolean;
  grabberProps?: React.ComponentProps<typeof AnimatedPressable>;
  onGrabberActive?: () => void;

  listPosition?: 'first' | 'middle' | 'last' | 'only';

  fixedHeight?: boolean;
  dragActive?: boolean;
};

export function ListItem(props: Props) {
  const {
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
    onEditButtonPress,
    onGrabberActive,
    grabberProps,
    listStyle = 'insetGrouped',
    listPosition = 'only',
    fixedHeight,
    dragActive,
    showGrabber,
    editButton,
  } = props;

  // const { showGrabber: showGrabberProp, editButton: editButtonProp } = props;
  // const [showGrabber, setShowGrabber] = useState(showGrabberProp);
  // const [editButton, setEditButton] = useState(editButtonProp);
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setShowGrabber(showGrabberProp);
  //   }, 1);
  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, [showGrabberProp]);
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setEditButton(editButtonProp);
  //   }, 1);
  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, [editButtonProp]);

  const colors = useColors();
  const uiColors = useUIColors();
  const textStyles = useTextStyles();
  const windowDimensions = useWindowDimensions();
  const uiScale = Math.max(windowDimensions.fontScale, 1);

  // const contentTranslateXAnim = useRef(new Animated.Value(0)).current;
  // const [slideButtonsContainerWidth, setSlideButtonsContainerWidth] =
  //   useState(0);

  // const [slideOpenedAt, setSlideOpenedAt] = useState<number | null>(null);
  // const slideOpenedAtRef = useRef(slideOpenedAt);
  // slideOpenedAtRef.current = slideOpenedAt;
  // console.log(`slideOpenedAtRef.current: ${slideOpenedAtRef.current}`);
  // const handleRemovePressed = useCallback(() => {
  //   setSlideOpenedAt(Date.now());
  //   console.log(`open to ${slideButtonsContainerWidth}`);

  //   setTimeout(() => {
  //     Animated.timing(contentTranslateXAnim, {
  //       toValue: -slideButtonsContainerWidth,
  //       duration: 500,
  //       easing: Easing.out(Easing.quad),
  //       useNativeDriver: true,
  //     }).start();
  //   }, 0);

  //   // onEditButtonPress?.();
  // }, [contentTranslateXAnim, onEditButtonPress, slideButtonsContainerWidth]);

  // const closeSlide = useCallback(
  //   (event: HandlerStateChangeEvent) => {
  //     if (!slideOpenedAtRef.current) return;
  //     if (Date.now() - slideOpenedAtRef.current < 300) return;
  //     console.log(
  //       `${Date.now()} ${slideOpenedAtRef.current} ${Date.now() - slideOpenedAtRef.current} ${event.nativeEvent.state} ${State.BEGAN}`,
  //     );
  //     if (event.nativeEvent.state !== State.BEGAN) {
  //       return;
  //     }
  //     console.log('do close');

  //     console.log('hi83489 2389894');
  //     setSlideOpenedAt(null);

  //     setTimeout(() => {
  //       Animated.timing(contentTranslateXAnim, {
  //         toValue: 0,
  //         duration: 500,
  //         easing: Easing.out(Easing.quad),
  //         useNativeDriver: true,
  //       }).start();
  //     }, 0);
  //   },
  //   [contentTranslateXAnim],
  // );

  const content = (backgroundColor: string) => (
    <ListItemWithContainer
      {...props}
      listStyle={listStyle}
      listPosition={listPosition}
      backgroundColor={backgroundColor}
      uiScale={uiScale}
      showGrabber={showGrabber}
      editButton={editButton}
    />
  );

  // const content = (backgroundColor: string) => (
  //   <>
  //     {slideOpenedAt && (
  //       <PanGestureHandler onHandlerStateChange={closeSlide}>
  //         <View
  //           style={{
  //             position: 'absolute',
  //             top: -9999,
  //             bottom: -9999,
  //             left: -9999,
  //             right: -9999,
  //           }}
  //         >
  //           <Text>Hello</Text>
  //         </View>
  //       </PanGestureHandler>
  //     )}

  //     <View
  //       style={[
  //         styles.container,
  //         containerStyles[listStyle],
  //         containerStyles[`${listStyle}_${listPosition}`],
  //         containerBorderRadiusStyles[listStyle],
  //         containerBorderRadiusStyles[`${listStyle}_${listPosition}`],
  //         {
  //           backgroundColor: dragActive
  //             ? Color(backgroundColor).lightness() > 50
  //               ? Color(backgroundColor).alpha(0.5).hexa()
  //               : Color(backgroundColor).lighten(1).alpha(0.5).hexa()
  //             : backgroundColor,
  //           borderColor: uiColors.opaqueSeparator,
  //         },
  //         fixedHeight
  //           ? {
  //               height: getItemHeight({ subtitle, compact, uiScale }),
  //             }
  //           : {
  //               minHeight: getItemHeight({ subtitle, compact, uiScale }),
  //             },
  //         dragActive &&
  //           styles[
  //             `container_dragActive_${Color(backgroundColor).lightness() > 50 ? 'light' : 'dark'}`
  //           ],
  //       ]}
  //     >
  //       {(() => {
  //         if (editButton !== 'remove') return null;

  //         return (
  //           <View
  //             style={[
  //               styles.slideButtonsContainer,
  //               slideOpenedAt && styles.slideButtonsContainer_opened,
  //             ]}
  //             onLayout={(event) =>
  //               setSlideButtonsContainerWidth(event.nativeEvent.layout.width)
  //             }
  //           >
  //             <Pressable
  //               style={[
  //                 styles.swipeActionButton,
  //                 {
  //                   minWidth: SLIDE_BUTTON_WIDTH,
  //                   backgroundColor: colors.red,
  //                 },
  //               ]}
  //             >
  //               <Text style={styles.slideButtonText}>Remove</Text>
  //             </Pressable>
  //           </View>
  //         );
  //       })()}

  //       {(() => {
  //         const innerContent = (
  //           <ListItemContent
  //             {...props}
  //             backgroundColor={backgroundColor}
  //             style={[{ transform: [{ translateX: contentTranslateXAnim }] }]}
  //           />
  //         );

  //         if (slideOpenedAt) {
  //           return (
  //             <PanGestureHandler onHandlerStateChange={closeSlide}>
  //               {innerContent}
  //             </PanGestureHandler>
  //           );
  //         }

  //         return innerContent;
  //       })()}
  //     </View>
  //   </>
  // );

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

const ListItemContent = React.memo(
  React.forwardRef(function ListItemContent(
    {
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
      editButton,
      onEditButtonPress,
      showGrabber,
      onGrabberActive,
      grabberProps,
      listStyle = 'insetGrouped',
      listPosition = 'only',
      fixedHeight,
      dragActive,

      backgroundColor,
      listItemContentStyle,
      handleRemovePressed,
    }: Props & {
      backgroundColor: string;
      listItemContentStyle?: React.ComponentProps<
        (typeof Animated)['View']
      >['style'];
      handleRemovePressed?: () => void;
    },
    ref: React.Ref<View | Animated.LegacyRef<View>>,
  ) {
    const windowDimensions = useWindowDimensions();
    const uiScale = Math.max(windowDimensions.fontScale, 1);
    const colors = useColors();
    const uiColors = useUIColors();

    const grabberTranslateXAnim = useRef(
      new Animated.Value(showGrabber ? 0 : styles.grabberContainer.width),
    ).current;
    const prevShowGrabber = useRef(showGrabber);
    const [renderGrabberForAnim, setRenderGrabberForAnim] =
      useState(showGrabber);
    useEffect(() => {
      if (showGrabber === prevShowGrabber.current) return;

      Animated.timing(grabberTranslateXAnim, {
        toValue: showGrabber ? 0 : styles.grabberContainer.width,
        duration: LAYOUT_ANIMATION_DURATION,
        useNativeDriver: true,
      }).start();

      const RenderGrabberForAnimTimer = setTimeout(
        () => {
          setRenderGrabberForAnim(showGrabber);
        },
        showGrabber ? 0 : LAYOUT_ANIMATION_DURATION,
      );

      prevShowGrabber.current = showGrabber;

      return () => {
        clearTimeout(RenderGrabberForAnimTimer);
      };
    }, [grabberTranslateXAnim, showGrabber]);

    const [isEditButtonAnimationPlaying, setIsEditButtonAnimationPlaying] =
      useState(false);
    const editButtonTranslateXAnim = useRef(
      new Animated.Value(editButton ? 0 : editButtonHiddenTranslateXValue),
    ).current;
    const editButtonOpacityAnim = useRef(
      new Animated.Value(editButton ? 1 : 0),
    ).current;
    const prevEditButton = useRef(editButton);
    const [renderEditButtonForAnim, setRenderEditButtonForAnim] =
      useState(editButton);
    useEffect(() => {
      let renderEditButtonForAnimTimer:
        | ReturnType<typeof setTimeout>
        | undefined;
      if (!!editButton !== !!prevEditButton.current) {
        Animated.timing(editButtonTranslateXAnim, {
          toValue: editButton ? 0 : editButtonHiddenTranslateXValue,
          duration: LAYOUT_ANIMATION_DURATION,
          useNativeDriver: true,
        }).start();
        Animated.timing(editButtonOpacityAnim, {
          toValue: editButton ? 1 : 0,
          duration: LAYOUT_ANIMATION_DURATION,
          useNativeDriver: true,
        }).start();

        renderEditButtonForAnimTimer = setTimeout(
          () => {
            setRenderEditButtonForAnim(editButton);
          },
          editButton ? 0 : LAYOUT_ANIMATION_DURATION,
        );

        setIsEditButtonAnimationPlaying(true);

        setTimeout(() => {
          setIsEditButtonAnimationPlaying(false);
        }, LAYOUT_ANIMATION_DURATION);
      }

      prevEditButton.current = editButton;

      return renderEditButtonForAnimTimer
        ? () => {
            clearTimeout(renderEditButtonForAnimTimer);
          }
        : undefined;
    }, [editButton, editButtonOpacityAnim, editButtonTranslateXAnim]);

    const editButtonToRender = editButton || renderEditButtonForAnim;

    return (
      <Animated.View
        ref={ref}
        style={[styles.contentContainer, listItemContentStyle]}
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
          if (!editButtonToRender) return null;

          return (
            <AnimatedPressable
              style={[
                styles.editButtonContainer,
                {
                  transform: [{ translateX: editButtonTranslateXAnim }],
                  opacity: editButtonOpacityAnim,
                },
              ]}
              onPress={() => {
                if (editButtonToRender === 'remove') {
                  handleRemovePressed?.();
                }

                onEditButtonPress?.();
              }}
            >
              {(() => {
                switch (editButtonToRender) {
                  case 'unselected':
                    return <UnselectedButton fill={uiColors.systemGray3} />;
                  case 'selected':
                    return <SelectedButton fill={colors.blue} />;
                  case 'add':
                    return <AddButton fill={colors.green} />;
                  case 'remove':
                    return <RemoveButton fill={colors.red} />;
                  default:
                    return null;
                }
              })()}
            </AnimatedPressable>
          );
        })()}

        {(() => {
          if (!icon) return null;

          return (
            <Animated.View
              style={[
                styles.iconContainer,
                editButtonToRender && {
                  transform: [{ translateX: editButtonTranslateXAnim }],
                },
              ]}
            >
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
            </Animated.View>
          );
        })()}

        <Animated.View
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
            editButtonToRender && {
              transform: [{ translateX: editButtonTranslateXAnim }],
            },
            isEditButtonAnimationPlaying && {
              paddingEnd: -editButtonHiddenTranslateXValue,
              marginEnd: editButtonHiddenTranslateXValue,
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
            {(showGrabber || renderGrabberForAnim) && (
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
                  editButtonToRender && {
                    transform: [
                      {
                        translateX: Animated.subtract(
                          grabberTranslateXAnim,
                          editButtonTranslateXAnim,
                        ),
                      },
                    ],
                  },
                ]}
              >
                <GrabberIcon fill={uiColors.tertiaryLabel} />
              </AnimatedPressable>
            )}
          </View>
        </Animated.View>
      </Animated.View>
    );
  }),
);

function ListItemContainer({
  listStyle,
  listPosition,
  dragActive,
  backgroundColor,
  fixedHeight,
  subtitle,
  compact,
  uiScale,
  children,
}: Props & {
  listStyle: NonNullable<Props['listStyle']>;
  listPosition: NonNullable<Props['listPosition']>;
  backgroundColor: string;
  uiScale: number;
  children: React.ReactNode;
}) {
  const uiColors = useUIColors();
  return (
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
      {children}
    </View>
  );
}

function ListItemWithContainer(
  props: Omit<React.ComponentProps<typeof ListItemContainer>, 'children'> &
    React.ComponentProps<typeof ListItemContent>,
) {
  return (
    <ListItemContainer {...props}>
      <ListItemContent {...props} />
    </ListItemContainer>
  );
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
  contentContainer: {
    flexDirection: 'row',
    paddingLeft: 16,
    gap: 4,
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
  editButtonContainer: {
    width: 36,
    paddingRight: 12,
    justifyContent: 'center',
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

const editButtonHiddenTranslateXValue = -(
  styles.editButtonContainer.width + styles.contentContainer.gap
);

export default ListItem;
