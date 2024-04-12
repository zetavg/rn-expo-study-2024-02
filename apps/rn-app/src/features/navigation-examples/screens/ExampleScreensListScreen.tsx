import React from 'react';

import {
  useMainStackNavigation,
  useModalStackNavigation,
} from '@/navigation/hooks';
import { StackScreenContent } from '@/navigation/screens';
import { List } from '@rnstudy/react-native-ui';

export default function ExampleScreensListScreen() {
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
        </List>
        <List>
          <List.Item title="Modal Screen" navigationLink />
        </List>
      </StackScreenContent.ScrollView>
    </StackScreenContent>
  );
}
