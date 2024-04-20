import React from 'react';
import { SFSymbol } from 'react-native-sfsymbols';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import { createBottomTabNavigator } from '@rnstudy/react-native-navigation';

import { registerTabNavigation } from '../hooks';

import { MainStackNavigation } from './MainStackNavigation';
import { ModalStackNavigation } from './ModalStackNavigation';

export const BottomTabNavigation = createBottomTabNavigator({
  id: 'bottom-tab',
  screens: {
    Home: {
      title: 'Overview',
      icon: ({ uiPlatform, focused, ...props }) => {
        switch (uiPlatform) {
          case 'ios':
            return <SFSymbol name="square.grid.2x2.fill" {...props} />;

          case 'android':
            return (
              <MaterialIcon
                name={focused ? 'view-grid' : 'view-grid-outline'}
                {...props}
              />
            );
        }
      },
      screen: ModalStackNavigation.withMainScreen(
        MainStackNavigation.withInitialRouteName('ExampleScreensList'),
      ),
    },
    Details: {
      title: 'Details',
      icon: 'star',
      screen: ModalStackNavigation.withMainScreen(
        MainStackNavigation.withInitialRouteName('Example1Details'),
      ),
    },
  },
});

export type BottomTabNavigationType = typeof BottomTabNavigation;

registerTabNavigation(BottomTabNavigation);
