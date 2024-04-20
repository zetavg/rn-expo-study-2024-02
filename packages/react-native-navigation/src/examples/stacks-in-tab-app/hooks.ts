import generateUseNavigationHook from '../../generateUseNavigationHook';

import {
  StackNavigationType,
  TabNavigationType,
} from './ExampleStacksInTabNavigationApp';

export const [registerStackNavigation, useStackNavigation] =
  generateUseNavigationHook<StackNavigationType>();

export const [registerTabNavigation, useTabNavigation] =
  generateUseNavigationHook<TabNavigationType>();
