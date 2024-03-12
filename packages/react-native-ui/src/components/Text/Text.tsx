import React from 'react';
import { Text as RNText } from 'react-native';
import {
  Text as PaperText,
  useTheme as usePaperTheme,
} from 'react-native-paper';

import { Text as TextIOS } from '@rnstudy/react-native-ios-ui';

import { useGroupLevelMD3 } from '../../contexts/GroupLevelContextMD3';
import { useMD3Scheme } from '../../hooks';
import { useMD3Theme } from '../../MD3ThemeContext';
import { useUIPlatform } from '../../UIPlatformContext';

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

type Color = 'secondary' | 'tertiary' | 'quaternary' | 'placeholder';

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

  ...props
}: Props) {
  const platform = useUIPlatform();
  const md3Scheme = useMD3Scheme();
  const md3Theme = useMD3Theme();
  const md3GroupLevel = useGroupLevelMD3();

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
  }

  switch (platform) {
    case 'ios': {
      return (
        <TextIOS
          {...props}
          textStyle={variant}
          emphasized={emphasized}
          color={color}
        />
      );
    }
    case 'android': {
      const materialVariant: React.ComponentProps<typeof PaperText>['variant'] =
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

      const textStyle = md3Theme.fonts[materialVariant];

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

      const colorStyle = (() => {
        switch (color) {
          case 'secondary':
          case 'tertiary':
          case 'quaternary':
          case 'placeholder':
            return { color: md3Scheme.onSurfaceVariant };
          default:
            return { color: md3Scheme.onSurface };
        }
      })();

      return (
        <RNText
          {...props}
          style={[textStyle, colorStyle, fontWeightStyle, props.style]}
        />
      );
    }
  }
}

export default Text;
