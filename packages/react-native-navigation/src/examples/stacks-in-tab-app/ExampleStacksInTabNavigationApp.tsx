import React from 'react';
import { Alert } from 'react-native';
import { SFSymbol } from 'react-native-sfsymbols';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  StackActions,
  TabActions,
  useNavigationContainerRef,
} from '@react-navigation/native';

import createBottomTabNavigator from '../../createBottomTabNavigator';
import createStackNavigator from '../../createStackNavigator';
import NavigationContainer from '../../NavigationContainer';
import { stackNavigatorScreens } from '../../types';

import MessageDetailScreen from './screens/MessageDetailScreen';
import MessagesListScreen from './screens/MessagesListScreen';
import SettingsScreen from './screens/SettingsScreen';
import { ExitContext } from './contexts';
import { registerStackNavigation, registerTabNavigation } from './hooks';

export const stackScreens = stackNavigatorScreens({
  MessagesList: MessagesListScreen,
  MessageDetail: MessageDetailScreen,
  Settings: SettingsScreen,
});

const StackNavigation = createStackNavigator({
  id: 'example-stack',
  screens: {
    ...stackScreens,
  },
  defaultInitialRouteName: 'MessagesList',
});

export type StackNavigationType = typeof StackNavigation;

registerStackNavigation(StackNavigation);

export const TabNavigation = createBottomTabNavigator({
  id: 'bottom-tab',
  responsive: true,
  screens: {
    MessagesTab: {
      title: 'Messages',
      icon: ({ uiPlatform, focused, ...props }) => {
        switch (uiPlatform) {
          case 'ios':
            return <SFSymbol name="bubble.left.circle.fill" {...props} />;

          case 'android':
            return (
              <MaterialIcon
                name={focused ? 'message-text' : 'message-text-outline'}
                {...props}
              />
            );
        }
      },
      screen: StackNavigation.withInitialRouteName('MessagesList'),
    },
    SettingsTab: {
      title: 'Settings',
      icon: ({ uiPlatform, focused, ...props }) => {
        switch (uiPlatform) {
          case 'ios':
            return <SFSymbol name="person.circle.fill" {...props} />;

          case 'android':
            return (
              <MaterialIcon
                name={focused ? 'account' : 'account-outline'}
                {...props}
              />
            );
        }
      },
      screen: StackNavigation.withInitialRouteName('Settings'),
    },
  },
});

export type TabNavigationType = typeof TabNavigation;

registerTabNavigation(TabNavigation);

export function ExampleStacksInTabNavigationApp({
  exit,
}: {
  exit?: () => void;
}) {
  const navigationRef = useNavigationContainerRef();

  const [accounts, setAccounts] = React.useState<string[]>(['Account 1']);

  return (
    <ExitContext.Provider value={exit}>
      <NavigationContainer ref={navigationRef}>
        <TabNavigation
          tabButtonMenus={{
            MessagesTab: ({ eventSenderRef }) => [
              {
                title: 'Unread',
                handler: () => {
                  navigationRef.current?.dispatch(
                    TabActions.jumpTo('MessagesTab'),
                  );
                  navigationRef.current?.dispatch(
                    StackActions.popTo('MessagesList'),
                  );
                  setImmediate(() => {
                    eventSenderRef.current?.({
                      type: 'messages-filter',
                      filter: 'unread',
                    });
                  });
                },
              },
              {
                title: 'All',
                handler: () => {
                  navigationRef.current?.dispatch(
                    TabActions.jumpTo('MessagesTab'),
                  );
                  navigationRef.current?.dispatch(
                    StackActions.popTo('MessagesList'),
                  );
                  setImmediate(() => {
                    eventSenderRef.current?.({
                      type: 'messages-filter',
                      filter: 'all',
                    });
                  });
                },
              },
            ],
            SettingsTab: [
              {
                inline: true,
                items: accounts.map((account) => ({
                  title: account,
                  handler: () => {
                    Alert.alert('Account Selected', account);
                  },
                })),
              },
              {
                title: 'Add Account',
                icon: '_plus',
                handler: () => {
                  setAccounts((prev) => [
                    ...prev,
                    `Account ${prev.length + 1}`,
                  ]);
                },
              },
            ],
          }}
        />
      </NavigationContainer>
    </ExitContext.Provider>
  );
}

export default ExampleStacksInTabNavigationApp;
