import React from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import Navigation from '@/navigation/Navigation';
import {
  ActionSheetProvider,
  AppRootBackgroundColor,
  AVAILABLE_UI_PLATFORMS,
  UIContextProvider,
} from '@rnstudy/react-native-ui';

import { SettingsContext } from './contexts/SettingsContext';
import useColorScheme from './hooks/useColorScheme';
import { WithExampleApps } from './example-apps';
import ScreenOrientation from './ScreenOrientation';
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
      <AppRootBackgroundColor>
        <ActionSheetProvider>
          <SettingsContext.Provider
            value={{ colorScheme, setColorScheme, uiPlatform, setUIPlatform }}
          >
            <ScreenOrientation />
            <StatusAndNavigationBar />
            <GestureHandlerRootView style={styles.rootView}>
              <WithExampleApps>
                <Navigation />
              </WithExampleApps>
            </GestureHandlerRootView>
          </SettingsContext.Provider>
        </ActionSheetProvider>
      </AppRootBackgroundColor>
    </UIContextProvider>
  );
}

const styles = StyleSheet.create({
  rootView: {
    flex: 1,
  },
});
