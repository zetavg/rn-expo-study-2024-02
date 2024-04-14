import { useUIColors } from '../contexts';
import { Color } from '../tokens';

/**
 * Returns the color that can be used as a view or container's background.
 *
 * In most cases, consider using the `BackgroundColor` component instead of this hook, as it will handle background colors automatically with the context.
 */
export function useBackgroundColor({
  grouped = true,
  level = -1,
  elevated,
}: {
  /**
   * Whether we should use the *grouped* background colors. (See: https://developer.apple.com/design/human-interface-guidelines/color#iOS-iPadOS)
   *
   * If you are specifying this to set the background color of a view, be sure to wrap the children in a `IsGroupedBackgroundContext.Provider` so that the children components will be able to use the correct set of background colors.
   */
  grouped: boolean | undefined;
  /**
   * The level of the background color.
   *
   * Numbers mapping:
   * - `<= 0`: `null` (default)
   * - `1`: `'secondary'`
   * - `2`: `'tertiary'`
   * - `3`: `'secondary'`
   * - `4`: `'tertiary'`
   * - ...
   */
  level?: null | 'secondary' | 'tertiary' | number;
  elevated?: boolean;
}): Color {
  const uiColors = useUIColors();

  const levelString = (() => {
    if (typeof level === 'string') {
      return level;
    }

    if (typeof level === 'number') {
      if (level <= 0) {
        return null;
      } else if (level % 2 === 1) {
        return 'secondary';
      } else {
        return 'tertiary';
      }
    }

    return level;
  })();

  const colorName = levelString
    ? (`${levelString}System${grouped ? 'Grouped' : ''}Background` as const)
    : (`system${grouped ? 'Grouped' : ''}Background` as const);

  if (elevated) {
    const firstCharOfColorName = colorName.charAt(0);
    const restOfColorName = colorName.slice(1);
    const elevatedColorName =
      `elevated${firstCharOfColorName.toUpperCase()}${restOfColorName}` as const;

    const elevatedColor = uiColors[elevatedColorName as keyof typeof uiColors];

    if (elevatedColor) return elevatedColor;
  }

  return uiColors[colorName];
}

export default useBackgroundColor;
