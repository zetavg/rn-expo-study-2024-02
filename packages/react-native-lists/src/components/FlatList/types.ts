export type RenderItemParams<T> = {
  item: T;
  /** A function to get the index of the item in the list. */
  getIndex: () => number | undefined; // This is technically a "last known index" since cells don't necessarily rerender when their index changes
  drag: () => void;
  /** Whether the item is currently being dragged. */
  isDragActive: boolean;
  /** Same as `isDragActive`, for backward compatibility. */
  isActive: boolean;
  /** The position of the item in the list. */
  listPosition: 'first' | 'middle' | 'last' | 'only';
};

export type RenderItem<T> = (params: RenderItemParams<T>) => React.ReactNode;

export type SetItemTmpListPositionFunction = (
  p: 'first' | 'last' | 'middle' | null,
) => void;

export type {
  DragEndParams,
  DraggableFlatListProps,
} from 'react-native-draggable-flatlist/src/types';
