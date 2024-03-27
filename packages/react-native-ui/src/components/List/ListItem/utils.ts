import { getListItemHeight as getListItemHeightIOS } from '@rnstudy/react-native-ui-ios';
import { getListItemHeight as getListItemHeightMD3 } from '@rnstudy/react-native-ui-md3';

export function getListItemHeight(
  uiPlatform: 'ios' | 'android',
  {
    subtitle,
    compact,
    fontScale,
  }: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    subtitle?: React.ReactNode | ((...args: any) => void) | boolean;
    compact?: boolean;
    fontScale: number;
  },
): number {
  switch (uiPlatform) {
    case 'ios': {
      return getListItemHeightIOS({ subtitle, compact, fontScale });
    }
    case 'android': {
      return getListItemHeightMD3({ subtitle, compact, fontScale });
    }
  }
}
