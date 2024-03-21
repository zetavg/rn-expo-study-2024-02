import React, { useEffect, useRef } from 'react';
import { useDraggableFlatListContext } from 'react-native-draggable-flatlist/src/context/draggableFlatListContext';
import { useRefs } from 'react-native-draggable-flatlist/src/context/refContext';
import { useStableCallback } from 'react-native-draggable-flatlist/src/hooks/useStableCallback';
import { typedMemo } from 'react-native-draggable-flatlist/src/utils';

import { RenderItem, SetItemTmpListPositionFunction } from './types';

type Props<T> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  extraData?: any;
  drag: (itemKey: string) => void;
  item: T;
  renderItem: RenderItem<T>;
  originalIndex: number;
  dataLength: number;
  itemKey: string;
  debug?: boolean;
  setActiveItemTmpListPositionFunctionRef: React.MutableRefObject<SetItemTmpListPositionFunction | null>;
  setFirstItemTmpListPositionFunctionRef: React.MutableRefObject<SetItemTmpListPositionFunction | null>;
  setSecondItemTmpListPositionFunctionRef: React.MutableRefObject<SetItemTmpListPositionFunction | null>;
  setPenultimateItemTmpListPositionFunctionRef: React.MutableRefObject<SetItemTmpListPositionFunction | null>;
  setLastItemTmpListPositionFunctionRef: React.MutableRefObject<SetItemTmpListPositionFunction | null>;
};

function RowItem<T>(props: Props<T>) {
  const propsRef = useRef(props);
  propsRef.current = props;

  const { activeKey } = useDraggableFlatListContext();
  const activeKeyRef = useRef(activeKey);
  activeKeyRef.current = activeKey;
  const { keyToIndexRef } = useRefs();

  const drag = useStableCallback(() => {
    const { drag, itemKey, debug } = propsRef.current;
    if (activeKeyRef.current) {
      // already dragging an item, noop
      if (debug)
        console.log(
          '## attempt to drag item while another item is already active, noop',
        );
    }
    drag(itemKey);
  });

  const { renderItem, item, itemKey, extraData } = props;

  const getIndex = useStableCallback(() => {
    return keyToIndexRef.current.get(itemKey);
  });

  const [tmpListPosition, setTmpListPosition] = React.useState<
    'first' | 'last' | 'middle' | null
  >(null);
  useEffect(() => {
    setTmpListPosition(null);
  }, [activeKey]);

  const isActive = activeKey === itemKey;

  if (isActive) {
    props.setActiveItemTmpListPositionFunctionRef.current = setTmpListPosition;
  } else if (props.originalIndex === 0) {
    props.setFirstItemTmpListPositionFunctionRef.current = setTmpListPosition;
  } else if (props.originalIndex === 1) {
    props.setSecondItemTmpListPositionFunctionRef.current = setTmpListPosition;
  } else if (props.originalIndex === props.dataLength - 2) {
    props.setPenultimateItemTmpListPositionFunctionRef.current =
      setTmpListPosition;
  } else if (props.originalIndex === props.dataLength - 1) {
    props.setLastItemTmpListPositionFunctionRef.current = setTmpListPosition;
  }

  return (
    <MemoizedInner
      isActive={isActive}
      drag={drag}
      renderItem={renderItem}
      item={item}
      getIndex={getIndex}
      listPosition={
        tmpListPosition ||
        calculateListPosition(props.originalIndex, props.dataLength)
      }
      extraData={extraData}
    />
  );
}

export default typedMemo(RowItem);

type InnerProps<T> = {
  isActive: boolean;
  item: T;
  getIndex: () => number | undefined;
  drag: () => void;
  listPosition: 'first' | 'middle' | 'last' | 'only';
  renderItem: RenderItem<T>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  extraData?: any;
};

function Inner<T>({ renderItem, extraData: _, ...rest }: InnerProps<T>) {
  return renderItem({ ...rest }) as JSX.Element;
}

const MemoizedInner = typedMemo(Inner);

export function calculateListPosition(
  index: number,
  dataLength: number,
): 'first' | 'middle' | 'last' | 'only' {
  if (dataLength === 1) {
    return 'only';
  }

  if (index === 0) {
    return 'first';
  }

  if (index === dataLength - 1) {
    return 'last';
  }

  return 'middle';
}
