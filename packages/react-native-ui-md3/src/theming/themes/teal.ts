import sharedColors from '../sharedColors';
import { MD3Theme } from '../types';

import md3BaselineTheme from './baseline';

export const md3TealTheme: MD3Theme = {
  ...md3BaselineTheme,
  schemes: {
    light: {
      ...sharedColors,
      primary: '#006A60',
      surfaceTint: '#006A60',
      onPrimary: '#FFFFFF',
      primaryContainer: '#9EF2E4',
      onPrimaryContainer: '#00201C',
      secondary: '#4A635F',
      onSecondary: '#FFFFFF',
      secondaryContainer: '#CCE8E2',
      onSecondaryContainer: '#05201C',
      tertiary: '#456179',
      onTertiary: '#FFFFFF',
      tertiaryContainer: '#CCE5FF',
      onTertiaryContainer: '#001E31',
      error: '#BA1A1A',
      onError: '#FFFFFF',
      errorContainer: '#FFDAD6',
      onErrorContainer: '#410002',
      background: '#F4FBF8',
      onBackground: '#161D1C',
      surface: '#F4FBF8',
      onSurface: '#161D1C',
      surfaceVariant: '#DAE5E1',
      onSurfaceVariant: '#3F4947',
      outline: '#6F7977',
      outlineVariant: '#BEC9C6',
      shadow: '#000000',
      scrim: '#000000',
      inverseSurface: '#2B3230',
      inverseOnSurface: '#ECF2EF',
      inversePrimary: '#82D5C8',
      primaryFixed: '#9EF2E4',
      onPrimaryFixed: '#00201C',
      primaryFixedDim: '#82D5C8',
      onPrimaryFixedVariant: '#005048',
      secondaryFixed: '#CCE8E2',
      onSecondaryFixed: '#05201C',
      secondaryFixedDim: '#B1CCC6',
      onSecondaryFixedVariant: '#334B47',
      tertiaryFixed: '#CCE5FF',
      onTertiaryFixed: '#001E31',
      tertiaryFixedDim: '#ADCAE6',
      onTertiaryFixedVariant: '#2D4961',
      surfaceDim: '#D5DBD9',
      surfaceBright: '#F4FBF8',
      surfaceContainerLowest: '#FFFFFF',
      surfaceContainerLow: '#EFF5F2',
      surfaceContainer: '#E9EFED',
      surfaceContainerHigh: '#E3EAE7',
      surfaceContainerHighest: '#DDE4E1',
    },
    lightMediumContrast: {
      ...sharedColors,
      primary: '#004C44',
      surfaceTint: '#006A60',
      onPrimary: '#FFFFFF',
      primaryContainer: '#288176',
      onPrimaryContainer: '#FFFFFF',
      secondary: '#2F4743',
      onSecondary: '#FFFFFF',
      secondaryContainer: '#607A75',
      onSecondaryContainer: '#FFFFFF',
      tertiary: '#29455C',
      onTertiary: '#FFFFFF',
      tertiaryContainer: '#5C7791',
      onTertiaryContainer: '#FFFFFF',
      error: '#8C0009',
      onError: '#FFFFFF',
      errorContainer: '#DA342E',
      onErrorContainer: '#FFFFFF',
      background: '#F4FBF8',
      onBackground: '#161D1C',
      surface: '#F4FBF8',
      onSurface: '#161D1C',
      surfaceVariant: '#DAE5E1',
      onSurfaceVariant: '#3B4543',
      outline: '#57615F',
      outlineVariant: '#737D7A',
      shadow: '#000000',
      scrim: '#000000',
      inverseSurface: '#2B3230',
      inverseOnSurface: '#ECF2EF',
      inversePrimary: '#82D5C8',
      primaryFixed: '#288176',
      onPrimaryFixed: '#FFFFFF',
      primaryFixedDim: '#00685E',
      onPrimaryFixedVariant: '#FFFFFF',
      secondaryFixed: '#607A75',
      onSecondaryFixed: '#FFFFFF',
      secondaryFixedDim: '#48615C',
      onSecondaryFixedVariant: '#FFFFFF',
      tertiaryFixed: '#5C7791',
      onTertiaryFixed: '#FFFFFF',
      tertiaryFixedDim: '#435F77',
      onTertiaryFixedVariant: '#FFFFFF',
      surfaceDim: '#D5DBD9',
      surfaceBright: '#F4FBF8',
      surfaceContainerLowest: '#FFFFFF',
      surfaceContainerLow: '#EFF5F2',
      surfaceContainer: '#E9EFED',
      surfaceContainerHigh: '#E3EAE7',
      surfaceContainerHighest: '#DDE4E1',
    },
    lightHighContrast: {
      ...sharedColors,
      primary: '#002823',
      surfaceTint: '#006A60',
      onPrimary: '#FFFFFF',
      primaryContainer: '#004C44',
      onPrimaryContainer: '#FFFFFF',
      secondary: '#0D2623',
      onSecondary: '#FFFFFF',
      secondaryContainer: '#2F4743',
      onSecondaryContainer: '#FFFFFF',
      tertiary: '#03243A',
      onTertiary: '#FFFFFF',
      tertiaryContainer: '#29455C',
      onTertiaryContainer: '#FFFFFF',
      error: '#4E0002',
      onError: '#FFFFFF',
      errorContainer: '#8C0009',
      onErrorContainer: '#FFFFFF',
      background: '#F4FBF8',
      onBackground: '#161D1C',
      surface: '#F4FBF8',
      onSurface: '#000000',
      surfaceVariant: '#DAE5E1',
      onSurfaceVariant: '#1C2624',
      outline: '#3B4543',
      outlineVariant: '#3B4543',
      shadow: '#000000',
      scrim: '#000000',
      inverseSurface: '#2B3230',
      inverseOnSurface: '#FFFFFF',
      inversePrimary: '#A7FCEE',
      primaryFixed: '#004C44',
      onPrimaryFixed: '#FFFFFF',
      primaryFixedDim: '#00332E',
      onPrimaryFixedVariant: '#FFFFFF',
      secondaryFixed: '#2F4743',
      onSecondaryFixed: '#FFFFFF',
      secondaryFixedDim: '#18312D',
      onSecondaryFixedVariant: '#FFFFFF',
      tertiaryFixed: '#29455C',
      onTertiaryFixed: '#FFFFFF',
      tertiaryFixedDim: '#102F45',
      onTertiaryFixedVariant: '#FFFFFF',
      surfaceDim: '#D5DBD9',
      surfaceBright: '#F4FBF8',
      surfaceContainerLowest: '#FFFFFF',
      surfaceContainerLow: '#EFF5F2',
      surfaceContainer: '#E9EFED',
      surfaceContainerHigh: '#E3EAE7',
      surfaceContainerHighest: '#DDE4E1',
    },
    dark: {
      ...sharedColors,
      primary: '#82D5C8',
      surfaceTint: '#82D5C8',
      onPrimary: '#003731',
      primaryContainer: '#005048',
      onPrimaryContainer: '#9EF2E4',
      secondary: '#B1CCC6',
      onSecondary: '#1C3531',
      secondaryContainer: '#334B47',
      onSecondaryContainer: '#CCE8E2',
      tertiary: '#ADCAE6',
      onTertiary: '#153349',
      tertiaryContainer: '#2D4961',
      onTertiaryContainer: '#CCE5FF',
      error: '#FFB4AB',
      onError: '#690005',
      errorContainer: '#93000A',
      onErrorContainer: '#FFDAD6',
      background: '#0E1513',
      onBackground: '#DDE4E1',
      surface: '#0E1513',
      onSurface: '#DDE4E1',
      surfaceVariant: '#3F4947',
      onSurfaceVariant: '#BEC9C6',
      outline: '#899390',
      outlineVariant: '#3F4947',
      shadow: '#000000',
      scrim: '#000000',
      inverseSurface: '#DDE4E1',
      inverseOnSurface: '#2B3230',
      inversePrimary: '#006A60',
      primaryFixed: '#9EF2E4',
      onPrimaryFixed: '#00201C',
      primaryFixedDim: '#82D5C8',
      onPrimaryFixedVariant: '#005048',
      secondaryFixed: '#CCE8E2',
      onSecondaryFixed: '#05201C',
      secondaryFixedDim: '#B1CCC6',
      onSecondaryFixedVariant: '#334B47',
      tertiaryFixed: '#CCE5FF',
      onTertiaryFixed: '#001E31',
      tertiaryFixedDim: '#ADCAE6',
      onTertiaryFixedVariant: '#2D4961',
      surfaceDim: '#0E1513',
      surfaceBright: '#343B39',
      surfaceContainerLowest: '#090F0E',
      surfaceContainerLow: '#161D1C',
      surfaceContainer: '#1A2120',
      surfaceContainerHigh: '#252B2A',
      surfaceContainerHighest: '#303635',
    },
    darkMediumContrast: {
      ...sharedColors,
      primary: '#86DACC',
      surfaceTint: '#82D5C8',
      onPrimary: '#001A17',
      primaryContainer: '#4A9E93',
      onPrimaryContainer: '#000000',
      secondary: '#B5D0CB',
      onSecondary: '#011A17',
      secondaryContainer: '#7C9691',
      onSecondaryContainer: '#000000',
      tertiary: '#B1CEEA',
      onTertiary: '#001829',
      tertiaryContainer: '#7894AE',
      onTertiaryContainer: '#000000',
      error: '#FFBAB1',
      onError: '#370001',
      errorContainer: '#FF5449',
      onErrorContainer: '#000000',
      background: '#0E1513',
      onBackground: '#DDE4E1',
      surface: '#0E1513',
      onSurface: '#F6FCF9',
      surfaceVariant: '#3F4947',
      onSurfaceVariant: '#C3CDCA',
      outline: '#9BA5A2',
      outlineVariant: '#7B8583',
      shadow: '#000000',
      scrim: '#000000',
      inverseSurface: '#DDE4E1',
      inverseOnSurface: '#252B2A',
      inversePrimary: '#005249',
      primaryFixed: '#9EF2E4',
      onPrimaryFixed: '#001512',
      primaryFixedDim: '#82D5C8',
      onPrimaryFixedVariant: '#003E37',
      secondaryFixed: '#CCE8E2',
      onSecondaryFixed: '#001512',
      secondaryFixedDim: '#B1CCC6',
      onSecondaryFixedVariant: '#223B37',
      tertiaryFixed: '#CCE5FF',
      onTertiaryFixed: '#001321',
      tertiaryFixedDim: '#ADCAE6',
      onTertiaryFixedVariant: '#1B394F',
      surfaceDim: '#0E1513',
      surfaceBright: '#343B39',
      surfaceContainerLowest: '#090F0E',
      surfaceContainerLow: '#161D1C',
      surfaceContainer: '#1A2120',
      surfaceContainerHigh: '#252B2A',
      surfaceContainerHighest: '#303635',
    },
    darkHighContrast: {
      ...sharedColors,
      primary: '#EBFFFA',
      surfaceTint: '#82D5C8',
      onPrimary: '#000000',
      primaryContainer: '#86DACC',
      onPrimaryContainer: '#000000',
      secondary: '#EBFFFA',
      onSecondary: '#000000',
      secondaryContainer: '#B5D0CB',
      onSecondaryContainer: '#000000',
      tertiary: '#F9FBFF',
      onTertiary: '#000000',
      tertiaryContainer: '#B1CEEA',
      onTertiaryContainer: '#000000',
      error: '#FFF9F9',
      onError: '#000000',
      errorContainer: '#FFBAB1',
      onErrorContainer: '#000000',
      background: '#0E1513',
      onBackground: '#DDE4E1',
      surface: '#0E1513',
      onSurface: '#FFFFFF',
      surfaceVariant: '#3F4947',
      onSurfaceVariant: '#F3FDFA',
      outline: '#C3CDCA',
      outlineVariant: '#C3CDCA',
      shadow: '#000000',
      scrim: '#000000',
      inverseSurface: '#DDE4E1',
      inverseOnSurface: '#000000',
      inversePrimary: '#00302B',
      primaryFixed: '#A2F6E8',
      onPrimaryFixed: '#000000',
      primaryFixedDim: '#86DACC',
      onPrimaryFixedVariant: '#001A17',
      secondaryFixed: '#D1EDE7',
      onSecondaryFixed: '#000000',
      secondaryFixedDim: '#B5D0CB',
      onSecondaryFixedVariant: '#011A17',
      tertiaryFixed: '#D4E9FF',
      onTertiaryFixed: '#000000',
      tertiaryFixedDim: '#B1CEEA',
      onTertiaryFixedVariant: '#001829',
      surfaceDim: '#0E1513',
      surfaceBright: '#343B39',
      surfaceContainerLowest: '#090F0E',
      surfaceContainerLow: '#161D1C',
      surfaceContainer: '#1A2120',
      surfaceContainerHigh: '#252B2A',
      surfaceContainerHighest: '#303635',
    },
  },
};

export default md3TealTheme;
