import React, {
  createContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Animated } from 'react-native';

import { GRABBER_CONTAINER_WIDTH, LAYOUT_ANIMATION_DURATION } from './consts';
import type { Props as ListItemProps } from './ListItem';

type ListItemAnimationContextValue = {
  grabberTranslateXAnim: Animated.Value;
  isGrabberShown: boolean;
  renderGrabberForAnim: boolean;
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
  showGrabber,
  children,
}: {
  showGrabber: ListItemProps['showGrabber'];
  children: React.ReactNode;
}): JSX.Element {
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

  const listItemAnimationContextValue = useMemo<ListItemAnimationContextValue>(
    () => ({ grabberTranslateXAnim, isGrabberShown, renderGrabberForAnim }),
    [grabberTranslateXAnim, isGrabberShown, renderGrabberForAnim],
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
