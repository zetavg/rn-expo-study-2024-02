import React, { useEffect, useState } from 'react';
import { Button, Text } from 'react-native';

import {
  useMainStackNavigation,
  useModalStackNavigation,
} from '@/navigation/hooks';
import { StackScreenContent } from '@/navigation/screens';
import type { StackScreenProps } from '@rnstudy/react-native-navigation';

export default function Example1DetailsScreen({
  route,
}: StackScreenProps<{ name: string }>) {
  const navigation = useMainStackNavigation();
  const modalNavigation = useModalStackNavigation();

  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((c) => c + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <StackScreenContent>
      <StackScreenContent.ScrollView>
        <Text>
          This is Example1DetailsScreen. Route: {JSON.stringify(route, null, 2)}
        </Text>
        <Text>Counter: {counter}</Text>
        <Button
          title="Go to details"
          onPress={() => navigation.push('Example1Details', { name: 'hi' })}
        />

        <Button
          title="Go to edit"
          onPress={() => modalNavigation.push('Example1Edit', { name: 'hi' })}
        />
        <Text>
          This is Example1DetailsScreen. Route: {JSON.stringify(route, null, 2)}
        </Text>
        <Text>
          This is Example1DetailsScreen. Route: {JSON.stringify(route, null, 2)}
        </Text>
        <Text>
          This is Example1DetailsScreen. Route: {JSON.stringify(route, null, 2)}
        </Text>
        <Text>
          This is Example1DetailsScreen. Route: {JSON.stringify(route, null, 2)}
        </Text>
        <Text>
          This is Example1DetailsScreen. Route: {JSON.stringify(route, null, 2)}
        </Text>
        <Text>
          This is Example1DetailsScreen. Route: {JSON.stringify(route, null, 2)}
        </Text>
        <Text>
          This is Example1DetailsScreen. Route: {JSON.stringify(route, null, 2)}
        </Text>
        <Text>
          This is Example1DetailsScreen. Route: {JSON.stringify(route, null, 2)}
        </Text>
        <Text>
          This is Example1DetailsScreen. Route: {JSON.stringify(route, null, 2)}
        </Text>
        <Text>
          This is Example1DetailsScreen. Route: {JSON.stringify(route, null, 2)}
        </Text>
        <Text>
          This is Example1DetailsScreen. Route: {JSON.stringify(route, null, 2)}
        </Text>
        <Text>
          This is Example1DetailsScreen. Route: {JSON.stringify(route, null, 2)}
        </Text>
        <Text>
          This is Example1DetailsScreen. Route: {JSON.stringify(route, null, 2)}
        </Text>
        <Text>
          This is Example1DetailsScreen. Route: {JSON.stringify(route, null, 2)}
        </Text>
        <Text>
          This is Example1DetailsScreen. Route: {JSON.stringify(route, null, 2)}
        </Text>
        <Text>
          This is Example1DetailsScreen. Route: {JSON.stringify(route, null, 2)}
        </Text>
        <Text>
          This is Example1DetailsScreen. Route: {JSON.stringify(route, null, 2)}
        </Text>
        <Text>
          This is Example1DetailsScreen. Route: {JSON.stringify(route, null, 2)}
        </Text>
        <Text>
          This is Example1DetailsScreen. Route: {JSON.stringify(route, null, 2)}
        </Text>
        <Text>
          This is Example1DetailsScreen. Route: {JSON.stringify(route, null, 2)}
        </Text>
        <Text>
          This is Example1DetailsScreen. Route: {JSON.stringify(route, null, 2)}
        </Text>
        <Text>
          This is Example1DetailsScreen. Route: {JSON.stringify(route, null, 2)}
        </Text>
        <Text>
          This is Example1DetailsScreen. Route: {JSON.stringify(route, null, 2)}
        </Text>
        <Text>
          This is Example1DetailsScreen. Route: {JSON.stringify(route, null, 2)}
        </Text>
        <Text>
          This is Example1DetailsScreen. Route: {JSON.stringify(route, null, 2)}
        </Text>
        <Text>
          This is Example1DetailsScreen. Route: {JSON.stringify(route, null, 2)}
        </Text>
        <Text>
          This is Example1DetailsScreen. Route: {JSON.stringify(route, null, 2)}
        </Text>
        <Text>
          This is Example1DetailsScreen. Route: {JSON.stringify(route, null, 2)}
        </Text>
        <Text>
          This is Example1DetailsScreen. Route: {JSON.stringify(route, null, 2)}
        </Text>
        <Text>
          This is Example1DetailsScreen. Route: {JSON.stringify(route, null, 2)}
        </Text>
        <Text>
          This is Example1DetailsScreen. Route: {JSON.stringify(route, null, 2)}
        </Text>
        <Text>
          This is Example1DetailsScreen. Route: {JSON.stringify(route, null, 2)}
        </Text>
      </StackScreenContent.ScrollView>
    </StackScreenContent>
  );
}
