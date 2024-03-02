import { useState } from 'react';
import { Button, Text, TextInput } from 'react-native';

import {
  MainStackScreenProps,
  StackScreenContent,
  useMainStackNavigation,
  useModalStackNavigation,
} from '@/navigation';

export type Params = undefined;

export function Example1ListScreen({
  route,
  navigation,
}: MainStackScreenProps<'Example1List'>) {
  const nav = useMainStackNavigation();
  const modalStackNav = useModalStackNavigation();
  const [text, setText] = useState('');

  return (
    <StackScreenContent navigation={navigation} headerLargeTitle>
      <StackScreenContent.ScrollView>
        <Text>Example 1 List Screen</Text>
        <Button
          title="Go to Details"
          onPress={() => nav.push('Example1Details', { name: 'Hi' })}
        />
        <Button
          title="Go to Edit"
          onPress={() => modalStackNav.push('Example1Edit', { name: 'Hi' })}
        />

        <Button
          title="Go to Example 2 List"
          onPress={() => navigation.navigate('Example2List')}
        />
        <TextInput value={text} onChangeText={setText} />
        <Text>Example 1 List Screen</Text>
        <Text>Example 1 List Screen</Text>
        <Text>Example 1 List Screen</Text>
        <Text>Example 1 List Screen</Text>
        <Text>Example 1 List Screen</Text>
        <Text>Example 1 List Screen</Text>
        <Text>Example 1 List Screen</Text>
        <Text>Example 1 List Screen</Text>
        <Text>Example 1 List Screen</Text>
        <Text>Example 1 List Screen</Text>
        <Text>Example 1 List Screen</Text>
        <Text>Example 1 List Screen</Text>
        <Text>Example 1 List Screen</Text>
        <Text>Example 1 List Screen</Text>
        <Text>Example 1 List Screen</Text>
        <Text>Example 1 List Screen</Text>
        <Text>Example 1 List Screen</Text>
        <TextInput value={text} onChangeText={setText} />
        <Text>Example 1 List Screen</Text>
        <Text>Example 1 List Screen</Text>
        <Text>Example 1 List Screen</Text>
        <Text>Example 1 List Screen</Text>
        <Text>Example 1 List Screen</Text>
        <Text>Example 1 List Screen</Text>
        <Text>Example 1 List Screen</Text>
        <Text>Example 1 List Screen</Text>
        <Text>Example 1 List Screen</Text>
        <Text>Example 1 List Screen</Text>
        <Text>Example 1 List Screen</Text>
        <Text>Example 1 List Screen</Text>
        <Text>Example 1 List Screen</Text>
        <Text>Example 1 List Screen</Text>
        <Text>Example 1 List Screen</Text>
        <Text>Example 1 List Screen</Text>
        <Text>Example 1 List Screen</Text>
        <Text>Example 1 List Screen</Text>
        <Text>Example 1 List Screen</Text>
        <Text>Example 1 List Screen</Text>
        <Text>Example 1 List Screen</Text>
        <Text>Example 1 List Screen</Text>
        <Text>Example 1 List Screen</Text>
        <Text>Example 1 List Screen</Text>
        <TextInput value={text} onChangeText={setText} />
        <Text>Example 1 List Screen</Text>
        <Text>Example 1 List Screen</Text>
        <Text>Example 1 List Screen</Text>
        <Text>Example 1 List Screen</Text>
        <TextInput value={text} onChangeText={setText} />
        <Text>Example 1 List Screen</Text>
        <Text>End</Text>
      </StackScreenContent.ScrollView>
    </StackScreenContent>
  );
}

export default Example1ListScreen;
