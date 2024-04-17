import React from 'react';

import { reactMemoWithPropsThatCanBeMarkedAsStable } from '@rnstudy/react-utils';

import Switch, { SwitchProps } from '../../Switch';
import FormField, { FormFieldProps } from '../FormField';

type Props = Omit<FormFieldProps, 'children' | 'vertical'> & SwitchProps;

export const FormSwitch = reactMemoWithPropsThatCanBeMarkedAsStable(
  function FormSwitch(props: Props) {
    return (
      <FormField preserveChildrenSpace={false} {...props} vertical={false}>
        <Switch {...props} />
      </FormField>
    );
  },
  ['onValueChange'],
);

FormSwitch.displayName = 'FormSwitch';

export default FormSwitch;
