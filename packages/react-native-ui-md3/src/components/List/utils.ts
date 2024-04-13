import { DEFAULT_LIST_STYLE } from './consts';

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

export function getListPadding(conditions: ListPaddingConditions): number {
  const { listStyle = DEFAULT_LIST_STYLE } = conditions;

  if (listStyle === 'plain') {
    return 0;
  }

  switch (conditions.position) {
    case 'top': {
      const padding = conditions.withHeader ? 18 : 24;

      if (!conditions.withHeader) {
        return padding - 16;
      }

      return padding;
    }

    case 'bottom':
      return conditions.withFooter ? 18 : 24;
  }
}
