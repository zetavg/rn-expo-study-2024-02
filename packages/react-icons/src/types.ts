import type { SystemName as SweetSFSymbolsSystemName } from 'sweet-sfsymbols/build/SweetSFSymbols.types';

type SFSymbolName = SweetSFSymbolsSystemName;

export type SFSymbolDefinition = {
  name: SFSymbolName;
  availability: {
    iOS?: number;
    macOS?: number;
  };
};

export type IconDefinition = {
  /**
   * The name of the Material Icon to use.
   *
   * Check https://pictogrammers.com/library/mdi/ for a list of available icons.
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

export function makeIconDefinition<T extends IconDefinition>(defn: T): T {
  return defn;
}

export function makeIconDefinitions<
  T extends { [name: string]: IconDefinition },
>(defn: T): T {
  return defn;
}
