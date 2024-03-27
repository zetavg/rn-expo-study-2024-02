import { createContext } from 'react';

import type { Props } from './Button';

export const ButtonPropsContext = createContext<
  Partial<Props> | ((props: Partial<Props>) => Partial<Props>)
>({});
ButtonPropsContext.displayName = 'ButtonPropsContext';

export default ButtonPropsContext;
