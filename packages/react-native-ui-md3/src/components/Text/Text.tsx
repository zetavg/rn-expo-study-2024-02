import React from 'react';
import { Text as PaperText } from 'react-native-paper';

import { useColorScheme, useTheme } from '../../contexts';
import { MD3Scheme } from '../../theming';

type Props = Partial<React.ComponentProps<typeof PaperText>> & {
  color?: keyof MD3Scheme | 'variant';
};

export function Text({ color, style, children, ...props }: Props) {
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

  return (
    <PaperText style={[{ color: textColor }, style]} {...props}>
      {children}
    </PaperText>
  );
}

export default Text;
