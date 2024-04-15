import React, { useLayoutEffect } from 'react';
import { Platform } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';

export function AndroidNavigationBar() {
  useLayoutEffect(() => {
    if (Platform.OS !== 'android') return;

    NavigationBar.setPositionAsync('absolute');
    NavigationBar.setBackgroundColorAsync('#ffffff00');
  }, []);
  return <></>;
}

export default AndroidNavigationBar;
