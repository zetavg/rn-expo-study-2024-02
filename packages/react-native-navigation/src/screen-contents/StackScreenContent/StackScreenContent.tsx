import React from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';

import { BackgroundColor } from '@rnstudy/react-native-ui';

import HeaderControlButton from '../HeaderControlButton';
import { HeaderSearchBarOptions } from '../types';

import Header, { useHeaderProps } from './components/Header';
import StackScreenContentScrollView from './StackScreenContentScrollView';

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

export function StackScreenContent(props: Props) {
  const headerProps = useHeaderProps(props);

  const { grouped } = props;

  let children = props.children;

  if (Platform.OS === 'android') {
    children = (
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={
          // TODO: Set this dynamically based on the height of the bottom tab bar and the bottom safe area inset
          80
        }
      >
        {children}
      </KeyboardAvoidingView>
    );
  }

  return (
    <>
      <Header {...headerProps} />

      <BackgroundColor root grouped={grouped}>
        {(bg) => (
          <View style={[styles.stackScreenContent, { backgroundColor: bg }]}>
            {children}
          </View>
        )}
      </BackgroundColor>
    </>
  );
}

StackScreenContent.ScrollView = StackScreenContentScrollView;
StackScreenContent.HeaderControlButton = HeaderControlButton;

const styles = StyleSheet.create({
  stackScreenContent: {
    flex: 1,
  },
});

export default StackScreenContent;
