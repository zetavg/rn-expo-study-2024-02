import React from 'react';

import { Colors, UIColors } from '../../tokens/colors';
import {
  textStyles as defaultTextStyles,
  TextStyleTokens,
} from '../../tokens/text-styles';

import ColorsContext from './ColorsContext';
import TextStylesContext from './TextStylesContext';
import UIColorsContext from './UIColorsContext';

/**
 * The iOS UI tokens context provider that should be used to wrap the entire application, providing the colors, text styles and other design tokens to all components.
 */
export function TokensContextProvider({
  colors,
  uiColors,
  textStyles = defaultTextStyles,
  children,
}: {
  colors: Colors;
  uiColors: UIColors;
  textStyles?: TextStyleTokens;
  children: React.ReactNode;
}) {
  return (
    <ColorsContext.Provider value={colors}>
      <UIColorsContext.Provider value={uiColors}>
        <TextStylesContext.Provider value={textStyles}>
          {children}
        </TextStylesContext.Provider>
      </UIColorsContext.Provider>
    </ColorsContext.Provider>
  );
}

export { useColors } from './ColorsContext';
export { useTextStyles } from './TextStylesContext';
export { useUIColors } from './UIColorsContext';
