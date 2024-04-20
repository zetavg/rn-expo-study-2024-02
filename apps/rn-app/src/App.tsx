import React from 'react';

import Navigation from '@/navigation/Navigation';
import {
  AVAILABLE_UI_PLATFORMS,
  UIContextProvider,
} from '@rnstudy/react-native-ui';

import { SettingsContext } from './contexts/SettingsContext';
import useColorScheme from './hooks/useColorScheme';
import { WithExampleApps } from './example-apps';
import StatusAndNavigationBar from './StatusAndNavigationBar';

export default function App() {
  const systemColorScheme = useColorScheme();

  const [uiPlatform, setUIPlatform] = React.useState<'ios' | 'android'>(
    AVAILABLE_UI_PLATFORMS[0],
  );
  const [colorScheme, setColorScheme] = React.useState<
    'system' | 'dark' | 'light'
  >('system');

  return (
    <UIContextProvider
      platform={uiPlatform}
      colorScheme={colorScheme === 'system' ? systemColorScheme : colorScheme}
    >
      <SettingsContext.Provider
        value={{ colorScheme, setColorScheme, uiPlatform, setUIPlatform }}
      >
        <StatusAndNavigationBar />
        <WithExampleApps>
          <Navigation />
        </WithExampleApps>
      </SettingsContext.Provider>
    </UIContextProvider>
  );
}
