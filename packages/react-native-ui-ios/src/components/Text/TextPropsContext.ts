import { createContext } from 'react';

import type { Props } from './Text';

export const TextPropsContext = createContext<Partial<Props>>({});
TextPropsContext.displayName = 'TextPropsContext';

export default TextPropsContext;
