import { createContext, useContext } from 'react';

import { type Colors, colorSchemes } from '../../tokens';

/**
 * A context for passing a set of iOS colors down the component tree.
 */
export const ColorsContext = createContext<Colors>(colorSchemes.light.colors);

/**
 * Returns a set of iOS colors.
 */
export function useColors(): Colors {
  return useContext(ColorsContext);
}

export default ColorsContext;
