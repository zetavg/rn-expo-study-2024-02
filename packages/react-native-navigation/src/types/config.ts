/**
 * Type of a React hook that returns the current color scheme.
 */
export type UseColorSchemeHook = () => 'dark' | 'light';

/**
 * Configuration for the navigation library.
 */
export type NavigationConfig = {
  useColorScheme: UseColorSchemeHook;
};
