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
import dismissible from '../ModalScreenContent/dismissible';

const DismissibleScrollView = dismissible(ScrollView);

export type Props = ScrollViewProps;
export type RefObject = ScrollViewRef;

export const StackScreenContentScrollView = forwardRef<
  RefObject,
  ScrollViewProps
>(function StackScreenContentScrollView(rawProps, ref) {
  const [scrollViewRef, scrollViewRefObject] = useInterceptedRef(ref);

  const {
    scrollViewRefRef,
    scrollToDismissEnabled,
    scrollToDismissOffset,
    ...restOfScrollViewContextValue
  } = useContext(ScrollViewContext) || {};

  if (scrollViewRefRef) scrollViewRefRef.current = scrollViewRefObject;

  const props = useScrollViewProps(
    useScrollViewPropsWithValuesFromContextMerged({
      props: rawProps,
      contextValue: restOfScrollViewContextValue,
    }),
  );

  const ScrollViewComponent = scrollToDismissEnabled
    ? DismissibleScrollView
    : ScrollView;

  return useWrappedScrollableElement(
    <ScrollViewComponent
      ref={scrollViewRef}
      {...props}
      scrollToDismissOffset={scrollToDismissOffset}
    />,
  );
});

StackScreenContentScrollView.displayName = 'StackScreenContentScrollView';

export default StackScreenContentScrollView;
