import { getListPadding as getListPaddingIOS } from '@rnstudy/react-native-ui-ios';
import { getListPadding as getListPaddingMD3 } from '@rnstudy/react-native-ui-md3';

type ListStyle = 'plain' | 'grouped' | 'insetGrouped';

export type ListPaddingConditions = {
  listStyle?: ListStyle;
} & (
  | {
      position: 'top';
      withHeader: boolean;
      first: boolean;
    }
  | {
      position: 'bottom';
      withFooter: boolean;
    }
);

export function getListPadding(
  uiPlatform: 'ios' | 'android',
  conditions: ListPaddingConditions,
): number {
  switch (uiPlatform) {
    case 'ios': {
      return getListPaddingIOS(conditions);
    }
    case 'android': {
      return getListPaddingMD3(conditions);
    }
  }
}
