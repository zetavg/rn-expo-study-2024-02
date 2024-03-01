import { Button, Text, View } from 'react-native';

import { MainStackScreenProps } from '@/navigation';

export type Params = { name: string };

export function Example2DetailsScreen({
  route,
  navigation,
}: MainStackScreenProps<'Example2Details'>) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen: {route.params.name}</Text>
      <Button
        title="Go to Details... again"
        onPress={() => navigation.push('Example2Details', { name: 'Hi' })}
      />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      />
    </View>
  );
}

export default Example2DetailsScreen;
