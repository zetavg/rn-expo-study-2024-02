import { TextProps as TextPropsIOS } from '@rnstudy/react-native-ui-ios';
import { TextProps as TextPropsMD3 } from '@rnstudy/react-native-ui-md3';

import { Props as TextProps } from './Text';

export function textPropsToIOSProps(props: TextProps): TextPropsIOS {
  const { variant, ...restProps } = props;

  return {
    ...restProps,
    textStyle: variant,
  };
}

export function textPropsToMD3Props(props: TextProps): TextPropsMD3 {
  const { variant, emphasized, color, style, ...restProps } = props;

  const md3TextVariant: TextPropsMD3['variant'] = (() => {
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
        return 'bodyLarge' as const;

      default:
        return undefined;
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

  const md3TextColor: TextPropsMD3['color'] =
    color &&
    ((): NonNullable<TextPropsMD3['color']> => {
      switch (color) {
        case 'secondary':
          return 'secondary';
        case 'secondaryVariant':
          return 'secondaryVariant';
        case 'tertiary':
          return 'tertiaryVariant';
        case 'quaternary':
          return 'quaternary';
        case 'placeholder':
          return 'outlineVariant';
        case 'link':
        case 'tint':
          return 'primary';
        case 'destructive':
          return 'red';
        default:
          return 'onSurface';
      }
    })();

  return {
    ...restProps,
    variant: md3TextVariant,
    color: md3TextColor,
    style: [fontWeightStyle, style],
  };
}
