import { createContext } from 'react';

import type { Props } from './ListItem';

export const ListItemPropsContext = createContext<Partial<Props>>({});
ListItemPropsContext.displayName = 'ListItemPropsContext';

export default ListItemPropsContext;
