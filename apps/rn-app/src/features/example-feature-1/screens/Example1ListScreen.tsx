import { Button, Text, View } from 'react-native';

import { MainStackScreenProps, StackScreenContent } from '@/navigation';

export type Params = undefined;

export function Example1ListScreen({
  route,
  navigation,
}: MainStackScreenProps<'Example1List'>) {
  return (
    <StackScreenContent navigation={navigation} headerLargeTitle>
      <StackScreenContent.ScrollView>
        <Text>Example 1 List Screen</Text>
        <Button
          title="Go to Details"
          onPress={() => navigation.navigate('Example1Details', { name: 'Hi' })}
        />

        <Button
          title="Go to Example 2 List"
          onPress={() => navigation.navigate('Example2List')}
        />
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
        <Text>End</Text>
      </StackScreenContent.ScrollView>
    </StackScreenContent>
  );
}

export default Example1ListScreen;
