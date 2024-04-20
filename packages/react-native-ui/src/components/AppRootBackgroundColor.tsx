import React from 'react';
import { StyleSheet, View } from 'react-native';

import { useBackgroundColor } from '../hooks';

/**
 * This component can be used to provide a background color to the root of the app.
 */
export function AppRootBackgroundColor({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const backgroundColor = useBackgroundColor({
    grouped: undefined,
  });

  return (
    <View style={[styles.container, { backgroundColor }]}>{children}</View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AppRootBackgroundColor;
