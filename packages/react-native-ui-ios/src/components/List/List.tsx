import React, { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, StyleSheet, View, ViewStyle } from 'react-native';
import Color from 'color';

import { useUIColors } from '../../contexts';

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
  children: Readonly<React.JSX.Element> | readonly React.JSX.Element[];
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
  const uiColors = useUIColors();
  const listItemPropsContextValue = useMemo(() => ({ listStyle }), [listStyle]);

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

  const childrenCount = React.Children.count(children);
  const isSingleChild = childrenCount === 1;

  const processedChildren = React.Children.map(children, (child, i) => {
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
  });

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
  const [
    shouldRenderPlaceholderForLayoutAnimation,
    setShouldRenderPlaceholderForLayoutAnimation,
  ] = useState(shouldRenderPlaceholder);
  useEffect(() => {
    if (shouldRenderPlaceholder) {
      setShouldRenderPlaceholderForLayoutAnimation(true);
    } else {
      const timeout = setTimeout(() => {
        setShouldRenderPlaceholderForLayoutAnimation(false);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [shouldRenderPlaceholder]);

  const placeholderIsRenderedForLayoutAnimation =
    shouldRenderPlaceholderForLayoutAnimation && !shouldRenderPlaceholder;

  return (
    <ListItemPropsContext.Provider value={listItemPropsContextValue}>
      <View style={containerStyle}>
        {!!header && (
          <ListHeaderPropsContext.Provider value={listHeaderPropsContextValue}>
            {header}
          </ListHeaderPropsContext.Provider>
        )}
        <View style={loading && styles.loadingContent}>
          {(shouldRenderPlaceholder ||
            shouldRenderPlaceholderForLayoutAnimation) && (
            <ListPlaceholder
              key="__list_placeholder__"
              listStyle={listStyle}
              placeholder={
                placeholderIsRenderedForLayoutAnimation ? '' : placeholder || ''
              }
              style={
                placeholderIsRenderedForLayoutAnimation
                  ? styles.placeholderForLayoutAnimation
                  : undefined
              }
            />
          )}
          {processedChildren}
          {loading && (
            <View
              style={[
                StyleSheet.absoluteFill,
                styles.activityIndicatorContainer,
              ]}
            >
              <ActivityIndicator color={uiColors.secondaryLabel} />
            </View>
          )}
        </View>
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
  loadingContent: {
    opacity: 0.75,
  },
  activityIndicatorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderForLayoutAnimation: {
    ...StyleSheet.absoluteFillObject,
    minHeight: 0,
  },
});

export default List;
