import React, { useMemo } from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator as rnCreateBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Icon, IconName } from '@rnstudy/react-icons';
import {
  configureNextLayoutAnimation,
  useBackgroundColor,
  useDebouncedWindowDimensions,
  useUIPlatform,
} from '@rnstudy/react-native-ui';

import TabBar from './components/TabBar';
import { TabBarPositionContext } from './contexts/TabBarPositionContext';
import { TabContentEventContextProvider } from './contexts/TabContentEventContext';
import { BottomTabNavigationContext } from './screen-contents/contexts';
import {
  BottomTabNavigationOptions,
  GeneratedBottomTabNavigator,
  GeneratedBottomTabNavigatorProps,
  TabContentEventSenderRef,
} from './types';

const LARGE_SCREEN_WIDTH = 747;
const SIDE_TAB_BAR_POSITION = 'left' as const;

export type BottomTabNavigatorScreenDefinition = {
  screen: React.ComponentType;
  title: string;
  icon:
    | IconName
    | ((props: {
        uiPlatform: ReturnType<typeof useUIPlatform>;
        focused: boolean;
        color: string;
        size: number;
      }) => React.ReactNode);
  options?: BottomTabNavigationOptions;
};

export type AnyBottomTabNavigatorScreens = Record<
  string,
  BottomTabNavigatorScreenDefinition
>;

/**
 * Creates a pre-configured bottom-tab navigator.
 */
export function createBottomTabNavigator<
  ID extends string,
  S extends AnyBottomTabNavigatorScreens,
>({
  id,
  screens,
  shiftingTabBar = false,
  responsive = false,
}: {
  /** The ID of the navigator. It should be unique within the app. */
  id: ID;
  /** Screens in the navigator. */
  screens: S;
  /* Whether the shifting style is used on the tab bar: the active tab icon shifts up to show the label and the inactive tabs won't have a label. Only works on MD3. */
  shiftingTabBar?: boolean;
  /**
   * Position the tab bar at the left side of the screen on large screens on iOS.
   *
   * @experimental This is still under development.
   */
  responsive?: boolean;
}): GeneratedBottomTabNavigator<ID, S> {
  const BottomTab = rnCreateBottomTabNavigator();

  const navigator: Partial<GeneratedBottomTabNavigator<ID, S>> =
    function BottomTabNavigator({
      tabButtonMenus,
    }: GeneratedBottomTabNavigatorProps<S>) {
      const backgroundColor = useBackgroundColor({
        grouped: undefined,
      });
      const windowDimensions = useDebouncedWindowDimensions(200);
      const windowWidth = windowDimensions.width;
      const windowWidthRef = React.useRef(windowWidth);
      if (windowWidthRef.current !== windowWidth) {
        configureNextLayoutAnimation();
        windowWidthRef.current = windowWidth;
      }

      const tabBarOnSide = responsive && windowWidth >= LARGE_SCREEN_WIDTH;

      const screenOptions = useMemo<
        React.ComponentProps<
          ReturnType<typeof rnCreateBottomTabNavigator>['Navigator']
        >['screenOptions']
      >(
        () => ({
          headerShown: false,
          ...(tabBarOnSide
            ? { tabBarPosition: SIDE_TAB_BAR_POSITION }
            : { tabBarPosition: 'bottom' }),
          ...(() => {
            switch (Platform.OS) {
              case 'ios': {
                return {
                  tabBarStyle: {
                    position: !tabBarOnSide ? 'absolute' : 'relative',
                  },
                };
              }

              default:
                return {};
            }
          })(),
        }),
        [tabBarOnSide],
      );

      return (
        <TabBarPositionContext.Provider
          value={tabBarOnSide ? SIDE_TAB_BAR_POSITION : 'bottom'}
        >
          <BottomTab.Navigator
            // FIXME
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            id={id as any}
            screenOptions={screenOptions}
            tabBar={(props) => <TabBar {...props} shifting={shiftingTabBar} />}
            // Do not let the tab navigator handle `goBack` events and back button press.
            backBehavior="none"
            // Although the scene will be filled with opaque elements and this background color will not be visible in most cases, setting a background color here will prevent flashes of the default light background color when switching to a lazy-loaded screen.
            sceneContainerStyle={{ backgroundColor }}
          >
            {useMemo(
              () =>
                Object.entries(screens).map(
                  ([name, { screen: Screen, title, icon, options }]) => {
                    const eventSenderRef: TabContentEventSenderRef = {};
                    const tabButtonMenuOrFn = tabButtonMenus?.[name];

                    const tabButtonMenu =
                      typeof tabButtonMenuOrFn === 'function'
                        ? tabButtonMenuOrFn({ eventSenderRef })
                        : tabButtonMenuOrFn;

                    return (
                      <BottomTab.Screen
                        key={name}
                        name={name}
                        options={{
                          title,
                          tabBarIcon:
                            typeof icon === 'string'
                              ? (props) => <Icon name={icon} {...props} />
                              : (props) => (
                                  <WithUIPlatform>
                                    {(uiPlatform) =>
                                      icon({
                                        ...props,
                                        uiPlatform,
                                      })
                                    }
                                  </WithUIPlatform>
                                ),
                          ...options,
                          ...(tabButtonMenu ? { tabButtonMenu } : {}),
                        }}
                      >
                        {(props) => (
                          <TabContentEventContextProvider
                            eventSenderRef={eventSenderRef}
                          >
                            {
                              <BottomTabNavigationContext.Provider
                                value={props.navigation}
                              >
                                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                <Screen {...(props as any)} />
                              </BottomTabNavigationContext.Provider>
                            }
                          </TabContentEventContextProvider>
                        )}
                      </BottomTab.Screen>
                    );
                  },
                ),
              [tabButtonMenus],
            )}
          </BottomTab.Navigator>
        </TabBarPositionContext.Provider>
      );
    };

  navigator._id = id;
  navigator._screens = screens;

  return navigator as GeneratedBottomTabNavigator<ID, S>;
}

function WithUIPlatform({
  children,
}: {
  children: (uiPlatform: ReturnType<typeof useUIPlatform>) => React.ReactNode;
}) {
  const uiPlatform = useUIPlatform();
  return children(uiPlatform);
}

export default createBottomTabNavigator;
