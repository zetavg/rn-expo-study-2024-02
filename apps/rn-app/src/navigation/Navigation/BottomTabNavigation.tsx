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
    HomeTab: {
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
      screen: MainStackNavigation.withInitialRouteName('ExampleScreensList'),
    },
    ExampleAppsTab: {
      title: 'Example Apps',
      icon: ({ uiPlatform, focused, ...props }) => {
        switch (uiPlatform) {
          case 'ios':
            return <SFSymbol name="arrow.up.forward.app.fill" {...props} />;

          case 'android':
            return (
              <MaterialIcon
                name={
                  focused
                    ? 'arrow-top-right-bold-box'
                    : 'arrow-top-right-bold-box-outline'
                }
                {...props}
              />
            );
        }
      },
      screen: MainStackNavigation.withInitialRouteName('ExampleAppsList'),
    },
    SettingsTab: {
      title: 'Settings',
      icon: ({ uiPlatform, focused, ...props }) => {
        switch (uiPlatform) {
          case 'ios':
            return <SFSymbol name="gearshape.fill" {...props} />;

          case 'android':
            return (
              <MaterialIcon name={focused ? 'cog' : 'cog-outline'} {...props} />
            );
        }
      },
      screen: MainStackNavigation.withInitialRouteName('Settings'),
    },
  },
});

export type BottomTabNavigationType = typeof BottomTabNavigation;

registerTabNavigation(BottomTabNavigation);
