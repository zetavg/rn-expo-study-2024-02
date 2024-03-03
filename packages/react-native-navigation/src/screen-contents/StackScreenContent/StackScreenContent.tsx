import React, { useEffect, useMemo } from 'react';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SearchBarProps as RNScreensSearchBarProps } from 'react-native-screens';
import { BottomTabBarHeightContext } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';

import * as iosColors from '@rnstudy/ios-colors';

import { NavigationConfig } from '../../types';

type HeaderSearchBarOptions = {
  /** A callback that gets called when the text changes. It receives the current text value of the search bar. */
  onChangeText?: (text: string) => void;
  /** A callback that gets called when the cancel button is pressed. */
  onCancelButtonPress?: () => void;
  /** A callback that gets called when search bar has lost focus. */
  onBlur?: () => void;
  /** Text displayed when search field is empty. */
  placeholder?: string;
  /** Controls whether the text is automatically auto-capitalized as it is entered by the user. */
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  /** Whether to automatically focus search bar when it's shown. */
  autoFocus?: boolean;
  /** Boolean indicating whether to hide the search bar when scrolling. Defaults to `true`. */
  hideWhenScrolling?: boolean;
  /** The text to be used instead of default Cancel button text. Only supported on iOS. */
  cancelButtonText?: string;
};

type Props = {
  /**
   * Whether to enable header with large title which collapses to regular header on scroll.
   *
   * Only supported on iOS.
   */
  headerLargeTitle?: boolean;
  /** Options to render a search bar on the header. **Note that this should not be changed during the component's lifecycle.** */
  headerSearchBarOptions?: HeaderSearchBarOptions;
  /** Specify a custom background color. */
  backgroundColor?: string;
  children: React.ReactNode;
};

export function getStackScreenContentComponent(config: NavigationConfig) {
  const { useColorScheme } = config;

  function StackScreenContent({
    headerLargeTitle,
    headerSearchBarOptions,
    backgroundColor: backgroundColorProp,
    children,
  }: Props) {
    const navigation = useNavigation();
    const colorScheme = useColorScheme();

    const backgroundColor = useMemo(() => {
      if (backgroundColorProp) return backgroundColorProp;

      switch (Platform.OS) {
        case 'ios':
        default:
          return iosColors[colorScheme].uiColors.systemGroupedBackground;
      }
    }, [backgroundColorProp, colorScheme]);

    const memoizedHeaderSearchBarOptions = useMemo(
      () => headerSearchBarOptions,
      // eslint-disable-next-line react-hooks/exhaustive-deps
      Object.values(headerSearchBarOptions || {}),
    );

    useEffect(() => {
      const processedHeaderSearchBarOptions:
        | RNScreensSearchBarProps
        | undefined = memoizedHeaderSearchBarOptions
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
        headerSearchBarOptions: processedHeaderSearchBarOptions,
        // Handle `headerLargeTitle`.
        ...(() => {
          if (Platform.OS !== 'ios') return {};

          return {
            headerLargeTitle,
            headerLargeStyle: { backgroundColor },
          };
        })(),
      });
    }, [
      headerLargeTitle,
      navigation,
      backgroundColor,
      memoizedHeaderSearchBarOptions,
    ]);

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

  return StackScreenContent;
}

const styles = StyleSheet.create({
  stackScreenContent: {
    flex: 1,
  },
});

export default getStackScreenContentComponent;
