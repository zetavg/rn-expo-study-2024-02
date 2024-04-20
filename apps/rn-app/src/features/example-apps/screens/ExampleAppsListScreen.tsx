import React, { useCallback } from 'react';
import { Alert } from 'react-native';

import EXAMPLE_APPS from '@/example-apps';
import { useSetExampleApp } from '@/example-apps/contexts';
import {
  useMainStackNavigation,
  useModalStackNavigation,
} from '@/navigation/hooks';
import {
  StackScreenContent,
  StackScreenProps,
} from '@rnstudy/react-native-navigation';
import { List } from '@rnstudy/react-native-ui';

export default function ExampleAppsListScreen({ ..._ }: StackScreenProps) {
  const mainStackNavigation = useMainStackNavigation();
  const modalStackNavigation = useModalStackNavigation();

  const setExampleApp = useSetExampleApp();

  const handleSwitchToExampleApp = useCallback(
    (key: keyof typeof EXAMPLE_APPS) => {
      Alert.alert(
        'Switching to Example App',
        [
          `You are going to switch to the "${EXAMPLE_APPS[key].title}" example app.`,
          'To exit the example, press the "Exit" button in the app - normally it will be in the top left corner of the first screen.',
          "If you can't find it, you can always force close the app to return.",
        ].join('\n\n'),
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Switch',
            style: 'default',
            isPreferred: true,
            onPress: () => setExampleApp(key),
          },
        ],
      );
    },
    [setExampleApp],
  );

  return (
    <StackScreenContent title="Example Apps" headerLargeTitle>
      <StackScreenContent.ScrollView>
        <List first>
          {Object.entries(EXAMPLE_APPS).map(([key, { title }]) => (
            <List.Item
              key={key}
              title={title}
              onPress={() => {
                handleSwitchToExampleApp(key as keyof typeof EXAMPLE_APPS);
              }}
            />
          ))}
        </List>
      </StackScreenContent.ScrollView>
    </StackScreenContent>
  );
}
