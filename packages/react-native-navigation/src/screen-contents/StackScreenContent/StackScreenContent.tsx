import React, { forwardRef, useLayoutEffect, useMemo } from 'react';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';
import { SearchBarProps as RNScreensSearchBarProps } from 'react-native-screens';
import { useNavigation } from '@react-navigation/native';

import { BackgroundColor, useBackgroundColor } from '@rnstudy/react-native-ui';

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

  grouped?: boolean | undefined;

  children: React.ReactNode;
};

export function StackScreenContent({
  title,
  headerLargeTitle,
  headerSearchBarOptions,
  grouped,
  children,
}: Props) {
  const navigation = useNavigation();

  const backgroundColor = useBackgroundColor({
    grouped,
  });

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
      headerSearchBarOptions: processedHeaderSearchBarOptions,
      // Handle `headerLargeTitle`.
      ...(() => {
        if (Platform.OS !== 'ios') return {};

        return {
          headerLargeTitle,
          // There's no way to set the background color of the large title header as transparent, so we need to set it to the same color as the background here
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
    <BackgroundColor grouped={grouped}>
      {(bg) => (
        <View style={[styles.stackScreenContent, { backgroundColor: bg }]}>
          {children}
        </View>
      )}
    </BackgroundColor>
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

const BottomTabPressReactiveScrollView = bottomTabPressReactive(ScrollView);

const styles = StyleSheet.create({
  stackScreenContent: {
    flex: 1,
  },
});

export default StackScreenContent;
