import React, { memo, useCallback, useLayoutEffect, useRef } from 'react';
import {
  Animated,
  LayoutChangeEvent,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import { SearchBarProps as RNScreensSearchBarProps } from 'react-native-screens';
import { useNavigation } from '@react-navigation/native';

import {
  SegmentedControlProps,
  SegmentedControlPropsContextProvider,
  useBackgroundColor,
  useColorScheme,
  useIOSUIColors,
  useIsElevatedBackground,
} from '@rnstudy/react-native-ui';
import { getPerformanceEyeAttractorDummyComponent } from '@rnstudy/react-utils';

import {
  getHeaderTitleStyleIOS,
  getScreenOptionsForHeaderBackgroundAndBorderIOS,
} from '../../../createStackNavigator';

import type { Props } from './Header';

const HeaderIOSPerformanceEyeAttractorDummyComponent =
  getPerformanceEyeAttractorDummyComponent({
    impact: 3,
    message:
      'The the actual work of the HeaderIOS component is done in useLayoutEffect, which calls navigation.setOptions and will cause the navigation to re-render.',
  });

export const HeaderIOS = memo(function HeaderIOS({
  title,
  showHeader,
  headerBackgroundTransparent,
  headerTitleVisible,
  headerLargeTitle,
  headerBackTitle,
  headerBackTitleVisible,
  headerTitleContent,
  headerLeadingContent,
  headerTrailingContent,
  headerSearchBarOptions,
  grouped,
}: Props) {
  const navigation = useNavigation();

  const colorScheme = useColorScheme();
  const backgroundColor = useBackgroundColor({
    grouped,
    elevated: useIsElevatedBackground(),
  });
  const iosUIColors = useIOSUIColors();

  const headerSearchBarEnabled =
    headerSearchBarOptions && headerSearchBarOptions.enable !== false;

  useLayoutEffect(() => {
    const processedHeaderSearchBarOptions: RNScreensSearchBarProps | undefined =
      headerSearchBarEnabled
        ? {
            ...headerSearchBarOptions,
            onChangeText: headerSearchBarOptions.onChangeText
              ? (e) => {
                  headerSearchBarOptions?.onChangeText?.(e.nativeEvent.text);
                }
              : undefined,
            tintColor: iosUIColors.tintColor,
            hideWhenScrolling: headerSearchBarOptions.primary
              ? false
              : headerSearchBarOptions.hideWhenScrolling ?? true,
          }
        : undefined;

    navigation.setOptions({
      title,
      headerShown: showHeader ?? true,

      // Handle `headerBackgroundTransparent`.
      ...(() => {
        if (headerBackgroundTransparent)
          return {
            headerTransparent: true,
            headerBlurEffect: null,
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: 'transparent',
            },
          };

        return getScreenOptionsForHeaderBackgroundAndBorderIOS({ colorScheme });
      })(),

      // Handle `headerTitleVisible`.
      ...(() => {
        if (headerTitleVisible)
          return {
            headerTitleStyle: getHeaderTitleStyleIOS({ iosUIColors }),
          };

        return {
          headerTitleStyle: { color: 'transparent' },
        };
      })(),

      // Handle `headerLargeTitle`.
      ...(() => {
        if (Platform.OS !== 'ios') return {};

        return {
          headerLargeTitle,
          // There's no way to set the background color of the large title header as transparent, so we need to set it to the same color as the background here
          headerLargeStyle: { backgroundColor },
        };
      })(),

      headerBackTitle: headerBackTitle || ' ',
      headerBackTitleVisible,

      headerTitle: headerTitleContent
        ? () => (
            <View style={styles.headerTitleContentContainer}>
              <SegmentedControlPropsContextProvider
                value={HEADER_SEGMENTED_CONTROL_PROPS}
              >
                {headerTitleContent}
              </SegmentedControlPropsContextProvider>
            </View>
          )
        : undefined,
      headerLeft: headerLeadingContent
        ? () => (
            <HeaderLeadingContentContainer>
              {headerLeadingContent}
            </HeaderLeadingContentContainer>
          )
        : undefined,
      headerRight: headerTrailingContent
        ? () => (
            <HeaderTrailingContentContainer>
              {headerTrailingContent}
            </HeaderTrailingContentContainer>
          )
        : undefined,

      headerSearchBarOptions: processedHeaderSearchBarOptions,
    });
  }, [
    backgroundColor,
    colorScheme,
    headerBackTitle,
    headerBackTitleVisible,
    headerBackgroundTransparent,
    headerLargeTitle,
    headerSearchBarEnabled,
    headerSearchBarOptions,
    headerTitleContent,
    headerTitleVisible,
    headerLeadingContent,
    headerTrailingContent,
    iosUIColors,
    navigation,
    showHeader,
    title,
  ]);

  // On iOS, we rely on react-navigation to render the header natively, so nothing is actually rendered here.
  return __DEV__ ? <HeaderIOSPerformanceEyeAttractorDummyComponent /> : null;
});

HeaderIOS.displayName = 'StackScreenContent/Header_IOS';

function HeaderTrailingContentContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  /** The content of headerRight will have trouble laying out in the correct position if it's rendered with a larger width before and has been re-rendered with a smaller width. To workaround this, we need to keep track of the maximum width that has been rendered and set the minWidth of the container to that value. */
  const minWidthAnim = useRef(new Animated.Value(0)).current;
  const maxRenderedWidthRef = React.useRef<number>(0);

  const handleLayout = useCallback(
    (event: LayoutChangeEvent) => {
      const { width } = event.nativeEvent.layout;

      if (width <= maxRenderedWidthRef.current) return;

      minWidthAnim.setValue(width);
      maxRenderedWidthRef.current = width;
    },
    [maxRenderedWidthRef, minWidthAnim],
  );

  return (
    <Animated.View
      onLayout={handleLayout}
      style={[
        styles.headerLeadingAndTrailingContentContainer,
        styles.headerTrailingContentContainer,
        {
          minWidth: minWidthAnim,
        },
      ]}
    >
      {children}
    </Animated.View>
  );
}

function HeaderLeadingContentContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <View
      style={[
        styles.headerLeadingAndTrailingContentContainer,
        styles.headerLeadingContentContainer,
      ]}
    >
      {children}
    </View>
  );
}

const HEADER_SEGMENTED_CONTROL_PROPS: Partial<SegmentedControlProps<string>> = {
  height: 28,
  emphasizeSelectedText: true,
};

const styles = StyleSheet.create({
  headerTitleContentContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerLeadingAndTrailingContentContainer: {
    alignSelf: 'center',
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  headerTrailingContentContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end', // Should change to 'flex-start' if flexDirection is set to 'row-reverse'.
  },
  headerLeadingContentContainer: {},
});

export default HeaderIOS;
