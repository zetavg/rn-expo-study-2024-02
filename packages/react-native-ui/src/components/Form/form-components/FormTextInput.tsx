import React from 'react';
import { StyleSheet } from 'react-native';

import { reactMemoWithPropsThatCanBeMarkedAsStable } from '@rnstudy/react-utils';

import TextInput, { RNTextInput, TextInputProps } from '../../TextInput';
import FormField, { FormFieldProps } from '../FormField';

type Props = Omit<FormFieldProps, 'children'> & TextInputProps;

export const FormTextInput = reactMemoWithPropsThatCanBeMarkedAsStable(
  React.forwardRef<RNTextInput, Props>(function FormTextInput(
    props: Props,
    ref,
  ) {
    return (
      <FormField {...props}>
        <TextInput ref={ref} {...props} style={styles.textInput} />
      </FormField>
    );
  }),
  ['onValueChange', 'onChangeText'],
);

FormTextInput.displayName = 'FormTextInput';

/**
 * A hack to make text inputs in a scroll view be scrolled to a better position when focused and needs to be avoid being covered by the software keyboard.
 */
const VERTICAL_PADDING_HACK = 16;

const styles = StyleSheet.create({
  textInput: {
    paddingVertical: VERTICAL_PADDING_HACK,
    marginVertical: -VERTICAL_PADDING_HACK,
  },
});

export default FormTextInput;
