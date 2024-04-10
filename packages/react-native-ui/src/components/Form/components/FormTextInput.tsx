import React from 'react';

import TextInput, { TextInputProps } from '../../TextInput';
import FormField, { FormFieldProps } from '../FormField';

type Props = Omit<FormFieldProps, 'children'> & TextInputProps;

export function FormTextInput(props: Props) {
  return (
    <FormField {...props}>
      <TextInput {...props} />
    </FormField>
  );
}

export default FormTextInput;
