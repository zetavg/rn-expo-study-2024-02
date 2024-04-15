import React, { memo, useMemo } from 'react';

import { useUIPlatform } from '@rnstudy/react-native-ui';

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
  | 'headerTrailingContent'
  | 'headerSearchBarOptions'
  | 'grouped'
>;

export function useHeaderProps(p: StackScreenContentProps): Props {
  const { headerSearchBarOptions } = p;
  const memoizedHeaderSearchBarOptions = useMemo(
    () => {
      if (headerSearchBarOptions?.enable === false) return undefined;

      return headerSearchBarOptions;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    Object.values(headerSearchBarOptions || {}),
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
