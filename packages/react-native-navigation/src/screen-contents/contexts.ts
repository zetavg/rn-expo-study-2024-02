import { createContext, useMemo } from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollViewProps,
} from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

export type IsScrolledToStart = () => boolean;
export type ScrollToStart = () => void;

/**
 * A subset of the scrollable component's ref object that we will use.
 */
export type ScrollViewRef = React.RefObject<{
  scrollToStart: () => void;
  isScrolledToStart: () => boolean;
}>;

export type ScrollViewContextValue = {
  /** The ref object that holds a ref object that implements the `scrollToStart` and `isScrolledToStart` functions. The children ScrollView component should assign it's ref to this ref object. */
  scrollViewRefRef: React.MutableRefObject<ScrollViewRef | null>;
  /** If provided, this function should be merged with the `onScroll` prop of the scroll view. */
  onScroll?: ScrollViewProps['onScroll'];
  /** If provided, this function should be merged with the `onScrollBeginDrag` prop of the scroll view. */
  onScrollBeginDrag?: ScrollViewProps['onScrollBeginDrag'];
};

/**
 * A context that scrollable components should use to make themselves integrate well in screens.
 */
export const ScrollViewContext = createContext<ScrollViewContextValue | null>(
  null,
);

export function useScrollViewPropsWithValuesFromContextMerged<
  P extends ScrollViewProps,
>({
  props: {
    onScroll: onScrollProp,
    onScrollBeginDrag: onScrollBeginDragProp,
    ...restProps
  },
  contextValue: {
    onScroll: onScrollFromContext,
    onScrollBeginDrag: onScrollBeginDragFromContext,
  },
}: {
  props: P;
  contextValue: Omit<ScrollViewContextValue, 'scrollViewRefRef'>;
}): P {
  const handleScroll = useMemo(() => {
    if (!onScrollFromContext) return onScrollProp;

    return (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (onScrollProp) onScrollProp(event);
      onScrollFromContext(event);
    };
  }, [onScrollFromContext, onScrollProp]);

  const handleScrollBeginDrag = useMemo(() => {
    if (!onScrollBeginDragFromContext) return onScrollBeginDragProp;

    return (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (onScrollBeginDragProp) onScrollBeginDragProp(event);
      onScrollBeginDragFromContext(event);
    };
  }, [onScrollBeginDragFromContext, onScrollBeginDragProp]);

  return {
    ...restProps,
    onScroll: handleScroll,
    onScrollBeginDrag: handleScrollBeginDrag,
  } as P;
}

export const BottomTabNavigationContext = createContext<
  BottomTabScreenProps<{ [name: string]: undefined }>['navigation'] | null
>(null);
