import React from 'react';

import { List as ListIOS } from '@rnstudy/react-native-ui-ios';
import { List as ListMD3 } from '@rnstudy/react-native-ui-md3';

import { useUIPlatform } from '../../contexts';

type ListStyle = 'plain' | 'grouped' | 'insetGrouped';

export type Props = {
  first?: boolean;
  listStyle?: ListStyle;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  children: Readonly<React.JSX.Element> | readonly React.JSX.Element[];
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

export default List;
