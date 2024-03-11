import { createContext, useContext } from 'react';

import { light, type UIColors } from '../tokens/colors';

export const UIColorsContext = createContext<UIColors>(light.uiColors);

export function useUIColors(): UIColors {
  return useContext(UIColorsContext);
}

export default UIColorsContext;
