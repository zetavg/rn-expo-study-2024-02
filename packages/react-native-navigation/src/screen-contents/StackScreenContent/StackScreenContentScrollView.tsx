import React, { forwardRef, useContext } from 'react';

import {
  ScrollView,
  ScrollViewProps,
  ScrollViewRef,
} from '@rnstudy/react-native-lists';
import { useInterceptedRef } from '@rnstudy/react-utils';

import {
  ScrollViewContext,
  useScrollViewPropsWithValuesFromContextMerged,
} from '../contexts';
import { useScrollViewProps, useWrappedScrollableElement } from '../hooks';

export type Props = ScrollViewProps;
export type RefObject = ScrollViewRef;

export const StackScreenContentScrollView = forwardRef<
  RefObject,
  ScrollViewProps
>(function StackScreenContentScrollView(rawProps, ref) {
  const [scrollViewRef, scrollViewRefObject] = useInterceptedRef(ref);

  const { scrollViewRefRef, ...restOfScrollViewContextValue } =
    useContext(ScrollViewContext) || {};

  if (scrollViewRefRef) scrollViewRefRef.current = scrollViewRefObject;

  const props = useScrollViewProps(
    useScrollViewPropsWithValuesFromContextMerged({
      props: rawProps,
      contextValue: restOfScrollViewContextValue,
    }),
  );

  return useWrappedScrollableElement(
    <ScrollView ref={scrollViewRef} {...props} />,
  );
});

StackScreenContentScrollView.displayName = 'StackScreenContentScrollView';

export default StackScreenContentScrollView;
