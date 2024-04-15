import { createContext } from 'react';

import { Props } from './SegmentedControl';

export const SegmentedControlPropsContext = createContext<
  Partial<Omit<Props<string>, 'options' | 'value' | 'onValueChange'>>
>({});

export default SegmentedControlPropsContext;
