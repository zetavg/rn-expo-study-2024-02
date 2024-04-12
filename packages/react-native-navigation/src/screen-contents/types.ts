/** Options to render a search bar on the navigation header. */
export type HeaderSearchBarOptions = {
  /** Whether to enable the search bar. Defaults to `true` if `headerSearchBarOptions` is provided. */
  enable?: boolean;
  /** A callback that gets called when the text changes. It receives the current text value of the search bar. */
  onChangeText?: (text: string) => void;
  /** A callback that gets called when the cancel button is pressed. */
  onCancelButtonPress?: () => void;
  /** A callback that gets called when search bar has lost focus. */
  onBlur?: () => void;
  /** Text displayed when search field is empty. */
  placeholder?: string;
  /** Controls whether the text is automatically auto-capitalized as it is entered by the user. */
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  /** Whether to automatically focus search bar when it's shown. */
  autoFocus?: boolean;
  /** Boolean indicating whether to hide the search bar when scrolling. Defaults to `true`. */
  hideWhenScrolling?: boolean;
  /** The text to be used instead of default Cancel button text. Only supported on iOS. */
  cancelButtonText?: string;
};
