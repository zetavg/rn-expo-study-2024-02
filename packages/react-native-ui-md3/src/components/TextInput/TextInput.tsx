import React, { forwardRef } from 'react';
import {
  Platform,
  StyleSheet,
  TextInput as RNTextInput,
  type TextInputProps as RNTextInputProps,
} from 'react-native';

import { usePropsWithContextualDefaultValues } from '@rnstudy/react-utils';

import { useColors, useTheme } from '../../contexts';

import TextInputPropsContext from './TextInputPropsContext';

export type Props = RNTextInputProps;

export const TextInput = forwardRef<RNTextInput, Props>(function TextInput(
  rawProps: Props,
  ref,
): JSX.Element {
  const {
    style,
    placeholder: placeholderProp,
    clearButtonMode: _, // Will break the layout. This is not supported on Android anyway.
    ...restProps
  } = usePropsWithContextualDefaultValues(rawProps, TextInputPropsContext);

  const colors = useColors();
  const theme = useTheme();

  const { lineHeight: __, ...textStyle } = theme.fonts.bodyLarge;

  let placeholder = placeholderProp;
  if (placeholder && Platform.OS === 'android') {
    // On Android, sometimes the placeholder text will unexpectedly be broken into two lines while there is still enough space for it to be on one line. We observed that adding a space at the end of the placeholder text can help prevent this issue. The added space will not be visible - at least on the devices we tested.
    placeholder = `${placeholder} `;
  }

  return (
    <RNTextInput
      ref={ref}
      placeholder={placeholder}
      placeholderTextColor={colors.outlineVariant}
      {...restProps}
      style={[textStyle, styles.text, { color: colors.onSurface }, style]}
    />
  );
});

TextInput.displayName = 'TextInputMD3';

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Roboto',

    // A hack to make auto scrolling scroll to a better position while the opening software keyboard will cover the text input.
    paddingVertical: 16,
    marginVertical: -16,
  },
});

export default TextInput;
