import React from 'react';

import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@rnstudy/react-native-navigation';

import { BottomTabNavigation } from './BottomTabNavigation';
import { MainStackNavigation } from './MainStackNavigation';
import { ModalStackNavigation } from './ModalStackNavigation';

/**
 * Navigation root. Use this component in the main app file to render the whole navigation tree.
 */
export default function Navigation() {
  const navigationRef = useNavigationContainerRef();

  return (
    <NavigationContainer ref={navigationRef}>
      <ModalStackNavigation />
    </NavigationContainer>
  );
}
