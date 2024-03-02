import { stackNavigatorScreens } from '@rnstudy/react-native-navigation';

import Example1DetailsScreen from './Example1DetailsScreen';
import Example1EditScreen from './Example1EditScreen';
import Example1ListScreen from './Example1ListScreen';

export const mainStackScreens = stackNavigatorScreens({
  Example1List: Example1ListScreen,
  Example1Details: Example1DetailsScreen,
});

export const modalStackScreens = stackNavigatorScreens({
  Example1Edit: Example1EditScreen,
});
