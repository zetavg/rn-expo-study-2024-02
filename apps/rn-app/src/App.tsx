import * as React from 'react';

import Navigation from '@/navigation/Navigation';
import { ThemeProvider, themes } from '@rnstudy/react-native-ui';

import useColorScheme from './hooks/useColorScheme';

export default function App() {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider theme={themes[colorScheme]}>
      <Navigation />
    </ThemeProvider>
  );
}
