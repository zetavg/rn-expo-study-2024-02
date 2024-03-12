import React from 'react';

import {
  GroupLevelContext as GroupLevelContextIOS,
  useGroupLevel as useGroupLevelIOS,
} from '@rnstudy/react-native-ios-ui';

import { useUIPlatform } from '../UIPlatformContext';

import { GroupLevelContextMD3, useGroupLevelMD3 } from './GroupLevelContextMD3';

export function GroupLevelContextProvider({
  iosValue,
  md3Value,
  children,
}: {
  iosValue: number;
  md3Value: number;
  children: React.ReactNode;
}) {
  return (
    <GroupLevelContextIOS.Provider value={iosValue}>
      <GroupLevelContextMD3.Provider value={md3Value}>
        {children}
      </GroupLevelContextMD3.Provider>
    </GroupLevelContextIOS.Provider>
  );
}

export function useGroupLevel() {
  const uiPlatform = useUIPlatform();
  const iosGroupLevel = useGroupLevelIOS();
  const md3GroupLevel = useGroupLevelMD3();

  switch (uiPlatform) {
    case 'ios': {
      return iosGroupLevel;
    }

    case 'android':
    default: {
      return md3GroupLevel;
    }
  }
}
