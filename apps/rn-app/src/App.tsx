import * as React from 'react';

import Navigation from '@/navigation/Navigation';
import { ThemeProvider } from '@rnstudy/react-native-ui';

import useColorScheme from './hooks/useColorScheme';

export default function App() {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider colorScheme={colorScheme}>
      <Navigation />
    </ThemeProvider>
  );
}
