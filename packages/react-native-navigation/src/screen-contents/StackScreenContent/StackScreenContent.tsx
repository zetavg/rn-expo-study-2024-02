import React, { useMemo, useRef } from 'react';
import { StyleSheet, View } from 'react-native';

import { BackgroundColor, useUIPlatform } from '@rnstudy/react-native-ui';

import { HeaderHeightContext } from '../../contexts/HeaderHeightContext';
import {
  ScrollViewContext,
  ScrollViewContextValue,
  ScrollViewRef,
} from '../contexts';
import HeaderControlButton from '../HeaderControlButton';
import { useBottomTabPressHandling } from '../hooks';
import { HeaderSearchBarOptions } from '../types';

import Header, { useHeaderProps } from './components/Header';
import StackScreenContentFlatList from './StackScreenContentFlatList';
import StackScreenContentScrollView from './StackScreenContentScrollView';

export type Props = {
  title?: string;
  /** Whether to show the header or not. Defaults to `true`. */
  showHeader?: boolean;
  /** @deprecated */
  headerBackgroundTransparent?: boolean;
  /** @deprecated */
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

  /** The content to take place of the header's title. */
  headerTitleContent?: React.ReactNode;
  /** The content to display on the header's leading side, taking place of the back button. */
  headerLeadingContent?: React.ReactNode;
  /** The content to display on the header's trailing side. */
  headerTrailingContent?: React.ReactNode;

  grouped?: boolean | undefined;

  children: React.ReactNode;
};

/**
 * The content of a screen in a stack navigator.
 */
export function StackScreenContent(props: Props) {
  const uiPlatform = useUIPlatform();

  const headerProps = useHeaderProps(props);

  const scrollViewRefRef = useRef<null | ScrollViewRef>(null);

  const { handleScrollBeginDrag } = useBottomTabPressHandling({
    scrollViewRefRef,
  });

  const scrollViewContextValue = useMemo<ScrollViewContextValue>(
    () => ({
      scrollViewRefRef,
      onScrollBeginDrag: handleScrollBeginDrag,
    }),
    [handleScrollBeginDrag],
  );

  const [headerHeight, _] = React.useState<number | undefined>(
    (() => {
      if (uiPlatform === 'android') {
        return props.showHeader ?? true
          ? 0 /* Since the header will only be position-static with the current implementation */
          : undefined;
      }
    })(),
  );

  const { grouped, children } = props;

  return (
    <HeaderHeightContext.Provider value={headerHeight}>
      <Header {...headerProps} />

      <BackgroundColor root grouped={grouped}>
        {(bg) => (
          <View style={[styles.stackScreenContent, { backgroundColor: bg }]}>
            <ScrollViewContext.Provider value={scrollViewContextValue}>
              {children}
            </ScrollViewContext.Provider>
          </View>
        )}
      </BackgroundColor>
    </HeaderHeightContext.Provider>
  );
}

const styles = StyleSheet.create({
  stackScreenContent: {
    flex: 1,
  },
});

StackScreenContent.ScrollView = StackScreenContentScrollView;
StackScreenContent.FlatList = StackScreenContentFlatList;
StackScreenContent.HeaderControlButton = HeaderControlButton;

export default StackScreenContent;
