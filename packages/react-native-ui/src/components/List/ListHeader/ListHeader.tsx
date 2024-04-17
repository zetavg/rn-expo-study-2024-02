import React from 'react';

import { ListHeader as ListHeaderIOS } from '@rnstudy/react-native-ui-ios';
import { ListHeader as ListHeaderMD3 } from '@rnstudy/react-native-ui-md3';
import { reactMemoWithPropsThatCanBeMarkedAsStable } from '@rnstudy/react-utils';

import { useUIPlatform } from '../../../contexts';

type ListStyle = 'plain' | 'grouped' | 'insetGrouped';

export type Props = {
  listStyle?: ListStyle;
  title?: string | React.ReactNode;
  titleStyle?: 'default' | 'prominent';

  /** Optional description that will show under the title. This will only show if `titleStyle` is `prominent`. */
  description?: string | React.ReactNode;

  accessories?: React.ReactNode;

  first?: boolean;
};

export function ListHeader(props: Props) {
  const uiPlatform = useUIPlatform();

  switch (uiPlatform) {
    case 'ios': {
      return <ListHeaderIOS {...props} />;
    }
    case 'android': {
      return <ListHeaderMD3 {...props} />;
    }
  }
}

/**
 * `ListHeader` wrapped with `React.memo`.
 */
ListHeader.Memoized = reactMemoWithPropsThatCanBeMarkedAsStable(ListHeader, [
  'title',
]);

export default ListHeader;
