import React, { useCallback, useLayoutEffect, useMemo, useRef } from 'react';
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
  BackgroundColor,
  SegmentedControlProps,
  SegmentedControlPropsContextProvider,
  useBackgroundColor,
  useColorScheme,
  useIOSUIColors,
  useIsElevatedBackground,
} from '@rnstudy/react-native-ui';

import {
  getHeaderTitleStyleIOS,
  getScreenOptionsForHeaderBackgroundAndBorderIOS,
} from '../../createStackNavigator';
import HeaderControlButton from '../components/HeaderControlButton';
import { HeaderSearchBarOptions } from '../types';

import StackScreenContentScrollView from './components/StackScreenContentScrollView';

export type Props = {
  title?: string;
  /** Whether to show the header or not. Defaults to `true`. */
  showHeader?: boolean;
  headerBackgroundTransparent?: boolean;
  headerTitleVisible?: boolean;
  /**
   * Whether to enable header with large title which collapses to regular header on scroll.
   *
   * Only supported on iOS for now.
   */
  headerLargeTitle?: boolean;

  /**
   * Label string on the back button on iOS. Defaults to the previous scene's title, or "Back" if there's not enough space.
   *
   * Only supported on iOS.
   */
  headerBackTitle?: string;
  /**
   * Whether to show the back button label on iOS. Defaults to `true`.
   */
  headerBackTitleVisible?: boolean;

  /** Options to render a search bar on the header. **Note that this should not be changed during the component's lifecycle.** */
  headerSearchBarOptions?: HeaderSearchBarOptions;

  headerTitleContent?: React.ReactNode;
  headerTrailingContent?: React.ReactNode;

  grouped?: boolean | undefined;

  children: React.ReactNode;
};

export function StackScreenContent({
  title,
  showHeader,
  headerBackgroundTransparent,
  headerTitleVisible = true,
  headerLargeTitle,
  headerBackTitle,
  headerBackTitleVisible,
  headerTitleContent,
  headerTrailingContent,
  headerSearchBarOptions,
  grouped,
  children,
}: Props) {
  const navigation = useNavigation();

  const colorScheme = useColorScheme();
  const backgroundColor = useBackgroundColor({
    grouped,
    elevated: useIsElevatedBackground(),
  });
  const iosUIColors = useIOSUIColors();

  const memoizedHeaderSearchBarOptions = useMemo(
    () => {
      if (headerSearchBarOptions?.enable === false) return null;

      return headerSearchBarOptions;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    Object.values(headerSearchBarOptions || {}),
  );

  useLayoutEffect(() => {
    const processedHeaderSearchBarOptions: RNScreensSearchBarProps | undefined =
      memoizedHeaderSearchBarOptions
        ? {
            ...memoizedHeaderSearchBarOptions,
            onChangeText: memoizedHeaderSearchBarOptions.onChangeText
              ? (e) => {
                  memoizedHeaderSearchBarOptions?.onChangeText?.(
                    e.nativeEvent.text,
                  );
                }
              : undefined,
            // TODO[theme]: define me with dynamic theme
            tintColor: undefined,
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
            <SegmentedControlPropsContextProvider
              value={HEADER_SEGMENTED_CONTROL_PROPS}
            >
              {headerTitleContent}
            </SegmentedControlPropsContextProvider>
          )
        : undefined,
      headerRight: headerTrailingContent
        ? () => (
            <HeaderTrailingContentContainerIOS>
              {headerTrailingContent}
            </HeaderTrailingContentContainerIOS>
          )
        : undefined,

      headerSearchBarOptions: processedHeaderSearchBarOptions,
    });
  }, [
    title,
    showHeader,
    headerBackgroundTransparent,
    headerTitleVisible,
    headerLargeTitle,
    headerBackTitle,
    headerBackTitleVisible,
    headerTitleContent,
    headerTrailingContent,
    navigation,
    backgroundColor,
    memoizedHeaderSearchBarOptions,
    iosUIColors,
    colorScheme,
  ]);

  return (
    <BackgroundColor root grouped={grouped}>
      {(bg) => (
        <View style={[styles.stackScreenContent, { backgroundColor: bg }]}>
          {children}
        </View>
      )}
    </BackgroundColor>
  );
}

function HeaderTrailingContentContainerIOS({
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
        styles.headerTrailingContentContainerIOS,
        {
          minWidth: minWidthAnim,
        },
      ]}
    >
      {children}
    </Animated.View>
  );
}

StackScreenContent.ScrollView = StackScreenContentScrollView;

StackScreenContent.HeaderControlButton = HeaderControlButton;

const HEADER_SEGMENTED_CONTROL_PROPS: Partial<SegmentedControlProps<string>> = {
  height: 28,
  emphasizeSelectedText: true,
};

const styles = StyleSheet.create({
  stackScreenContent: {
    flex: 1,
  },
  headerTrailingContentContainerIOS: {
    alignSelf: 'center',
    height: 44,
    flexDirection: 'row',
    justifyContent: 'flex-end', // Should change to 'flex-start' if flexDirection is set to 'row-reverse'.
    alignItems: 'center',
    gap: 16,
  },
});

export default StackScreenContent;
