import React from 'react';

import { ListPadding as ListPaddingIOS } from '@rnstudy/react-native-ui-ios';
import { ListPadding as ListPaddingMD3 } from '@rnstudy/react-native-ui-md3';

import { useUIPlatform } from '../../contexts';

import { ListPaddingConditions } from './utils';

type Props = ListPaddingConditions;

export function ListPadding(props: Props) {
  const uiPlatform = useUIPlatform();

  switch (uiPlatform) {
    case 'ios': {
      return <ListPaddingIOS {...props} />;
    }
    case 'android': {
      return <ListPaddingMD3 {...props} />;
    }
  }
}

export default ListPadding;
