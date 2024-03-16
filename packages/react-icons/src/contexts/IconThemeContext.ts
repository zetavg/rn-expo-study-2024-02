import { createContext } from 'react';

import { IconTheme } from '../types';

export const IconThemeContext = createContext<IconTheme | undefined>(undefined);

export default IconThemeContext;
