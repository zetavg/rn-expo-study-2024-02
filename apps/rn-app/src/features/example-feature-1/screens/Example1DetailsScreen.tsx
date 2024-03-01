import { Button, Text, View } from 'react-native';

import { MainStackScreenProps, StackScreenContent } from '@/navigation';

export type Params = { name: string };

export function Example1DetailsScreen({
  route,
  navigation,
}: MainStackScreenProps<'Example1Details'>) {
  return (
    <StackScreenContent navigation={navigation} headerLargeTitle>
      <StackScreenContent.ScrollView>
        <Text>Details Screen: {route.params.name}</Text>
        <Button
          title="Go to Details... again"
          onPress={() => navigation.push('Example1Details', { name: 'Hi' })}
        />
        <Button title="Go back" onPress={() => navigation.goBack()} />
        <Button
          title="Go back to first screen in stack"
          onPress={() => navigation.popToTop()}
        />
        <Text>Details Screen: {route.params.name}</Text>
      </StackScreenContent.ScrollView>
    </StackScreenContent>
  );
}

export default Example1DetailsScreen;
