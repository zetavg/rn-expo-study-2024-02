import React, { useEffect, useMemo } from 'react';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SearchBarProps as RNScreensSearchBarProps } from 'react-native-screens';
import { BottomTabBarHeightContext } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import * as iosColors from '@rnstudy/ios-colors';

import { NavigationConfig } from '../../types';

type Props = {
  title: string;
  children: React.ReactNode;
};

export function getModalScreenContentComponent(config: NavigationConfig) {
  const { useColorScheme } = config;

  function ModalScreenContent({ title, children }: Props) {
    /**
     * This navigator is only used to render native styled stack navigator header.
     */
    const Stack = createNativeStackNavigator();

    const screenOptions = useMemo<
      React.ComponentProps<
        ReturnType<typeof createNativeStackNavigator>['Navigator']
      >['screenOptions']
    >(
      () => ({
        ...(Platform.OS === 'ios'
          ? {
              // Blur effect.
              headerTransparent: true,
              headerBlurEffect: 'light',
              headerShadowVisible: true,
              // Set a close-to-transparent background to make `headerShadowVisible: true` work.
              // See: https://github.com/react-navigation/react-navigation/issues/10845#issuecomment-1276312567
              headerStyle: { backgroundColor: 'rgba(255, 255, 255, 0.002)' },
            }
          : {}),
      }),
      [],
    );

    return (
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name="ModalScreenContent" options={{ title }}>
          {() => children}
        </Stack.Screen>
      </Stack.Navigator>
    );
  }

  ModalScreenContent.ScrollView = function ModalScreenContentScrollView(
    props: React.ComponentProps<typeof ScrollView>,
  ) {
    const safeAreaInsets = useSafeAreaInsets();

    /**
     * Since we may be using a TabBar with BlurView as the background, `position: 'absolute'` will be set in such TabBar's style. as React Navigation will not add margins to the content to account for the absolute-positioned TabBar automatically, we will need to handle it ourselves.
     *
     * See:
     * * Using BlurView as `tabBarBackground`: https://reactnavigation.org/docs/7.x/bottom-tab-navigator#tabbarbackground
     * * Using `position: 'absolute'` in `tabBarStyle`: https://reactnavigation.org/docs/7.x/bottom-tab-navigator#tabbarstyle
     */
    const bottomTabBarHeight = React.useContext(BottomTabBarHeightContext) || 0;

    const contentInset = useMemo(
      () =>
        bottomTabBarHeight > 0
          ? {
              bottom: Math.max(0, bottomTabBarHeight - safeAreaInsets.bottom),
            }
          : undefined,
      [bottomTabBarHeight, safeAreaInsets.bottom],
    );

    return (
      <ScrollView
        keyboardDismissMode="interactive"
        keyboardShouldPersistTaps="handled"
        automaticallyAdjustKeyboardInsets
        // For `headerLargeTitle` to work. See: https://reactnavigation.org/docs/7.x/native-stack-navigator#headerlargetitle
        contentInsetAdjustmentBehavior="automatic"
        contentInset={contentInset}
        scrollIndicatorInsets={contentInset}
        {...props}
      />
    );
  };

  return ModalScreenContent;
}

export default getModalScreenContentComponent;
