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
  useWindowDimensions,
  View,
} from 'react-native';
import { Appbar } from 'react-native-paper';
import { DEFAULT_APPBAR_HEIGHT } from 'react-native-paper/src/components/Appbar/utils';
import { SearchBarProps as RNScreensSearchBarProps } from 'react-native-screens';
import { useNavigation, useRoute } from '@react-navigation/native';

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

import { Props } from './Header';

export const HeaderMD3 = memo(function HeaderMD3({
  title,
  showHeader = true,
  headerBackgroundTransparent,
  headerTitleVisible,
  headerLargeTitle,
  headerBackTitle,
  headerBackTitleVisible,
  headerTitleContent,
  headerTrailingContent,
  headerSearchBarOptions,
  grouped,
}: Props) {
  const windowDimensions = useWindowDimensions();

  const navigation = useNavigation();
  const route = useRoute();

  useLayoutEffect(() => {
    navigation.setOptions({
      title,
    });
  }, [navigation, title]);

  const backgroundColor = useBackgroundColor({
    grouped,
    elevated: useIsElevatedBackground(),
  });

  const headerWidthAnim = useRef(
    new Animated.Value(windowDimensions.width),
  ).current;
  const handleAppBarLayout = useCallback(
    (event: LayoutChangeEvent) => {
      headerWidthAnim.setValue(event.nativeEvent.layout.width);
    },
    [headerWidthAnim],
  );

  const headerTitleContentContainerXAnim = useRef(
    new Animated.Value(0),
  ).current;
  const handleHeaderTitleContentContainerLayout = useCallback(
    (event: LayoutChangeEvent) => {
      headerTitleContentContainerXAnim.setValue(event.nativeEvent.layout.x);
    },
    [headerTitleContentContainerXAnim],
  );

  const headerTitleContentContainerMaxWidthAnim = useRef(
    Animated.subtract(
      headerWidthAnim,
      Animated.multiply(headerTitleContentContainerXAnim, 2),
    ),
  ).current;

  if (!showHeader) return null;

  const canGoBack = navigation.canGoBack();
  const headerSearchBarEnabled =
    headerSearchBarOptions && headerSearchBarOptions.enable !== false;

  return (
    <Appbar.Header
      elevated={!headerBackgroundTransparent}
      style={
        headerBackgroundTransparent
          ? styles.transparentHeader
          : { backgroundColor }
      }
      onLayout={handleAppBarLayout}
    >
      {canGoBack && <Appbar.BackAction onPress={navigation.goBack} />}
      {!headerTitleContent ? (
        <Appbar.Content title={title} />
      ) : (
        <View
          onLayout={handleHeaderTitleContentContainerLayout}
          style={styles.headerTitleContentContainer}
        >
          <Animated.View
            style={[
              styles.headerTitleContentInnerContainer,
              {
                maxWidth: headerTitleContentContainerMaxWidthAnim,
              },
            ]}
          >
            <SegmentedControlPropsContextProvider
              value={HEADER_SEGMENTED_CONTROL_PROPS}
            >
              {headerTitleContent}
            </SegmentedControlPropsContextProvider>
          </Animated.View>
        </View>
      )}
      {headerTrailingContent}
      <Appbar.Action icon="magnify" onPress={() => {}} />
    </Appbar.Header>
  );
});

HeaderMD3.displayName = 'StackScreenContent/Header_MD3';

const HEADER_SEGMENTED_CONTROL_PROPS: Partial<SegmentedControlProps<string>> = {
  height: 28,
  emphasizeSelectedText: true,
  style: {
    alignSelf: 'center',
  },
};

const styles = StyleSheet.create({
  transparentHeader: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 100,
    zIndex: 100,
  },
  headerTitleContentContainer: {
    flex: 1,
    // ...StyleSheet.absoluteFillObject,
    // justifyContent: 'center',
    // alignItems: 'center',
    flexDirection: 'row',
  },
  headerTitleContentInnerContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  hidden: {
    opacity: 0,
  },
});

export default HeaderMD3;
