import React, {
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  FlatList as RNFlatList,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
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
import dismissible from '../ModalScreenContent/dismissible';

import { KeyboardAvoidingViewAndroid } from './components/KeyboardAvoidingViewAndroid';

const DismissibleFlatList = dismissible(FlatList);

export type Props<T> = FlatListProps<T>;
export type RefObject<T> = FlatListRef<T>;

export const StackScreenContentFlatList: FlatListType = forwardRef<
  RefObject<unknown>,
  Props<unknown>
>(function StackScreenContentFlatList(rawProps, ref) {
  const [scrollViewRef, scrollViewRefObject] = useInterceptedRef(ref);

  const {
    scrollViewRefRef,
    scrollToDismissEnabled,
    // scrollToDismissOffset,
    ...restOfScrollViewContextValue
  } = useContext(ScrollViewContext) || {};

  if (scrollViewRefRef) scrollViewRefRef.current = scrollViewRefObject;

  const props = useScrollViewProps(
    useScrollViewPropsWithValuesFromContextMerged({
      props: rawProps,
      contextValue: restOfScrollViewContextValue,
    }),
  );

  const { inverted } = props;

  useEffect(() => {
    if (inverted) {
      // HACK: This is a workaround for the inverted flat list not initially being scrolled to the start (bottom).
      const scrollToStartTimer = setTimeout(() => {
        scrollViewRefObject.current?.scrollToStart({ animated: false });
      }, 1);

      return () => {
        clearTimeout(scrollToStartTimer);
      };
    }
  }, [inverted, scrollViewRefObject]);

  // TODO: Not supported for now.
  // const FlatListComponent = scrollToDismissEnabled
  //   ? DismissibleFlatList
  //   : FlatList;
  const FlatListComponent = FlatList;

  return useWrappedScrollableElement(
    inverted && Platform.OS === 'ios' ? (
      <>
        {/* HACK: This scroll view is only used to give the native iOS header a scrolled style (let it show the bottom border). */}
        <ScrollView
          style={[styles.height0, styles.pointerEventsNone]}
          contentOffset={{ y: 100, x: 100 }}
          contentContainerStyle={styles.height100}
          scrollsToTop={false}
        />
        <FlatListComponent
          ref={scrollViewRef}
          {...props}
          // scrollToDismissOffset={scrollToDismissOffset}
        />
      </>
    ) : (
      <FlatListComponent
        ref={scrollViewRef}
        {...props}
        // scrollToDismissOffset={scrollToDismissOffset}
      />
    ),
  );
}) as FlatListType;

(StackScreenContentFlatList as unknown as { displayName: string }).displayName =
  'StackScreenContentFlatList';

const styles = StyleSheet.create({
  height0: {
    height: 0,
  },
  height100: {
    height: 100,
  },
  pointerEventsNone: {
    pointerEvents: 'none',
  },
});

export default StackScreenContentFlatList;
