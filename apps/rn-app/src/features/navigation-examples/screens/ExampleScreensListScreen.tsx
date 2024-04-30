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
        </List>
        <List>
          <List.Item title="Modal Screen" navigationLink />
        </List>
      </StackScreenContent.ScrollView>
    </StackScreenContent>
  );
}
