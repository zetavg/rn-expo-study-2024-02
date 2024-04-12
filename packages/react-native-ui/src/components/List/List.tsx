import React from 'react';

import { List as ListIOS } from '@rnstudy/react-native-ui-ios';
import { List as ListMD3 } from '@rnstudy/react-native-ui-md3';

import { useUIPlatform } from '../../contexts';

import ListFooter from './ListFooter';
import ListHeader from './ListHeader';
import ListItem from './ListItem';

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

export function List(props: Props) {
  const uiPlatform = useUIPlatform();

  switch (uiPlatform) {
    case 'ios': {
      return <ListIOS {...props} />;
    }
    case 'android': {
      return <ListMD3 {...props} />;
    }
  }
}

List.Header = ListHeader;
List.Footer = ListFooter;
List.Item = ListItem;

export default List;
