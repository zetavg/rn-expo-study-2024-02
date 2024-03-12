import { createContext, useContext } from 'react';

import { light, type UIColors } from '../tokens/colors';

/**
 * A context for passing a set of iOS UI colors down the component tree.
 */
export const UIColorsContext = createContext<UIColors>(light.uiColors);

/**
 * Returns a set of iOS UI colors.
 */
export function useUIColors(): UIColors {
  return useContext(UIColorsContext);
}

export default UIColorsContext;
