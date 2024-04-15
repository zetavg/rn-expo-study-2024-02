import {
  NAVIGATION_EXAMPLES,
  stackNavigatorScreens,
} from '@rnstudy/react-native-navigation';

import ExampleScreensListScreen from './ExampleScreensListScreen';

export const mainStackScreens = stackNavigatorScreens({
  ExampleScreensList: ExampleScreensListScreen,
  ExampleStackScreen: NAVIGATION_EXAMPLES.ExampleStackScreen,
});

export const modalStackScreens = stackNavigatorScreens({});
