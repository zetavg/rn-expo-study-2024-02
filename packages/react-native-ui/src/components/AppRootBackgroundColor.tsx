import React from 'react';
import { StyleSheet, View } from 'react-native';

import BackgroundColor from './BackgroundColor';

/**
 * This component can be used to provide a background color to the root of the app.
 */
export function AppRootBackgroundColor({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <BackgroundColor root>
      {(backgroundColor) => (
        <View style={[styles.container, { backgroundColor }]}>{children}</View>
      )}
    </BackgroundColor>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AppRootBackgroundColor;
