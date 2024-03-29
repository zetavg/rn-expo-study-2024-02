import { MD3LightTheme as PaperMD3DefaultLightTheme } from 'react-native-paper';

import sharedColors from '../sharedColors';
import { MD3Theme } from '../types';

export const md3BaselineTheme: MD3Theme = {
  schemes: {
    light: {
      ...sharedColors,
      primary: '#65558F',
      surfaceTint: '#6750A4',
      onPrimary: '#FFFFFF',
      primaryContainer: '#EADDFF',
      onPrimaryContainer: '#21005D',
      secondary: '#625B71',
      onSecondary: '#FFFFFF',
      secondaryContainer: '#E8DEF8',
      onSecondaryContainer: '#1D192B',
      tertiary: '#7D5260',
      onTertiary: '#FFFFFF',
      tertiaryContainer: '#FFD8E4',
      onTertiaryContainer: '#31111D',
      error: '#B3261E',
      onError: '#FFFFFF',
      errorContainer: '#F9DEDC',
      onErrorContainer: '#410E0B',
      background: '#FEF7FF',
      onBackground: '#1D1B20',
      surface: '#FEF7FF',
      onSurface: '#1D1B20',
      surfaceVariant: '#E7E0EC',
      onSurfaceVariant: '#49454F',
      outline: '#79747E',
      outlineVariant: '#CAC4D0',
      shadow: '#000000',
      scrim: '#000000',
      inverseSurface: '#322F35',
      inverseOnSurface: '#F5EFF7',
      inversePrimary: '#D0BCFF',
      primaryFixed: '#EADDFF',
      onPrimaryFixed: '#21005D',
      primaryFixedDim: '#D0BCFF',
      onPrimaryFixedVariant: '#4F378B',
      secondaryFixed: '#E8DEF8',
      onSecondaryFixed: '#1D192B',
      secondaryFixedDim: '#CCC2DC',
      onSecondaryFixedVariant: '#4A4458',
      tertiaryFixed: '#FFD8E4',
      onTertiaryFixed: '#31111D',
      tertiaryFixedDim: '#EFB8C8',
      onTertiaryFixedVariant: '#633B48',
      surfaceDim: '#DED8E1',
      surfaceBright: '#FEF7FF',
      surfaceContainerLowest: '#FFFFFF',
      surfaceContainerLow: '#F7F2FA',
      surfaceContainer: '#F3EDF7',
      surfaceContainerHigh: '#ECE6F0',
      surfaceContainerHighest: '#E6E0E9',
    },
    lightMediumContrast: {
      ...sharedColors,
      primary: '#493971',
      surfaceTint: '#65558F',
      onPrimary: '#FFFFFF',
      primaryContainer: '#7B6BA7',
      onPrimaryContainer: '#FFFFFF',
      secondary: '#493971',
      onSecondary: '#FFFFFF',
      secondaryContainer: '#7C6BA7',
      onSecondaryContainer: '#FFFFFF',
      tertiary: '#6B2F45',
      onTertiary: '#FFFFFF',
      tertiaryContainer: '#A55F77',
      onTertiaryContainer: '#FFFFFF',
      error: '#6E2F2C',
      onError: '#FFFFFF',
      errorContainer: '#AA5F5A',
      onErrorContainer: '#FFFFFF',
      background: '#FDF7FF',
      onBackground: '#1D1B20',
      surface: '#FDF7FF',
      onSurface: '#1D1B20',
      surfaceVariant: '#E7E0EB',
      onSurfaceVariant: '#45414A',
      outline: '#615D67',
      outlineVariant: '#7D7983',
      shadow: '#000000',
      scrim: '#000000',
      inverseSurface: '#322F35',
      inverseOnSurface: '#F5EFF7',
      inversePrimary: '#CFBDFE',
      primaryFixed: '#7B6BA7',
      onPrimaryFixed: '#FFFFFF',
      primaryFixedDim: '#62538C',
      onPrimaryFixedVariant: '#FFFFFF',
      secondaryFixed: '#7C6BA7',
      onSecondaryFixed: '#FFFFFF',
      secondaryFixedDim: '#62538C',
      onSecondaryFixedVariant: '#FFFFFF',
      tertiaryFixed: '#A55F77',
      onTertiaryFixed: '#FFFFFF',
      tertiaryFixedDim: '#89475E',
      onTertiaryFixedVariant: '#FFFFFF',
      surfaceDim: '#DED8E0',
      surfaceBright: '#FDF7FF',
      surfaceContainerLowest: '#FFFFFF',
      surfaceContainerLow: '#F8F2FA',
      surfaceContainer: '#F2ECF4',
      surfaceContainerHigh: '#ECE6EE',
      surfaceContainerHighest: '#E6E0E9',
    },
    lightHighContrast: {
      ...sharedColors,
      primary: '#27174E',
      surfaceTint: '#65558F',
      onPrimary: '#FFFFFF',
      primaryContainer: '#493971',
      onPrimaryContainer: '#FFFFFF',
      secondary: '#27174E',
      onSecondary: '#FFFFFF',
      secondaryContainer: '#493971',
      onSecondaryContainer: '#FFFFFF',
      tertiary: '#420E24',
      onTertiary: '#FFFFFF',
      tertiaryContainer: '#6B2F45',
      onTertiaryContainer: '#FFFFFF',
      error: '#440F0E',
      onError: '#FFFFFF',
      errorContainer: '#6E2F2C',
      onErrorContainer: '#FFFFFF',
      background: '#FDF7FF',
      onBackground: '#1D1B20',
      surface: '#FDF7FF',
      onSurface: '#000000',
      surfaceVariant: '#E7E0EB',
      onSurfaceVariant: '#25232B',
      outline: '#45414A',
      outlineVariant: '#45414A',
      shadow: '#000000',
      scrim: '#000000',
      inverseSurface: '#322F35',
      inverseOnSurface: '#FFFFFF',
      inversePrimary: '#F1E8FF',
      primaryFixed: '#493971',
      onPrimaryFixed: '#FFFFFF',
      primaryFixedDim: '#322359',
      onPrimaryFixedVariant: '#FFFFFF',
      secondaryFixed: '#493971',
      onSecondaryFixed: '#FFFFFF',
      secondaryFixedDim: '#322359',
      onSecondaryFixedVariant: '#FFFFFF',
      tertiaryFixed: '#6B2F45',
      onTertiaryFixed: '#FFFFFF',
      tertiaryFixedDim: '#50192F',
      onTertiaryFixedVariant: '#FFFFFF',
      surfaceDim: '#DED8E0',
      surfaceBright: '#FDF7FF',
      surfaceContainerLowest: '#FFFFFF',
      surfaceContainerLow: '#F8F2FA',
      surfaceContainer: '#F2ECF4',
      surfaceContainerHigh: '#ECE6EE',
      surfaceContainerHighest: '#E6E0E9',
    },
    dark: {
      ...sharedColors,
      primary: '#D0BCFE',
      surfaceTint: '#D0BCFF',
      onPrimary: '#381E72',
      primaryContainer: '#4F378B',
      onPrimaryContainer: '#EADDFF',
      secondary: '#CCC2DC',
      onSecondary: '#332D41',
      secondaryContainer: '#4A4458',
      onSecondaryContainer: '#E8DEF8',
      tertiary: '#EFB8C8',
      onTertiary: '#492532',
      tertiaryContainer: '#633B48',
      onTertiaryContainer: '#FFD8E4',
      error: '#F2B8B5',
      onError: '#601410',
      errorContainer: '#8C1D18',
      onErrorContainer: '#F9DEDC',
      background: '#141218',
      onBackground: '#E6E0E9',
      surface: '#141218',
      onSurface: '#E6E0E9',
      surfaceVariant: '#49454F',
      onSurfaceVariant: '#CAC4D0',
      outline: '#938F99',
      outlineVariant: '#49454F',
      shadow: '#000000',
      scrim: '#000000',
      inverseSurface: '#E6E0E9',
      inverseOnSurface: '#322F35',
      inversePrimary: '#6750A4',
      primaryFixed: '#EADDFF',
      onPrimaryFixed: '#21005D',
      primaryFixedDim: '#D0BCFF',
      onPrimaryFixedVariant: '#4F378B',
      secondaryFixed: '#E8DEF8',
      onSecondaryFixed: '#1D192B',
      secondaryFixedDim: '#CCC2DC',
      onSecondaryFixedVariant: '#4A4458',
      tertiaryFixed: '#FFD8E4',
      onTertiaryFixed: '#31111D',
      tertiaryFixedDim: '#EFB8C8',
      onTertiaryFixedVariant: '#633B48',
      surfaceDim: '#141218',
      surfaceBright: '#3B383E',
      surfaceContainerLowest: '#0F0D13',
      surfaceContainerLow: '#1D1B20',
      surfaceContainer: '#211F26',
      surfaceContainerHigh: '#2B2930',
      surfaceContainerHighest: '#36343B',
    },
    darkMediumContrast: {
      ...sharedColors,
      primary: '#D3C1FF',
      surfaceTint: '#CFBDFE',
      onPrimary: '#1B0942',
      primaryContainer: '#9887C5',
      onPrimaryContainer: '#000000',
      secondary: '#D3C1FF',
      onSecondary: '#1B0942',
      secondaryContainer: '#9887C5',
      onSecondaryContainer: '#000000',
      tertiary: '#FFB7CD',
      onTertiary: '#330218',
      tertiaryContainer: '#C57B93',
      onTertiaryContainer: '#000000',
      error: '#FFB9B3',
      onError: '#330405',
      errorContainer: '#CC7B74',
      onErrorContainer: '#000000',
      background: '#141218',
      onBackground: '#E6E0E9',
      surface: '#141218',
      onSurface: '#FFF9FF',
      surfaceVariant: '#49454E',
      onSurfaceVariant: '#CEC8D4',
      outline: '#A6A1AB',
      outlineVariant: '#86818B',
      shadow: '#000000',
      scrim: '#000000',
      inverseSurface: '#E6E0E9',
      inverseOnSurface: '#2B292F',
      inversePrimary: '#4E3F77',
      primaryFixed: '#E9DDFF',
      onPrimaryFixed: '#16033D',
      primaryFixedDim: '#CFBDFE',
      onPrimaryFixedVariant: '#3C2D63',
      secondaryFixed: '#E9DDFF',
      onSecondaryFixed: '#16033D',
      secondaryFixedDim: '#CFBDFE',
      onSecondaryFixedVariant: '#3C2D63',
      tertiaryFixed: '#FFD9E3',
      onTertiaryFixed: '#2B0013',
      tertiaryFixedDim: '#FFB0C9',
      onTertiaryFixedVariant: '#5B2238',
      surfaceDim: '#141218',
      surfaceBright: '#3B383E',
      surfaceContainerLowest: '#0F0D13',
      surfaceContainerLow: '#1D1B20',
      surfaceContainer: '#211F24',
      surfaceContainerHigh: '#2B292F',
      surfaceContainerHighest: '#36343A',
    },
    darkHighContrast: {
      ...sharedColors,
      primary: '#FFF9FF',
      surfaceTint: '#CFBDFE',
      onPrimary: '#000000',
      primaryContainer: '#D3C1FF',
      onPrimaryContainer: '#000000',
      secondary: '#FFF9FF',
      onSecondary: '#000000',
      secondaryContainer: '#D3C1FF',
      onSecondaryContainer: '#000000',
      tertiary: '#FFF9F9',
      onTertiary: '#000000',
      tertiaryContainer: '#FFB7CD',
      onTertiaryContainer: '#000000',
      error: '#FFF9F9',
      onError: '#000000',
      errorContainer: '#FFB9B3',
      onErrorContainer: '#000000',
      background: '#141218',
      onBackground: '#E6E0E9',
      surface: '#141218',
      onSurface: '#FFFFFF',
      surfaceVariant: '#49454E',
      onSurfaceVariant: '#FFF9FF',
      outline: '#CEC8D4',
      outlineVariant: '#CEC8D4',
      shadow: '#000000',
      scrim: '#000000',
      inverseSurface: '#E6E0E9',
      inverseOnSurface: '#000000',
      inversePrimary: '#2F2056',
      primaryFixed: '#EDE2FF',
      onPrimaryFixed: '#000000',
      primaryFixedDim: '#D3C1FF',
      onPrimaryFixedVariant: '#1B0942',
      secondaryFixed: '#EDE2FF',
      onSecondaryFixed: '#000000',
      secondaryFixedDim: '#D3C1FF',
      onSecondaryFixedVariant: '#1B0942',
      tertiaryFixed: '#FFDFE7',
      onTertiaryFixed: '#000000',
      tertiaryFixedDim: '#FFB7CD',
      onTertiaryFixedVariant: '#330218',
      surfaceDim: '#141218',
      surfaceBright: '#3B383E',
      surfaceContainerLowest: '#0F0D13',
      surfaceContainerLow: '#1D1B20',
      surfaceContainer: '#211F24',
      surfaceContainerHigh: '#2B292F',
      surfaceContainerHighest: '#36343A',
    },
  },
  fonts: PaperMD3DefaultLightTheme.fonts,
  roundness: PaperMD3DefaultLightTheme.roundness,
  animation: PaperMD3DefaultLightTheme.animation,
};

export default md3BaselineTheme;
