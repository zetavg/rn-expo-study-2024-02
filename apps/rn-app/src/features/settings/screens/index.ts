import { stackNavigatorScreens } from '@rnstudy/react-native-navigation';

import SettingsScreen from './SettingsScreen';

export const mainStackScreens = stackNavigatorScreens({
  Settings: SettingsScreen,
});

export const modalStackScreens = stackNavigatorScreens({});
