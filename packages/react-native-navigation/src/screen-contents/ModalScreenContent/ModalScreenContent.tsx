import React, { forwardRef, useMemo } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import * as iosColors from '@rnstudy/ios-colors';

import { NavigationConfig } from '../../types';
import bottomTabPressReactive from '../bottomTabPressReactive';
import { useContentInset } from '../hooks';

import dismissible from './dismissible';

export type Props = {
  title: string;
  /** Specify a custom background color. */
  backgroundColor?: string;
  children: React.ReactNode;
};

export function getModalScreenContentComponent(config: NavigationConfig) {
  const { useColorScheme } = config;

  function ModalScreenContent({
    title,
    backgroundColor: backgroundColorProp,
    children,
  }: Props) {
    /**
     * This navigator is only used to render native styled stack navigator header.
     */
    const Stack = createNativeStackNavigator();

    const colorScheme = useColorScheme();

    const backgroundColor = useMemo(() => {
      if (backgroundColorProp) return backgroundColorProp;
      switch (Platform.OS) {
        default:
        case 'ios':
          return iosColors[colorScheme].uiColors.systemGroupedBackground;
      }
    }, [backgroundColorProp, colorScheme]);

    const screenOptions = useMemo<
      React.ComponentProps<
        ReturnType<typeof createNativeStackNavigator>['Navigator']
      >['screenOptions']
    >(
      () => ({
        ...(Platform.OS === 'ios'
          ? {
              headerTitleStyle: {
                color: iosColors[colorScheme].uiColors.label,
              },
              // Blur effect.
              headerTransparent: true,
              headerBlurEffect: colorScheme,
              headerShadowVisible: true,
              // Set a close-to-transparent background to make `headerShadowVisible: true` work.
              // See: https://github.com/react-navigation/react-navigation/issues/10845#issuecomment-1276312567
              headerStyle: { backgroundColor: 'rgba(255, 255, 255, 0.002)' },

              headerLargeTitleShadowVisible: false,
              headerLargeStyle: {
                // There's no way to set the background color of the large title header as transparent, so we need to set it to the same color as the background here
                backgroundColor,
              },
            }
          : {}),
      }),
      [colorScheme, backgroundColor],
    );

    return (
      <Stack.Navigator
        // FIXME
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        id={'modal-screen-content-navigator' as any}
        screenOptions={screenOptions}
      >
        <Stack.Screen name="ModalScreenContent" options={{ title }}>
          {() => (
            <View style={[styles.modalScreenContent, { backgroundColor }]}>
              {children}
            </View>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    );
  }

  ModalScreenContent.ScrollView = forwardRef<
    typeof DismissibleScrollView extends React.ForwardRefExoticComponent<
      React.RefAttributes<infer C>
    >
      ? C
      : never,
    React.ComponentProps<typeof DismissibleScrollView>
  >(function ModalScreenContentScrollView(
    props: React.ComponentProps<typeof DismissibleScrollView>,
    ref,
  ) {
    const contentInset = useContentInset(props.contentInset);

    return (
      <BottomTabPressReactiveAndDismissibleScrollView
        ref={ref}
        {...props}
        keyboardDismissMode="interactive"
        keyboardShouldPersistTaps="handled"
        automaticallyAdjustKeyboardInsets
        // For `headerLargeTitle` to work. See: https://reactnavigation.org/docs/7.x/native-stack-navigator#headerlargetitle
        contentInsetAdjustmentBehavior="automatic"
        contentInset={contentInset}
        scrollIndicatorInsets={contentInset}
      />
    );
  });

  return ModalScreenContent;
}

const DismissibleScrollView = dismissible(ScrollView);
const BottomTabPressReactiveAndDismissibleScrollView = bottomTabPressReactive(
  DismissibleScrollView,
);

const styles = StyleSheet.create({
  modalScreenContent: {
    flex: 1,
  },
});

export default getModalScreenContentComponent;
