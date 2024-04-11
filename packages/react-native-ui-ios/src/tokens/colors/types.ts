export type Color = `rgba(${number}, ${number}, ${number}, ${number})`;

/** Context-dependent standard colors. */
export type Colors = {
  /** A context-dependent red color suitable for use in UI elements. */
  red: Color;
  /** A context-dependent orange color suitable for use in UI elements. */
  orange: Color;
  /** A context-dependent yellow color suitable for use in UI elements. */
  yellow: Color;
  /** A context-dependent green color suitable for use in UI elements. */
  green: Color;
  /** A context-dependent mint color suitable for use in UI elements. */
  mint: Color;
  /** A context-dependent teal color suitable for use in UI elements. */
  teal: Color;
  /** A context-dependent cyan color suitable for use in UI elements. */
  cyan: Color;
  /** A context-dependent blue color suitable for use in UI elements. */
  blue: Color;
  /** A context-dependent indigo color suitable for use in UI elements. */
  indigo: Color;
  /** A context-dependent purple color suitable for use in UI elements. */
  purple: Color;
  /** A context-dependent pink color suitable for use in UI elements. */
  pink: Color;
  /** A context-dependent brown color suitable for use in UI elements. */
  brown: Color;
  /** A context-dependent gray color suitable for use in UI elements. */
  gray: Color;

  /** A black color suitable for use in UI elements. */
  black: Color;
  /** A white color suitable for use in UI elements. */
  white: Color;
  /** A clear color suitable for use in UI elements. */
  clear: Color;
};

export type UIColors = {
  systemGray: Color;
  systemGray2: Color;
  systemGray3: Color;
  systemGray4: Color;
  systemGray5: Color;
  systemGray6: Color;

  // Tint color

  /** A color value based on the current tint color of the app or trait hierarchy. */
  tintColor: Color;

  /** A color value for content on a tint-colored background. */
  onTintColor: Color;

  // Standard content background colors

  /** The color for the main background of your interface. */
  systemBackground: Color;
  /** The color for content layered on top of the main background. */
  secondarySystemBackground: Color;
  /** The color for content layered on top of secondary backgrounds. */
  tertiarySystemBackground: Color;

  /** The color for the main background of your grouped interface. */
  systemGroupedBackground: Color;
  /** The color for content layered on top of the main background of your grouped interface. */
  secondarySystemGroupedBackground: Color;
  /** The color for content layered on top of secondary backgrounds of your grouped interface. */
  tertiarySystemGroupedBackground: Color;

  elevatedSystemBackground?: Color;
  elevatedSecondarySystemBackground?: Color;
  elevatedTertiarySystemBackground?: Color;
  elevatedSystemGroupedBackground?: Color;
  elevatedSecondarySystemGroupedBackground?: Color;
  elevatedTertiarySystemGroupedBackground?: Color;

  // Label colors

  /** The color for text labels that contain primary content. */
  label: Color;
  /** The color for text labels that contain secondary content. */
  secondaryLabel: Color;
  /** The color for text labels that contain tertiary content. */
  tertiaryLabel: Color;
  /** The color for text labels that contain quaternary content. */
  quaternaryLabel: Color;

  // Fill colors

  /** An overlay fill color for thin and small shapes. */
  systemFill: Color;
  /** An overlay fill color for medium-size shapes. */
  secondarySystemFill: Color;
  /** An overlay fill color for large shapes. */
  tertiarySystemFill: Color;
  /** An overlay fill color for large areas that contain complex content. */
  quaternarySystemFill: Color;

  // Text

  /** The color for placeholder text in controls or text views. */
  placeholderText: Color;

  // Separator colors

  /** The color for thin borders or divider lines that allows some underlying content to be visible. */
  separator: Color;
  /** The color for borders or divider lines that hides any underlying content. */
  opaqueSeparator: Color;

  // Link color

  /** The specified color for links. */
  link: Color;

  // Nonadaptable colors

  /** The nonadaptable system color for text on a light background. */
  darkText: Color;

  /** The nonadaptable system color for text on a dark background. */
  lightText: Color;
};

export type ColorScheme = {
  type: 'dark' | 'light';
  colors: Colors;
  uiColors: UIColors;
};

export type ColorSchemes = {
  dark: ColorScheme;
  light: ColorScheme;
  darkHighContrast: ColorScheme;
  lightHighContrast: ColorScheme;
};
