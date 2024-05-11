import {
  NAVIGATION_EXAMPLES,
  stackNavigatorScreens,
} from '@rnstudy/react-native-navigation';

import ExampleScreensListScreen from './ExampleScreensListScreen';

export const mainStackScreens = stackNavigatorScreens({
  ExampleScreensList: ExampleScreensListScreen,
  EmptyStackScreen: NAVIGATION_EXAMPLES.EmptyStackScreen,
  ExampleStackScreen: NAVIGATION_EXAMPLES.ExampleStackScreen,
  ExampleStackScreenWithFlatList:
    NAVIGATION_EXAMPLES.ExampleStackScreenWithFlatList,
  ExamplePreventCloseStackScreen:
    NAVIGATION_EXAMPLES.ExamplePreventCloseStackScreen,
});

export const modalStackScreens = stackNavigatorScreens({
  EmptyStackScreen: NAVIGATION_EXAMPLES.EmptyStackScreen,
  ExampleStackScreen: NAVIGATION_EXAMPLES.ExampleStackScreen,
  ExamplePreventCloseStackScreen:
    NAVIGATION_EXAMPLES.ExamplePreventCloseStackScreen,
  ExampleStackScreenWithFlatList:
    NAVIGATION_EXAMPLES.ExampleStackScreenWithFlatList,
});
