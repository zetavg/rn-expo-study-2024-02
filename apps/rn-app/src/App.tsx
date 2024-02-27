import { StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';

import plusTwo from '@rnstudy/plus-two';
import { Example } from '@rnstudy/react-native-ios-ui';

export default function App() {
  return (
    <View style={styles.container}>
      <Example />
      <Text>
        Version:{' '}
        {Constants.expoConfig?.extra?.fullVersion || 'cannot find version'}.
      </Text>
      <Text>
        One plus two equals{' '}
        <Text style={{ fontWeight: '700' }}>{plusTwo(1)}</Text>.
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
