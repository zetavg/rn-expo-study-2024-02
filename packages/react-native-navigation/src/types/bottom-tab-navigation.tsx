import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';

/**
 * Definition of a screen in a bottom-tab navigator.
 */
export type BottomTabNavigatorScreenDefinition = {
  screen: () => JSX.Element;
  options: BottomTabNavigationOptions;
};

export type AnyBottomTabNavigatorScreens = Record<
  string,
  BottomTabNavigatorScreenDefinition
>;

/**
 * A generated bottom-tab navigator.
 */
export type GeneratedBottomTabNavigator<
  ID extends string,
  S extends AnyBottomTabNavigatorScreens,
> = (() => JSX.Element) & {
  _screens: S;
  _id: ID;
};
