import React, { useState } from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  useColorScheme,
  View,
} from 'react-native';
import { ReactRenderer } from '@storybook/react';
import { PartialStoryFn } from '@storybook/types';

import {
  AVAILABLE_UI_PLATFORMS,
  BackgroundColor,
  SeparatorColor,
  Text,
} from '@rnstudy/react-native-ui';
import { Parameters } from '@rnstudy/storybook-rn-types';

import StoryContentContainer from './StoryContentContainer';

export function StoryContainer({
  story,
  parameters,
}: {
  story: PartialStoryFn<ReactRenderer>;
  parameters: Parameters;
}) {
  const { storyContainer, containerBackground, specOverlay } = parameters;

  const [useAlternativePlatform, setUseAlternativePlatform] = useState(false);
  const [darkMode, setDarkMode] = useState(useColorScheme() === 'dark');

  const [showBackground, setShowBackground] = useState(
    !['none', 'transparent'].includes(containerBackground || ''),
  );
  const [useGroupedBackground, setUseGroupedBackground] = useState(
    containerBackground === 'grouped',
  );

  const [showBoundaryLines, setShowBoundaryLines] = useState(false);
  const [showSpecOverlay, setShowSpecOverlay] = useState(false);

  const colorScheme = darkMode ? 'dark' : 'light';
  const uiPlatform = useAlternativePlatform
    ? AVAILABLE_UI_PLATFORMS[1]
    : AVAILABLE_UI_PLATFORMS[0];

  if (storyContainer === 'none') {
    const Story = story;
    return <Story />;
  }

  return (
    <View style={styles.rootContainer}>
      <StoryContentContainer
        story={story}
        parameters={parameters}
        uiPlatform={uiPlatform || AVAILABLE_UI_PLATFORMS[0]}
        colorScheme={colorScheme}
        showBackground={showBackground}
        useGroupedBackground={useGroupedBackground}
        showSpecOverlay={showSpecOverlay}
        showBoundaryLines={showBoundaryLines}
      />

      <BackgroundColor>
        {(backgroundColor) => (
          <SeparatorColor opaque>
            {(separatorColor) => (
              <>
                <ScrollView
                  horizontal
                  style={[
                    styles.previewControls,
                    { borderColor: separatorColor },
                    { backgroundColor },
                  ]}
                  contentContainerStyle={styles.previewControlsContent}
                >
                  {AVAILABLE_UI_PLATFORMS.length > 1 && (
                    <View style={styles.previewControlGroup}>
                      <Text style={[styles.previewControlLabelText]}>
                        Altr. P.
                      </Text>
                      <Switch
                        style={styles.previewControlSwitch}
                        value={useAlternativePlatform}
                        onValueChange={setUseAlternativePlatform}
                      />
                    </View>
                  )}
                  {!!specOverlay && (
                    <View style={styles.previewControlGroup}>
                      <Text style={[styles.previewControlLabelText]}>
                        Spec Overlay
                      </Text>
                      <Switch
                        style={styles.previewControlSwitch}
                        value={showSpecOverlay}
                        onValueChange={setShowSpecOverlay}
                      />
                    </View>
                  )}

                  <View style={styles.previewControlGroup}>
                    <Text style={[styles.previewControlLabelText]}>
                      Dark Mode
                    </Text>
                    <Switch
                      style={styles.previewControlSwitch}
                      value={darkMode}
                      onValueChange={setDarkMode}
                    />
                  </View>

                  <View style={styles.previewControlGroup}>
                    <Text style={[styles.previewControlLabelText]}>BG</Text>
                    <Switch
                      style={styles.previewControlSwitch}
                      value={showBackground}
                      onValueChange={setShowBackground}
                    />
                  </View>

                  {showBackground && (
                    <View style={styles.previewControlGroup}>
                      <Text style={[styles.previewControlLabelText]}>
                        BG Grouped
                      </Text>
                      <Switch
                        style={styles.previewControlSwitch}
                        value={useGroupedBackground}
                        onValueChange={setUseGroupedBackground}
                      />
                    </View>
                  )}

                  <View style={styles.previewControlGroup}>
                    <Text style={[styles.previewControlLabelText]}>
                      Boundary L.
                    </Text>
                    <Switch
                      style={styles.previewControlSwitch}
                      value={showBoundaryLines}
                      onValueChange={setShowBoundaryLines}
                    />
                  </View>
                </ScrollView>
              </>
            )}
          </SeparatorColor>
        )}
      </BackgroundColor>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    overflow: 'hidden',
  },
  previewControls: {
    borderTopWidth: StyleSheet.hairlineWidth,
    flexGrow: 0,
  },
  previewControlsContent: {
    flexGrow: 1,
    paddingVertical: 4,
    paddingHorizontal: 16,
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  previewControlGroup: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
  },
  previewControlLabelText: {
    fontSize: 12,
  },
  previewControlSwitch: {
    ...Platform.select({
      ios: { transform: [{ scale: 0.8 }] },
    }),
  },
});

export default StoryContainer;
