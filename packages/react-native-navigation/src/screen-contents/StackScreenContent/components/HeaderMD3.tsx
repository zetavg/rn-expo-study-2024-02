import React, {
  memo,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
} from 'react';
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
} from '../../../createStackNavigator';
import HeaderControlButton from '../../HeaderControlButton';
import { HeaderSearchBarOptions } from '../../types';
import StackScreenContentScrollView from '../StackScreenContentScrollView';

export const HeaderMD3 = memo(function HeaderMD3() {
  return null;
});

HeaderMD3.displayName = 'StackScreenContent/Header_MD3';

export default HeaderMD3;
