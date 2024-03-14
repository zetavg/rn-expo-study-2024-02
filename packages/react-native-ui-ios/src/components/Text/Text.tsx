import React, { forwardRef } from 'react';
import { Text as RNText } from 'react-native';

import { useTextStyles, useUIColors } from '../../contexts';

type Props = React.ComponentProps<typeof RNText> & {
  textStyle?:
    | 'body'
    | 'callout'
    | 'caption1'
    | 'caption2'
    | 'footnote'
    | 'headline'
    | 'subheadline'
    | 'largeTitle'
    | 'title1'
    | 'title2'
    | 'title3';
  emphasized?: boolean;
  color?:
    | 'default'
    | 'secondary'
    | 'tertiary'
    | 'quaternary'
    | 'link'
    | 'placeholder';
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
          color:
            color && color !== 'default'
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
