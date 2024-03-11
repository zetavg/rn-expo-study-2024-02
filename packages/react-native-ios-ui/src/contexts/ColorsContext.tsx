import { createContext, useContext } from 'react';

import { type Colors, light } from '../tokens/colors';

export const ColorsContext = createContext<Colors>(light.colors);

export function useColors(): Colors {
  return useContext(ColorsContext);
}

export default ColorsContext;
