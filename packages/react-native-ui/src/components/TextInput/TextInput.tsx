import React, { forwardRef } from 'react';
import {
  TextInput as RNTextInput,
  type TextInputProps as RNTextInputProps,
} from 'react-native';

import { TextInput as TextInputIOS } from '@rnstudy/react-native-ui-ios';
import { TextInput as TextInputMD3 } from '@rnstudy/react-native-ui-md3';

import { useUIPlatform } from '../../contexts';
export type Props = RNTextInputProps & {
  /**
   * Callback that is called when the text input's text changes. Changed text is passed as an argument to the callback handler.
   */
  onValueChange?: RNTextInputProps['onChangeText'];
};

export const TextInput = forwardRef<RNTextInput, Props>(function TextInput(
  { onValueChange, onChangeText, ...restProps }: Props,
  ref,
): JSX.Element {
  const uiPlatform = useUIPlatform();

  const onChangeTextFn = onValueChange || onChangeText;

  switch (uiPlatform) {
    case 'ios': {
      return (
        <TextInputIOS ref={ref} {...restProps} onChangeText={onChangeTextFn} />
      );
    }
    case 'android': {
      return (
        <TextInputMD3 ref={ref} {...restProps} onChangeText={onChangeTextFn} />
      );
    }
  }
});

TextInput.displayName = 'TextInput';

export default TextInput;
