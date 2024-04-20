import React, { useCallback } from 'react';
import { Alert } from 'react-native';

import { List } from '@rnstudy/react-native-ui';

import { useTabContentEventHandler } from '../../..';
import { StackScreenContent } from '../../../screen-contents';
import { StackScreenProps } from '../../../types';

export default function MessageDetailScreen({
  route,
}: StackScreenProps<{ id: string; title?: string }>) {
  const { id, title } = route.params;

  useTabContentEventHandler(
    useCallback((payload: unknown) => {
      Alert.alert(
        'Event Received in MessageDetailScreen',
        JSON.stringify(payload),
      );
    }, []),
  );

  return (
    <StackScreenContent
      title={title || 'Message'}
      headerLargeTitle
      grouped={true}
    >
      <StackScreenContent.ScrollView>
        <List first listStyle="insetGrouped">
          <List.Item
            title={title || `Message ${id}`}
            subtitle="Title"
            subtitleOnTop
          />
          <List.Item
            title={Array.from(
              { length: 10 },
              () =>
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            ).join('\n\n')}
            subtitle="Content"
            subtitleOnTop
            singleLine={false}
          />
        </List>
      </StackScreenContent.ScrollView>
    </StackScreenContent>
  );
}
