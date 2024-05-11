import React from 'react';

import {
  useMainStackNavigation,
  useModalStackNavigation,
} from '@/navigation/hooks';
import {
  StackScreenContent,
  StackScreenProps,
} from '@rnstudy/react-native-navigation';
import { List } from '@rnstudy/react-native-ui';

export default function ExampleScreensListScreen({ ..._ }: StackScreenProps) {
  const mainStackNavigation = useMainStackNavigation();
  const modalStackNavigation = useModalStackNavigation();

  return (
    <StackScreenContent title="Example Screens" headerLargeTitle>
      <StackScreenContent.ScrollView>
        <List first>
          <List.Item
            title="Stack Screen"
            navigationLink
            onPress={() => mainStackNavigation.push('ExampleStackScreen')}
          />
          <List.Item
            title="Stack Screen with FlatList"
            navigationLink
            onPress={() =>
              mainStackNavigation.push('ExampleStackScreenWithFlatList')
            }
          />
          <List.Item
            title="Stack Screen with FlatList (Inverted)"
            navigationLink
            onPress={() =>
              mainStackNavigation.push('ExampleStackScreenWithFlatList', {
                inverted: true,
              })
            }
          />
          <List.Item
            title="Screen with Prevent Close"
            navigationLink
            onPress={() =>
              mainStackNavigation.push('ExamplePreventCloseStackScreen')
            }
          />
          <List.Item
            title="Empty Screen"
            navigationLink
            onPress={() => mainStackNavigation.push('EmptyStackScreen')}
          />
        </List>

        <List>
          <List.Item
            title="Modal"
            navigationLink
            onPress={() =>
              modalStackNavigation.push('ExampleStackScreen', {
                stackScreenContentProps: {
                  headerLargeTitle: false,
                  headerSearchBarOptions: {
                    enable: false,
                    primary: false,
                    hideWhenScrolling: false,
                  },
                },
              })
            }
          />
          <List.Item
            title="Modal with Prevent Close"
            navigationLink
            onPress={() =>
              modalStackNavigation.push('ExamplePreventCloseStackScreen')
            }
          />
          <List.Item
            title="Modal with FlatList"
            navigationLink
            onPress={() =>
              modalStackNavigation.push('ExampleStackScreenWithFlatList')
            }
          />
          <List.Item
            title="Empty Modal"
            navigationLink
            onPress={() => modalStackNavigation.push('EmptyStackScreen')}
          />
        </List>

        <List>
          <List.Item
            title="Example Screens List in Stack in Modal"
            navigationLink
            onPress={() =>
              modalStackNavigation.push('MainStackExampleScreensList')
            }
          />
        </List>
      </StackScreenContent.ScrollView>
    </StackScreenContent>
  );
}
