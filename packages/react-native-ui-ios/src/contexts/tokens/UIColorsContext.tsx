import { createContext, useContext } from 'react';

import { colorSchemes, type UIColors } from '../../tokens';

/**
 * A context for passing a set of iOS UI colors down the component tree.
 */
export const UIColorsContext = createContext<UIColors>(
  colorSchemes.light.uiColors,
);

/**
 * Returns a set of iOS UI colors.
 */
export function useUIColors(): UIColors {
  return useContext(UIColorsContext);
}

export default UIColorsContext;
