import { useState } from 'react';
import { Button, Text, TextInput } from 'react-native';

import { ModalScreenContent, ModalStackScreenProps } from '@/navigation';

export type Params = { name: string };

export function Example1EditScreen({
  route,
  navigation,
}: ModalStackScreenProps<'Example1Edit'>) {
  const [text, setText] = useState('');

  return (
    <ModalScreenContent navigation={navigation} title="Example Edit">
      <ModalScreenContent.ScrollView>
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
        <TextInput value={text} onChangeText={setText} />
        <Text>Edit Screen: {route.params.name}</Text>
        <Text>Edit Screen: {route.params.name}</Text>
        <Text>Edit Screen: {route.params.name}</Text>
        <Text>Edit Screen: {route.params.name}</Text>
        <Text>Edit Screen: {route.params.name}</Text>
        <Text>Edit Screen: {route.params.name}</Text>
        <Text>Edit Screen: {route.params.name}</Text>
        <Text>Edit Screen: {route.params.name}</Text>
        <Text>Edit Screen: {route.params.name}</Text>
        <Text>Edit Screen: {route.params.name}</Text>
        <Text>Edit Screen: {route.params.name}</Text>
        <Text>Edit Screen: {route.params.name}</Text>
        <Text>Edit Screen: {route.params.name}</Text>
        <Text>Edit Screen: {route.params.name}</Text>
        <TextInput value={text} onChangeText={setText} />
        <Text>Edit Screen: {route.params.name}</Text>
        <Text>Edit Screen: {route.params.name}</Text>
        <Text>Edit Screen: {route.params.name}</Text>
        <Text>Edit Screen: {route.params.name}</Text>
        <Text>Edit Screen: {route.params.name}</Text>
        <Text>Edit Screen: {route.params.name}</Text>
        <Text>Edit Screen: {route.params.name}</Text>
        <Text>Edit Screen: {route.params.name}</Text>
        <Text>Edit Screen: {route.params.name}</Text>
        <Text>Edit Screen: {route.params.name}</Text>
        <Text>Edit Screen: {route.params.name}</Text>
        <Text>Edit Screen: {route.params.name}</Text>
        <Text>Edit Screen: {route.params.name}</Text>
        <Text>Edit Screen: {route.params.name}</Text>
        <Text>Edit Screen: {route.params.name}</Text>
        <Text>Edit Screen: {route.params.name}</Text>
        <Text>Edit Screen: {route.params.name}</Text>
        <TextInput value={text} onChangeText={setText} />
        <Text>Edit Screen: {route.params.name}</Text>
        <Text>Edit Screen: {route.params.name}</Text>
        <Text>Edit Screen: {route.params.name}</Text>
        <Text>Edit Screen: {route.params.name}</Text>
        <Text>Edit Screen: {route.params.name}</Text>
        <Text>Edit Screen: {route.params.name}</Text>
        <Text>Edit Screen: {route.params.name}</Text>
        <Text>Edit Screen: {route.params.name}</Text>
        <Text>Edit Screen: {route.params.name}</Text>
        <Text>Edit Screen: {route.params.name}</Text>
        <TextInput value={text} onChangeText={setText} />
        <Text>Edit Screen: {route.params.name}</Text>
        <Text>Edit Screen: {route.params.name}</Text>
        <Text>Edit Screen: {route.params.name}</Text>
        <Text>Edit Screen: {route.params.name}</Text>
        <Text>Edit Screen: {route.params.name}</Text>
        <Text>Edit Screen: {route.params.name}</Text>
        <Text>Edit Screen: {route.params.name}</Text>
        <Text>Edit Screen: {route.params.name}</Text>
        <Text>Edit Screen: {route.params.name}</Text>
        <Text>Edit Screen: {route.params.name}</Text>
        <Text>Edit Screen: {route.params.name}</Text>
        <Text>Edit Screen: {route.params.name}</Text>
        <Text>Edit Screen: {route.params.name}</Text>
        <Text>Edit Screen: {route.params.name}</Text>
        <Text>Edit Screen: {route.params.name}</Text>
        <Text>Edit Screen: {route.params.name}</Text>
        <Text>Edit Screen: {route.params.name}</Text>
        <Text>Edit Screen: {route.params.name}</Text>
        <Text>Edit Screen: {route.params.name}</Text>
        <Text>Edit Screen: {route.params.name}</Text>
        <Text>Edit Screen: {route.params.name}</Text>
        <Text>Edit Screen: {route.params.name}</Text>
        <Text>Edit Screen: {route.params.name}</Text>
        <Text>Edit Screen: {route.params.name}</Text>
        <Text>Edit Screen: {route.params.name}</Text>
        <Text>Edit Screen: {route.params.name}</Text>
        <Text>Edit Screen: {route.params.name}</Text>
        <Text>Edit Screen: {route.params.name}</Text>
        <Text>Edit Screen: {route.params.name}</Text>
        <Text>Edit Screen: {route.params.name}</Text>
        <Text>Edit Screen: {route.params.name}</Text>
        <Text>Edit Screen: {route.params.name}</Text>
        <Text>Edit Screen: {route.params.name}</Text>
        <Text>Edit Screen: {route.params.name}</Text>
        <Text>Edit Screen: {route.params.name}</Text>
        <Text>Edit Screen: {route.params.name}</Text>
        <Text>Edit Screen: {route.params.name}</Text>
        <Text>Edit Screen: {route.params.name}</Text>
        <Text>Edit Screen: {route.params.name}</Text>
        <Text>Edit Screen: {route.params.name}</Text>
        <Text>Edit Screen: {route.params.name}</Text>
        <Text>Edit Screen: {route.params.name}</Text>
        <Text>Edit Screen: {route.params.name}</Text>
        <Text>Edit Screen: {route.params.name}</Text>
        <Text>Edit Screen: {route.params.name}</Text>
        <Text>Edit Screen: {route.params.name}</Text>
        <Text>Edit Screen: {route.params.name}</Text>
        <Text>Edit Screen: {route.params.name}</Text>
        <Text>Edit Screen: {route.params.name}</Text>
        <Text>Edit Screen: {route.params.name}</Text>
        <Text>Edit Screen: {route.params.name}</Text>
        <Text>Edit Screen: {route.params.name}</Text>
        <Text>Edit Screen: {route.params.name}</Text>
        <Text>Edit Screen: {route.params.name}</Text>
        <Text>Edit Screen: {route.params.name}</Text>
        <Text>Edit Screen: {route.params.name}</Text>
        <Text>Edit Screen: {route.params.name}</Text>
        <Text>Edit Screen: {route.params.name}</Text>
        <Text>Edit Screen: {route.params.name}</Text>
        <Text>Edit Screen: {route.params.name}</Text>
        <Text>Edit Screen: {route.params.name}</Text>
        <Text>Edit Screen: {route.params.name}</Text>
        <Text>Edit Screen: {route.params.name}</Text>
        <Text>Edit Screen: {route.params.name}</Text>
        <Text>Edit Screen: {route.params.name}</Text>
        <Text>Edit Screen: {route.params.name}</Text>
        <Text>Edit Screen: {route.params.name}</Text>
        <Text>Edit Screen: {route.params.name}</Text>
        <Text>Edit Screen: {route.params.name}</Text>
        <Text>Edit Screen: {route.params.name}</Text>
        <TextInput value={text} onChangeText={setText} />
        <Text>Edit Screen: {route.params.name}</Text>
      </ModalScreenContent.ScrollView>
    </ModalScreenContent>
  );
}

export default Example1EditScreen;
