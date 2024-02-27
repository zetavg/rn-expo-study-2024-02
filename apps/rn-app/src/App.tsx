import { StyleSheet, Text, View } from 'react-native';
import { SFSymbol } from 'react-native-sfsymbols';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import SweetSFSymbol from 'sweet-sfsymbols';

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
      <MaterialCommunityIcons name="material-design" size={24} color="black" />
      <SFSymbol
        name="thermometer.sun.fill"
        weight="semibold"
        scale="large"
        color="red"
        size={16}
        resizeMode="center"
        multicolor={false}
        style={{ width: 32, height: 32 }}
      />
      <SweetSFSymbol name="speaker" variant="circle.fill.slash" />

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
