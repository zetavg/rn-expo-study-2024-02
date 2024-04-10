import React, { useMemo } from 'react';

import { List } from '../../List';
import { FormFieldProps } from '../FormField';
import FormFieldPropsContext from '../FormField/FormFieldPropsContext';

export type Props = {
  /** Set this to `true` if the list is the first element in a view, which allows it to have the correct top padding. */
  first?: boolean;
  /** The footer of the list. Should be an `FormGroup.Header` element. */
  header?: React.ReactNode;
  /** The footer of the list. Should be an `FormGroup.Footer` element. */
  footer?: React.ReactNode;
  /** Set this to true to make the field vertical. Fields are horizontal (i.e. the label is on the left and the input is on the right) by default. */
  vertical?: boolean;
  /** The items in the list. */
  children: Readonly<React.JSX.Element> | readonly React.JSX.Element[];
  /** Show a loading indicator over the list. */
  loading?: boolean;
  /** The placeholder to display when children is empty. */
  placeholder?: Readonly<React.JSX.Element> | string;
};

export function FormGroup({ vertical = false, children, ...restProps }: Props) {
  const formFieldPropsContextValue = useMemo<Partial<FormFieldProps>>(
    () => ({ vertical }),
    [vertical],
  );

  return (
    <FormFieldPropsContext.Provider value={formFieldPropsContextValue}>
      <List {...restProps}>{children}</List>
    </FormFieldPropsContext.Provider>
  );
}

FormGroup.Header = List.Header;
FormGroup.Footer = List.Footer;

export default FormGroup;
