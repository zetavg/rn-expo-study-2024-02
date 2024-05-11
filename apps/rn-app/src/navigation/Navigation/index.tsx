import React, { useEffect } from 'react';

import {
  NavigationContainer,
  StackActions,
  TabActions,
} from '@rnstudy/react-native-navigation';

import navigationRef from '../navigationRef';

import { BottomTabNavigation } from './BottomTabNavigation';
import { MainStackNavigation } from './MainStackNavigation';
import { ModalStackNavigation } from './ModalStackNavigation';

/**
 * Navigation root. Use this component in the main app file to render the whole navigation tree.
 */
export default function Navigation() {
  return (
    <NavigationContainer ref={navigationRef}>
      <ModalStackNavigation />
    </NavigationContainer>
  );
}
