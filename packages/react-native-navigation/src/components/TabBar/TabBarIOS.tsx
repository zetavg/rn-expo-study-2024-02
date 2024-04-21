import React from 'react';
import {
  Animated,
  type LayoutChangeEvent,
  Platform,
  ScrollView,
  type StyleProp,
  StyleSheet,
  useWindowDimensions,
  View,
  type ViewStyle,
} from 'react-native';
import type { EdgeInsets } from 'react-native-safe-area-context';
import {
  Screen,
  ScreenStack,
  ScreenStackHeaderConfig,
} from 'react-native-screens';
import { BottomTabBarHeightCallbackContext } from '@react-navigation/bottom-tabs';
import {
  getDefaultSidebarWidth,
  getLabel,
  MissingIcon,
} from '@react-navigation/elements';
import {
  CommonActions,
  NavigationContext,
  NavigationRouteContext,
  type ParamListBase,
  type TabNavigationState,
  useLinkBuilder,
} from '@react-navigation/native';
import Color from 'color';
import { BlurView } from 'expo-blur';

import { useColorScheme, useIOSUIColors } from '@rnstudy/react-native-ui';

import { BottomTabNavigationOptions } from '../../types';

import BottomTabItem from './components/TabItemIOS';
import { Props } from './TabBar';

const DEFAULT_TABBAR_HEIGHT = 49;
const COMPACT_TABBAR_HEIGHT = 32;
const DEFAULT_MAX_TAB_ITEM_WIDTH = 125;
const SPACING = 5;

const useNativeDriver = Platform.OS !== 'web';

type Options = {
  state: TabNavigationState<ParamListBase>;
  descriptors: Props['descriptors'];
  layout: { height: number; width: number };
  dimensions: { height: number; width: number };
};

const shouldUseHorizontalLabels = ({
  state,
  descriptors,
  layout,
  dimensions,
}: Options) => {
  const { tabBarLabelPosition } =
    descriptors[state.routes[state.index]?.key || '']?.options || {};

  if (tabBarLabelPosition) {
    switch (tabBarLabelPosition) {
      case 'beside-icon':
        return true;
      case 'below-icon':
        return false;
    }
  }

  if (layout.width >= 740) {
    // Screen size matches a tablet
    const maxTabWidth = state.routes.reduce((acc, route) => {
      const { tabBarItemStyle } = descriptors[route.key]?.options || {};
      const flattenedStyle = StyleSheet.flatten(tabBarItemStyle);

      if (flattenedStyle) {
        if (typeof flattenedStyle.width === 'number') {
          return acc + flattenedStyle.width;
        } else if (typeof flattenedStyle.maxWidth === 'number') {
          return acc + flattenedStyle.maxWidth;
        }
      }

      return acc + DEFAULT_MAX_TAB_ITEM_WIDTH;
    }, 0);

    return maxTabWidth <= layout.width;
  } else {
    return dimensions.width > dimensions.height;
  }
};

const getPaddingBottom = (insets: EdgeInsets) =>
  Math.max(insets.bottom - Platform.select({ ios: 4, default: 0 }), 0);

export const getTabBarHeight = ({
  state,
  descriptors,
  dimensions,
  insets,
  style,
  ...rest
}: Options & {
  insets: EdgeInsets;
  style: Animated.WithAnimatedValue<StyleProp<ViewStyle>> | undefined;
}) => {
  const flattenedStyle = StyleSheet.flatten(style);
  const customHeight =
    flattenedStyle && 'height' in flattenedStyle
      ? flattenedStyle.height
      : undefined;

  if (typeof customHeight === 'number') {
    return customHeight;
  }

  const isLandscape = dimensions.width > dimensions.height;
  const horizontalLabels = shouldUseHorizontalLabels({
    state,
    descriptors,
    dimensions,
    ...rest,
  });
  const paddingBottom = getPaddingBottom(insets);

  if (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    isLandscape &&
    horizontalLabels
  ) {
    return COMPACT_TABBAR_HEIGHT + paddingBottom;
  }

  return DEFAULT_TABBAR_HEIGHT + paddingBottom;
};

