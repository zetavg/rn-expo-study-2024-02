import React, { useState } from 'react';

import { EXAMPLE_SELECT_OPTIONS } from '../../Select/examples';
import Form from '../Form';
import { FormFieldProps } from '../FormField';

import FormGroup, { FormGroupProps } from '.';

export function ExampleFormGroup({
  formFieldProps,
  ...props
}: FormGroupProps & { formFieldProps?: Partial<FormFieldProps> }) {
  const [state, setState] = useState({
    textInput: '',
    switch: false,
    select: Object.keys(EXAMPLE_SELECT_OPTIONS)[0],
  });

  return (
    <FormGroup {...props}>
      <Form.TextInput
        label="Text Input"
        placeholder="Placeholder"
        value={state.textInput}
        onValueChange={(v) => setState((s) => ({ ...s, textInput: v }))}
        {...formFieldProps}
      />
      <Form.Switch
        label="Switch"
        value={state.switch}
        onValueChange={(v) => setState((s) => ({ ...s, switch: v }))}
        {...formFieldProps}
      />
      <Form.Select
        label="Select"
        options={EXAMPLE_SELECT_OPTIONS}
        value={state.select}
        onValueChange={(v) => setState((s) => ({ ...s, select: v }))}
        {...formFieldProps}
      />
      <Form.RadioButtons
        label="Radio Buttons"
        options={EXAMPLE_SELECT_OPTIONS}
        // options={Object.fromEntries(
        //   Object.entries(EXAMPLE_SELECT_OPTIONS).slice(0, 2),
        // )}
        value={state.select}
        onValueChange={(v) => setState((s) => ({ ...s, select: v }))}
        {...formFieldProps}
      />
    </FormGroup>
  );
}
