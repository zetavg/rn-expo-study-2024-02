import { createContext, useContext } from 'react';

import { colorSchemes } from '../../tokens';

/**
 * A context for passing a set of iOS UI colors down the component tree.
 */
export const ColorSchemeTypeContext = createContext<'dark' | 'light'>(
  colorSchemes.light.type,
);

/**
 * Returns a set of iOS UI colors.
 */
export function useColorSchemeType(): 'dark' | 'light' {
  return useContext(ColorSchemeTypeContext);
}

export default ColorSchemeTypeContext;
