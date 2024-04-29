import { useWindowDimensions } from 'react-native';

import { getListItemHeight as getListItemHeightIOS } from '@rnstudy/react-native-ui-ios';
import { getListItemHeight as getListItemHeightMD3 } from '@rnstudy/react-native-ui-md3';

import { useUIPlatform } from '../../../contexts';

type GetListItemHeightOptions = {
  /**
   * Whether the list item has a subtitle or not.
   */
  subtitle?:
    | React.ReactNode
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    | ((...args: any) => void)
    | boolean;
  /** Whether the list item is compact or not. */
  compact?: boolean;
  /** `windowDimensions.fontScale`. */
  fontScale: number;
};

/**
 * Returns the expected height of a ListItem with `fixedHeight` set to `true`.
 */
export function getListItemHeight(
  uiPlatform: 'ios' | 'android',
  { subtitle, compact, fontScale }: GetListItemHeightOptions,
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

/**
 * Returns the expected height of a ListItem with `fixedHeight` set to `true`.
 */
export function useListItemHeight(
  options: Partial<GetListItemHeightOptions>,
): number {
  const uiPlatform = useUIPlatform();
  const windowDimensions = useWindowDimensions();

  return getListItemHeight(uiPlatform, {
    fontScale: windowDimensions.fontScale,
    ...options,
  });
}
