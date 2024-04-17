import React from 'react';

import {
  comparePropsWithPropsThatCanBeMarkedAsStable,
  typedMemo,
} from '@rnstudy/react-utils';

import Select, { SelectProps } from '../../Select';
import FormField, { FormFieldProps } from '../FormField';

type Props<T extends string> = Omit<FormFieldProps, 'children' | 'vertical'> &
  SelectProps<T> & {
    /** See: https://bit.ly/propNameIsStable. */
    onValueChangeIsStable?: boolean;
  };

export const FormSelect = typedMemo(
  function FormSelect<T extends string>(props: Props<T>) {
    return (
      <FormField preserveChildrenSpace={false} {...props} vertical={false}>
        <Select {...props} />
      </FormField>
    );
  },
  comparePropsWithPropsThatCanBeMarkedAsStable([
    'onValueChange',
  ]) as () => boolean,
);

FormSelect.displayName = 'FormSelect';

export default FormSelect;
