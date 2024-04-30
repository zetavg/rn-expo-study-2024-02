import React, { useMemo } from 'react';
import { ViewProps } from 'react-native';

import { List } from '../../List';
import { FormFieldProps } from '../FormField';
import FormFieldPropsContext from '../FormField/FormFieldPropsContext';

export type Props = {
  /** Set this to `true` if the list is the first element in a view, which allows it to have the correct top padding. */
  first?: boolean;
  /** The footer of the list. Should be an `FormGroup.Header` element. */
  header?: React.ReactNode;
  /** Shorthand of
   * ```jsx
   * header={headerTitle ? <FormGroup.Header title={headerTitle} /> : undefined}
   * ```
   * . */
  headerTitle?: string | React.ReactElement;
  /** The footer of the list. Should be an `FormGroup.Footer` element. */
  footer?: React.ReactNode;
  /** Shorthand of
   * ```jsx
   * footer={footerText ? <FormGroup.Footer text={footerText} /> : undefined}
   * ```
   * . */
  footerText?: string | React.ReactElement;
  /** Set this to true to make the field vertical. Fields are horizontal (i.e. the label is on the left and the input is on the right) by default. */
  vertical?: boolean;
  /** The items in the list. */
  children: React.ComponentProps<typeof List>['children'];
  /** Show a loading indicator over the list. */
  loading?: boolean;
  /** The placeholder to display when children is empty. */
  placeholder?: Readonly<React.JSX.Element> | string;

  onLayout?: ViewProps['onLayout'];
};

export function FormGroup({ vertical = false, children, ...restProps }: Props) {
  const formFieldPropsContextValue = useMemo<Partial<FormFieldProps>>(
    () => ({ vertical }),
    [vertical],
  );

  return (
    <FormFieldPropsContext.Provider value={formFieldPropsContextValue}>
      <List listStyle="insetGrouped" {...restProps}>
        {children}
      </List>
    </FormFieldPropsContext.Provider>
  );
}

FormGroup.Header = List.Header.Memoized;
FormGroup.Footer = List.Footer.Memoized;

export default FormGroup;
