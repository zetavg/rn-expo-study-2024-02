import { dark, darkHighContrast, light, lightHighContrast } from './schemes';
import { Color, Colors, ColorScheme, ColorSchemes } from './types';

type BuildColorSchemeOptions = {
  /** The tint color. */
  tintColor?: keyof Colors | string;
  /** The color for links. */
  link?: keyof Colors | string;
};

/**
 * Builds a set of color schemes.
 *
 * @param options - The options for building the color schemes. Colors used in the options should be defined under `colors` in the base color schemes.
 * @param base - The color schemes to use as a base.
 */
export function buildColorSchemes(
  options: BuildColorSchemeOptions,
  base: ColorSchemes = {
    light,
    dark,
    lightHighContrast,
    darkHighContrast,
  },
): ColorSchemes {
  return {
    light: buildColorScheme(options, base.light),
    dark: buildColorScheme(options, base.light),
    lightHighContrast: buildColorScheme(options, base.light),
    darkHighContrast: buildColorScheme(options, base.light),
  };
}

export function buildColorScheme(
  { tintColor, link }: BuildColorSchemeOptions,
  base: ColorScheme,
): ColorScheme {
  return {
    ...base,
    uiColors: {
      ...base.uiColors,
      ...(tintColor
        ? {
            tintColor: getColorValue(tintColor, base.colors),
          }
        : {}),
      ...(link
        ? {
            link: getColorValue(link, base.colors),
          }
        : {}),
    },
  };
}

function getColorValue(key: string, colors: Record<string, Color>): Color {
  const color = colors[key];

  if (!color) {
    throw new Error(
      `Color ${key} is not defined in the colors set. Available colors: ${Object.keys(colors).join(', ')}.`,
    );
  }

  return color;
}

export default buildColorSchemes;
