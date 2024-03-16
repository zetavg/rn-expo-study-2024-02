import React, { forwardRef } from 'react';
import { Text as RNText } from 'react-native';

import { usePropsWithContextualDefaultValues } from '@rnstudy/react-utils';

import { useTextStyles, useUIColors } from '../../contexts';

import TextPropsContext from './TextPropsContext';

export type Props = React.ComponentProps<typeof RNText> & {
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

export const Text = forwardRef<RNText, Props>(function Text(props: Props, ref) {
  const {
    style,
    textStyle = 'body',
    color,
    emphasized,
    ...restProps
  } = usePropsWithContextualDefaultValues(props, TextPropsContext);
  const uiColors = useUIColors();
  const textStyles = useTextStyles();
  return (
    <RNText
      ref={ref}
      {...restProps}
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
