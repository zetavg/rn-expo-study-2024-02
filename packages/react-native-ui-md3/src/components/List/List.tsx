import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

import BackgroundColor from '../BackgroundColor';

import {
  containerBorderRadiusStyles,
  containerStyles,
} from './ListItem/components/OuterContainer';
import { ListFooterPropsContext } from './ListFooter';
import { ListHeaderPropsContext } from './ListHeader';
import { ListItemProps, ListItemPropsContext } from './ListItem';
import ListPlaceholder from './ListPlaceholder';
import { getListPadding } from './utils';

type ListStyle = 'plain' | 'grouped' | 'insetGrouped';

export type Props = {
  /** Set this to `true` if the list is the first element in a view, which allows it to have the correct top padding. */
  first?: boolean;
  /** The style of the list. */
  listStyle?: ListStyle;
  /** The footer of the list. Should be an `ListHeader` element. */
  header?: React.ReactNode;
  /** The footer of the list. Should be an `ListFooter` element. */
  footer?: React.ReactNode;
  /** The items in the list. Should be an array of `ListItem`s. */
  children:
    | Readonly<React.JSX.Element | null | undefined | false>
    | readonly (React.JSX.Element | null | undefined | false)[];
  /** Show a loading indicator over the list. */
  loading?: boolean;
  /** The placeholder to display when children is empty. */
  placeholder?: Readonly<React.JSX.Element> | string;
};

export function List({
  first = false,
  listStyle = 'insetGrouped',
  header,
  footer,
  children,
  loading,
  placeholder,
}: Props) {
  const listItemPropsContextValue = useMemo(
    () => ({ listStyle, _isInListComponent: true }),
    [listStyle],
  );

  const hasHeader = !!header;
  const hasFooter = !!footer;

  const containerStyle = useMemo<ViewStyle>(
    () => ({
      paddingTop: getListPadding({
        position: 'top',
        first,
        listStyle,
        withHeader: hasHeader,
      }),
      paddingBottom: getListPadding({
        position: 'bottom',
        listStyle,
        withFooter: hasFooter,
      }),
    }),
    [first, listStyle, hasHeader, hasFooter],
  );

  const childrenWithoutFalselyValues =
    React.Children.map(children, (c) => c)?.filter((c) => !!c) || [];
  const childrenCount = childrenWithoutFalselyValues.length;
  const isSingleChild = childrenCount === 1;

  const processedChildren = React.Children.map(
    childrenWithoutFalselyValues,
    (child, i) => {
      const listPosition: ListItemProps['listPosition'] = isSingleChild
        ? 'only'
        : i === 0
          ? 'first'
          : i === childrenCount - 1
            ? 'last'
            : 'middle';

      return {
        ...child,
        props: {
          ...child.props,
          listPosition,
        },
      };
    },
  );

  const listHeaderPropsContextValue = useMemo(
    () => ({ listStyle }),
    [listStyle],
  );

  const listFooterPropsContextValue = useMemo(
    () => ({ listStyle }),
    [listStyle],
  );

  const shouldRenderPlaceholder =
    childrenCount === 0 && (placeholder || loading);

  /** The animated ActivityIndicator behaves weirdly when it's disappearance is animated with a layout animation. This is a workaround to fix that - delay the removal of the ActivityIndicator after the LayoutAnimation has begun. */
  const [
    shouldRenderLoadingIndicatorForLayoutAnimation,
    setShouldRenderLoadingIndicatorForLayoutAnimation,
  ] = useState(loading);
  useEffect(() => {
    if (loading) {
      setShouldRenderLoadingIndicatorForLayoutAnimation(true);
    } else {
      const timeout = setTimeout(() => {
        setShouldRenderLoadingIndicatorForLayoutAnimation(false);
      }, 10);
      return () => clearTimeout(timeout);
    }
  }, [loading]);

  return (
    <ListItemPropsContext.Provider value={listItemPropsContextValue}>
      <View style={containerStyle}>
        {!!header && (
          <ListHeaderPropsContext.Provider value={listHeaderPropsContextValue}>
            {header}
          </ListHeaderPropsContext.Provider>
        )}

        <BackgroundColor doNotIncreaseGroupLevelForChildren>
          {(backgroundColor) => (
            <View
              style={[
                styles.itemsContainer,
                containerStyles[listStyle],
                containerBorderRadiusStyles[listStyle],
                { backgroundColor },
              ]}
            >
              <View style={loading && styles.loadingContent}>
                {shouldRenderPlaceholder && (
                  <ListPlaceholder
                    key="__list_placeholder__"
                    listStyle={listStyle}
                    placeholder={placeholder || ''}
                    loading={loading}
                    _isInListComponent
                  />
                )}
                {processedChildren}
              </View>

              {(loading || shouldRenderLoadingIndicatorForLayoutAnimation) && (
                <View
                  style={[
                    StyleSheet.absoluteFill,
                    styles.activityIndicatorContainer,
                    loading && styles.activityIndicatorContainer_shown,
                  ]}
                >
                  <ActivityIndicator size="small" />
                </View>
              )}
            </View>
          )}
        </BackgroundColor>
        {!!footer && (
          <ListFooterPropsContext.Provider value={listFooterPropsContextValue}>
            {footer}
          </ListFooterPropsContext.Provider>
        )}
      </View>
    </ListItemPropsContext.Provider>
  );
}

const styles = StyleSheet.create({
  itemsContainer: {
    overflow: 'hidden',
  },
  loadingContent: {
    opacity: 0.5,
  },
  activityIndicatorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0,
  },
  activityIndicatorContainer_shown: {
    opacity: 1,
  },
  placeholderForLayoutAnimation: {
    ...StyleSheet.absoluteFillObject,
    minHeight: 0,
  },
});

export default List;
