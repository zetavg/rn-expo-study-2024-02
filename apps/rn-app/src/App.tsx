import * as React from 'react';

import Navigation from '@/navigation/Navigation';
import { UIContextProvider } from '@rnstudy/react-native-ui';

import useColorScheme from './hooks/useColorScheme';

export default function App() {
  const colorScheme = useColorScheme();
  return (
    <UIContextProvider colorScheme={colorScheme}>
      <Navigation />
    </UIContextProvider>
  );
}
