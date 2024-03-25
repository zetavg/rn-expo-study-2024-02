import React, {
  createContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Animated } from 'react-native';

import {
  CONTENT_CONTAINER_GAP,
  EDIT_BUTTON_CONTAINER_WIDTH,
  GRABBER_CONTAINER_WIDTH,
  LAYOUT_ANIMATION_DURATION,
} from './consts';
import type { Props as ListItemProps } from './ListItem';

type ListItemAnimationContextValue = {
  editButtonTranslateXAnim: Animated.Value;
  editButtonOpacityAnim: Animated.Value;
  renderEditButtonForAnim: ListItemProps['editButton'];
  isEditButtonAnimationPlaying: boolean;
  grabberTranslateXAnim: Animated.Value;
  isGrabberShown: boolean;
  renderGrabberForAnim: boolean;
  delayedHideTrailingContents: boolean;
};

export const ListItemAnimationContext =
  createContext<ListItemAnimationContextValue | null>(null);

function grabberTranslateXAnimValue({
  showGrabber,
}: {
  showGrabber: ListItemProps['showGrabber'];
}) {
  return showGrabber ? 0 : GRABBER_CONTAINER_WIDTH;
}

export function ListItemAnimationContextProvider({
  editButton,
  showGrabber,
  hideTrailingContents,
  children,
}: {
  editButton: ListItemProps['editButton'];
  showGrabber: ListItemProps['showGrabber'];
  hideTrailingContents: ListItemProps['hideTrailingContents'];
  children: React.ReactNode;
}): JSX.Element {
  // Edit button

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
    const timers: ReturnType<typeof setTimeout>[] = [];
    let needToResetIsEditButtonAnimationPlaying = false;
    if (!!editButton !== !!prevEditButton.current) {
      setIsEditButtonAnimationPlaying(true);
      needToResetIsEditButtonAnimationPlaying = true;
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
    }

    if (editButton !== prevEditButton.current) {
      if (editButton) {
        setRenderEditButtonForAnim(editButton);
      } else {
        // Wait for the animation to finish before setting renderEditButtonForAnim to undefined
        timers.push(
          setTimeout(() => {
            setRenderEditButtonForAnim(editButton);
            setIsEditButtonAnimationPlaying(false);
          }, LAYOUT_ANIMATION_DURATION),
        );
        needToResetIsEditButtonAnimationPlaying = false;
      }
    }

    if (needToResetIsEditButtonAnimationPlaying) {
      timers.push(
        setTimeout(() => {
          setIsEditButtonAnimationPlaying(false);
        }, LAYOUT_ANIMATION_DURATION),
      );
    }

    prevEditButton.current = editButton;

    return () => {
      for (const t of timers) clearTimeout(t);
    };
  }, [editButton, editButtonOpacityAnim, editButtonTranslateXAnim]);

  // Grabber

  const prevShowGrabber = useRef(showGrabber);

  const [isGrabberShown, setIsGrabberShown] = useState(!!showGrabber);
  const isGrabberShownTimer = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  const [renderGrabberForAnim, setRenderGrabberForAnim] =
    useState(!!showGrabber);
  const renderGrabberForAnimTimer = useRef<ReturnType<
    typeof setTimeout
  > | null>(null);

  const grabberTranslateXAnim = useRef(
    new Animated.Value(grabberTranslateXAnimValue({ showGrabber })),
  ).current;

  useEffect(() => {
    if (showGrabber === prevShowGrabber.current) return;

    Animated.timing(grabberTranslateXAnim, {
      toValue: grabberTranslateXAnimValue({ showGrabber }),
      duration: LAYOUT_ANIMATION_DURATION,
      useNativeDriver: true,
    }).start();

    if (renderGrabberForAnimTimer.current)
      clearTimeout(renderGrabberForAnimTimer.current);
    renderGrabberForAnimTimer.current = setTimeout(
      () => {
        setRenderGrabberForAnim(!!showGrabber);
      },
      showGrabber ? 0 : LAYOUT_ANIMATION_DURATION,
    );

    if (isGrabberShownTimer.current) clearTimeout(isGrabberShownTimer.current);
    isGrabberShownTimer.current = setTimeout(
      () => {
        setIsGrabberShown(!!showGrabber);
      },
      showGrabber ? LAYOUT_ANIMATION_DURATION : 0,
    );

    prevShowGrabber.current = showGrabber;
  }, [grabberTranslateXAnim, showGrabber]);

  // Hide trailing contents

  const [delayedHideTrailingContents, setDelayedHideTrailingContents] =
    useState(!!hideTrailingContents);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDelayedHideTrailingContents(!!hideTrailingContents);
    }, 0);
    return () => clearTimeout(timer);
  }, [hideTrailingContents]);

  // Context value

  const listItemAnimationContextValue = useMemo<ListItemAnimationContextValue>(
    () => ({
      editButtonTranslateXAnim,
      editButtonOpacityAnim,
      renderEditButtonForAnim,
      isEditButtonAnimationPlaying,
      grabberTranslateXAnim,
      isGrabberShown,
      renderGrabberForAnim,
      delayedHideTrailingContents,
    }),
    [
      editButtonTranslateXAnim,
      editButtonOpacityAnim,
      renderEditButtonForAnim,
      isEditButtonAnimationPlaying,
      grabberTranslateXAnim,
      isGrabberShown,
      renderGrabberForAnim,
      delayedHideTrailingContents,
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

export const editButtonHiddenTranslateXValue = -(
  EDIT_BUTTON_CONTAINER_WIDTH + CONTENT_CONTAINER_GAP
);
