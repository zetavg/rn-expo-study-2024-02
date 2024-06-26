import { ViewStyle } from 'react-native';
import type { SystemName as SweetSFSymbolsSystemName } from 'sweet-sfsymbols/build/SweetSFSymbols.types';

type SVGComponent = (props: {
  width?: number;
  height?: number;
  color?: string | (symbol & { __TYPE__: 'Color' });
}) => JSX.Element;

type SFSymbolName = SweetSFSymbolsSystemName;

export type SFSymbolDefinition = {
  name: SFSymbolName;
  /** Specify the minimum version of OS version that the symbol is available on. */
  availability: {
    iOS?: number;
    macOS?: number;
  };
  /** If specified, additional padding will be added to the symbol (percentage of icon displayed size, 0.1 means 10%). */
  additionalPaddingRatio?: number;
  /** If specified, these additional styles will be added to the symbol (number will be the percentage of icon displayed size, 0.1 means 10%). */
  adjustments?: ViewStyle;
  /** Some sweet-sfsymbols will have unwanted opacity on parts of the symbol even in monochrome mode. Set this to true to apply a fix to that. */
  opacityFix?: boolean;
};

export type MaterialIconNameDefinition =
  | string
  | ({ default: string } & { [platformKey: string]: string });

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
  materialIconName: MaterialIconNameDefinition;
  materialIconConfig?: {
    /** If specified, additional padding will be added to the symbol (percentage of icon displayed size, 0.1 means 10%). */
    additionalPaddingRatio?: number;
  };
  /**
   * An array of SF Symbol definitions. Will attempt to use the first one that is available, and if none are available, will fallback to the material icon.
   *
   * Once specified, this will be the highest priority on the iOS platform except `svg`.
   */
  sfSymbolDefinitions?: SFSymbolDefinition[];
  /**
   * Use a SVG component as the icon. If specified, this will be the highest priority among all other icon sources.
   *
   * For platform-specific SVGs, you can specify an object with platform names as keys and SVG components as values. For example:
   *
   * ```js
   * {
   *   // ...
   *   svg: {
   *     ios: MySVGComponentForIOS,
   *     android: MySVGComponentForAndroid,
   *     // Will fallback other icon sources for other non-specified platforms.
   *   }
   * }
   * ```
   */
  svg?: SVGComponent | { [platform: string]: SVGComponent };
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
  imageGrayBackgroundColor: string;
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
