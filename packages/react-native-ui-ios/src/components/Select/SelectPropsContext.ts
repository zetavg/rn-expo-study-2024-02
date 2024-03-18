import { createContext } from 'react';

import { Props } from './Select';

export const SelectPropsContext = createContext<
  Partial<Omit<Props<never>, 'options' | 'value' | 'onValueChange'>>
>({});

export default SelectPropsContext;
