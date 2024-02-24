import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import plusTwo from '@rnstudy/plus-two';

export default function App() {
  const a = 1;
  return (
    <View style={styles.container}>
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
