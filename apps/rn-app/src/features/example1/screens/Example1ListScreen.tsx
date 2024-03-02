import React from 'react';
import { Button, Text } from 'react-native';

import { useMainStackNavigation } from '@/navigation/hooks';
import { StackScreenContent } from '@/navigation/screens';
import type { StackScreenProps } from '@/navigation-lib';

export default function Example1ListScreen({ route }: StackScreenProps) {
  const navigation = useMainStackNavigation();

  const [searchBarText, setSearchBarText] = React.useState('');

  return (
    <StackScreenContent
      headerLargeTitle
      //   headerSearchBarOptions={{
      //     onChangeText: setSearchBarText,
      //     hideWhenScrolling: false,
      //   }}
    >
      <StackScreenContent.ScrollView>
        <Text>This is Example1ListScreen</Text>
        <Text>Search bar text: {searchBarText}</Text>
        <Button
          title="Go to details"
          onPress={() => navigation.push('Example1Details', { name: 'hi' })}
        />
        <Text>This is Example1ListScreen</Text>
        <Text>This is Example1ListScreen</Text>
        <Text>This is Example1ListScreen</Text>
        <Text>This is Example1ListScreen</Text>
        <Text>This is Example1ListScreen</Text>
        <Text>This is Example1ListScreen</Text>
        <Text>This is Example1ListScreen</Text>
        <Text>This is Example1ListScreen</Text>
        <Text>This is Example1ListScreen</Text>
        <Text>This is Example1ListScreen</Text>
        <Text>This is Example1ListScreen</Text>
        <Text>This is Example1ListScreen</Text>
        <Text>This is Example1ListScreen</Text>
        <Text>This is Example1ListScreen</Text>
        <Text>This is Example1ListScreen</Text>
        <Text>This is Example1ListScreen</Text>
        <Text>This is Example1ListScreen</Text>
        <Text>This is Example1ListScreen</Text>
        <Text>This is Example1ListScreen</Text>
        <Text>This is Example1ListScreen</Text>
        <Text>This is Example1ListScreen</Text>
        <Text>This is Example1ListScreen</Text>
        <Text>This is Example1ListScreen</Text>
        <Text>This is Example1ListScreen</Text>
        <Text>This is Example1ListScreen</Text>
        <Text>This is Example1ListScreen</Text>
        <Text>This is Example1ListScreen</Text>
        <Text>This is Example1ListScreen</Text>
        <Text>This is Example1ListScreen</Text>
        <Text>This is Example1ListScreen</Text>
        <Text>This is Example1ListScreen</Text>
        <Text>This is Example1ListScreen</Text>
        <Text>This is Example1ListScreen</Text>
        <Text>This is Example1ListScreen</Text>
        <Text>This is Example1ListScreen</Text>
        <Text>This is Example1ListScreen</Text>
        <Text>This is Example1ListScreen</Text>
        <Text>This is Example1ListScreen</Text>
        <Text>This is Example1ListScreen</Text>
        <Text>This is Example1ListScreen</Text>
        <Text>This is Example1ListScreen</Text>
        <Text>This is Example1ListScreen</Text>
        <Text>This is Example1ListScreen</Text>
        <Text>This is Example1ListScreen</Text>
        <Text>This is Example1ListScreen</Text>
        <Text>This is Example1ListScreen</Text>
        <Text>This is Example1ListScreen</Text>
        <Text>This is Example1ListScreen</Text>
        <Text>This is Example1ListScreen</Text>
      </StackScreenContent.ScrollView>
    </StackScreenContent>
  );
}
