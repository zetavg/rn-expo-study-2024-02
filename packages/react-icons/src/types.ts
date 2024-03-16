import type { SystemName as SweetSFSymbolsSystemName } from 'sweet-sfsymbols/build/SweetSFSymbols.types';

type SFSymbolName = SweetSFSymbolsSystemName;

export type SFSymbolDefinition = {
  name: SFSymbolName;
  /** Specify the minimum version of OS version that the symbol is available on. */
  availability: {
    iOS?: number;
    macOS?: number;
  };
  /** If specified, additional padding will be added to the symbol. */
  additionalPadding?: number;
};

export type IconDefinition = {
  /**
   * The name of the Material Icon to use.
   *
   * Check https://pictogrammers.com/library/mdi/ for a list of available icons.
   *
   * Also check these places to make sure that the icon is available on every platforms:
   *
   * - `react-native-vector-icons`: https://github.com/oblador/react-native-vector-icons/blob/v10.0.3/glyphmaps/MaterialCommunityIcons.json
   */
  materialIconName: string;
  /** An array of SF Symbol definitions. Will attempt to use the first one that is available, and if none are available, will fallback to the material icon. */
  sfSymbolDefinitions?: SFSymbolDefinition[];
};

export type IconColor =
  | 'default'
  | 'secondary'
  | 'tertiary'
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'teal'
  | 'cyan'
  | 'blue'
  | 'indigo'
  | 'purple'
  | 'pink'
  | 'brown'
  | 'gray';

export type IconTheme = {
  colors: { [key in IconColor]: string };
  grayBackgroundColor: string;
  borderRadius: number;
};

export function makeIconDefinition(defn: IconDefinition): IconDefinition {
  return defn;
}

export function makeIconDefinitions<
  T extends { [name: string]: IconDefinition },
>(defn: T): T {
  return defn;
}
