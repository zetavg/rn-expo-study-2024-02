import React, { forwardRef, useEffect, useLayoutEffect, useMemo } from 'react';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';
import { SearchBarProps as RNScreensSearchBarProps } from 'react-native-screens';
import { useNavigation } from '@react-navigation/native';

import * as iosColors from '@rnstudy/ios-colors';

import { NavigationConfig } from '../../types';
import bottomTabPressReactive from '../bottomTabPressReactive';
import { useContentInset } from '../hooks';
import { HeaderSearchBarOptions } from '../types';

export type Props = {
  title?: string;
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
    title,
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
      () => {
        if (headerSearchBarOptions?.enable === false) return null;

        return headerSearchBarOptions;
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      Object.values(headerSearchBarOptions || {}),
    );

    useLayoutEffect(() => {
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
        title,
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
      title,
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

  StackScreenContent.ScrollView = forwardRef<
    ScrollView,
    React.ComponentProps<typeof ScrollView>
  >(function StackScreenContentScrollView(
    props: React.ComponentProps<typeof ScrollView>,
    ref,
  ) {
    const contentInset = useContentInset(props.contentInset);

    return (
      <BottomTabPressReactiveScrollView
        ref={ref}
        {...props}
        keyboardDismissMode="interactive"
        keyboardShouldPersistTaps="handled"
        automaticallyAdjustKeyboardInsets
        // For `headerLargeTitle` to work. See: https://reactnavigation.org/docs/7.x/native-stack-navigator#headerlargetitle
        contentInsetAdjustmentBehavior="automatic"
        contentInset={contentInset}
        scrollIndicatorInsets={contentInset}
      />
    );
  });

  return StackScreenContent;
}

const BottomTabPressReactiveScrollView = bottomTabPressReactive(ScrollView);

const styles = StyleSheet.create({
  stackScreenContent: {
    flex: 1,
  },
});

export default getStackScreenContentComponent;
