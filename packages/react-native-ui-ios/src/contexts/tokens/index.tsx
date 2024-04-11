import React from 'react';

import { ColorScheme } from '../../tokens/colors';
import {
  textStyles as defaultTextStyles,
  TextStyleTokens,
} from '../../tokens/text-styles';

import ColorSchemeTypeContext from './ColorSchemeTypeContext';
import ColorsContext from './ColorsContext';
import TextStylesContext from './TextStylesContext';
import UIColorsContext from './UIColorsContext';

/**
 * The iOS UI tokens context provider that should be used to wrap the entire application, providing the colors, text styles and other design tokens to all components.
 */
export function TokensContextProvider({
  colorScheme,
  textStyles = defaultTextStyles,
  children,
}: {
  colorScheme: ColorScheme;
  textStyles?: TextStyleTokens;
  children: React.ReactNode;
}) {
  return (
    <ColorSchemeTypeContext.Provider value={colorScheme.type}>
      <ColorsContext.Provider value={colorScheme.colors}>
        <UIColorsContext.Provider value={colorScheme.uiColors}>
          <TextStylesContext.Provider value={textStyles}>
            {children}
          </TextStylesContext.Provider>
        </UIColorsContext.Provider>
      </ColorsContext.Provider>
    </ColorSchemeTypeContext.Provider>
  );
}

export { useColors } from './ColorsContext';
export { useTextStyles } from './TextStylesContext';
export { useUIColors } from './UIColorsContext';
