import React from 'react';

import { reactMemoWithPropsThatCanBeMarkedAsStable } from '@rnstudy/react-utils';

import TextInput, { TextInputProps } from '../../TextInput';
import FormField, { FormFieldProps } from '../FormField';

type Props = Omit<FormFieldProps, 'children'> & TextInputProps;

export const FormTextInput = reactMemoWithPropsThatCanBeMarkedAsStable(
  function FormTextInput(props: Props) {
    return (
      <FormField {...props}>
        <TextInput {...props} />
      </FormField>
    );
  },
  ['onValueChange', 'onChangeText'],
);

FormTextInput.displayName = 'FormTextInput';

export default FormTextInput;
