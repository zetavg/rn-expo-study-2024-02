import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { Animated, StyleProp, ViewStyle } from 'react-native';

import {
  CONTAINER_PADDING_END,
  CONTENT_CONTAINER_GAP,
  EDIT_BUTTON_CONTAINER_WIDTH,
  GRABBER_CONTAINER_WIDTH,
  LAYOUT_ANIMATION_DURATION,
} from './consts';
import type { Props as ListItemProps } from './ListItem';

type ListItemAnimationContextValue = {
  /** Whether the edit button should be rendered. Sometimes the edit button should be rendered for the animation. */
  shouldRenderEditButton: ListItemProps['editButton'];
  editButtonStyle: ViewStyle;
  /** Whether the grabber should be rendered. Sometimes the grabber should be rendered for the animation. */
  shouldRenderGrabber: ListItemProps['showGrabber'];
  grabberStyle: ViewStyle;
  grabberWrapperStyle: ViewStyle;
  contentContainerWrapperStyle: StyleProp<ViewStyle>;
  contentContainerStyle: StyleProp<ViewStyle>;
  mainContentsContainerStyle: StyleProp<ViewStyle>;
};

export const ListItemAnimationContext =
  createContext<ListItemAnimationContextValue | null>(null);

export function ListItemAnimationContextProvider(
  props: ListItemProps,
): JSX.Element {
  const { editButton, children } = props;

  const {
    shouldRenderEditButton,
    editButtonStyle,
    contentContainerWrapperStyleForEditButtonAnimation,
    contentContainerStyleForEditButtonAnimation,

    editButtonTranslateXAnim,
    contentContainerMarginEndToCounterEditButtonAnim,
  } = useEditButtonAnimation({ editButton });

  const {
    shouldRenderGrabber,
    grabberStyle,
    grabberWrapperStyle,
    mainContentsContainerStyleForGrabber,
  } = useGrabberAnimation({
    props,
    shouldRenderEditButton: !!shouldRenderEditButton,
    editButtonTranslateXAnim,
    contentContainerMarginEndToCounterEditButtonAnim,
  });

  const contentContainerWrapperStyle = useMemo(
    () => [contentContainerWrapperStyleForEditButtonAnimation],
    [contentContainerWrapperStyleForEditButtonAnimation],
  );
  const contentContainerStyle = useMemo(
    () => [contentContainerStyleForEditButtonAnimation],
    [contentContainerStyleForEditButtonAnimation],
  );
  const mainContentsContainerStyle = useMemo(
    () => [mainContentsContainerStyleForGrabber],
    [mainContentsContainerStyleForGrabber],
  );

  const listItemAnimationContextValue = useMemo<ListItemAnimationContextValue>(
    () => ({
      shouldRenderEditButton,
      editButtonStyle,
      shouldRenderGrabber,
      grabberStyle,
      grabberWrapperStyle,
      contentContainerWrapperStyle,
      contentContainerStyle,
      mainContentsContainerStyle,
    }),
    [
      shouldRenderEditButton,
      editButtonStyle,
      shouldRenderGrabber,
      grabberStyle,
      grabberWrapperStyle,
      contentContainerWrapperStyle,
      contentContainerStyle,
      mainContentsContainerStyle,
    ],
  );

  return (
    <ListItemAnimationContext.Provider value={listItemAnimationContextValue}>
      {children}
    </ListItemAnimationContext.Provider>
  );
}

export function useListItemAnimationContext() {
  const context = React.useContext(ListItemAnimationContext);
  if (!context) {
    throw new Error(
      'useListItemAnimationContext must be used within a ListItemAnimationContextProvider',
    );
  }
  return context;
}

