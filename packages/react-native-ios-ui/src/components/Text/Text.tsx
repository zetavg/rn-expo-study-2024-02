import React from 'react';
import { Text as RNText } from 'react-native';

import { useTextStyles } from '../../contexts/TextStylesContext';
import { useUIColors } from '../../contexts/UIColorsContext';
import { TextStyles } from '../../tokens/text-styles/types';

type Props = React.ComponentProps<typeof RNText> & {
  textStyle?: keyof TextStyles;
  emphasized?: boolean;
  color?: 'secondary' | 'tertiary' | 'quaternary';
};

export function Text({
  style,
  textStyle = 'body',
  color,
  emphasized,
  ...props
}: Props) {
  const uiColors = useUIColors();
  const textStyles = useTextStyles();
  return (
    <RNText
      {...props}
      style={[
        textStyles[textStyle],
        emphasized && textStyles[`${textStyle}_emphasized`],
        { color: color ? uiColors[`${color}Label`] : uiColors.label },
        style,
      ]}
    />
  );
}

export default Text;
