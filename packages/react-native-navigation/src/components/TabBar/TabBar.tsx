import React from 'react';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

import { useUIPlatform } from '@rnstudy/react-native-ui';

import TabBarIOS from './TabBarIOS';
import TabBarMD3 from './TabBarMD3';

export type Props = BottomTabBarProps & { shifting?: boolean };

export function TabBar(props: Props) {
  const uiPlatform = useUIPlatform();

  switch (uiPlatform) {
    case 'ios':
      return <TabBarIOS {...props} />;

    case 'android':
      return <TabBarMD3 {...props} />;
  }
}

export default TabBar;
