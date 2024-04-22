import React from 'react';
import { Platform } from 'react-native';

import { KeyboardAvoidingViewAndroid } from '../StackScreenContent/components/KeyboardAvoidingViewAndroid';

/**
 * Wrap a scrollable element to handle keyboard avoidance, etc.
 */
export function useWrappedScrollableElement(
  element: React.ReactElement,
): React.ReactElement {
  if (Platform.OS === 'android') {
    return <KeyboardAvoidingViewAndroid>{element}</KeyboardAvoidingViewAndroid>;
  }

  return element;
}
