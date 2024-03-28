import { MD3Scheme } from '../theming';

import { useColorScheme } from './ColorSchemeContext';
import { useTheme } from './ThemeContext';

export function useColors(): MD3Scheme {
  const theme = useTheme();
  const colorScheme = useColorScheme();
  return theme.schemes[colorScheme];
}
