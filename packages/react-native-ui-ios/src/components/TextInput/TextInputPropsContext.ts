import { createContext } from 'react';

import type { Props } from './TextInput';

export const TextInputPropsContext = createContext<Partial<Props>>({});
TextInputPropsContext.displayName = 'TextInputPropsContext';

export default TextInputPropsContext;
