import React, { useCallback, useMemo, useState } from 'react';
import {
  ImageBackground,
  LayoutChangeEvent,
  LayoutRectangle,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { ReactRenderer } from '@storybook/react';
import { PartialStoryFn } from '@storybook/types';

import { ThemeProvider, themes } from '@rnstudy/react-native-ui';
import { Parameters } from '@rnstudy/storybook-rn-types';

export function StoryContainer({
  story,
  parameters,
}: {
  story: PartialStoryFn<ReactRenderer>;
  parameters: Parameters;
}) {
  const { containerStyle, specOverlay } = parameters;
  const [darkMode, setDarkMode] = useState(useColorScheme() === 'dark');
  const [solidBackground, setSolidBackground] = useState(true);
  const [showBoundaryLines, setShowBoundaryLines] = useState(false);
  const [showSpecOverlay, setShowSpecOverlay] = useState(false);

  const theme = useMemo(() => {
    const baseTheme = darkMode ? themes.dark : themes.light;
    return baseTheme;
  }, [darkMode]);

  const solidBackgroundColor = useMemo(() => {
    return theme.ios.colors.systemGroupedBackground;
  }, [theme]);

  const previewUiBorderColor = useMemo(() => {
    return theme.ios.colors.separator;
  }, [theme]);
  const previewUiTextColor = useMemo(() => {
    return theme.ios.colors.secondaryLabel;
  }, [theme]);

  const [containerLayout, setContainerLayout] = useState<LayoutRectangle>();
  const handleContainerLayout = useCallback((event: LayoutChangeEvent) => {
    setContainerLayout(event.nativeEvent.layout);
  }, []);

  const Story = story;

  const content = (
    <ThemeProvider theme={theme}>
      <ScrollView style={styles.previewContent}>
        <View style={containerStyle} onLayout={handleContainerLayout}>
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
          </>
        )}
      </ScrollView>
      <ScrollView
        horizontal
        style={[
          styles.previewControls,
          { borderColor: previewUiBorderColor },
          { backgroundColor: solidBackgroundColor },
        ]}
        contentContainerStyle={styles.previewControlsContent}
      >
        {!!specOverlay && (
          <View style={styles.previewControlGroup}>
            <Text
              style={[
                styles.previewControlLabelText,
                { color: previewUiTextColor },
              ]}
            >
              Spec Overlay
            </Text>
            <Switch
              value={showSpecOverlay}
              onValueChange={setShowSpecOverlay}
            />
          </View>
        )}

        <View style={styles.previewControlGroup}>
          <Text
            style={[
              styles.previewControlLabelText,
              { color: previewUiTextColor },
            ]}
          >
            Dark Mode
          </Text>
          <Switch value={darkMode} onValueChange={setDarkMode} />
        </View>

        <View style={styles.previewControlGroup}>
          <Text
            style={[
              styles.previewControlLabelText,
              { color: previewUiTextColor },
            ]}
          >
            BG
          </Text>
          <Switch value={solidBackground} onValueChange={setSolidBackground} />
        </View>

        <View style={styles.previewControlGroup}>
          <Text
            style={[
              styles.previewControlLabelText,
              { color: previewUiTextColor },
            ]}
          >
            Boundary L.
          </Text>
          <Switch
            value={showBoundaryLines}
            onValueChange={setShowBoundaryLines}
          />
        </View>
      </ScrollView>
    </ThemeProvider>
  );

  if (solidBackground) {
    return (
      <View
        style={[
          styles.rootContainer,
          { backgroundColor: solidBackgroundColor },
        ]}
      >
        {content}
      </View>
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
  },
  previewContent: {
    flex: 1,
  },
  previewWrapper: {
    flex: 1,
  },
  previewControls: {
    borderTopWidth: StyleSheet.hairlineWidth,
    flexGrow: 0,
  },
  previewControlsContent: {
    flexGrow: 1,
    paddingVertical: 4,
    paddingHorizontal: 8,
    flexDirection: 'row',
    gap: 16,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  previewControlGroup: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  previewControlLabelText: {
    fontSize: 12,
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
