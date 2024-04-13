import React, { useEffect, useState } from 'react';
import { Keyboard, StyleSheet, useColorScheme, View } from 'react-native';
import { ReactRenderer } from '@storybook/react';
import { PartialStoryFn } from '@storybook/types';

import { AVAILABLE_UI_PLATFORMS } from '@rnstudy/react-native-ui';
import { StoryParameters } from '@rnstudy/storybook-rn-types';

import StoryContainerControls from './StoryContainerControls';
import StoryContentContainer from './StoryContentContainer';
import { ControlsState } from './types';

export function StoryContainer({
  story,
  parameters,
}: {
  story: PartialStoryFn<ReactRenderer>;
  parameters: StoryParameters;
}) {
  const { storyContainer } = parameters;

  const [state, setState] = useState<ControlsState>({
    uiPlatform: AVAILABLE_UI_PLATFORMS[0],
    colorScheme: useColorScheme() === 'dark' ? 'dark' : 'light',
    background: 'default',
    elevated: undefined,
  });

  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardShowListener = Keyboard.addListener(
      'keyboardWillShow',
      () => {
        setIsKeyboardVisible(true);
      },
    );
    const keyboardHideListener = Keyboard.addListener(
      'keyboardWillHide',
      () => {
        setIsKeyboardVisible(false);
      },
    );

    return () => {
      keyboardHideListener.remove();
      keyboardShowListener.remove();
    };
  }, []);

  if (storyContainer === 'none') {
    const Story = story;
    return <Story />;
  }

  return (
    <View style={styles.rootContainer}>
      <StoryContentContainer
        story={story}
        parameters={parameters}
        controlsState={state}
      />

      {!isKeyboardVisible && (
        <StoryContainerControls
          value={state}
          onValueChange={setState}
          parameters={parameters}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    overflow: 'hidden',
  },
});

export default StoryContainer;
