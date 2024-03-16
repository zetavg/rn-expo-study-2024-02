import { MD3Typescale } from 'react-native-paper/lib/typescript/types';

export type MD3Colors = {
  red: string;
  orange: string;
  yellow: string;
  green: string;
  teal: string;
  cyan: string;
  blue: string;
  indigo: string;
  purple: string;
  pink: string;
  brown: string;
  gray: string;
};

export type MD3Scheme = MD3Colors & {
  primary: string;
  surfaceTint: string;
  onPrimary: string;
  primaryContainer: string;
  onPrimaryContainer: string;
  secondary: string;
  onSecondary: string;
  secondaryContainer: string;
  onSecondaryContainer: string;
  tertiary: string;
  onTertiary: string;
  tertiaryContainer: string;
  onTertiaryContainer: string;
  error: string;
  onError: string;
  errorContainer: string;
  onErrorContainer: string;
  background: string;
  onBackground: string;
  surface: string;
  onSurface: string;
  surfaceVariant: string;
  onSurfaceVariant: string;
  outline: string;
  outlineVariant: string;
  shadow: string;
  scrim: string;
  inverseSurface: string;
  inverseOnSurface: string;
  inversePrimary: string;
  primaryFixed: string;
  onPrimaryFixed: string;
  primaryFixedDim: string;
  onPrimaryFixedVariant: string;
  secondaryFixed: string;
  onSecondaryFixed: string;
  secondaryFixedDim: string;
  onSecondaryFixedVariant: string;
  tertiaryFixed: string;
  onTertiaryFixed: string;
  tertiaryFixedDim: string;
  onTertiaryFixedVariant: string;
  surfaceDim: string;
  surfaceBright: string;
  surfaceContainerLowest: string;
  surfaceContainerLow: string;
  surfaceContainer: string;
  surfaceContainerHigh: string;
  surfaceContainerHighest: string;
};

export type MD3Theme = {
  schemes: {
    light: MD3Scheme;
    dark: MD3Scheme;
    lightHighContrast: MD3Scheme;
    darkHighContrast: MD3Scheme;
  } & { [key: string]: unknown };
  fonts: MD3Typescale;
  roundness: number;
  animation: {
    scale: number;
    defaultAnimationDuration?: number;
  };
};
