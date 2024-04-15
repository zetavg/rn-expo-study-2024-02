import createStackNavigator from '../../createStackNavigator';
import { stackNavigatorScreens } from '../../types';

import ExampleStackScreen from './ExampleStackScreen';

export const exampleStackScreens = stackNavigatorScreens({
  Example: ExampleStackScreen,
});

export const ExampleStackNavigation = createStackNavigator({
  id: 'example-stack',
  screens: {
    ...exampleStackScreens,
  },
  defaultInitialRouteName: 'Example',
});
