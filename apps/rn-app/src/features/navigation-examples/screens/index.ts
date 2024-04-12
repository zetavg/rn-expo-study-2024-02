import { stackNavigatorScreens } from '@rnstudy/react-native-navigation';

import ExampleScreensListScreen from './ExampleScreensListScreen';
// import Example1DetailsScreen from './Example1DetailsScreen';
// import Example1EditScreen from './Example1EditScreen';
import ExampleStackScreen from './ExampleStackScreen';

export const mainStackScreens = stackNavigatorScreens({
  ExampleScreensList: ExampleScreensListScreen,
  ExampleStackScreen,
  // Example1Details: Example1DetailsScreen,
});

export const modalStackScreens = stackNavigatorScreens({});
