import React from 'react';

import {
  List as ListIOS,
  ListFooter as ListFooterIOS,
  ListHeader as ListHeaderIOS,
} from '@rnstudy/react-native-ui-ios';
import {
  List as ListMD3,
  ListFooter as ListFooterMD3,
  ListHeader as ListHeaderMD3,
} from '@rnstudy/react-native-ui-md3';

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
  /** Shorthand of
   * ```jsx
   * header={headerTitle ? <List.Header title={headerTitle} /> : undefined}
   * ```
   * . */
  headerTitle?: string | React.ReactElement;
  /** The footer of the list. Should be an `ListFooter` element. */
  footer?: React.ReactNode;
  /** Shorthand of
   * ```jsx
   * footer={footerText ? <List.Footer text={footerText} /> : undefined}
   * ```
   * . */
  footerText?: string | React.ReactElement;
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

  const { header, headerTitle, footer, footerText, ...restProps } = props;

  switch (uiPlatform) {
    case 'ios': {
      return (
        <ListIOS
          header={
            header || (headerTitle && <ListHeaderIOS title={headerTitle} />)
          }
          footer={footer || (footerText && <ListFooterIOS text={footerText} />)}
          {...restProps}
        />
      );
    }
    case 'android': {
      return (
        <ListMD3
          header={
            header || (headerTitle && <ListHeaderMD3 title={headerTitle} />)
          }
          footer={footer || (footerText && <ListFooterMD3 text={footerText} />)}
          {...restProps}
        />
      );
    }
  }
}

List.Header = ListHeader;
List.Footer = ListFooter;
List.Item = ListItem;

export default List;
