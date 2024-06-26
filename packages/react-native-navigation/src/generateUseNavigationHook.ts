import { useMemo } from 'react';
import {
  NavigationHelpers,
  ParamListBase,
  StackActionHelpers,
  TabActionHelpers,
  useNavigation,
} from '@react-navigation/native';

import {
  AnyBottomTabNavigatorScreens,
  AnyStackNavigatorScreens,
  GeneratedBottomTabNavigator,
  GeneratedStackNavigator,
  StackParamListOfScreens,
  TabParamListOfScreens,
} from './types';

/**
 * Generates a React hook that returns a navigation object for a specific navigator.
 *
 * It returns a tuple with two items: a register function that you should call with the navigator to register it, and the hook that returns a navigation object for the navigator.
 *
 * ### Example usage
 *
 * Hook generation:
 *
 * ```ts
 * // hooks.ts
 * import { generateUseNavigationHook } from '@rnstudy/react-native-navigation';
 * import type { MyNavigationType } from './MyNavigation';
 *
 * export const [registerMyNavigation, useMyNavigation] =
  generateUseNavigationHook<MyNavigationType>();
 * ```
 *
 * Navigation definition:
 *
 * ```ts
 * // MyNavigation.ts
 * import { createStackNavigator } from '@rnstudy/react-native-navigation';
 *
 * import { myScreens as ... } from '@/features/...';
 *
 * import { registerMyNavigation } from './hooks';
 *
 * export const MyNavigation = createStackNavigator(
 *   'id',
 *   { ... },
 *   'Home',
 * );
 *
 * export type MyNavigationType = typeof MyNavigation;
 *
 * registerMyNavigation(MyNavigation);
 * ```
 *
 * Usage in a screen:
 *
 * ```tsx
 * // MyScreen.tsx
 * import { useMyNavigation } from '@/navigation/hooks';
 *
 * export default function MyScreen() {
 *   const navigation = useMyNavigation();
 *
 *   // ...
 * }
 * ```
 *
 * ### Why is this designed this way?
 *
 * By using a register function instead of passing the navigator directly to the hook, circular dependencies can be avoided.
 *
 * Without using a register function, the navigator would need to be passed to this function directly, which would dependency of the hook on the navigator:
 *
 *     hooks.ts → MyNavigation.ts
 *
 * As the hook is used in the screens and the screens are imported to define the navigator, this would create a circular dependency:
 *
 *     hooks.ts → MyNavigation.ts
 *       ↑                    │
 *     MyScreen.tsx ←─────────╯
 *
 * By using a register function, the file that defines the hook doesn't need to import the navigator (the file that defines the navigator imports the registration function instead), which breaks the circular dependency:
 *
 *     hooks.ts ← MyNavigation.ts
 *       ↑                    │
 *     MyScreen.tsx ←─────────╯
 *
 */
export function generateUseNavigationHook<N extends AnyGeneratedNavigator>(): [
  /**
   * A register function that should be called with the navigator instance to register it.
   */
  (navigator: N) => void,
  /**
   * A hook that returns a navigation object for the navigator.
   */
  () => ReturnedNavigation<N>,
  /**
   * A getter function that returns the navigation object for the navigator from a child navigation.
   */
  GetNavigationFn<N>,
] {
  let navigatorId: string | undefined;

  const getNavigation: GetNavigationFn<N> = (rootNavigation) => {
    const matchedNavigation = rootNavigation?.getParent(navigatorId);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return matchedNavigation as unknown as any;
  };

  return [
    (navigator: N) => {
      navigatorId = navigator._id;
    },
    function () {
      if (!navigatorId) {
        throw new Error(
          'You need to call the registerNavigator function before using the useNavigation hook returned by generateUseNavigationHook.',
        );
      }
      const rootNavigation = useNavigation();

      return useMemo(() => {
        const navigation = getNavigation(rootNavigation);

        if (!navigation) {
          throw new Error(
            `Expected to find a navigator with ID "${navigatorId}" in the navigator tree. Please make sure that this hook is used within a screen that is under the "${navigatorId}" navigator.`,
          );
        }

        return navigation;
      }, [rootNavigation]);
    },
    getNavigation,
  ];
}

type AnyGeneratedNavigator =
  | GeneratedStackNavigator<string, AnyStackNavigatorScreens>
  | GeneratedBottomTabNavigator<string, AnyBottomTabNavigatorScreens>;

type ReturnedNavigation<N extends AnyGeneratedNavigator> =
  N extends GeneratedStackNavigator<string, AnyStackNavigatorScreens>
    ? StackActionHelpers<StackParamListOfScreens<N['_screens']>>
    : N extends GeneratedBottomTabNavigator<
          string,
          AnyBottomTabNavigatorScreens
        >
      ? TabActionHelpers<TabParamListOfScreens<N['_screens']>>
      : never;

type GetNavigationFn<N extends AnyGeneratedNavigator> = (
  rootNavigation?: null | Pick<NavigationHelpers<ParamListBase>, 'getParent'>,
) => ReturnedNavigation<N> | undefined;

export default generateUseNavigationHook;
