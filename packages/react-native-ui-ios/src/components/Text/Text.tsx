import React, { forwardRef } from 'react';
import { Text as RNText } from 'react-native';
import Color from 'color';

import { type IconProps, IconPropsContext } from '@rnstudy/react-icons';
import { usePropsWithContextualDefaultValues } from '@rnstudy/react-utils';
import {
  type ReactNodePropWithPropDefaultValuesContext,
  withPropDefaultValuesContext,
} from '@rnstudy/react-utils';

import { useColors, useTextStyles, useUIColors } from '../../contexts';

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
    | 'secondaryVariant'
    | 'tertiary'
    | 'quaternary'
    | 'link'
    | 'destructive'
    | 'placeholder'
    | 'tint';
  children?: ReactNodePropWithPropDefaultValuesContext<{
    iconProps: Partial<IconProps>;
  }>;
};

export const Text = forwardRef<RNText, Props>(function Text(
  rawProps: Props,
  ref,
) {
  const {
    style,
    textStyle = 'body',
    color: colorProp,
    emphasized,
    children,
    ...restProps
  } = usePropsWithContextualDefaultValues(rawProps, TextPropsContext);

  const colors = useColors();
  const uiColors = useUIColors();
  const textStyles = useTextStyles();

  const color =
    colorProp && colorProp !== 'default'
      ? colorProp === 'destructive'
        ? colors.red
        : colorProp === 'secondaryVariant'
          ? Color(uiColors.secondaryLabel).alpha(0.6).hexa()
          : uiColors[
              colorProp === 'placeholder'
                ? ('placeholderText' as const)
                : colorProp === 'link'
                  ? ('link' as const)
                  : colorProp === 'tint'
                    ? ('tintColor' as const)
                    : (`${colorProp}Label` as const)
            ]
      : uiColors.label;

  const iconProps: Partial<IconProps> = {
    color,
    size: textStyles[textStyle].fontSize,
  };

  const wrappedChildren = withPropDefaultValuesContext(children, {
    iconProps: { value: iconProps, context: IconPropsContext },
  });

  return (
    <RNText
      ref={ref}
      {...restProps}
      style={[
        textStyles[textStyle],
        emphasized && textStyles[`${textStyle}_emphasized`],
        { color },
        style,
      ]}
    >
      {wrappedChildren}
    </RNText>
  );
});

export default Text;
