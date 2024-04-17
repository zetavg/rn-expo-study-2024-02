import React from 'react';

import { ListFooter as ListFooterIOS } from '@rnstudy/react-native-ui-ios';
import { ListFooter as ListFooterMD3 } from '@rnstudy/react-native-ui-md3';
import { reactMemoWithPropsThatCanBeMarkedAsStable } from '@rnstudy/react-utils';

import { useUIPlatform } from '../../../contexts';

type ListStyle = 'plain' | 'grouped' | 'insetGrouped';

export type Props = {
  listStyle?: ListStyle;
  text?: string | React.ReactNode;
};

export function ListFooter(props: Props) {
  const uiPlatform = useUIPlatform();

  switch (uiPlatform) {
    case 'ios': {
      return <ListFooterIOS {...props} />;
    }
    case 'android': {
      return <ListFooterMD3 {...props} />;
    }
  }
}

/**
 * `ListFooter` wrapped with `React.memo`.
 */
ListFooter.Memoized = reactMemoWithPropsThatCanBeMarkedAsStable(ListFooter, [
  'text',
]);

export default ListFooter;
