import React, { useCallback, useState } from 'react';
import {
  ImageBackground,
  LayoutChangeEvent,
  LayoutRectangle,
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
  UIContextProvider,
} from '@rnstudy/react-native-ui';
import { Parameters } from '@rnstudy/storybook-rn-types';

export function StoryContainer({
  story,
  parameters,
}: {
  story: PartialStoryFn<ReactRenderer>;
  parameters: Parameters;
}) {
  const { containerBackground, specOverlay } = parameters;

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

  return (
    <UIContextProvider colorScheme={colorScheme} platform={uiPlatform}>
      <StoryContainerContent
        story={story}
        parameters={parameters}
        darkMode={darkMode}
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
    </UIContextProvider>
  );
}

function StoryContainerContent({
  story,
  parameters,
  darkMode,
  showBackground,
  useGroupedBackground,
  showSpecOverlay,
  showBoundaryLines,
}: {
  story: PartialStoryFn<ReactRenderer>;
  parameters: Parameters;
  darkMode: boolean;
  showBackground: boolean;
  useGroupedBackground: boolean;
  showSpecOverlay: boolean;
  showBoundaryLines: boolean;
}) {
  const { containerStyle, containerVerticalAlign, specOverlay } = parameters;

  const [containerLayout, setContainerLayout] = useState<LayoutRectangle>();
  const handleContainerLayout = useCallback((event: LayoutChangeEvent) => {
    setContainerLayout(event.nativeEvent.layout);
  }, []);

  const Story = story;

  const contentContainerStyle = [
    styles.previewContentContainer,
    containerVerticalAlign === 'top' &&
      styles.previewContentContainer_withVerticalAlignTop,
  ];

  const content = (
    <ScrollView
      alwaysBounceVertical={showBoundaryLines || false}
      style={styles.previewContent}
      contentContainerStyle={contentContainerStyle}
    >
      <ScrollView
        horizontal
        alwaysBounceHorizontal={showBoundaryLines || false}
        style={styles.previewContent}
        contentContainerStyle={contentContainerStyle}
      >
        <View
          style={[
            styles.previewWrapper,
            showBoundaryLines && styles.previewWrapper_withBoundaryLines,
            showBoundaryLines &&
              containerVerticalAlign === 'top' &&
              styles.previewWrapper_withBoundaryLines_verticalAlignTop,
            containerStyle,
          ]}
          onLayout={handleContainerLayout}
        >
          <Story />
          {!!specOverlay && showSpecOverlay && (
            <View style={styles.specOverlayContainer}>{specOverlay}</View>
          )}
        </View>

        {showBoundaryLines && (
          <>
            <View
              style={[
                styles.horizontalBoundaryLine,
                {
                  top:
                    (containerLayout?.y || 0) -
                    styles.horizontalBoundaryLine.height,
                },
              ]}
            />
            <View
              style={[
                styles.horizontalBoundaryLine,
                {
                  top:
                    (containerLayout?.y || 0) + (containerLayout?.height || 0),
                },
              ]}
            />
            <View
              style={[
                styles.verticalBoundaryLine,
                {
                  left:
                    (containerLayout?.x || 0) -
                    styles.verticalBoundaryLine.width,
                },
              ]}
            />
            <View
              style={[
                styles.verticalBoundaryLine,
                {
                  left:
                    (containerLayout?.x || 0) + (containerLayout?.width || 0),
                },
              ]}
            />

            <View
              style={[
                styles.boundaryLinesLabelContainer,
                {
                  top:
                    (containerLayout?.y || 0) + (containerLayout?.height || 0),
                },
              ]}
            >
              <View style={styles.boundaryLinesLabelContent}>
                <Text style={styles.boundaryLinesLabelContentText}>
                  {containerLayout?.width?.toLocaleString(undefined, {
                    maximumFractionDigits: 4,
                  }) || 'unknown'}{' '}
                  ×{' '}
                  {containerLayout?.height?.toLocaleString(undefined, {
                    maximumFractionDigits: 4,
                  }) || 'unknown'}
                </Text>
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </ScrollView>
  );

  if (showBackground) {
    return (
      <BackgroundColor grouped={useGroupedBackground}>
        {(backgroundColor) => (
          <View style={[styles.rootContainer, { backgroundColor }]}>
            {content}
          </View>
        )}
      </BackgroundColor>
    );
  }

  return (
    <ImageBackground
      source={
        darkMode
          ? require('./images/transparent-dark.png')
          : require('./images/transparent-light.png')
      }
      imageStyle={styles.transparentBackgroundImage}
      style={[styles.rootContainer]}
    >
      {content}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    overflow: 'hidden',
  },
  previewContent: {
    flex: 1,
    overflow: Platform.OS === 'ios' ? 'visible' : 'scroll',
  },
  previewContentContainer: {
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'visible',
  },
  previewContentContainer_withVerticalAlignTop: {
    justifyContent: 'flex-start',
  },
  previewWrapper: {},
  previewWrapper_withBoundaryLines: {
    marginVertical: 40,
  },
  previewWrapper_withBoundaryLines_verticalAlignTop: {
    marginTop: 0,
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
  transparentBackgroundImage: {
    resizeMode: 'repeat',
  },
  verticalBoundaryLine: {
    position: 'absolute',
    top: -9999,
    width: 1,
    height: 9999999,
    backgroundColor: '#0C8CE9',
  },
  horizontalBoundaryLine: {
    position: 'absolute',
    width: 9999999,
    height: 1,
    backgroundColor: '#0C8CE9',
  },
  boundaryLinesLabelContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boundaryLinesLabelContent: {
    backgroundColor: '#0C8CE9',
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  boundaryLinesLabelContentText: {
    color: 'white',
    fontSize: 12,
    lineHeight: 14,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  specOverlayContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    opacity: 0.5,
  },
});

export default StoryContainer;
