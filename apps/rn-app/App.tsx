import { StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';

import plusTwo from '@rnstudy/plus-two';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>This is from a PR. The PR is from a fork. Hi!</Text>
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
