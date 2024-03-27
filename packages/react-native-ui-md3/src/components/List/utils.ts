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
  if (conditions.listStyle === 'plain' && conditions.position === 'top') {
    return 0;
  }

  switch (conditions.position) {
    case 'top':
      return conditions.withHeader ? 18 : 24;

    case 'bottom':
      return conditions.withFooter ? 18 : 24;
  }
}