function useEditButtonAnimation({
  editButton,
}: {
  editButton: ListItemProps['editButton'];
}) {
  const editButtonRef = useRef(editButton);
  editButtonRef.current = editButton;

  /** This ref is updated when the animation ends. */
  const showedEditButton = useRef(editButton);

  /** Should the edit button be rendered? Sometimes the edit button should be rendered for the animation. */
  const renderEditButton = useRef(editButton);
  if (editButton) {
    renderEditButton.current = editButton;
  } // Do not set `renderEditButton.current` to a falsy value here, since once it's rendered, it should stay rendered until the fade out animation is finished.

  const shouldRenderEditButton = renderEditButton.current;

  const editButtonTranslateXAnimValue = editButton
    ? 0
    : EDIT_BUTTON_HIDDEN_TRANSLATE_X_VALUE;
  const editButtonTranslateXAnim = useRef(
    new Animated.Value(editButtonTranslateXAnimValue),
  ).current;

  const editButtonOpacityAnimValue = editButton ? 1 : 0;
  const editButtonOpacityAnim = useRef(
    new Animated.Value(editButtonOpacityAnimValue),
  ).current;

  const shouldShowEditButton = !!editButton;

  const getContentContainerMarginEndToCounterEditButtonAnimValue = useCallback(
    () =>
      // Edit button rendered but hidden (or going to be hidden by animation)
      (renderEditButton.current && !shouldShowEditButton) ||
      // Edit button is transitioning from hidden to shown (should be shown but not completely shown yet)
      (!showedEditButton.current && shouldShowEditButton)
        ? EDIT_BUTTON_HIDDEN_TRANSLATE_X_VALUE
        : 0,
    [shouldShowEditButton],
  );
  /** If the edit button is rendered but hidden by translateX or going to be shown, we need to apply a negative marginEnd to the content container so that the content container can fill the space left by the hidden edit button. */
  const contentContainerMarginEndToCounterEditButtonAnim = useRef(
    new Animated.Value(
      getContentContainerMarginEndToCounterEditButtonAnimValue(),
      {
        useNativeDriver: false,
      },
    ),
  ).current;

  const editButtonStyle = useMemo<ViewStyle>(
    () => ({
      opacity: editButtonOpacityAnim,
    }),
    [editButtonOpacityAnim],
  );

  /** Animated values which uses native driver and those that don't cannot be used together in the same view. So we need to separate them to two different views - the content container wrapper and the content container. */
  const contentContainerWrapperStyleForEditButtonAnimation =
    useMemo<ViewStyle | null>(
      () =>
        shouldRenderEditButton
          ? {
              marginEnd: contentContainerMarginEndToCounterEditButtonAnim,
            }
          : null,
      [
        contentContainerMarginEndToCounterEditButtonAnim,
        shouldRenderEditButton,
      ],
    );

  const contentContainerStyleForEditButtonAnimation = useMemo<ViewStyle | null>(
    () =>
      shouldRenderEditButton
        ? {
            transform: [{ translateX: editButtonTranslateXAnim }],
          }
        : null,
    [editButtonTranslateXAnim, shouldRenderEditButton],
  );

  useEffect(() => {
    const setContentContainerMarginEndToCounterEditButtonAnimValue = () => {
      contentContainerMarginEndToCounterEditButtonAnim.setValue(
        getContentContainerMarginEndToCounterEditButtonAnimValue(),
      );
    };

    setContentContainerMarginEndToCounterEditButtonAnimValue();

    Animated.parallel(
      [
        Animated.timing(editButtonTranslateXAnim, {
          toValue: editButtonTranslateXAnimValue,
          duration: LAYOUT_ANIMATION_DURATION,
          useNativeDriver: true,
        }),
        Animated.timing(editButtonOpacityAnim, {
          toValue: editButtonOpacityAnimValue,
          duration: LAYOUT_ANIMATION_DURATION,
          useNativeDriver: true,
        }),
      ],
      {},
    ).start(({ finished }) => {
      if (!finished) return;

      showedEditButton.current = editButtonRef.current;
      setContentContainerMarginEndToCounterEditButtonAnimValue();

      // Reset `renderEditButton.current` so that it will not be rendered on the next re-render if unnecessary.
      // Note that we are not using a set state here because we don't want to trigger a re-render when the animation is finished - proactively doing a re-render to remove the hidden (by animation) element is unnecessary and can be a performance hit.
      renderEditButton.current = editButtonRef.current;
    });
  }, [
    contentContainerMarginEndToCounterEditButtonAnim,
    editButtonOpacityAnim,
    editButtonOpacityAnimValue,
    editButtonTranslateXAnim,
    editButtonTranslateXAnimValue,
    getContentContainerMarginEndToCounterEditButtonAnimValue,
    shouldShowEditButton,
  ]);

  return {
    editButtonTranslateXAnim,
    contentContainerMarginEndToCounterEditButtonAnim,

    shouldRenderEditButton,
    editButtonStyle,
    contentContainerWrapperStyleForEditButtonAnimation,
    contentContainerStyleForEditButtonAnimation,
  };
}

