import { Button, Text } from 'react-native';

import { ModalStackScreenProps, StackScreenContent } from '@/navigation';

export type Params = { name: string };

export function Example1EditScreen({
  route,
  navigation,
}: ModalStackScreenProps<'Example1Edit'>) {
  return (
    <StackScreenContent navigation={navigation} headerLargeTitle>
      <StackScreenContent.ScrollView>
        <Text>Edit Screen: {route.params.name}</Text>
        <Button
          title="Go to Edit... again"
          onPress={() => navigation.push('Example1Edit', { name: 'Hi' })}
        />
        <Button title="Go back" onPress={() => navigation.goBack()} />
        <Button
          title="Go back to first screen in stack"
          onPress={() => navigation.popToTop()}
        />
        <Text>Edit Screen: {route.params.name}</Text>
      </StackScreenContent.ScrollView>
    </StackScreenContent>
  );
}

export default Example1EditScreen;
