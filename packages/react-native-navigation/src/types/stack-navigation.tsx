import { type RouteProp } from '@react-navigation/native';
import { StackNavigationOptions } from '@react-navigation/stack';

/**
 * Props of a screen in a stack navigator.
 */
export type StackScreenProps<Params extends object | undefined = undefined> = {
  route: RouteProp<{ screen: Params }, 'screen'>;
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

/**
 * A generated stack navigator.
 */
export type GeneratedStackNavigator<
  ID extends string,
  S extends AnyStackNavigatorScreens,
> = (() => JSX.Element) & {
  _screens: S;
  _id: ID;
};
