import React, { ReactNode } from 'react';

import { ThemeProvider as IOSThemeProvider } from '@rnstudy/react-native-ios-ui';

import { Theme } from './themes/type';

export const ThemeProvider = ({
  theme,
  children,
}: {
  theme: Theme;
  children: ReactNode;
}) => <IOSThemeProvider theme={theme.ios} children={children} />;