function useGrabberAnimation({
  props,
  shouldRenderEditButton,
  editButtonTranslateXAnim,
  contentContainerMarginEndToCounterEditButtonAnim,
}: {
  props: ListItemProps;
  shouldRenderEditButton: boolean;
  editButtonTranslateXAnim: Animated.AnimatedNode;
  contentContainerMarginEndToCounterEditButtonAnim: Animated.AnimatedNode;
}) {
  const { showGrabber } = props;
  const htc = hasTrailingContents(props);

  const showGrabberRef = useRef(showGrabber);
  showGrabberRef.current = showGrabber;

  /** This ref is updated when the animation ends. */
  const grabberShowed = useRef(showGrabber);

  /** Should the grabber be rendered? Sometimes the grabber should be rendered for the animation. */
  const renderGrabber = useRef(showGrabber);
  if (showGrabber) {
    renderGrabber.current = true;
  } // Do not set `renderEditButton.current` to a falsy value here, since once it's rendered, it should stay rendered until the fade out animation is finished.

  const shouldRenderGrabber = renderGrabber.current;

  const grabberTranslateXAnimValue = showGrabber
    ? 0
    : GRABBER_HIDDEN_TRANSLATE_X_VALUE;
  const grabberTranslateXAnim = useRef(
    new Animated.Value(grabberTranslateXAnimValue),
  ).current;

  const getMainContentsContainerPaddingEndAnimValue = useCallback(() => {
    const paddingEndWhenGrabberShown =
      GRABBER_CONTAINER_WIDTH + (htc ? CONTAINER_PADDING_END : 4);

    if (showGrabberRef.current && grabberShowed.current) {
      return paddingEndWhenGrabberShown;
    }

    // Either the animation is in progress or the grabber is hidden.
    return CONTAINER_PADDING_END;
  }, [htc]);
  const mainContentsContainerPaddingEndAnim = useRef(
    new Animated.Value(getMainContentsContainerPaddingEndAnimValue()),
  ).current;

  const grabberStyle = useMemo<ViewStyle>(
    () =>
      shouldRenderEditButton
        ? {
            transform: [
              {
                translateX: Animated.subtract(
                  grabberTranslateXAnim,

                  // Counter the translateX value of the edit button.
                  Animated.add(
                    -EDIT_BUTTON_HIDDEN_TRANSLATE_X_VALUE,
                    editButtonTranslateXAnim,
                  ),
                ),
              },
            ],
          }
        : {
            transform: [
              {
                translateX: grabberTranslateXAnim,
              },
            ],
          },
    [editButtonTranslateXAnim, grabberTranslateXAnim, shouldRenderEditButton],
  );

  /** Animated values which uses native driver and those that don't cannot be used together in the same view. So we need to separate the styles which uses them to two different views. */
  const grabberWrapperStyle = useMemo<ViewStyle>(
    () =>
      shouldRenderEditButton
        ? {
            transform: [
              {
                translateX: Animated.add(
                  -EDIT_BUTTON_HIDDEN_TRANSLATE_X_VALUE,
                  contentContainerMarginEndToCounterEditButtonAnim,
                ),
              },
            ],
          }
        : {},
    [contentContainerMarginEndToCounterEditButtonAnim, shouldRenderEditButton],
  );

  const mainContentsContainerStyleForGrabber = useMemo<ViewStyle | null>(
    () =>
      shouldRenderGrabber
        ? {
            paddingEnd: mainContentsContainerPaddingEndAnim,
          }
        : null,
    [shouldRenderGrabber, mainContentsContainerPaddingEndAnim],
  );

  useEffect(() => {
    const setMainContentsContainerPaddingEndAnimValue = () => {
      mainContentsContainerPaddingEndAnim.setValue(
        getMainContentsContainerPaddingEndAnimValue(),
      );
    };

    setMainContentsContainerPaddingEndAnimValue();

    Animated.parallel(
      [
        Animated.timing(grabberTranslateXAnim, {
          toValue: grabberTranslateXAnimValue,
          duration: LAYOUT_ANIMATION_DURATION,
          useNativeDriver: true,
        }),
      ],
      {},
    ).start(({ finished }) => {
      if (!finished) return;

      grabberShowed.current = showGrabberRef.current;
      setMainContentsContainerPaddingEndAnimValue();

      // Reset `renderGrabber.current` so that it will not be rendered on the next re-render if unnecessary.
      // Note that we are not using a set state here because we don't want to trigger a re-render when the animation is finished - proactively doing a re-render to remove the hidden (by animation) element is unnecessary and can be a performance hit.
      renderGrabber.current = showGrabberRef.current;
    });
  }, [
    getMainContentsContainerPaddingEndAnimValue,
    grabberTranslateXAnim,
    grabberTranslateXAnimValue,
    mainContentsContainerPaddingEndAnim,
  ]);

  return {
    shouldRenderGrabber,
    grabberStyle,
    grabberWrapperStyle,
    mainContentsContainerStyleForGrabber,
  };
}

/** The translateX value to apply for hiding the edit button with animation. Should be a negative number. */
export const EDIT_BUTTON_HIDDEN_TRANSLATE_X_VALUE = -(
  EDIT_BUTTON_CONTAINER_WIDTH + CONTENT_CONTAINER_GAP
);

/** The translateX value to apply for hiding the edit button with animation. */
const GRABBER_HIDDEN_TRANSLATE_X_VALUE = GRABBER_CONTAINER_WIDTH;

export function hasTrailingContents(props: ListItemProps): boolean {
  const { detail, accessories, hideTrailingContents } = props;

  if (hideTrailingContents) return false;

  return !!(detail || accessories);
}
