import React, {
  memo,
  useCallback,
  useContext,
  useLayoutEffect,
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
import { SearchBarProps as RNScreensSearchBarProps } from 'react-native-screens';
import { useNavigation, useRoute } from '@react-navigation/native';

import {
  SegmentedControlProps,
  SegmentedControlPropsContextProvider,
  useBackgroundColor,
  useColorScheme,
  useIOSUIColors,
  useIsElevatedBackground,
} from '@rnstudy/react-native-ui';
import { NavigationBarCloseButton } from '@rnstudy/react-native-ui-ios';
import { getPerformanceEyeAttractorDummyComponent } from '@rnstudy/react-utils';

import {
  getHeaderTitleStyleIOS,
  getScreenOptionsForHeaderBackgroundAndBorderIOS,
} from '../../../hooks/useStackNavigatorScreenOptions';
import { ModalContentContext } from '../../contexts';
import HeaderControlButton from '../../HeaderControlButton';

import type { Props } from './Header';

const HeaderIOSPerformanceEyeAttractorDummyComponent =
  getPerformanceEyeAttractorDummyComponent({
    impact: 3,
    message:
      'The the actual work of the HeaderIOS component is done in useLayoutEffect, which calls navigation.setOptions and will cause the navigation to re-render.',
  });

export const HeaderIOS = memo(function HeaderIOS({
  title,
  showHeader,
  headerBackgroundTransparent,
  headerTitleVisible,
  headerLargeTitle,
  headerBackTitle,
  headerBackTitleVisible,
  modalCloseButtonType,
  modalCloseTitle,
  headerTitleContent,
  headerLeadingContent,
  headerTrailingContent,
  headerSearchBarOptions,
  grouped,
  elevatedBg,
}: Props) {
  const navigation = useNavigation();
  const route = useRoute();

  const { fontScale } = useWindowDimensions();

  const colorScheme = useColorScheme();
  const backgroundColor = useBackgroundColor({
    grouped,
    elevated: useIsElevatedBackground() || elevatedBg,
  });
  const iosUIColors = useIOSUIColors();

  const headerSearchBarEnabled =
    headerSearchBarOptions && headerSearchBarOptions.enable !== false;

  const modalContentContextValue = useContext(ModalContentContext);
  const isFirstScreenInStack =
    route.key === navigation.getState()?.routes[0]?.key;
  const isFirstScreenInModal =
    !!modalContentContextValue && isFirstScreenInStack;

  if (isFirstScreenInModal) {
    const getCloseButton = (
      props?: Partial<React.ComponentProps<typeof HeaderControlButton>>,
    ) => {
      switch (modalCloseButtonType) {
        case 'done': {
          return (
            <HeaderControlButton
              label={modalCloseTitle || 'Done' /* TODO: I18n. */}
              primary
              onPress={navigation.goBack}
              {...props}
            />
          );
        }
        case 'cancel': {
          return (
            <HeaderControlButton
              label={modalCloseTitle || 'Cancel' /* TODO: I18n. */}
              onPress={navigation.goBack}
              {...props}
            />
          );
        }
        case 'close':
        default: {
          if (modalCloseTitle) {
            return (
              <HeaderControlButton
                label={modalCloseTitle}
                primary
                onPress={navigation.goBack}
                {...props}
              />
            );
          }

          return <NavigationBarCloseButton onPress={navigation.goBack} />;
        }
      }
    };

    if (!headerTrailingContent) {
      headerTrailingContent = getCloseButton();
    } else if (!headerLeadingContent) {
      headerLeadingContent = getCloseButton({
        // The close button should always be considered non-primary if placed on the leading side, as by convention, the primary button should be on the trailing side.
        primary: false,
      });
    }
  }

  useLayoutEffect(() => {
    const processedHeaderSearchBarOptions: RNScreensSearchBarProps | undefined =
      headerSearchBarEnabled
        ? {
            ...headerSearchBarOptions,
            onChangeText: headerSearchBarOptions.onChangeText
              ? (e) => {
                  headerSearchBarOptions?.onChangeText?.(e.nativeEvent.text);
                }
              : undefined,
            tintColor: iosUIColors.tintColor,
            hideWhenScrolling: headerSearchBarOptions.primary
              ? false
              : headerSearchBarOptions.hideWhenScrolling ?? true,
          }
        : undefined;

    navigation.setOptions({
      title,
      headerShown: showHeader ?? true,

      // Handle `headerBackgroundTransparent`.
      ...(() => {
        if (headerBackgroundTransparent)
          return {
            headerTransparent: true,
            headerBlurEffect: null,
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: 'transparent',
            },
          };

        return getScreenOptionsForHeaderBackgroundAndBorderIOS({ colorScheme });
      })(),

      // Handle `headerTitleVisible`.
      ...(() => {
        if (headerTitleVisible)
          return {
            headerTitleStyle: getHeaderTitleStyleIOS({
              iosUIColors,
              fontScale,
            }),
          };

        return {
          headerTitleStyle: { color: 'transparent' },
        };
      })(),

      // Handle `headerLargeTitle`.
      ...(() => {
        if (Platform.OS !== 'ios') return {};

        return {
          headerLargeTitle,
          // There's no way to set the background color of the large title header as transparent, so we need to set it to the same color as the background here
          headerLargeStyle: { backgroundColor },
        };
      })(),

      headerBackTitle: headerBackTitle || ' ',
      headerBackTitleVisible,

      headerTitle: headerTitleContent
        ? () => (
            <View style={styles.headerTitleContentContainer}>
              <SegmentedControlPropsContextProvider
                value={HEADER_SEGMENTED_CONTROL_PROPS}
              >
                {headerTitleContent}
              </SegmentedControlPropsContextProvider>
            </View>
          )
        : undefined,
      headerLeft: headerLeadingContent
        ? () => (
            <HeaderLeadingContentContainer>
              {headerLeadingContent}
            </HeaderLeadingContentContainer>
          )
        : undefined,
      headerRight: headerTrailingContent
        ? () => (
            <HeaderTrailingContentContainer>
              {headerTrailingContent}
            </HeaderTrailingContentContainer>
          )
        : undefined,

      headerSearchBarOptions: processedHeaderSearchBarOptions,
    });
  }, [
    backgroundColor,
    colorScheme,
    headerBackTitle,
    headerBackTitleVisible,
    headerBackgroundTransparent,
    headerLargeTitle,
    headerSearchBarEnabled,
    headerSearchBarOptions,
    headerTitleContent,
    headerTitleVisible,
    headerLeadingContent,
    headerTrailingContent,
    iosUIColors,
    navigation,
    showHeader,
    title,
    fontScale,
  ]);

  // On iOS, we rely on react-navigation to render the header natively, so nothing is actually rendered here.
  return __DEV__ ? <HeaderIOSPerformanceEyeAttractorDummyComponent /> : null;
});

