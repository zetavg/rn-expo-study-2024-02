import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import {
  AVAILABLE_UI_PLATFORMS,
  BackgroundColor,
  SegmentedControl,
  SeparatorColor,
  Switch,
  Text,
  UIContextProvider,
  UIPlatform,
} from '@rnstudy/react-native-ui';
import { StoryParameters } from '@rnstudy/storybook-rn-types';

import { ControlsState } from './types';

export type Props = {
  value: ControlsState;
  onValueChange: (value: ControlsState) => void;
  parameters: StoryParameters;
};

export function StoryContainerControls(props: Props) {
  const { uiPlatform, colorScheme } = props.value;

  return (
    <View style={styles.rootContainer}>
      <UIContextProvider
        colorScheme={colorScheme || 'light'}
        platform={uiPlatform}
      >
        <StoryContainerControlsWithoutContext {...props} />
      </UIContextProvider>
    </View>
  );
}

export function StoryContainerControlsWithoutContext({
  value,
  onValueChange,
  parameters,
}: Props) {
  const { specOverlay } = parameters;

  return (
    <BackgroundColor grouped={false}>
      {(backgroundColor) => (
        <SeparatorColor opaque>
          {(separatorColor) => (
            <View
              style={[
                styles.previewControls,
                { borderColor: separatorColor },
                { backgroundColor },
              ]}
            >
              <ScrollView
                horizontal
                alwaysBounceHorizontal={false}
                contentContainerStyle={styles.previewControlsContent}
              >
                {AVAILABLE_UI_PLATFORMS.length > 1 && (
                  <View style={styles.previewControlGroup}>
                    <Text
                      allowFontScaling={false}
                      color="secondaryVariant"
                      style={[styles.previewControlLabelText]}
                    >
                      UI Platform
                    </Text>
                    <SegmentedControl
                      size="small"
                      options={
                        Object.fromEntries(
                          AVAILABLE_UI_PLATFORMS.map((p) => [
                            p,
                            (() => {
                              switch (p as string) {
                                case 'ios':
                                  return 'iOS';
                                case 'md3':
                                  return 'MD3';
                                case 'web':
                                  return 'Web';
                                case 'android':
                                  return 'MD3';
                                default:
                                  return p;
                              }
                            })(),
                          ]),
                        ) as { [key in UIPlatform]: string }
                      }
                      value={value.uiPlatform}
                      onValueChange={(v) => {
                        onValueChange({ ...value, uiPlatform: v });
                      }}
                      disableAdvancedAutoSizing
                    />
                  </View>
                )}

                <View style={styles.previewControlGroup}>
                  <Text
                    allowFontScaling={false}
                    color="secondaryVariant"
                    style={[styles.previewControlLabelText]}
                  >
                    Color Scheme
                  </Text>
                  <SegmentedControl
                    size="small"
                    options={{
                      light: 'Light',
                      dark: 'Dark',
                    }}
                    value={value.colorScheme}
                    onValueChange={(v) => {
                      onValueChange({ ...value, colorScheme: v });
                    }}
                    disableAdvancedAutoSizing
                  />
                </View>
              </ScrollView>

              <ScrollView
                horizontal
                alwaysBounceHorizontal={false}
                contentContainerStyle={styles.previewControlsContent}
              >
                <View style={styles.previewControlGroup}>
                  <Text
                    allowFontScaling={false}
                    color="secondaryVariant"
                    style={[styles.previewControlLabelText]}
                  >
                    BG
                  </Text>
                  <SegmentedControl
                    size="small"
                    options={{
                      default: 'Default',
                      transparent: 'Transp.',
                      system: 'System',
                      grouped: 'Grouped',
                    }}
                    value={value.background}
                    onValueChange={(v) => {
                      onValueChange({ ...value, background: v });
                    }}
                    disableAdvancedAutoSizing
                  />
                </View>

                <View style={styles.previewControlGroup}>
                  <Text
                    allowFontScaling={false}
                    color="secondaryVariant"
                    style={[styles.previewControlLabelText]}
                  >
                    Elevated
                  </Text>
                  <Switch
                    size="small"
                    value={value.elevated}
                    onValueChange={(v) => {
                      onValueChange({ ...value, elevated: v });
                    }}
                  />
                </View>
              </ScrollView>

              <ScrollView
                horizontal
                alwaysBounceHorizontal={false}
                contentContainerStyle={styles.previewControlsContent}
              >
                {!!specOverlay && (
                  <View style={styles.previewControlGroup}>
                    <Text
                      allowFontScaling={false}
                      color="secondaryVariant"
                      style={[styles.previewControlLabelText]}
                    >
                      Spec Overlay
                    </Text>
                    <Switch
                      size="small"
                      value={value.showSpecOverlay}
                      onValueChange={(v) => {
                        onValueChange({ ...value, showSpecOverlay: v });
                      }}
                    />
                  </View>
                )}

                <View style={styles.previewControlGroup}>
                  <Text
                    allowFontScaling={false}
                    color="secondaryVariant"
                    style={[styles.previewControlLabelText]}
                  >
                    Show Boundaries
                  </Text>
                  <Switch
                    size="small"
                    value={value.showBoundaryLines}
                    onValueChange={(v) => {
                      onValueChange({ ...value, showBoundaryLines: v });
                    }}
                  />
                </View>
              </ScrollView>
            </View>
          )}
        </SeparatorColor>
      )}
    </BackgroundColor>
  );
}

export const STORY_CONTAINER_CONTROLS_HEIGHT = 120;

const styles = StyleSheet.create({
  rootContainer: { height: STORY_CONTAINER_CONTROLS_HEIGHT },
  previewControls: {
    borderTopWidth: StyleSheet.hairlineWidth,
    flexGrow: 0,
    height: STORY_CONTAINER_CONTROLS_HEIGHT,
    paddingVertical: 4,
    justifyContent: 'center',
  },
  previewControlsContent: {
    flexGrow: 1,
    flexDirection: 'row',
    paddingVertical: 4,
    paddingHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  previewControlGroup: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
  },
  previewControlLabelText: {
    fontSize: 10,
  },
});

export default StoryContainerControls;
