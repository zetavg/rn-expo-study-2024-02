import React, { useMemo } from 'react';
import { View, ViewStyle } from 'react-native';

import { ListFooterPropsContext } from './ListFooter';
import { ListHeaderPropsContext } from './ListHeader';
import { ListItemProps, ListItemPropsContext } from './ListItem';
import { getListPadding } from './utils';

type ListStyle = 'plain' | 'grouped' | 'insetGrouped';

export type Props = {
  first?: boolean;
  listStyle?: ListStyle;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  children: Readonly<React.JSX.Element> | readonly React.JSX.Element[];
};

export function List({
  first = false,
  listStyle = 'insetGrouped',
  header,
  footer,
  children,
}: Props) {
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

  return (
    <ListItemPropsContext.Provider value={listItemPropsContextValue}>
      <View style={containerStyle}>
        {!!header && (
          <ListHeaderPropsContext.Provider value={listHeaderPropsContextValue}>
            {header}
          </ListHeaderPropsContext.Provider>
        )}
        {processedChildren}
        {!!footer && (
          <ListFooterPropsContext.Provider value={listFooterPropsContextValue}>
            {footer}
          </ListFooterPropsContext.Provider>
        )}
      </View>
    </ListItemPropsContext.Provider>
  );
}

export default List;
