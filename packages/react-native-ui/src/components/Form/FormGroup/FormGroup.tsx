import React from 'react';

import { List } from '../../List';

export type Props = {
  /** Set this to `true` if the list is the first element in a view, which allows it to have the correct top padding. */
  first?: boolean;
  /** The footer of the list. Should be an `FormGroup.Header` element. */
  header?: React.ReactNode;
  /** The footer of the list. Should be an `FormGroup.Footer` element. */
  footer?: React.ReactNode;
  /** The items in the list. */
  children: Readonly<React.JSX.Element> | readonly React.JSX.Element[];
  /** Show a loading indicator over the list. */
  loading?: boolean;
  /** The placeholder to display when children is empty. */
  placeholder?: Readonly<React.JSX.Element> | string;
};

export function FormGroup(props: Props) {
  return <List {...props} />;
}

FormGroup.Header = List.Header;
FormGroup.Footer = List.Footer;

export default FormGroup;
