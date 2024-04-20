import React, { memo, useMemo } from 'react';
import { LayoutChangeEvent } from 'react-native';

import { useUIPlatform } from '@rnstudy/react-native-ui';
import { useMemoValue } from '@rnstudy/react-utils';

import type { Props as StackScreenContentProps } from '../StackScreenContent';

import HeaderIOS from './HeaderIOS';
import HeaderMD3 from './HeaderMD3';

export type Props = Pick<
  StackScreenContentProps,
  | 'title'
  | 'showHeader'
  | 'headerBackgroundTransparent'
  | 'headerTitleVisible'
  | 'headerLargeTitle'
  | 'headerBackTitle'
  | 'headerBackTitleVisible'
  | 'headerTitleContent'
  | 'headerLeadingContent'
  | 'headerTrailingContent'
  | 'headerSearchBarOptions'
  | 'grouped'
> & {
  onLayout?: (event: LayoutChangeEvent) => void;
};

export function useHeaderProps(p: StackScreenContentProps): Props {
  const { headerSearchBarOptions: headerSearchBarOptionsProp } = p;
  const memoizedHeaderSearchBarOptions = useMemoValue(
    headerSearchBarOptionsProp,
  );

  return {
    title: p.title,
    showHeader: p.showHeader,
    headerBackgroundTransparent: p.headerBackgroundTransparent,
    headerTitleVisible: p.headerTitleVisible ?? true,
    headerLargeTitle: p.headerLargeTitle,
    headerBackTitle: p.headerBackTitle,
    headerBackTitleVisible: p.headerBackTitleVisible,
    headerSearchBarOptions: memoizedHeaderSearchBarOptions,
    headerTitleContent: p.headerTitleContent,
    headerLeadingContent: p.headerLeadingContent,
    headerTrailingContent: p.headerTrailingContent,
    grouped: p.grouped,
  };
}

export const Header = memo(function Header(props: Props) {
  const uiPlatform = useUIPlatform();

  switch (uiPlatform) {
    case 'ios':
      return <HeaderIOS {...props} />;
    case 'android':
      return <HeaderMD3 {...props} />;
  }
});

Header.displayName = 'StackScreenContent/Header';

export default Header;
