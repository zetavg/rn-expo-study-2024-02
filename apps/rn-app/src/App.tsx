import * as React from 'react';

import Navigation from '@/navigation/Navigation';
import { UIContextProvider } from '@rnstudy/react-native-ui';

import useColorScheme from './hooks/useColorScheme';
import AndroidNavigationBar from './AndroidNavigationBar';

export default function App() {
  const colorScheme = useColorScheme();
  return (
    <UIContextProvider colorScheme={colorScheme}>
      <AndroidNavigationBar />
      <Navigation />
    </UIContextProvider>
  );
}
