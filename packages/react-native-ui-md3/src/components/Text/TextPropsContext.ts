import { createContext } from 'react';

import type { Props } from './Text';

export const TextPropsContext = createContext<Partial<Props>>({});

export default TextPropsContext;
