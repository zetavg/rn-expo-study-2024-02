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
    case 'top': {
      const padding = conditions.withHeader ? 18 : 24;

      if (conditions.first) {
        return padding - 8;
      }

      // This seems to not be in the official spec, but it's common in iOS apps.
      if (!conditions.withHeader) {
        return padding - 12;
      }

      return padding;
    }

    case 'bottom':
      return conditions.withFooter ? 18 : 24;
  }
}
