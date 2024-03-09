import registerRootComponent from 'expo/build/launch/registerRootComponent';
import Constants from 'expo-constants';

import App from '@/App';

import 'react-native-gesture-handler';

if (Constants?.expoConfig?.extra?.storybookMode === 'true') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  registerRootComponent(require('./.storybook').default);
} else {
  registerRootComponent(App);
}