export function TabBarIOS({ state, navigation, descriptors, insets }: Props) {
  const colorScheme = useColorScheme();

  const iosUIColors = useIOSUIColors();
  // const { colors } = useTheme();
  const { buildHref } = useLinkBuilder();

  const focusedRoute = state.routes[state.index];
  const focusedDescriptor = descriptors[focusedRoute?.key || ''];
  const focusedOptions =
    focusedDescriptor?.options || ({} as BottomTabNavigationOptions);

  const {
    tabBarPosition = 'bottom',
    tabBarShowLabel,
    tabBarVisibilityAnimationConfig,
    tabBarStyle,
    tabBarActiveTintColor,
    tabBarInactiveTintColor,
    tabBarActiveBackgroundColor = tabBarPosition !== 'bottom' &&
    tabBarPosition !== 'top'
      ? Color(tabBarActiveTintColor ?? iosUIColors.tintColor)
          .alpha(0.12)
          .rgb()
          .string()
      : undefined,
    tabBarInactiveBackgroundColor,
  } = focusedOptions;

  // FIXME: useSafeAreaFrame doesn't update values when window is resized on Web
  const dimensions = useWindowDimensions();

  const onHeightChange = React.useContext(BottomTabBarHeightCallbackContext);

  const shouldShowTabBar = true;

  const visibilityAnimationConfigRef = React.useRef(
    tabBarVisibilityAnimationConfig,
  );

  React.useEffect(() => {
    visibilityAnimationConfigRef.current = tabBarVisibilityAnimationConfig;
  });

  const [isTabBarHidden, setIsTabBarHidden] = React.useState(!shouldShowTabBar);

  const [visible] = React.useState(
    () => new Animated.Value(shouldShowTabBar ? 1 : 0),
  );

  React.useEffect(() => {
    const visibilityAnimationConfig = visibilityAnimationConfigRef.current;

    if (shouldShowTabBar) {
      const animation =
        visibilityAnimationConfig?.show?.animation === 'spring'
          ? Animated.spring
          : Animated.timing;

      animation(visible, {
        toValue: 1,
        useNativeDriver,
        duration: 250,
        ...visibilityAnimationConfig?.show?.config,
      }).start(({ finished }) => {
        if (finished) {
          setIsTabBarHidden(false);
        }
      });
    } else {
      setIsTabBarHidden(true);

      const animation =
        visibilityAnimationConfig?.hide?.animation === 'spring'
          ? Animated.spring
          : Animated.timing;

      animation(visible, {
        toValue: 0,
        useNativeDriver,
        duration: 200,
        ...visibilityAnimationConfig?.hide?.config,
      }).start();
    }

    return () => visible.stopAnimation();
  }, [visible, shouldShowTabBar]);

  const [layout, setLayout] = React.useState({
    height: 0,
    width: dimensions.width,
  });

  const handleLayout = (e: LayoutChangeEvent) => {
    const { height, width } = e.nativeEvent.layout;

    onHeightChange?.(height);

    setLayout((l) => {
      if (height === l.height && width === l.width) {
        return l;
      } else {
        return {
          height,
          width,
        };
      }
    });
  };

  const { routes } = state;

  const paddingBottom = getPaddingBottom(insets);
  const tabBarHeight = getTabBarHeight({
    state,
    descriptors,
    insets,
    dimensions,
    layout,
    style: [tabBarStyle],
  });

  const hasHorizontalLabels = shouldUseHorizontalLabels({
    state,
    descriptors,
    dimensions,
    layout,
  });

  const tabBarIsHorizontal =
    tabBarPosition === 'bottom' || tabBarPosition === 'top';

  const tabItems: React.ReactNode = routes.map((route, index) => {
    const focused = index === state.index;
    const { options = {} as BottomTabNavigationOptions } =
      descriptors[route.key] || {};

    const { tabButtonMenu } = options as BottomTabNavigationOptions;

    const onPress = () => {
      const event = navigation.emit({
        type: 'tabPress',
        target: route.key,
        canPreventDefault: true,
      });

      if (!focused && !event.defaultPrevented) {
        navigation.dispatch({
          ...CommonActions.navigate(route),
          target: state.key,
        });
      }
    };

    const onLongPress = () => {
      navigation.emit({
        type: 'tabLongPress',
        target: route.key,
      });
    };

    const label =
      typeof options.tabBarLabel === 'function'
        ? options.tabBarLabel
        : getLabel(
            { label: options.tabBarLabel, title: options.title },
            route.name,
          );

    const accessibilityLabel =
      options.tabBarAccessibilityLabel !== undefined
        ? options.tabBarAccessibilityLabel
        : typeof label === 'string' && Platform.OS === 'ios'
          ? `${label}, tab, ${index + 1} of ${routes.length}`
          : undefined;

    return (
      <NavigationContext.Provider
        key={route.key}
        value={descriptors[route.key]?.navigation}
      >
        <NavigationRouteContext.Provider value={route}>
          <BottomTabItem
            href={buildHref(route.name, route.params)}
            route={route}
            descriptor={
              descriptors[route.key] as NonNullable<
                (typeof descriptors)[string]
              >
            }
            focused={focused}
            horizontal={hasHorizontalLabels}
            onPress={onPress}
            onLongPress={onLongPress}
            accessibilityLabel={accessibilityLabel}
            testID={options.tabBarButtonTestID}
            allowFontScaling={options.tabBarAllowFontScaling}
            activeTintColor={tabBarActiveTintColor}
            inactiveTintColor={tabBarInactiveTintColor}
            activeBackgroundColor={tabBarActiveBackgroundColor}
            inactiveBackgroundColor={tabBarInactiveBackgroundColor}
            button={options.tabBarButton}
            icon={
              options.tabBarIcon ??
              // eslint-disable-next-line react/no-unstable-nested-components
              (({ color, size }) => <MissingIcon color={color} size={size} />)
            }
            badge={options.tabBarBadge}
            badgeStyle={options.tabBarBadgeStyle}
            label={label}
            showLabel={tabBarShowLabel}
            labelStyle={options.tabBarLabelStyle}
            iconStyle={options.tabBarIconStyle}
            containerStyle={
              tabBarIsHorizontal ? styles.bottomItemContainer : undefined
            }
            style={[
              tabBarIsHorizontal
                ? undefined
                : [
                    styles.sideItem,
                    hasHorizontalLabels
                      ? { justifyContent: 'flex-start' }
                      : null,
                  ],
              options.tabBarItemStyle,
            ]}
            longPressMenuItems={tabButtonMenu}
          />
        </NavigationRouteContext.Provider>
      </NavigationContext.Provider>
    );
  });

  const tabBarBackgroundElement = tabBarIsHorizontal ? (
    <BlurView
      tint={colorScheme}
      intensity={100}
      style={StyleSheet.absoluteFill}
    />
  ) : null;

  return (
    <Animated.View
      style={[
        tabBarPosition === 'left'
          ? styles.start
          : tabBarPosition === 'right'
            ? styles.end
            : styles.bottom,
        {
          backgroundColor: tabBarIsHorizontal
            ? undefined
            : iosUIColors.systemBackground,
          borderColor: iosUIColors.separator,
        },
        tabBarIsHorizontal
          ? [
              {
                transform: [
                  {
                    translateY: visible.interpolate({
                      inputRange: [0, 1],
                      outputRange: [
                        layout.height +
                          paddingBottom +
                          StyleSheet.hairlineWidth,
                        0,
                      ],
                    }),
                  },
                ],
                // Absolutely position the tab bar so that the content is below it
                // This is needed to avoid gap at bottom when the tab bar is hidden
                position: isTabBarHidden ? 'absolute' : undefined,
              },
              {
                height: tabBarHeight,
                paddingBottom,
                paddingHorizontal: Math.max(insets.left, insets.right),
              },
            ]
          : {
              minWidth: hasHorizontalLabels
                ? Math.min(getDefaultSidebarWidth(dimensions), 320)
                : undefined,
            },
        tabBarStyle,
      ]}
      pointerEvents={isTabBarHidden ? 'none' : 'auto'}
      onLayout={tabBarIsHorizontal ? handleLayout : undefined}
    >
      {(() => {
        if (tabBarIsHorizontal) {
          return (
            <>
              <View pointerEvents="none" style={StyleSheet.absoluteFill}>
                {tabBarBackgroundElement}
              </View>
              <View
                accessibilityRole="tablist"
                style={
                  tabBarIsHorizontal ? styles.bottomContent : styles.sideContent
                }
              >
                {tabItems}
              </View>
            </>
          );
        }

        return (
          <>
            <ScreenStack style={styles.flex1}>
              <Screen isNativeStack style={StyleSheet.absoluteFill}>
                <ScrollView contentInsetAdjustmentBehavior="automatic">
                  {tabItems}
                </ScrollView>
                <ScreenStackHeaderConfig
                  largeTitle
                  title="TODO: Side Tab Bar Title"
                />
              </Screen>
            </ScreenStack>
          </>
        );
      })()}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  start: {
    top: 0,
    bottom: 0,
    start: 0,
    borderEndWidth: StyleSheet.hairlineWidth,
  },
  end: {
    top: 0,
    bottom: 0,
    end: 0,
    borderStartWidth: StyleSheet.hairlineWidth,
  },
  bottom: {
    start: 0,
    end: 0,
    bottom: 0,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  bottomContent: {
    flex: 1,
    flexDirection: 'row',
  },
  sideContent: {
    flex: 1,
    flexDirection: 'column',
    padding: SPACING,
  },
  bottomItemContainer: {
    flex: 1,
  },
  sideItem: {
    margin: SPACING,
    padding: SPACING * 2,
    borderRadius: 4,
  },
});

export default TabBarIOS;
