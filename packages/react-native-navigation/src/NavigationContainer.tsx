import React, { forwardRef, useMemo } from 'react';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer as RNNavigationContainer,
} from '@react-navigation/native';

import { useBackgroundColor, useColorScheme } from '@rnstudy/react-native-ui';

type Props = React.ComponentProps<typeof RNNavigationContainer>;

export const NavigationContainer = forwardRef(function NavigationContainer(
  props: Props,
  ref: React.ComponentPropsWithRef<typeof RNNavigationContainer>['ref'],
) {
  const colorScheme = useColorScheme();
  const backgroundColor = useBackgroundColor({ grouped: undefined });

  const navigationTheme = useMemo(() => {
    const defaultTheme = colorScheme.startsWith('dark')
      ? DarkTheme
      : DefaultTheme;
    return {
      ...defaultTheme,
      colors: {
        ...defaultTheme.colors,
        // Setting a background color can prevent a white flash when the app starts or switches between screens.
        background: backgroundColor,
      },
    };
  }, [colorScheme, backgroundColor]);

  return <RNNavigationContainer ref={ref} theme={navigationTheme} {...props} />;
});

NavigationContainer.displayName = 'NavigationContainer';

export default NavigationContainer;
