import { createContext, useContext } from 'react';

import { textStyles, type TextStyleTokens } from '../../tokens/text-styles';

/**
 * A context for passing a set of iOS text styles down the component tree.
 */
export const TextStylesContext = createContext<TextStyleTokens>(textStyles);

/**
 * Returns a set of iOS text styles.
 */
export function useTextStyles(): TextStyleTokens {
  return useContext(TextStylesContext);
}

export default TextStylesContext;
