import { BottomTabNavigationOptions as RNBottomTabNavigationOptions } from '@react-navigation/bottom-tabs';

import { MenuItems } from '@rnstudy/react-native-ui';

export type BottomTabNavigationOptions = RNBottomTabNavigationOptions & {
  tabButtonMenu?: MenuItems;
};

/**
 * Definition of a screen in a bottom-tab navigator.
 */
export type BottomTabNavigatorScreenDefinition = {
  screen: React.ComponentType;
  options?: BottomTabNavigationOptions;
};

export type AnyBottomTabNavigatorScreens = Record<
  string,
  BottomTabNavigatorScreenDefinition
>;

/**
 * A utility type to get the StackParamList type from screen definitions of a stack navigator.
 */
export type TabParamListOfScreens<S extends AnyBottomTabNavigatorScreens> = {
  [N in keyof S]: S[N] extends AnyBottomTabNavigatorScreens
    ? object
    : undefined;
};

/**
 * A ref object that is used to hold a function to send events to the content of a specific tab.
 */
export type TabContentEventSenderRef = { current?: (payload: unknown) => void };

export type GeneratedBottomTabNavigatorProps<
  S extends AnyBottomTabNavigatorScreens,
> = {
  tabButtonMenus?: {
    [k in keyof S]?:
      | MenuItems
      | ((context: { eventSenderRef: TabContentEventSenderRef }) => MenuItems);
  };
};

/**
 * A generated bottom-tab navigator.
 */
export type GeneratedBottomTabNavigator<
  ID extends string,
  S extends AnyBottomTabNavigatorScreens,
> = ((props: GeneratedBottomTabNavigatorProps<S>) => JSX.Element) & {
  _screens: S;
  _id: ID;
};
