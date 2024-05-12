import React, { useState } from 'react';
import { Button, Text, TextInput } from 'react-native';

import {
  useMainStackNavigation,
  useModalStackNavigation,
} from '@/navigation/hooks';
import type { StackScreenProps } from '@rnstudy/react-native-navigation';

export default function Example1EditScreen({
  route,
}: StackScreenProps<{ name: string }>) {
  const modalNavigation = useModalStackNavigation();

  const [text, setText] = useState('');

  return null;
}
