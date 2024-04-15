import React from 'react';

import {
  arePropsWithOnValueChangeFunctionEqual,
  OnValueChangeIsDependencyFreeProps,
  typedMemo,
} from '@rnstudy/react-utils';

import Select, { SelectProps } from '../../Select';
import FormField, { FormFieldProps } from '../FormField';

type Props<T extends string> = Omit<FormFieldProps, 'children' | 'vertical'> &
  SelectProps<T> &
  OnValueChangeIsDependencyFreeProps;

export const FormSelect = typedMemo(function FormSelect<T extends string>(
  props: Props<T>,
) {
  return (
    <FormField preserveChildrenSpace={false} {...props} vertical={false}>
      <Select {...props} />
    </FormField>
  );
}, arePropsWithOnValueChangeFunctionEqual);

FormSelect.displayName = 'FormSelect';

export default FormSelect;
