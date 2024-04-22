import React, { forwardRef, useContext, useMemo, useState } from 'react';
import { FlatList as RNFlatList, Platform } from 'react-native';
import { FlatList as RNGHFlatList } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native';

import {
  FlatList,
  FlatListProps,
  FlatListRef,
  FlatListType,
} from '@rnstudy/react-native-lists';
import { useInterceptedRef } from '@rnstudy/react-utils';

import {
  ScrollViewContext,
  useScrollViewPropsWithValuesFromContextMerged,
} from '../contexts';
import {
  useScrollViewContentInset,
  useScrollViewProps,
  useWrappedScrollableElement,
} from '../hooks';

import { KeyboardAvoidingViewAndroid } from './components/KeyboardAvoidingViewAndroid';

export type Props<T> = FlatListProps<T>;
export type RefObject<T> = FlatListRef<T>;

export const StackScreenContentFlatList: FlatListType = forwardRef<
  RefObject<unknown>,
  Props<unknown>
>(function StackScreenContentFlatList(rawProps, ref) {
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
    <FlatList ref={scrollViewRef} {...props} />,
  );
}) as FlatListType;

(StackScreenContentFlatList as unknown as { displayName: string }).displayName =
  'StackScreenContentFlatList';

export default StackScreenContentFlatList;
