import React, { forwardRef, useMemo } from 'react';
import {
  DefaultTheme,
  NavigationContainer as RNNavigationContainer,
} from '@react-navigation/native';

import { NavigationConfig } from './types';

type Props = React.ComponentProps<typeof RNNavigationContainer>;

export function getNavigationContainerComponent(config: NavigationConfig) {
  const { useColorScheme } = config;
  return forwardRef(function NavigationContainer(
    props: Props,
    ref: React.ComponentPropsWithRef<typeof RNNavigationContainer>['ref'],
  ) {
    const colorScheme = useColorScheme();
    const navigationTheme = useMemo(
      () => ({
        ...DefaultTheme,
        dark: colorScheme === 'dark',
      }),
      [colorScheme],
    );

    return (
      <RNNavigationContainer ref={ref} theme={navigationTheme} {...props} />
    );
  });
}
