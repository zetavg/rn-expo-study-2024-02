import { Button, Text, View } from 'react-native';

import { MainStackScreenProps } from '@/navigation';

export type Params = undefined;

export function Example2ListScreen({
  route,
  navigation,
}: MainStackScreenProps<'Example2List'>) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Example2Details', { name: 'Hi' })}
      />

      <Button
        title="Go to Example 1 List"
        onPress={() => navigation.navigate('Example1List')}
      />
    </View>
  );
}

export default Example2ListScreen;
