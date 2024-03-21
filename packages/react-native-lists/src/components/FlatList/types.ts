export type RenderItemParams<T> = {
  item: T;
  getIndex: () => number | undefined; // This is technically a "last known index" since cells don't necessarily rerender when their index changes
  drag: () => void;
  isActive: boolean;
  listPosition: 'first' | 'middle' | 'last' | 'only';
};

export type RenderItem<T> = (params: RenderItemParams<T>) => React.ReactNode;

export type SetItemTmpListPositionFunction = (
  p: 'first' | 'last' | 'middle' | null,
) => void;
