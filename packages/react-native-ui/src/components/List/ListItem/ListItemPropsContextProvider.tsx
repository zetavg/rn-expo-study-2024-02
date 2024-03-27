import React from 'react';

import { ListItemPropsContext as ListItemPropsContextIOS } from '@rnstudy/react-native-ui-ios';
import { ListItemPropsContext as ListItemPropsContextMD3 } from '@rnstudy/react-native-ui-md3';

import { useUIPlatform } from '../../../contexts';

import { Props as ListItemProps } from './ListItem';

export function ListItemPropsContextProvider({
  value,
  children,
}: {
  value: Partial<ListItemProps>;
  children: React.ReactNode;
}) {
  const uiPlatform = useUIPlatform();

  switch (uiPlatform) {
    case 'ios': {
      return (
        <ListItemPropsContextIOS.Provider value={value}>
          {children}
        </ListItemPropsContextIOS.Provider>
      );
    }
    case 'android': {
      return (
        <ListItemPropsContextMD3.Provider value={value}>
          {children}
        </ListItemPropsContextMD3.Provider>
      );
    }
  }
}

export default ListItemPropsContextProvider;
