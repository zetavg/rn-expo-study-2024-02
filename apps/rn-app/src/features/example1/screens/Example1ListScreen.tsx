import React from 'react';
import { Button } from 'react-native';

import { useMainStackNavigation } from '@/navigation/hooks';
import { StackScreenContent } from '@rnstudy/react-native-navigation';
import { Icon } from '@rnstudy/react-icons';
import type { StackScreenProps } from '@rnstudy/react-native-navigation';
import { Text } from '@rnstudy/react-native-ui';

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
        <Icon name="heart" size={40} color="red" />
        <Icon name="heart" size={40} bordered />
        <Icon name="android" size={40} />
        <Icon name="sample-svg-file-icon" bordered color="blue" size={40} />
        <Text />
        <Icon name="cat" size={40} bordered />
        <Text />
        <Icon name="dog" size={40} bordered />
        <Text>I <Icon name="heart" /> cats.</Text>
        <Text>I <Icon name="heart" /> dogs too.</Text>

        <Text>My <Icon name="cat" /> is cute.</Text>
        <Text>This is Example1ListScreen</Text>
        <Text>Search bar text: {searchBarText}</Text>
        <Button
          title="Go to details"
          onPress={() => navigation.push('Example1Details', { name: 'hi' })}
        />
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
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
