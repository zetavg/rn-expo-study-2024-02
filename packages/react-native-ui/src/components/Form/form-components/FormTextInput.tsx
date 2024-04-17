import React from 'react';

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
        <TextInput ref={ref} {...props} />
      </FormField>
    );
  }),
  ['onValueChange', 'onChangeText'],
);

FormTextInput.displayName = 'FormTextInput';

export default FormTextInput;
