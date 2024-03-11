import React from 'react';

import { Colors, UIColors } from '../tokens/colors';
import {
  textStyles as defaultTextStyles,
  TextStyleTokens,
} from '../tokens/text-styles';

import ColorsContext from './ColorsContext';
import TextStylesContext from './TextStylesContext';
import UIColorsContext from './UIColorsContext';

export function ContextProvider({
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
