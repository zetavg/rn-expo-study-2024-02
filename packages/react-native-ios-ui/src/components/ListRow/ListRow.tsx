import React, { useContext } from 'react';
import { Text } from 'react-native';

import ThemeContext from '../../ThemeContext';

type ListStyle = 'plain' | 'grouped' | 'insetGrouped';

type Props = {
  listStyle?: ListStyle;
};

export function ListRow({ listStyle }: Props) {
  const theme = useContext(ThemeContext);
  return <Text>Hello world!</Text>;
}
