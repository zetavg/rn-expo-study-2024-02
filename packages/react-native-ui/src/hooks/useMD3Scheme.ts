import { useColorScheme } from '../ColorSchemeContext';
import { useMD3Theme } from '../MD3ThemeContext';

export function useMD3Scheme() {
  const md3Theme = useMD3Theme();
  const colorScheme = useColorScheme();

  return md3Theme.schemes[colorScheme];
}

export default useMD3Scheme;
