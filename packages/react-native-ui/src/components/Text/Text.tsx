import React from 'react';
import { Text as RNText } from 'react-native';

import { Text as TextIOS } from '@rnstudy/react-native-ui-ios';
import { Text as TextMD3 } from '@rnstudy/react-native-ui-md3';

import { useUIPlatform } from '../../contexts';

import { textPropsToIOSProps, textPropsToMD3Props } from './props-mapping';

type Variant =
  | 'largeTitle'
  | 'title1'
  | 'title2'
  | 'title3'
  | 'headline'
  | 'subheadline'
  | 'body'
  | 'callout'
  | 'footnote'
  | 'caption1'
  | 'caption2';

type Color =
  | 'default'
  | 'secondary'
  | 'secondaryVariant'
  | 'tertiary'
  | 'quaternary'
  | 'link'
  | 'placeholder'
  | 'tint';

export type Props = React.ComponentProps<typeof RNText> & {
  children?: React.ReactNode;
  variant?: Variant;
  color?: Color;
  emphasized?: boolean;
} & { [V in Variant]?: boolean } & { [V in Color]?: boolean };

export function Text({
  variant,

  largeTitle,
  title1,
  title2,
  title3,
  headline,
  subheadline,
  body,
  callout,
  footnote,
  caption1,
  caption2,

  color,

  secondary,
  tertiary,
  quaternary,
  placeholder,
  link,

  ...restProps
}: Props): JSX.Element {
  if (!variant) {
    if (largeTitle) variant = 'largeTitle';
    else if (title1) variant = 'title1';
    else if (title2) variant = 'title2';
    else if (title3) variant = 'title3';
    else if (headline) variant = 'headline';
    else if (subheadline) variant = 'subheadline';
    else if (body) variant = 'body';
    else if (callout) variant = 'callout';
    else if (footnote) variant = 'footnote';
    else if (caption1) variant = 'caption1';
    else if (caption2) variant = 'caption2';
  }

  if (!color) {
    if (secondary) color = 'secondary';
    else if (tertiary) color = 'tertiary';
    else if (quaternary) color = 'quaternary';
    else if (placeholder) color = 'placeholder';
    else if (link) color = 'link';
  }

  const uiPlatform = useUIPlatform();

  switch (uiPlatform) {
    case 'ios': {
      return (
        <TextIOS
          {...textPropsToIOSProps({
            ...restProps,
            variant,
            color,
          })}
        />
      );
    }
    case 'android': {
      return (
        <TextMD3
          {...textPropsToMD3Props({
            ...restProps,
            variant,
            color,
          })}
        />
      );
    }
  }
}

export default Text;
