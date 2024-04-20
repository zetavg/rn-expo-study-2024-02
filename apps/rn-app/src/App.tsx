import React from 'react';

import Navigation from '@/navigation/Navigation';
import { UIContextProvider } from '@rnstudy/react-native-ui';

import useColorScheme from './hooks/useColorScheme';
import { WithExampleApps } from './example-apps';
import StatusAndNavigationBar from './StatusAndNavigationBar';

export default function App() {
  const colorScheme = useColorScheme();
  return (
    <UIContextProvider colorScheme={colorScheme}>
      <StatusAndNavigationBar />
      <WithExampleApps>
        <Navigation />
      </WithExampleApps>
    </UIContextProvider>
  );
}
