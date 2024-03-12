import { createContext, useContext } from 'react';

import { MD3Theme } from './themes/md3/types';
import { blue } from './themes';

export const MD3ThemeContext = createContext<MD3Theme>(blue.md3);

export function useMD3Theme(): MD3Theme {
  return useContext(MD3ThemeContext);
}

export default MD3ThemeContext;
