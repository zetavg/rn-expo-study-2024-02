import React, { useEffect, useMemo } from 'react';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomTabBarHeightContext } from '@react-navigation/bottom-tabs';
import { ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type Props<
  ParamList extends ParamListBase,
  RouteName extends keyof ParamList = string,
  NavigatorID extends string | undefined = undefined,
> = {
  navigation: NativeStackNavigationProp<ParamList, RouteName, NavigatorID>;
  /**
   * Whether to enable header with large title which collapses to regular header on scroll.
   *
   * Only supported on iOS.
   */
  headerLargeTitle?: boolean;
  children: React.ReactNode;
};

export function StackScreenContent<
  ParamList extends ParamListBase,
  RouteName extends keyof ParamList = string,
  NavigatorID extends string | undefined = undefined,
>({
  navigation,
  headerLargeTitle,
  children,
}: Props<ParamList, RouteName, NavigatorID>) {
  // TODO: Use dynamic color
  const backgroundColor = '#eeeeee';

  useEffect(() => {
    navigation.setOptions({
      // Handle `headerLargeTitle`.
      ...(() => {
        if (Platform.OS !== 'ios') return {};

        if (headerLargeTitle) {
          return {
            headerLargeTitle: true,
            headerLargeTitleShadowVisible: false,
            headerLargeStyle: {
              // There's no way to set the background color of the large title header as transparent, so we need to set it to the same color as the background here
              backgroundColor,
            },
          };
        }

        return {
          headerLargeTitle: false,
        };
      })(),
    });
  }, []);

  return (
    <View style={[styles.stackScreenContent, { backgroundColor }]}>
      {children}
    </View>
  );
}

StackScreenContent.ScrollView = function StackScreenContentScrollView(
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
    [bottomTabBarHeight],
  );

  return (
    <ScrollView
      // For `headerLargeTitle` to work. See: https://reactnavigation.org/docs/7.x/native-stack-navigator#headerlargetitle
      contentInsetAdjustmentBehavior="automatic"
      contentInset={contentInset}
      scrollIndicatorInsets={contentInset}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  stackScreenContent: {
    flex: 1,
  },
});

export default StackScreenContent;
