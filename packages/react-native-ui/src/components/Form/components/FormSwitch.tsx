import React from 'react';

import Switch, { SwitchProps } from '../../Switch';
import FormField, { FormFieldProps } from '../FormField';

type Props = Omit<FormFieldProps, 'children' | 'vertical'> & SwitchProps;

export function FormSwitch(props: Props) {
  return (
    <FormField {...props} vertical={false}>
      <Switch {...props} />
    </FormField>
  );
}

export default FormSwitch;
