import { stackNavigatorScreens } from '@rnstudy/react-native-navigation';

import ExampleAppsListScreen from './ExampleAppsListScreen';

export const mainStackScreens = stackNavigatorScreens({
  ExampleAppsList: ExampleAppsListScreen,
});

export const modalStackScreens = stackNavigatorScreens({});
