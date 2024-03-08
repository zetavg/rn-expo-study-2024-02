import React, { useEffect } from 'react';

import {
  getNavigationContainerComponent,
  StackActions,
  useNavigationContainerRef,
} from '@rnstudy/react-native-navigation';

import config from '../config';

import { BottomTabNavigation } from './BottomTabNavigation';
import { MainStackNavigation } from './MainStackNavigation';
import { ModalStackNavigation } from './ModalStackNavigation';

const NavigationContainer = getNavigationContainerComponent(config);

/**
 * Navigation root. Use this component in the main app file to render the whole navigation tree.
 */
export default function Navigation() {
  const navigationRef = useNavigationContainerRef();

  useEffect(() => {
    setTimeout(() => {
      navigationRef.current?.dispatch(
        StackActions.push('Example1Details', { name: 'hi from nav' }),
      );
    }, 1000);
  }, [navigationRef]);

  return (
    <NavigationContainer ref={navigationRef}>
      <BottomTabNavigation />
    </NavigationContainer>
  );
}
