import { TextStyle } from 'react-native';

export type TextStyles = {
  /** The font for body text. */
  body: TextStyle;
  /** The font for callouts. */
  callout: TextStyle;
  /** The font for standard captions. */
  caption1: TextStyle;
  /** The font for alternate captions. */
  caption2: TextStyle;
  /** The font for footnotes. */
  footnote: TextStyle;
  /** The font for headings. */
  headline: TextStyle;
  /** The font for subheadings. */
  subheadline: TextStyle;
  /** The font style for large titles. */
  largeTitle: TextStyle;
  /** The font for first-level hierarchical headings. */
  title1: TextStyle;
  /** The font for second-level hierarchical headings. */
  title2: TextStyle;
  /** The font for third-level hierarchical headings. */
  title3: TextStyle;
};

export type TextStyleTokens = TextStyles & {
  [T in keyof TextStyles as `${T}_emphasized`]?: TextStyle;
};
