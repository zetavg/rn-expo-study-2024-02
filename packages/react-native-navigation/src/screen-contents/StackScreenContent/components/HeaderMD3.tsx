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
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import { Appbar } from 'react-native-paper';
// import { DEFAULT_APPBAR_HEIGHT } from 'react-native-paper/src/components/Appbar/utils';
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import {
  RNTextInput,
  SegmentedControlProps,
  SegmentedControlPropsContextProvider,
  TextInput,
  useColorScheme,
  useMD3Colors,
  withLayoutAnimation,
} from '@rnstudy/react-native-ui';

import { Props } from './Header';

export const HeaderMD3 = memo(function HeaderMD3({
  title,
  showHeader = true,
  headerBackgroundTransparent,
  headerTitleContent,
  headerLeadingContent,
  headerTrailingContent,
  headerSearchBarOptions,
  onLayout,
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
      onLayout?.(event);
    },
    [headerWidthAnim, onLayout],
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

  const route = useRoute();
  const firstRoute = navigation.getState()?.routes[0];
  const canGoBack = useMemo(
    () => route.key !== firstRoute?.key,
    [firstRoute?.key, route.key],
  );

  if (!showHeader) return null;

  const headerSearchBarEnabled =
    headerSearchBarOptions && headerSearchBarOptions.enable !== false;

  return (
    <Appbar.Header
      dark={colorScheme === 'dark'}
      mode="small"
      elevated={!headerBackgroundTransparent}
      style={
        headerBackgroundTransparent
          ? styles.transparentHeader
          : { backgroundColor }
      }
      onLayout={handleAppBarLayout}
    >
      {(() => {
        if (headerLeadingContent) {
          return headerLeadingContent;
        }

        if (canGoBack) {
          return (
            <Appbar.BackAction
              onPress={navigation.goBack}
              color={md3Colors.onSurface}
            />
          );
        }
      })()}
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

  const [searchInputValue, setSearchInputValue] = useState('');

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
    headerSearchBarOptions?.onCancelButtonPress?.();
    setSearchInputValue('');
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

  const handleChangeText = useCallback(
    (text: string) => {
      setSearchInputValue(text);
      headerSearchBarOptions?.onChangeText?.(text);
    },
    [headerSearchBarOptions],
  );

  const showSearchInput = isSearchActive || !!headerSearchBarOptions?.mandatory;

  return (
    <View
      style={[
        styles.searchContainer,
        { backgroundColor },
        showSearchInput && styles.searchContainer_show,
      ]}
    >
      <Appbar.Action
        icon="magnify"
        onPress={!showSearchInput ? openSearch : undefined}
        color={md3Colors.onSurfaceVariant}
      />
      <TextInput
        ref={searchTextInputRef}
        style={styles.searchTextInput}
        placeholder={headerSearchBarOptions?.placeholder || 'Search'}
        value={searchInputValue}
        onChangeText={handleChangeText}
        autoCapitalize={headerSearchBarOptions?.autoCapitalize}
        onFocus={headerSearchBarOptions?.onFocus}
        onBlur={headerSearchBarOptions?.onBlur}
      />
      {(!headerSearchBarOptions?.mandatory || !!searchInputValue) && (
        <Appbar.Action
          icon="close"
          onPress={closeSearch}
          color={md3Colors.onSurfaceVariant}
        />
      )}
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
  searchContainer_show: {
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
