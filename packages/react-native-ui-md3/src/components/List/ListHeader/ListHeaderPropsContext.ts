import { createContext } from 'react';

import type { Props } from './ListHeader';

export const ListHeaderPropsContext = createContext<Partial<Props>>({});
ListHeaderPropsContext.displayName = 'ListHeaderPropsContext';

export default ListHeaderPropsContext;
