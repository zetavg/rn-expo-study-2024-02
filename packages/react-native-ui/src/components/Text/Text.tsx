import React from 'react';
import { Text as RNText } from 'react-native';
import {
  Text as PaperText,
  useTheme as usePaperTheme,
} from 'react-native-paper';

import { Text as TextIOS } from '@rnstudy/react-native-ios-ui';

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

type Props = React.ComponentProps<typeof RNText> & {
  children: React.ReactNode;
  variant?: Variant;
  emphasized?: boolean;
  // textStyle?: keyof TextStyles;
  // emphasized?: boolean;
  // color?: 'secondary' | 'tertiary' | 'quaternary';
} & { [V in Variant]?: boolean };

export function Text({
  variant,
  emphasized,
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
  ...props
}: Props) {
  const platform = useUIPlatform();
  const theme = usePaperTheme();

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

  switch (platform) {
    case 'ios': {
      return <TextIOS {...props} textStyle={variant} emphasized={emphasized} />;
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

      const textStyle = theme.fonts[materialVariant];

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
      return (
        <RNText
          {...props}
          style={[
            textStyle,
            { color: theme.colors.onSurface },
            fontWeightStyle,
            props.style,
          ]}
        />
      );
    }
  }
}

export default Text;
