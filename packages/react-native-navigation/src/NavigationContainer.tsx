import React, { forwardRef, useMemo } from 'react';
import {
  DefaultTheme,
  NavigationContainer as RNNavigationContainer,
} from '@react-navigation/native';

import { useColorScheme } from '@rnstudy/react-native-ui';

type Props = React.ComponentProps<typeof RNNavigationContainer>;

export const NavigationContainer = forwardRef(function NavigationContainer(
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

  return <RNNavigationContainer ref={ref} theme={navigationTheme} {...props} />;
});

NavigationContainer.displayName = 'NavigationContainer';

export default NavigationContainer;
