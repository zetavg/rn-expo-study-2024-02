import { createContext, useContext } from 'react';

import { textStyles, type TextStyleTokens } from '../tokens/text-styles';

export const TextStylesContext = createContext<TextStyleTokens>(textStyles);

export function useTextStyles(): TextStyleTokens {
  return useContext(TextStylesContext);
}

export default TextStylesContext;
