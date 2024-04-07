import { getListPadding as getListPaddingIOS } from '@rnstudy/react-native-ui-ios';
import { getListPadding as getListPaddingMD3 } from '@rnstudy/react-native-ui-md3';

type ListStyle = 'plain' | 'grouped' | 'insetGrouped';

export type ListPaddingConditions = {
  /** The style of the list which the padding is for. */
  listStyle?: ListStyle;
} & (
  | {
      position: 'top';
      /** Set this to `true` if the padding is for a list that has a header. This will make the list have the correct top padding. */
      withHeader: boolean;
      /** Set this to `true` if the padding is for a list as the first element in a view. This will make the list have the correct top padding. */
      first: boolean;
    }
  | {
      position: 'bottom';
      /** Set this to `true` if the padding is for a list that has a footer. This will make the list have the correct top padding. */
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
