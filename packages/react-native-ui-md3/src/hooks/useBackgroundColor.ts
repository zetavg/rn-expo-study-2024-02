import { useColorScheme, useTheme } from '../contexts';

/**
 * Returns the color that can be used as a view or container's background.
 *
 * In most cases, consider using the `BackgroundColor` component instead of this hook, as it will handle background colors automatically with the context.
 */
export function useBackgroundColor({
  grouped,
  level,
}: {
  /**
   * Whether we should use the *grouped* background colors.
   *
   * If you are specifying this to set the background color of a view, be sure to wrap the children in a `IsGroupedBackgroundContext.Provider` so that the children components will be able to use the correct set of background colors.
   */
  grouped: boolean;
  /**
   * The level of the background color.
   */
  level: number;
}): string {
  const colorScheme = useColorScheme();
  const theme = useTheme();

  if (colorScheme !== 'dark') {
    if (level <= 0) {
      return grouped
        ? theme.schemes[colorScheme].surfaceContainer
        : theme.schemes[colorScheme].surface;
    } else if (level % 2 === 1) {
      return grouped
        ? theme.schemes[colorScheme].surfaceBright
        : theme.schemes[colorScheme].surfaceContainer;
    } else {
      return grouped
        ? theme.schemes[colorScheme].surfaceContainer
        : theme.schemes[colorScheme].surfaceContainerHighest;
    }
  } else {
    if (level <= 0) {
      return theme.schemes[colorScheme].surface;
    } else if (level % 2 === 1) {
      return theme.schemes[colorScheme].surfaceContainer;
    } else {
      return theme.schemes[colorScheme].surfaceContainerHigh;
    }
  }
}

export default useBackgroundColor;
