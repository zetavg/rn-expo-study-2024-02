import React from 'react';
import { StyleSheet } from 'react-native';
import { Text as PaperText } from 'react-native-paper';

import { type IconProps, IconPropsContext } from '@rnstudy/react-icons';
import { usePropsWithContextualDefaultValues } from '@rnstudy/react-utils';
import {
  type ReactNodePropWithPropDefaultValuesContext,
  withPropDefaultValuesContext,
} from '@rnstudy/react-utils';

import { useColorScheme, useTheme } from '../../contexts';
import { MD3Scheme } from '../../theming';

import TextPropsContext from './TextPropsContext';

export type Props = Partial<React.ComponentProps<typeof PaperText>> & {
  color?: keyof MD3Scheme | 'variant';
  children?: ReactNodePropWithPropDefaultValuesContext<{
    iconProps: Partial<IconProps>;
  }>;
};

export function Text(rawProps: Props) {
  const {
    variant = 'bodyMedium',
    color,
    style,
    children,
    ...restProps
  } = usePropsWithContextualDefaultValues(rawProps, TextPropsContext);

  const theme = useTheme();
  const colorScheme = useColorScheme();

  const baseColorName = color && color !== 'variant' ? color : 'onSurface';

  const colorName =
    color === 'variant' ? (`${baseColorName}Variant` as const) : baseColorName;

  const textColor =
    colorName in theme.schemes[colorScheme]
      ? theme.schemes[colorScheme][
          colorName as keyof (typeof theme.schemes)['light']
        ]
      : theme.schemes[colorScheme][baseColorName];

  const fontSize = theme.fonts[variant].fontSize;

  const iconProps: Partial<IconProps> = {
    color: textColor,
    size: fontSize,
  };

  const wrappedChildren = withPropDefaultValuesContext(children, {
    iconProps: { value: iconProps, context: IconPropsContext },
  });

  return (
    <PaperText
      variant={variant}
      style={[{ color: textColor }, styles.text, style]}
      {...restProps}
    >
      {wrappedChildren}
    </PaperText>
  );
}

const styles = StyleSheet.create({
  text: { fontFamily: 'Roboto' },
});

export default Text;