HeaderIOS.displayName = 'StackScreenContent/Header_IOS';

function HeaderTrailingContentContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const { fontScale } = useWindowDimensions();

  /** The content of headerRight will have trouble laying out in the correct position if it's rendered with a larger width before and has been re-rendered with a smaller width. To workaround this, we need to keep track of the maximum width that has been rendered and set the minWidth of the container to that value. */
  const minWidthAnim = useRef(new Animated.Value(0)).current;
  const maxRenderedWidthRef = React.useRef<number>(0);

  const handleLayout = useCallback(
    (event: LayoutChangeEvent) => {
      const { width } = event.nativeEvent.layout;

      if (width <= maxRenderedWidthRef.current) return;

      minWidthAnim.setValue(width);
      maxRenderedWidthRef.current = width;
    },
    [maxRenderedWidthRef, minWidthAnim],
  );

  return (
    <Animated.View
      onLayout={handleLayout}
      style={[
        styles.headerLeadingAndTrailingContentContainer,
        styles.headerTrailingContentContainer,
        {
          minWidth: minWidthAnim,
          gap: 28 * Math.max(fontScale, 1),
        },
      ]}
    >
      {children}
    </Animated.View>
  );
}

function HeaderLeadingContentContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const { fontScale } = useWindowDimensions();

  return (
    <View
      style={[
        styles.headerLeadingAndTrailingContentContainer,
        styles.headerLeadingContentContainer,
        {
          gap: 28 * Math.max(fontScale, 1),
        },
      ]}
    >
      {children}
    </View>
  );
}

const HEADER_SEGMENTED_CONTROL_PROPS: Partial<SegmentedControlProps<string>> = {
  height: 28,
  emphasizeSelectedText: true,
};

const styles = StyleSheet.create({
  headerTitleContentContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerLeadingAndTrailingContentContainer: {
    alignSelf: 'center',
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTrailingContentContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end', // Should change to 'flex-start' if flexDirection is set to 'row-reverse'.
  },
  headerLeadingContentContainer: {},
});

export default HeaderIOS;
