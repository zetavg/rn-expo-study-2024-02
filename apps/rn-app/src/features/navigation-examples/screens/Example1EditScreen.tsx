import React, { useState } from 'react';
import { Button, Text, TextInput } from 'react-native';

import {
  useMainStackNavigation,
  useModalStackNavigation,
} from '@/navigation/hooks';
import { ModalScreenContent } from '@/navigation/screens';
import type { StackScreenProps } from '@rnstudy/react-native-navigation';

export default function Example1EditScreen({
  route,
}: StackScreenProps<{ name: string }>) {
  const modalNavigation = useModalStackNavigation();

  const [text, setText] = useState('');

  return (
    <ModalScreenContent title="Edit">
      <ModalScreenContent.ScrollView>
        <TextInput value={text} onChangeText={setText} />
        <Text>This is Example1EditScreen</Text>
        <Text>This is Example1EditScreen</Text>
        <Button
          title="Go to edit"
          onPress={() => modalNavigation.push('Example1Edit', { name: 'hi' })}
        />
        <Text>This is Example1EditScreen</Text>
        <Text>This is Example1EditScreen</Text>
        <Text>This is Example1EditScreen</Text>
        <Text>This is Example1EditScreen</Text>
        <Text>This is Example1EditScreen</Text>
        <Text>This is Example1EditScreen</Text>
        <Text>This is Example1EditScreen</Text>
        <Text>This is Example1EditScreen</Text>
        <Text>This is Example1EditScreen</Text>
        <Text>This is Example1EditScreen</Text>
        <Text>This is Example1EditScreen</Text>
        <Text>This is Example1EditScreen</Text>
        <Text>Right</Text>
        <TextInput value={text} onChangeText={setText} textAlign="right" />
        <Text>Center</Text>
        <TextInput value={text} onChangeText={setText} textAlign="center" />
        <Text>This is Example1EditScreen</Text>
        <Text>This is Example1EditScreen</Text>
        <Text>This is Example1EditScreen</Text>
        <Text>This is Example1EditScreen</Text>
        <Text>This is Example1EditScreen</Text>
        <Text>This is Example1EditScreen</Text>
        <Text>This is Example1EditScreen</Text>
        <Text>This is Example1EditScreen</Text>
        <Text>This is Example1EditScreen</Text>
        <Text>This is Example1EditScreen</Text>
        <Text>This is Example1EditScreen</Text>
        <Text>This is Example1EditScreen</Text>
        <Text>This is Example1EditScreen</Text>
        <Text>This is Example1EditScreen</Text>
        <Text>This is Example1EditScreen</Text>
        <TextInput value={text} onChangeText={setText} />
        <Text>This is Example1EditScreen</Text>
        <Text>This is Example1EditScreen</Text>
        <Text>This is Example1EditScreen</Text>
        <Text>This is Example1EditScreen</Text>
        <Text>This is Example1EditScreen</Text>
        <Text>This is Example1EditScreen</Text>
        <Text>This is Example1EditScreen</Text>
        <Text>This is Example1EditScreen</Text>
        <Text>This is Example1EditScreen</Text>
        <Text>This is Example1EditScreen</Text>
        <Text>This is Example1EditScreen</Text>
        <Text>This is Example1EditScreen</Text>
        <Text>This is Example1EditScreen</Text>
        <Text>This is Example1EditScreen</Text>
        <Text>This is Example1EditScreen</Text>
        <Text>This is Example1EditScreen</Text>
        <Text>This is Example1EditScreen</Text>
        <Text>This is Example1EditScreen</Text>
        <Text>This is Example1EditScreen</Text>
        <Text>This is Example1EditScreen</Text>
        <Text>This is Example1EditScreen</Text>
        <Text>This is Example1EditScreen</Text>
        <TextInput value={text} onChangeText={setText} />
        <Text>This is Example1EditScreen</Text>
        <Text>This is Example1EditScreen</Text>
        <Text>This is Example1EditScreen</Text>
        <Text>This is Example1EditScreen</Text>
        <Text>This is Example1EditScreen</Text>
        <Text>This is Example1EditScreen</Text>
        <Text>This is Example1EditScreen</Text>
        <Text>This is Example1EditScreen</Text>
        <Text>This is Example1EditScreen</Text>
        <Text>This is Example1EditScreen</Text>
        <Text>This is Example1EditScreen</Text>
        <Text>This is Example1EditScreen</Text>
        <Text>This is Example1EditScreen</Text>
        <Text>This is Example1EditScreen</Text>
        <Text>This is Example1EditScreen</Text>
        <Text>This is Example1EditScreen</Text>
        <Text>This is Example1EditScreen</Text>
        <Text>This is Example1EditScreen</Text>
        <Text>This is Example1EditScreen</Text>
        <Text>This is Example1EditScreen</Text>
        <Text>This is Example1EditScreen</Text>
        <Text>This is Example1EditScreen</Text>
        <Text>This is Example1EditScreen</Text>
        <Text>This is Example1EditScreen</Text>
        <TextInput value={text} onChangeText={setText} />
        <Text>This is Example1EditScreen</Text>
        <Text>This is Example1EditScreen</Text>
        <Text>This is Example1EditScreen</Text>
        <Text>This is Example1EditScreen</Text>
        <Text>This is Example1EditScreen</Text>
        <Text>This is Example1EditScreen</Text>
        <Text>This is Example1EditScreen</Text>
        <Text>This is Example1EditScreen</Text>
        <Text>This is Example1EditScreen</Text>
        <Text>This is Example1EditScreen</Text>
        <Text>This is Example1EditScreen</Text>
        <Text>This is Example1EditScreen</Text>
        <Text>This is Example1EditScreen</Text>
        <Text>This is Example1EditScreen</Text>
        <Text>This is Example1EditScreen</Text>
        <Text>This is Example1EditScreen</Text>
        <Text>This is Example1EditScreen</Text>
        <Text>This is Example1EditScreen</Text>
        <Text>This is Example1EditScreen</Text>
        <Text>This is Example1EditScreen</Text>
        <Text>This is Example1EditScreen</Text>
        <Text>This is Example1EditScreen</Text>
        <Text>This is Example1EditScreen</Text>
        <Text>This is Example1EditScreen</Text>
        <TextInput value={text} onChangeText={setText} />
      </ModalScreenContent.ScrollView>
    </ModalScreenContent>
  );
}
