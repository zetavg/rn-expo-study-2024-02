import { createContext } from 'react';
import { ScrollViewProps } from 'react-native';

export type ScrollablePropsContextValue = Partial<ScrollViewProps> & {
  scrollToTopAndScrollToOffset?: number;
  topInsetForScrolling?: number;
  bottomInsetForScrolling?: number;
};

export const ScrollablePropsContext =
  createContext<ScrollablePropsContextValue>({});
ScrollablePropsContext.displayName = 'ScrollablePropsContext';

export default ScrollablePropsContext;
