import React, { memo } from 'react';

import {
  arePropsWithOnValueChangeFunctionEqual,
  OnValueChangeIsDependencyFreeProps,
} from '@rnstudy/react-utils';

import TextInput, { TextInputProps } from '../../TextInput';
import FormField, { FormFieldProps } from '../FormField';

type Props = Omit<FormFieldProps, 'children'> &
  TextInputProps &
  OnValueChangeIsDependencyFreeProps;

export const FormTextInput = memo(function FormTextInput(props: Props) {
  return (
    <FormField {...props}>
      <TextInput {...props} />
    </FormField>
  );
}, arePropsWithOnValueChangeFunctionEqual);

FormTextInput.displayName = 'FormTextInput';

export default FormTextInput;
