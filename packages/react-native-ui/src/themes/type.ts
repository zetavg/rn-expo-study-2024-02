export type Theme = {
  ios: {
    colors: {
      red: string;
      orange: string;
      yellow: string;
      green: string;
      mint: string;
      teal: string;
      cyan: string;
      blue: string;
      indigo: string;
      purple: string;
      pink: string;
      brown: string;

      systemGray: string;
      systemGray2: string;
      systemGray3: string;
      systemGray4: string;
      systemGray5: string;
      systemGray6: string;

      systemBackground: string;
      secondarySystemBackground: string;
      tertiarySystemBackground: string;
      systemGroupedBackground: string;
      secondarySystemGroupedBackground: string;
      tertiarySystemGroupedBackground: string;

      /** A text label that contains primary content. */
      label: string;
      /** A text label that contains secondary content. */
      secondaryLabel: string;
      /** A text label that contains tertiary content. */
      tertiaryLabel: string;
      /** A text label that contains quaternary content. */
      quaternaryLabel: string;
      /** Placeholder text in controls or text views. */
      placeholderText: string;
      /** A separator that allows some underlying content to be visible. */
      separator: string;
      /** A separator that doesn’t allow any underlying content to be visible. */
      opaqueSeparator: string;
      /** Text that functions as a link. */
      link: string;
    };
  };
};
