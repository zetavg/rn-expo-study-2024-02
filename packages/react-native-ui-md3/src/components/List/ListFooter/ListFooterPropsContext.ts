import { createContext } from 'react';

import type { Props } from './ListFooter';

export const ListFooterPropsContext = createContext<Partial<Props>>({});
ListFooterPropsContext.displayName = 'ListFooterPropsContext';

export default ListFooterPropsContext;
