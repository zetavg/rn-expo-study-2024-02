import { useColorScheme as useRNColorScheme } from 'react-native';

export default function useColorScheme(): 'light' | 'dark' {
  const rnColorScheme = useRNColorScheme();

  if (rnColorScheme === 'dark') {
    return 'dark';
  } else {
    return 'light';
  }
}
