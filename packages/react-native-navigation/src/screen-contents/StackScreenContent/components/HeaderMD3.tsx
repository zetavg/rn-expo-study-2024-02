import React, {
  memo,
  useCallback,
  useContext,
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
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { Appbar } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
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

import { ModalContentContext } from '../../contexts';

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

  const headerWidthRef = useRef(1024);
  const headerTitleContentContainerXRef = useRef(0);
  const headerTitleContentContainerWidthRef = useRef(1024);

  const headerCenterAlignedTitleContentMaxWidthAnim = useRef(
    new Animated.Value(1024),
  ).current;

  const updateHeaderCenterAlignedTitleContentMaxWidthAnim = useCallback(() => {
    const leadingSpace = headerTitleContentContainerXRef.current;
    const trailingSpace =
      headerWidthRef.current -
      headerTitleContentContainerWidthRef.current -
      leadingSpace;
    const maxSpace = Math.max(leadingSpace, trailingSpace);
    headerCenterAlignedTitleContentMaxWidthAnim.setValue(
      headerWidthRef.current - (maxSpace + 16) * 2,
    );
  }, [headerCenterAlignedTitleContentMaxWidthAnim]);

  const handleAppBarLayout = useCallback(
    (event: LayoutChangeEvent) => {
      headerWidthRef.current = event.nativeEvent.layout.width;
      updateHeaderCenterAlignedTitleContentMaxWidthAnim();
      onLayout?.(event);
    },
    [onLayout, updateHeaderCenterAlignedTitleContentMaxWidthAnim],
  );

  const handleHeaderTitleContentContainerLayout = useCallback(
    (event: LayoutChangeEvent) => {
      headerTitleContentContainerXRef.current = event.nativeEvent.layout.x;
      headerTitleContentContainerWidthRef.current =
        event.nativeEvent.layout.width;
      updateHeaderCenterAlignedTitleContentMaxWidthAnim();
    },
    [updateHeaderCenterAlignedTitleContentMaxWidthAnim],
  );

  // const headerTitleContentContainerMaxWidthAnim = useRef(
  //   Animated.subtract(
  //     headerWidthAnim,
  //     Animated.multiply(headerTitleContentContainerXAnim, 2),
  //   ),
  // ).current;

  const route = useRoute();
  const firstRoute = navigation.getState()?.routes[0];
  const canGoBack = useMemo(
    () => route.key !== firstRoute?.key,
    [firstRoute?.key, route.key],
  );

  const modalContentContextValue = useContext(ModalContentContext);
  const safeAreaInsets = useSafeAreaInsets();

  if (!showHeader) return null;

  const headerSearchBarEnabled =
    headerSearchBarOptions && headerSearchBarOptions.enable !== false;

  if (!headerLeadingContent) {
    if (canGoBack) {
      headerLeadingContent = (
        <Appbar.BackAction
          onPress={navigation.goBack}
          color={md3Colors.onSurface}
        />
      );
    } else if (modalContentContextValue) {
      headerLeadingContent = (
        <Appbar.Action
          icon="close"
          onPress={navigation.goBack}
          color={md3Colors.onSurface}
        />
      );
    }
  }

  const centerAligned = !!modalContentContextValue;

  function getHeaderTitleContent({
    style,
    onLayout: ol,
  }: {
    style?: StyleProp<ViewStyle>;
    onLayout?: ((event: LayoutChangeEvent) => void) | undefined;
  }) {
    return !headerTitleContent ? (
      <Appbar.Content
        title={title}
        color={md3Colors.onSurface}
        style={[style]}
        onLayout={ol}
      />
    ) : (
      <View style={[styles.headerTitleContentContainer, style]} onLayout={ol}>
        <Animated.View style={[styles.headerTitleContentInnerContainer, style]}>
          <SegmentedControlPropsContextProvider
            value={HEADER_SEGMENTED_CONTROL_PROPS}
          >
            {headerTitleContent}
          </SegmentedControlPropsContextProvider>
        </Animated.View>
      </View>
    );
  }

  return (
    <Appbar.Header
      dark={colorScheme === 'dark'}
      mode={centerAligned ? 'center-aligned' : 'small'}
      elevated={!headerBackgroundTransparent}
      style={[
        headerBackgroundTransparent
          ? styles.transparentHeader
          : { backgroundColor },
        !!modalContentContextValue && { marginTop: -safeAreaInsets.top },
      ]}
      onLayout={handleAppBarLayout}
    >
      {headerLeadingContent}
      {getHeaderTitleContent({
        onLayout: handleHeaderTitleContentContainerLayout,
        style: centerAligned
          ? styles.headerTitleContentContainer_centerAlignedPlaceholder
          : undefined,
      })}
      {centerAligned && (
        <View
          style={styles.headerTitleContentContainer_centerAligned_outerWrapper}
        >
          <Animated.View
            style={[
              styles.headerTitleContentContainer_centerAligned_innerWrapper,
              { maxWidth: headerCenterAlignedTitleContentMaxWidthAnim },
            ]}
          >
            {getHeaderTitleContent({
              style: styles.headerTitleContentContainer_centerAligned,
            })}
          </Animated.View>
        </View>
      )}
      {headerSearchBarEnabled && (
        <HeaderSearch
          headerSearchBarOptions={headerSearchBarOptions}
          backgroundColor={backgroundColor}
          headerTrailingContent={headerTrailingContent}
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
  headerTrailingContent,
}: {
  headerSearchBarOptions: Props['headerSearchBarOptions'];
  backgroundColor: string;
  headerTrailingContent: Props['headerTrailingContent'];
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

  const showSearchInput = isSearchActive || !!headerSearchBarOptions?.primary;

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
      {(!headerSearchBarOptions?.primary || !!searchInputValue) && (
        <Appbar.Action
          icon="close"
          onPress={closeSearch}
          color={md3Colors.onSurfaceVariant}
        />
      )}
      {headerSearchBarOptions?.primary && (
        <View style={styles.searchBarTrailingContentContainer}>
          {headerTrailingContent}
        </View>
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
  headerLeadingAndTrailingContentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerLeadingContentContainer: {
    justifyContent: 'flex-start',
  },
  headerTrailingContentContainer: {
    justifyContent: 'flex-end',
  },
  headerTitleContentContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  headerTitleContentContainer_centerAlignedPlaceholder: {
    opacity: 0,
  },
  headerTitleContentContainer_centerAligned: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitleContentContainer_centerAligned_outerWrapper: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitleContentContainer_centerAligned_innerWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
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
  searchBarTrailingContentContainer: {
    paddingEnd: 4,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

export default HeaderMD3;
