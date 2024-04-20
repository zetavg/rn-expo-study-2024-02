import type {
  NavigationProp,
  RouteProp,
  StackActionHelpers,
} from '@react-navigation/native';
import type { StackNavigationOptions } from '@react-navigation/stack';

/**
 * Props of a screen in a stack navigator.
 */
export type StackScreenProps<
  Params extends object | undefined = undefined,
  RouteName extends string = 'unsafe-route-name',
> = {
  route: RouteProp<{ [k in RouteName]: Params }, RouteName>;
  navigation: NavigationProp<
    { [k in RouteName]: Params },
    RouteName,
    undefined
  > &
    StackActionHelpers<{ [k in RouteName]: Params }>;
};

/**
 * A screen component that can be used in a stack navigator.
 */
export type StackScreen<Params extends object | undefined = undefined> = (
  props: StackScreenProps<Params>,
) => React.ReactNode;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyStackScreen = StackScreen<any>;

/**
 * A utility type to get the screen's parameters type from a stack screen type.
 */
export type StackScreenParams<S extends AnyStackScreen> =
  S extends StackScreen<infer P> ? P : never;

/**
 * Definition of a screen in a stack navigator.
 */
export type StackNavigatorScreenDefinition<
  Params extends object | undefined = undefined,
> =
  | StackScreen<Params>
  | { screen: StackScreen<Params>; options: StackNavigationOptions };

export type AnyStackNavigatorScreens = Record<
  string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  StackNavigatorScreenDefinition<any>
>;

/**
 * Helper function for defining screens of a stack navigator.
 */
export function stackNavigatorScreens<S extends AnyStackNavigatorScreens>(
  screens: S,
): S {
  return screens;
}

/**
 * A utility type to get the StackParamList type from screen definitions of a stack navigator.
 */
export type StackParamListOfScreens<S extends AnyStackNavigatorScreens> = {
  [N in keyof S]: S[N] extends StackNavigatorScreenDefinition<infer P>
    ? P
    : undefined;
};

export type GeneratedStackNavigatorProps<S extends AnyStackNavigatorScreens> = {
  initialRouteName?: Extract<keyof S, string>;
};

/**
 * A generated stack navigator.
 */
export type GeneratedStackNavigator<
  ID extends string,
  S extends AnyStackNavigatorScreens,
> = ((props: GeneratedStackNavigatorProps<S>) => JSX.Element) & {
  _screens: S;
  _id: ID;
};
