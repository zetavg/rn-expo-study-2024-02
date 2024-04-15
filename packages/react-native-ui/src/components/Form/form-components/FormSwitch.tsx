import React, { memo } from 'react';

import {
  arePropsWithOnValueChangeFunctionEqual,
  OnValueChangeIsDependencyFreeProps,
} from '@rnstudy/react-utils';

import Switch, { SwitchProps } from '../../Switch';
import FormField, { FormFieldProps } from '../FormField';

type Props = Omit<FormFieldProps, 'children' | 'vertical'> &
  SwitchProps &
  OnValueChangeIsDependencyFreeProps;

export const FormSwitch = memo(function FormSwitch(props: Props) {
  return (
    <FormField preserveChildrenSpace={false} {...props} vertical={false}>
      <Switch {...props} />
    </FormField>
  );
}, arePropsWithOnValueChangeFunctionEqual);

FormSwitch.displayName = 'FormSwitch';

export default FormSwitch;
