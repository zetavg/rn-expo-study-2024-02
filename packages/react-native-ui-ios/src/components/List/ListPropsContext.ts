import { createContext } from 'react';

import type { Props } from './List';

export const ListPropsContext = createContext<Partial<Props>>({});
ListPropsContext.displayName = 'ListPropsContext';

export default ListPropsContext;
