import React, { useCallback, useState } from 'react';
import {
  ImageBackground,
  LayoutChangeEvent,
  LayoutRectangle,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ReactRenderer } from '@storybook/react';
import { PartialStoryFn } from '@storybook/types';

import {
  BackgroundColor,
  Text,
  UIContextProvider,
} from '@rnstudy/react-native-ui';
import { StoryParameters } from '@rnstudy/storybook-rn-types';

import { ControlsState } from './types';

export type Props = {
  story: PartialStoryFn<ReactRenderer>;
  parameters: StoryParameters;
  controlsState: ControlsState;
};

export function StoryContentContainer(props: Props) {
  const { uiPlatform, colorScheme } = props.controlsState;
  return (
    <UIContextProvider colorScheme={colorScheme} platform={uiPlatform}>
      <StoryContentContainerWithoutContext {...props} />
    </UIContextProvider>
  );
}

export function StoryContentContainerWithoutContext({
  story,
  parameters,
  controlsState,
}: Props) {
  const {
    storyContainer,
    containerStyle,
    containerVerticalAlign,
    specOverlay,
  } = parameters;

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

  const content =
    storyContainer === 'basic' ? (
      <GestureHandlerRootView style={styles.rootContainer}>
        <Story />
      </GestureHandlerRootView>
    ) : (
      <GestureHandlerRootView style={styles.rootContainer}>
        <ScrollView
          alwaysBounceVertical={controlsState.showBoundaryLines || false}
          style={styles.previewContent}
          contentContainerStyle={contentContainerStyle}
        >
          <ScrollView
            horizontal
            alwaysBounceHorizontal={controlsState.showBoundaryLines || false}
            style={styles.previewContent}
            contentContainerStyle={contentContainerStyle}
          >
            <View
              style={[
                styles.previewWrapper,
                controlsState.showBoundaryLines &&
                  styles.previewWrapper_withBoundaryLines,
                controlsState.showBoundaryLines &&
                  containerVerticalAlign === 'top' &&
                  styles.previewWrapper_withBoundaryLines_verticalAlignTop,
                containerStyle,
              ]}
              onLayout={handleContainerLayout}
            >
              <Story />
              {!!specOverlay && controlsState.showSpecOverlay && (
                <View style={styles.specOverlayContainer}>{specOverlay}</View>
              )}
            </View>

            {controlsState.showBoundaryLines && (
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
                        (containerLayout?.y || 0) +
                        (containerLayout?.height || 0),
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
                        (containerLayout?.x || 0) +
                        (containerLayout?.width || 0),
                    },
                  ]}
                />

                <View
                  style={[
                    styles.boundaryLinesLabelContainer,
                    {
                      top:
                        (containerLayout?.y || 0) +
                        (containerLayout?.height || 0),
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
      </GestureHandlerRootView>
    );

  const backgroundType =
    controlsState.background === 'default'
      ? parameters.containerBackground
      : controlsState.background;

  return (
    <BackgroundColor
      grouped={(() => {
        if (backgroundType === 'transparent') {
          return undefined;
        }

        if (backgroundType) {
          return backgroundType === 'grouped';
        }
      })()}
      elevated={controlsState.elevated}
    >
      {(backgroundColor) => (
        <ImageBackground
          source={
            controlsState.colorScheme.startsWith('dark')
              ? require('./images/transparent-dark.png')
              : require('./images/transparent-light.png')
          }
          imageStyle={styles.transparentBackgroundImage}
          style={styles.rootContainer}
        >
          <View
            style={[
              styles.rootContainer,
              backgroundType !== 'transparent' && { backgroundColor },
            ]}
          >
            {content}
          </View>
        </ImageBackground>
      )}
    </BackgroundColor>
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
  previewWrapper: {
    alignSelf: 'center',
  },
  previewWrapper_withBoundaryLines: {
    marginVertical: 40,
  },
  previewWrapper_withBoundaryLines_verticalAlignTop: {
    marginTop: 0,
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

export default StoryContentContainer;
