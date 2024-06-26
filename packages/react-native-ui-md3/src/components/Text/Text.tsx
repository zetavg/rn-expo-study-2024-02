import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { Text as PaperText } from 'react-native-paper';
import Color from 'color';

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
  color?:
    | keyof MD3Scheme
    | 'variant'
    | 'secondaryVariant'
    | 'tertiaryVariant'
    | 'quaternary';
  monospaced?: boolean;
  children?: ReactNodePropWithPropDefaultValuesContext<{
    iconProps: Partial<IconProps>;
  }>;
};

export function Text(rawProps: Props) {
  const { children, ...propsWithoutChildren } =
    usePropsWithContextualDefaultValues(rawProps, TextPropsContext);
  const {
    variant = 'bodyLarge',
    color,
    style,
    monospaced,
    ...restProps
  } = propsWithoutChildren;

  const theme = useTheme();
  const colorScheme = useColorScheme();

  const baseColorName = color && color !== 'variant' ? color : 'onSurface';

  const colorName =
    color === 'variant' ? (`${baseColorName}Variant` as const) : baseColorName;

  const textColor = (() => {
    if (baseColorName === 'secondaryVariant') {
      return Color(theme.schemes[colorScheme].secondary).alpha(0.8).hexa();
    }
    if (baseColorName === 'tertiaryVariant') {
      return Color(theme.schemes[colorScheme].secondary).alpha(0.7).hexa();
    }
    if (baseColorName === 'quaternary') {
      return Color(theme.schemes[colorScheme].secondary).alpha(0.5).hexa();
    }

    return colorName in theme.schemes[colorScheme]
      ? theme.schemes[colorScheme][
          colorName as keyof (typeof theme.schemes)['light']
        ]
      : theme.schemes[colorScheme][baseColorName];
  })();

  const fontSize = theme.fonts[variant].fontSize;

  const iconProps: Partial<IconProps> = {
    color: textColor,
    size: fontSize,
  };

  const wrappedChildren = withPropDefaultValuesContext(children, {
    iconProps: { value: iconProps, context: IconPropsContext },
  });

  return (
    <TextPropsContext.Provider value={propsWithoutChildren}>
      <PaperText
        variant={variant}
        style={[
          { color: textColor },
          styles.text,
          monospaced && styles.monospaced,
          style,
        ]}
        {...restProps}
      >
        {wrappedChildren}
      </PaperText>
    </TextPropsContext.Provider>
  );
}

const styles = StyleSheet.create({
  text: { fontFamily: 'Roboto' },
  monospaced: {
    fontFamily: Platform.select({
      ios: 'Courier',
      android: 'monospace',
      default: 'monospace',
    }),
  },
});

export default Text;
