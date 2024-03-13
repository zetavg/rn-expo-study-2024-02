import React from 'react';
import { Text as RNText } from 'react-native';

import { Text as TextIOS } from '@rnstudy/react-native-ui-ios';
import { Text as TextMD3 } from '@rnstudy/react-native-ui-md3';

import { useUIPlatform } from '../../contexts';

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

type Color = 'secondary' | 'tertiary' | 'quaternary' | 'link' | 'placeholder';

type Props = React.ComponentProps<typeof RNText> & {
  children: React.ReactNode;
  variant?: Variant;
  color?: Color;
  emphasized?: boolean;
} & { [V in Variant]?: boolean } & { [V in Color]?: boolean };

export function Text({
  emphasized,

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

  style,

  ...props
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
    else variant = 'body';
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
          {...props}
          textStyle={variant}
          emphasized={emphasized}
          color={color}
          style={style}
        />
      );
    }
    case 'android': {
      const md3TextVariant: React.ComponentProps<typeof TextMD3>['variant'] =
        (() => {
          switch (variant) {
            case 'largeTitle':
              return 'headlineLarge' as const;

            case 'headline':
              return 'titleMedium' as const;
            case 'subheadline':
              return 'bodyMedium' as const;

            case 'title1':
              return 'headlineMedium' as const;
            case 'title2':
              return 'titleLarge' as const;
            case 'title3':
              return 'titleMedium' as const;

            case 'callout':
              return 'bodyMedium' as const;

            case 'footnote':
              return 'bodySmall' as const;

            case 'caption1':
              return 'labelMedium' as const;
            case 'caption2':
              return 'labelSmall' as const;

            case 'body':
            default:
              return 'bodyLarge' as const;
          }
        })();

      const fontWeightStyle = emphasized
        ? {
            fontWeight: (() => {
              switch (variant) {
                case 'headline':
                  return '600' as const;
                case 'subheadline':
                  return '600' as const;
                default:
                  return '700' as const;
              }
            })(),
          }
        : null;

      const md3TextColor = (() => {
        switch (color) {
          case 'secondary':
          case 'tertiary':
          case 'quaternary':
          case 'placeholder':
            return 'onSurfaceVariant';
          case 'link':
            return 'primary';
          default:
            return 'onSurface';
        }
      })();

      return (
        <TextMD3
          variant={md3TextVariant}
          color={md3TextColor}
          style={[fontWeightStyle, style]}
          {...props}
        />
      );
    }
  }
}

export default Text;
