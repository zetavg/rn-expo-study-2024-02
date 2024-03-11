import React from 'react';
import { Button, Text } from 'react-native';

import { useMainStackNavigation } from '@/navigation/hooks';
import { StackScreenContent } from '@/navigation/screens';
import { ListRow } from '@rnstudy/react-native-ios-ui';
import type { StackScreenProps } from '@rnstudy/react-native-navigation';

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
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <Text>{JSON.stringify((ListRow as any).__docgenInfo, null, 2)}</Text>
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
