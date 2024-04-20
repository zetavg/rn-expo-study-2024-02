import React from 'react';

import { List } from '@rnstudy/react-native-ui';

import { StackScreenContent } from '../../../screen-contents';
import { StackScreenProps } from '../../../types';

export default function SettingsScreen({ ..._ }: StackScreenProps) {
  return (
    <StackScreenContent title="Settings" headerLargeTitle>
      <StackScreenContent.ScrollView>
        <List first>
          <List.Item title="Settings" />
        </List>
      </StackScreenContent.ScrollView>
    </StackScreenContent>
  );
}
