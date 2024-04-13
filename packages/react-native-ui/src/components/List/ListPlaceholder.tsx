import React from 'react';

import { ListPlaceholder as ListPlaceholderIOS } from '@rnstudy/react-native-ui-ios';
import { ListPlaceholder as ListPlaceholderMD3 } from '@rnstudy/react-native-ui-md3';

import { useUIPlatform } from '../../contexts';

type ListStyle = 'plain' | 'grouped' | 'insetGrouped';

export type Props = {
  /** The style of the list. */
  listStyle?: ListStyle;
  /** The placeholder to display when children is empty. */
  placeholder: Readonly<React.JSX.Element> | string;
  loading?: boolean;
};

export function ListPlaceholder(props: Props) {
  const uiPlatform = useUIPlatform();

  switch (uiPlatform) {
    case 'ios': {
      return <ListPlaceholderIOS {...props} />;
    }
    case 'android': {
      return <ListPlaceholderMD3 {...props} />;
    }
  }
}

export default ListPlaceholder;
