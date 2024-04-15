import React, { useLayoutEffect, useMemo } from 'react';
import { Platform } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';
import { StatusBar } from 'expo-status-bar';

import { useColorScheme } from '@rnstudy/react-native-ui';

export function StatusAndNavigationBar() {
  const colorScheme = useColorScheme();

  const barContentStyle = useMemo(() => {
    switch (colorScheme) {
      case 'dark':
        return 'light';
      case 'light':
        return 'dark';
    }
  }, [colorScheme]);

  useLayoutEffect(() => {
    if (Platform.OS !== 'android') return;

    NavigationBar.setPositionAsync('absolute');
    NavigationBar.setBackgroundColorAsync(
      `${(() => {
        switch (colorScheme) {
          case 'dark':
            return '#000000';
          case 'light':
            return '#FFFFFF';
        }
      })()}01`,
    );

    NavigationBar.setButtonStyleAsync(barContentStyle);
  }, [barContentStyle, colorScheme]);

  return <StatusBar style={barContentStyle} />;
}

export default StatusAndNavigationBar;
