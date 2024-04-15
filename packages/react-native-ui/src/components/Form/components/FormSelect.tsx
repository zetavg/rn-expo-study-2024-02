import React from 'react';

import Select, { SelectProps } from '../../Select';
import FormField, { FormFieldProps } from '../FormField';

type Props<T extends string> = Omit<FormFieldProps, 'children' | 'vertical'> &
  SelectProps<T>;

export function FormSelect<T extends string>(props: Props<T>) {
  return (
    <FormField preserveChildrenSpace={false} {...props} vertical={false}>
      <Select {...props} />
    </FormField>
  );
}

export default FormSelect;
