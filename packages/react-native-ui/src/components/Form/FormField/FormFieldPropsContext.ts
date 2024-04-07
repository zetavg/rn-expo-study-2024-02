import { createContext } from 'react';

import type { Props } from './FormField';

export const FormFieldPropsContext = createContext<Partial<Props>>({});
FormFieldPropsContext.displayName = 'FormFieldPropsContext';

export default FormFieldPropsContext;
