import React, {
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Animated,
  BackHandler,
  LayoutChangeEvent,
  Platform,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import { Appbar } from 'react-native-paper';
// import { DEFAULT_APPBAR_HEIGHT } from 'react-native-paper/src/components/Appbar/utils';
import { SearchBarProps as RNScreensSearchBarProps } from 'react-native-screens';
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import {
  BackgroundColor,
  RNTextInput,
  SegmentedControlProps,
  SegmentedControlPropsContextProvider,
  TextInput,
  useBackgroundColor,
  useColorScheme,
  useIOSUIColors,
  useIsElevatedBackground,
  useMD3Colors,
  withLayoutAnimation,
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

  const colorScheme = useColorScheme();
  const md3Colors = useMD3Colors();

  useLayoutEffect(() => {
    navigation.setOptions({
      title,
    });
  }, [navigation, title]);

  // const backgroundColor = useBackgroundColor({
  //   grouped,
  //   elevated: useIsElevatedBackground(),
  // });

  const backgroundColor = md3Colors.surfaceContainer;

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

  const canGoBack = useMemo(() => navigation.canGoBack(), [navigation]);

  if (!showHeader) return null;

  const headerSearchBarEnabled =
    headerSearchBarOptions && headerSearchBarOptions.enable !== false;

  return (
    <Appbar.Header
      dark={colorScheme === 'dark'}
      elevated={!headerBackgroundTransparent}
      style={
        headerBackgroundTransparent
          ? styles.transparentHeader
          : { backgroundColor }
      }
      onLayout={handleAppBarLayout}
    >
      {canGoBack && (
        <Appbar.BackAction
          onPress={navigation.goBack}
          color={md3Colors.onSurface}
        />
      )}
      {!headerTitleContent ? (
        <Appbar.Content title={title} color={md3Colors.onSurface} />
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
      {headerSearchBarEnabled && (
        <HeaderSearch
          headerSearchBarOptions={headerSearchBarOptions}
          backgroundColor={backgroundColor}
        />
      )}
      {headerTrailingContent}
    </Appbar.Header>
  );
});

HeaderMD3.displayName = 'StackScreenContent/Header_MD3';

function HeaderSearch({
  headerSearchBarOptions,
  backgroundColor,
}: {
  headerSearchBarOptions: Props['headerSearchBarOptions'];
  backgroundColor: string;
}) {
  const md3Colors = useMD3Colors();
  const focused = useIsFocused();

  const searchTextInputRef = useRef<RNTextInput>(null);

  const [isSearchActive, setIsSearchActive] = useState(false);
  const isSearchActiveRef = useRef(isSearchActive);
  isSearchActiveRef.current = isSearchActive;

  const focusSearchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const openSearch = useCallback(() => {
    withLayoutAnimation(() => setIsSearchActive(true))();
    focusSearchTimeoutRef.current = setTimeout(() => {
      searchTextInputRef.current?.focus();
    }, 100);
  }, []);

  const closeSearch = useCallback(() => {
    if (focusSearchTimeoutRef.current) {
      clearTimeout(focusSearchTimeoutRef.current);
    }
    withLayoutAnimation(() => setIsSearchActive(false))();
    searchTextInputRef.current?.clear();
    searchTextInputRef.current?.blur();
    headerSearchBarOptions?.onChangeText?.('');
  }, [headerSearchBarOptions]);

  useEffect(() => {
    if (!focused) return;

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (isSearchActiveRef.current) {
          closeSearch();
          return true;
        }
        return false;
      },
    );

    return () => backHandler.remove();
  }, [focused, closeSearch]);

  return (
    <View
      style={[
        styles.searchContainer,
        { backgroundColor },
        isSearchActive && styles.searchContainer_active,
      ]}
    >
      <Appbar.Action
        icon="magnify"
        onPress={!isSearchActive ? openSearch : undefined}
        color={md3Colors.onSurfaceVariant}
      />
      <TextInput
        ref={searchTextInputRef}
        style={styles.searchTextInput}
        placeholder={headerSearchBarOptions?.placeholder || 'Search'}
        onChangeText={headerSearchBarOptions?.onChangeText}
      />
      <Appbar.Action
        icon="close"
        onPress={closeSearch}
        color={md3Colors.onSurfaceVariant}
      />
    </View>
  );
}

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
  searchContainer: {
    zIndex: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: 50,
    overflow: 'hidden',
  },
  searchContainer_active: {
    ...StyleSheet.absoluteFillObject,
    width: 'auto',
  },
  searchTextInput: {
    flex: 1,
  },
  hidden: {
    opacity: 0,
  },
});

export default HeaderMD3;
