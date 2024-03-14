import React, { forwardRef } from 'react';
import { Text as RNText } from 'react-native';

import { useTextStyles, useUIColors } from '../../contexts';
import { TextStyles } from '../../tokens';

type Props = React.ComponentProps<typeof RNText> & {
  textStyle?: keyof TextStyles;
  emphasized?: boolean;
  color?: 'secondary' | 'tertiary' | 'quaternary' | 'link' | 'placeholder';
};

export const Text = forwardRef<RNText, Props>(function Text(
  { style, textStyle = 'body', color, emphasized, ...props }: Props,
  ref,
) {
  const uiColors = useUIColors();
  const textStyles = useTextStyles();
  return (
    <RNText
      ref={ref}
      {...props}
      style={[
        textStyles[textStyle],
        emphasized && textStyles[`${textStyle}_emphasized`],
        {
          color: color
            ? uiColors[
                color === 'placeholder'
                  ? ('placeholderText' as const)
                  : color === 'link'
                    ? ('link' as const)
                    : (`${color}Label` as const)
              ]
            : uiColors.label,
        },
        style,
      ]}
    />
  );
});

export default Text;
