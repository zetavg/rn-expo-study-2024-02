import {
  NAVIGATION_EXAMPLES,
  stackNavigatorScreens,
} from '@rnstudy/react-native-navigation';

import ExampleScreensListScreen from './ExampleScreensListScreen';

export const mainStackScreens = stackNavigatorScreens({
  ExampleScreensList: ExampleScreensListScreen,
  ExampleStackScreen: NAVIGATION_EXAMPLES.ExampleStackScreen,
  ExampleStackScreenWithFlatList:
    NAVIGATION_EXAMPLES.ExampleStackScreenWithFlatList,
});

export const modalStackScreens = stackNavigatorScreens({
  ExampleStackScreen: NAVIGATION_EXAMPLES.ExampleStackScreen,
  ExampleStackScreenWithFlatList:
    NAVIGATION_EXAMPLES.ExampleStackScreenWithFlatList,
});
