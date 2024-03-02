import React from 'react';
import { Button, Text } from 'react-native';

import {
  useMainStackNavigation,
  useModalStackNavigation,
} from '@/navigation/hooks';
import { StackScreenContent } from '@/navigation/screens';
import type { StackScreenProps } from '@rnstudy/react-native-navigation';

export default function Example1DetailsScreen({
  route,
}: StackScreenProps<{ name: string }>) {
  const navigation = useMainStackNavigation();
  const modalNavigation = useModalStackNavigation();

  return (
    <StackScreenContent>
      <StackScreenContent.ScrollView>
        <Text>
          This is Example1DetailsScreen. Route: {JSON.stringify(route, null, 2)}
        </Text>
        <Button
          title="Go to details"
          onPress={() => navigation.push('Example1Details', { name: 'hi' })}
        />

        <Button
          title="Go to edit"
          onPress={() => modalNavigation.push('Example1Edit', { name: 'hi' })}
        />
      </StackScreenContent.ScrollView>
    </StackScreenContent>
  );
}
