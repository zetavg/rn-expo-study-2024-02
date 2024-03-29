import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  FlatListProps,
  LayoutChangeEvent,
  ListRenderItem,
  StyleSheet,
} from 'react-native';
import PlaceholderItem from 'react-native-draggable-flatlist/src/components/PlaceholderItem';
import ScrollOffsetListener from 'react-native-draggable-flatlist/src/components/ScrollOffsetListener';
import { DEFAULT_PROPS } from 'react-native-draggable-flatlist/src/constants';
import AnimatedValueProvider, {
  useAnimatedValues,
} from 'react-native-draggable-flatlist/src/context/animatedValueContext';
import DraggableFlatListProvider from 'react-native-draggable-flatlist/src/context/draggableFlatListContext';
import PropsProvider from 'react-native-draggable-flatlist/src/context/propsContext';
import RefProvider, {
  useRefs,
} from 'react-native-draggable-flatlist/src/context/refContext';
import { useStableCallback } from 'react-native-draggable-flatlist/src/hooks/useStableCallback';
import { DraggableFlatListProps } from 'react-native-draggable-flatlist/src/types';
import { typedMemo } from 'react-native-draggable-flatlist/src/utils';
import {
  FlatList as RNGHFlatList,
  Gesture,
  GestureDetector,
} from 'react-native-gesture-handler';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import Animated, {
  runOnJS,
  useAnimatedReaction,
  useAnimatedScrollHandler,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import CellRendererComponent from './CellRendererComponent';
import RowItem from './RowItem';
import { RenderItem, SetItemTmpListPositionFunction } from './types';
import { useAutoScroll } from './useAutoScroll';

type RNGHFlatListProps<T> = Animated.AnimateProps<
  FlatListProps<T> & {
    ref: React.Ref<RNGHFlatList<T>>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    simultaneousHandlers?: React.Ref<any> | React.Ref<any>[];
  }
>;

type OnViewableItemsChangedCallback<T> = Exclude<
  FlatListProps<T>['onViewableItemsChanged'],
  undefined | null
>;

const AnimatedFlatList = Animated.createAnimatedComponent(
  RNGHFlatList,
) as unknown as <T>(props: RNGHFlatListProps<T>) => React.ReactElement;

function DraggableFlatListInner<T>(props: Props<T>) {
  const {
    cellDataRef,
    containerRef,
    flatlistRef,
    keyToIndexRef,
    propsRef,
    animationConfigRef,
  } = useRefs<T>();
  const {
    activeCellOffset,
    activeCellSize,
    activeIndexAnim,
    containerSize,
    scrollOffset,
    scrollViewSize,
    spacerIndexAnim,
    horizontalAnim,
    placeholderOffset,
    touchTranslate,
    autoScrollDistance,
    panGestureState,
    isTouchActiveNative,
    viewableIndexMin,
    viewableIndexMax,
    disabled,
  } = useAnimatedValues();

  /** Used to log the timestamp of the time that the drag was activated. */
  const activeAtTimestampAnim = useSharedValue(0);

  const reset = useStableCallback(() => {
    activeIndexAnim.value = -1;
    spacerIndexAnim.value = -1;
    touchTranslate.value = 0;
    activeCellSize.value = -1;
    activeCellOffset.value = -1;
    setActiveKey(null);
  });

  const {
    dragHitSlop = DEFAULT_PROPS.dragHitSlop,
    scrollEnabled = DEFAULT_PROPS.scrollEnabled,
    activationDistance:
      activationDistanceProp = DEFAULT_PROPS.activationDistance,
  } = props;

  let [activeKey, setActiveKey] = useState<string | null>(null);
  const [layoutAnimationDisabled, setLayoutAnimationDisabled] = useState(
    !propsRef.current.enableLayoutAnimationExperimental,
  );

  const keyExtractor = useStableCallback((item: T, index: number) => {
    if (!props.keyExtractor) {
      throw new Error('You must provide a keyExtractor to DraggableFlatList');
    }
    return props.keyExtractor(item, index);
  });

  const dataRef = useRef(props.data);
  const dataHasChanged =
    dataRef.current.map(keyExtractor).join('') !==
    props.data.map(keyExtractor).join('');
  dataRef.current = props.data;
  if (dataHasChanged) {
    // When data changes make sure `activeKey` is nulled out in the same render pass
    activeKey = null;
  }

  useEffect(() => {
    if (!propsRef.current.enableLayoutAnimationExperimental) return;
    if (activeKey) {
      setLayoutAnimationDisabled(true);
    } else {
      // setTimeout result of trial-and-error to determine how long to wait before
      // re-enabling layout animations so that a drag reorder does not trigger it.
      setTimeout(() => {
        setLayoutAnimationDisabled(false);
      }, 100);
    }
  }, [propsRef, activeKey]);

  useLayoutEffect(() => {
    props.data.forEach((d, i) => {
      const key = keyExtractor(d, i);
      keyToIndexRef.current.set(key, i);
    });
  }, [props.data, keyExtractor, keyToIndexRef]);

  const drag = useStableCallback((activeKey_: string) => {
    if (disabled.value) return;
    const index = keyToIndexRef.current.get(activeKey_);
    const cellData = cellDataRef.current.get(activeKey_);
    if (cellData) {
      activeCellOffset.value = cellData.measurements.offset;
      activeCellSize.value = cellData.measurements.size;
    }

    const { onDragBegin } = propsRef.current;
    if (index !== undefined) {
      spacerIndexAnim.value = index;
      activeIndexAnim.value = index;
      activeAtTimestampAnim.value = Date.now();
      setActiveKey(activeKey_);
      ReactNativeHapticFeedback.trigger('impactLight');
      onDragBegin?.(index);
    }
  });

  const onContainerLayout = ({
    nativeEvent: { layout },
  }: LayoutChangeEvent) => {
    const { width, height } = layout;
    containerSize.value = props.horizontal ? width : height;
    props.onContainerLayout?.({ layout, containerRef });
  };

  const onListContentSizeChange = (w: number, h: number) => {
    scrollViewSize.value = props.horizontal ? w : h;
    props.onContentSizeChange?.(w, h);
  };

  const onContainerTouchStart = () => {
    if (!disabled.value) {
      isTouchActiveNative.value = true;
    }
    return false;
  };

  const onContainerTouchEnd = () => {
    isTouchActiveNative.value = false;
  };

  const extraData = useMemo(
    () => ({
      activeKey,
      extraData: props.extraData,
    }),
    [activeKey, props.extraData],
  );

  const setActiveItemTmpListPositionFunctionRef =
    useRef<null | SetItemTmpListPositionFunction>(null);
  const setFirstItemTmpListPositionFunctionRef =
    useRef<null | SetItemTmpListPositionFunction>(null);
  const setSecondItemTmpListPositionFunctionRef =
    useRef<null | SetItemTmpListPositionFunction>(null);
  const setPenultimateItemTmpListPositionFunctionRef =
    useRef<null | SetItemTmpListPositionFunction>(null);
  const setLastItemTmpListPositionFunctionRef =
    useRef<null | SetItemTmpListPositionFunction>(null);

  const renderItem: ListRenderItem<T> = useCallback(
    ({ item, index }) => {
      const key = keyExtractor(item, index);
      if (index !== keyToIndexRef.current.get(key)) {
        keyToIndexRef.current.set(key, index);
      }

      return (
        <RowItem
          item={item}
          itemKey={key}
          originalIndex={index}
          dataLength={props.data.length}
          renderItem={props.renderItem}
          drag={drag}
          extraData={props.extraData}
          setActiveItemTmpListPositionFunctionRef={
            setActiveItemTmpListPositionFunctionRef
          }
          setFirstItemTmpListPositionFunctionRef={
            setFirstItemTmpListPositionFunctionRef
          }
          setSecondItemTmpListPositionFunctionRef={
            setSecondItemTmpListPositionFunctionRef
          }
          setPenultimateItemTmpListPositionFunctionRef={
            setPenultimateItemTmpListPositionFunctionRef
          }
          setLastItemTmpListPositionFunctionRef={
            setLastItemTmpListPositionFunctionRef
          }
        />
      );
    },
    [
      keyToIndexRef,
      props.renderItem,
      props.extraData,
      drag,
      keyExtractor,
      props.data.length,
    ],
  );

  const onRelease = useStableCallback((index: number) => {
    props.onRelease?.(index);
  });

  const onDragEnd = useStableCallback(
    ({ from, to }: { from: number; to: number }) => {
      ReactNativeHapticFeedback.trigger('impactLight');

      const { onDragEnd: onDragEndProp, data } = props;

      const newData = [...data];
      if (from !== to) {
        newData.splice(from, 1);
        newData.splice(to, 0, data[from] as T);
      }

      onDragEndProp?.({ from, to, data: newData });
      reset();
    },
  );

  const onPlaceholderIndexChange = useStableCallback((index: number) => {
    ReactNativeHapticFeedback.trigger('impactLight');

    const from = activeIndexAnim.value;
    const to = spacerIndexAnim.value;

    const lastItemIndex = props.data.length - 1;

    // Set active item's temporary list position
    if (to <= 0) {
      setActiveItemTmpListPositionFunctionRef.current?.('first');
    } else if (to >= lastItemIndex) {
      setActiveItemTmpListPositionFunctionRef.current?.('last');
    } else {
      setActiveItemTmpListPositionFunctionRef.current?.('middle');
    }

    // If the first item is being moved, set the second item's temporary list position
    if (from === 0) {
      if (to !== 0) {
        setSecondItemTmpListPositionFunctionRef.current?.('first');
      } else {
        setSecondItemTmpListPositionFunctionRef.current?.(null);
      }
    }

    // If the last item is being moved, set the penultimate item's temporary list position
    if (from === lastItemIndex) {
      if (to !== lastItemIndex) {
        setPenultimateItemTmpListPositionFunctionRef.current?.('last');
      } else {
        setPenultimateItemTmpListPositionFunctionRef.current?.(null);
      }
    }

    // If the item is moved on top of the first item, set the first item's temporary list position
    if (from !== 0 && to === 0) {
      setFirstItemTmpListPositionFunctionRef.current?.('middle');
    } else if (from !== 0 && to !== 0) {
      setFirstItemTmpListPositionFunctionRef.current?.(null);
    }

    // If the item is moved below the last item, set the last item's temporary list position
    if (from !== lastItemIndex && to === lastItemIndex) {
      setLastItemTmpListPositionFunctionRef.current?.('middle');
    } else if (from !== lastItemIndex && to !== lastItemIndex) {
      setLastItemTmpListPositionFunctionRef.current?.(null);
    }

    props.onPlaceholderIndexChange?.(index);
  });

  // Handle case where user ends drag without moving their finger.
  useAnimatedReaction(
    () => {
      return isTouchActiveNative.value;
    },
    (cur, prev) => {
      if (cur !== prev && !cur) {
        const hasMoved = !!touchTranslate.value;
        if (!hasMoved && activeIndexAnim.value >= 0 && !disabled.value) {
          runOnJS(onRelease)(activeIndexAnim.value);
          runOnJS(onDragEnd)({
            from: activeIndexAnim.value,
            to: spacerIndexAnim.value,
          });
        }
      }
    },
    [isTouchActiveNative, onDragEnd, onRelease],
  );

  useAnimatedReaction(
    () => {
      return spacerIndexAnim.value;
    },
    (cur, prev) => {
      if (prev !== null && cur !== prev && cur >= 0 && prev >= 0) {
        runOnJS(onPlaceholderIndexChange)(cur);
      }
    },
    [spacerIndexAnim],
  );

  const gestureDisabled = useSharedValue(false);

  const panGesture = Gesture.Pan()
    .onBegin((evt) => {
      gestureDisabled.value = disabled.value;
      if (gestureDisabled.value) return;
      panGestureState.value = evt.state;
    })
    .onUpdate((evt) => {
      if (gestureDisabled.value) return;
      panGestureState.value = evt.state;
      const translation = horizontalAnim.value
        ? evt.translationX
        : evt.translationY;
      touchTranslate.value = translation;
    })
    .onEnd((evt) => {
      if (gestureDisabled.value) return;
      // Set touch val to current translate val
      isTouchActiveNative.value = false;
      const translation = horizontalAnim.value
        ? evt.translationX
        : evt.translationY;

      touchTranslate.value = translation + autoScrollDistance.value;
      panGestureState.value = evt.state;

      // Only call onDragEnd if actually dragging a cell
      if (activeIndexAnim.value === -1 || disabled.value) return;
      disabled.value = true;
      runOnJS(onRelease)(activeIndexAnim.value);
      const springTo = placeholderOffset.value - activeCellOffset.value;
      touchTranslate.value = withSpring(
        springTo,
        animationConfigRef.current,
        () => {
          runOnJS(onDragEnd)({
            from: activeIndexAnim.value,
            to: spacerIndexAnim.value,
          });
          disabled.value = false;
        },
      );
    })
    .onTouchesDown(() => {
      runOnJS(onContainerTouchStart)();
    })
    .onTouchesUp(() => {
      // Turning this into a worklet causes timing issues. We want it to run
      // just after the finger lifts.
      runOnJS(onContainerTouchEnd)();
    })
    .onFinalize(() => {
      // Prevent from stuck in dragging state while the gesture is not recognized - e.g. when the user drags away right after the touch, making the gesture canceled since it's treated as a scroll.
      runOnJS(onContainerTouchEnd)();
    });

  if (dragHitSlop) panGesture.hitSlop(dragHitSlop);
  if (activationDistanceProp) {
    const activeOffset = [-activationDistanceProp, activationDistanceProp];
    if (props.horizontal) {
      panGesture.activeOffsetX(activeOffset);
    } else {
      panGesture.activeOffsetY(activeOffset);
    }
  }

  const onScroll = useStableCallback((sOffset: number) => {
    props.onScrollOffsetChange?.(sOffset);
  });

  const scrollHandler = useAnimatedScrollHandler(
    {
      onScroll: (evt) => {
        scrollOffset.value = horizontalAnim.value
          ? evt.contentOffset.x
          : evt.contentOffset.y;
        runOnJS(onScroll)(scrollOffset.value);
      },
    },
    [horizontalAnim],
  );

  useAutoScroll({ activeAtTimestampAnim });

  const onViewableItemsChanged = useStableCallback<
    OnViewableItemsChangedCallback<T>
  >((info) => {
    const viewableIndices = info.viewableItems
      .filter((item) => item.isViewable)
      .map((item) => item.index)
      .filter((index): index is number => typeof index === 'number');

    const min = Math.min(...viewableIndices);
    const max = Math.max(...viewableIndices);
    viewableIndexMin.value = min;
    viewableIndexMax.value = max;
    props.onViewableItemsChanged?.(info);
  });

  return (
    <DraggableFlatListProvider
      activeKey={activeKey}
      keyExtractor={keyExtractor}
      horizontal={!!props.horizontal}
      layoutAnimationDisabled={layoutAnimationDisabled}
    >
      <GestureDetector gesture={panGesture}>
        <Animated.View
          style={props.containerStyle}
          ref={containerRef}
          onLayout={onContainerLayout}
        >
          {props.renderPlaceholder && (
            <PlaceholderItem renderPlaceholder={props.renderPlaceholder} />
          )}
          <AnimatedFlatList
            {...props}
            windowSize={props.windowSize ?? 5} // Use a smaller default windowSize (default is 21)
            style={[styles.flatList, props.style]}
            data={props.data}
            onViewableItemsChanged={onViewableItemsChanged}
            CellRendererComponent={CellRendererComponent}
            ref={flatlistRef}
            onContentSizeChange={onListContentSizeChange}
            scrollEnabled={!activeKey && scrollEnabled}
            renderItem={renderItem}
            extraData={extraData}
            keyExtractor={keyExtractor}
            onScroll={scrollHandler}
            scrollEventThrottle={16}
            simultaneousHandlers={props.simultaneousHandlers}
            removeClippedSubviews={false}
          />
          {!!props.onScrollOffsetChange && (
            <ScrollOffsetListener
              onScrollOffsetChange={props.onScrollOffsetChange}
              scrollOffset={scrollOffset}
            />
          )}
        </Animated.View>
      </GestureDetector>
    </DraggableFlatListProvider>
  );
}

function DraggableFlatList<T>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: any,
  ref?: React.ForwardedRef<RNGHFlatList<T>> | null,
) {
  return (
    <PropsProvider {...props}>
      <AnimatedValueProvider>
        <RefProvider flatListRef={ref}>
          <MemoizedInner {...props} />
        </RefProvider>
      </AnimatedValueProvider>
    </PropsProvider>
  );
}

const MemoizedInner = typedMemo(DraggableFlatListInner);

type Modify<T, R> = Omit<T, keyof R> & R;

type Props<T> = Modify<
  DraggableFlatListProps<T>,
  { renderItem: RenderItem<T> }
>;

// Generic forwarded ref type assertion taken from:
// https://fettblog.eu/typescript-react-generic-forward-refs/#option-1%3A-type-assertion
export const FlatList = React.forwardRef(DraggableFlatList) as <T>(
  props: Props<T> & {
    ref?: React.ForwardedRef<RNGHFlatList<T>>;
  },
) => ReturnType<typeof DraggableFlatList>;

const styles = StyleSheet.create({
  flatList: {
    height: '100%',
  },
});

export default FlatList;
