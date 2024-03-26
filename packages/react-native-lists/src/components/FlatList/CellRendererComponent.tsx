/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useMemo, useRef } from 'react';
import {
  findNodeHandle,
  LayoutChangeEvent,
  MeasureLayoutOnSuccessCallback,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { isWeb } from 'react-native-draggable-flatlist/src/constants';
import { useAnimatedValues } from 'react-native-draggable-flatlist/src/context/animatedValueContext';
import CellProvider from 'react-native-draggable-flatlist/src/context/cellContext';
import { useDraggableFlatListContext } from 'react-native-draggable-flatlist/src/context/draggableFlatListContext';
import { useRefs } from 'react-native-draggable-flatlist/src/context/refContext';
import { useCellTranslate } from 'react-native-draggable-flatlist/src/hooks/useCellTranslate';
import { useStableCallback } from 'react-native-draggable-flatlist/src/hooks/useStableCallback';
import { typedMemo } from 'react-native-draggable-flatlist/src/utils';
import Animated, {
  runOnUI,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

type Props<T> = {
  item: T;
  index: number;
  children: React.ReactNode;
  onLayout?: (e: LayoutChangeEvent) => void;
  style?: StyleProp<ViewStyle>;
};

function CellRendererComponent<T>(props: Props<T>) {
  const { item, index, onLayout, children, ...rest } = props;

  const viewRef = useRef<Animated.View>(null);
  const { cellDataRef, propsRef, containerRef } = useRefs<T>();

  const { horizontalAnim, scrollOffset } = useAnimatedValues();
  const { activeKey, keyExtractor, horizontal, layoutAnimationDisabled } =
    useDraggableFlatListContext<T>();

  const key = keyExtractor(item, index);
  const offset = useSharedValue(-1);
  const size = useSharedValue(-1);
  const heldTranslate = useSharedValue(0);

  const translate = useCellTranslate({
    cellOffset: offset,
    cellSize: size,
    cellIndex: index,
  });

  const isActive = activeKey === key;

  const animStyle = useAnimatedStyle(() => {
    // When activeKey becomes null at the end of a drag and the list reorders,
    // the animated style may apply before the next paint, causing a flicker.
    // Solution is to hold over the last animated value until the next onLayout.
    // (Not required in web)
    if (translate.value && !isWeb) {
      heldTranslate.value = translate.value;
    }
    const t = activeKey ? translate.value : heldTranslate.value;
    return {
      transform: [horizontalAnim.value ? { translateX: t } : { translateY: t }],
    };
  }, [translate, activeKey]);

  const updateCellMeasurements = useStableCallback(() => {
    const onSuccess: MeasureLayoutOnSuccessCallback = (x, y, w, h) => {
      if (isWeb && horizontal) x += scrollOffset.value;
      const cellOffset = horizontal ? x : y;
      const cellSize = horizontal ? w : h;
      cellDataRef.current.set(key, {
        measurements: { size: cellSize, offset: cellOffset },
      });

      size.value = cellSize;
      offset.value = cellOffset;
    };

    const onFail = () => {
      if (propsRef.current?.debug) {
        console.log(`## on measure fail, index: ${index}`);
      }
    };

    const containerNode = containerRef.current;
    const viewNode = viewRef.current;
    const nodeHandle = containerNode;

    if (viewNode && nodeHandle) {
      viewNode.measureLayout(nodeHandle, onSuccess, onFail);
    }
  });

  const onCellLayout = useStableCallback((e?: LayoutChangeEvent) => {
    heldTranslate.value = 0;
    updateCellMeasurements();
    if (onLayout && e) onLayout(e);
  });

  useEffect(() => {
    if (isWeb) {
      // onLayout isn't called on web when the cell index changes, so we manually re-measure
      requestAnimationFrame(() => {
        onCellLayout();
      });
    }
  }, [index, onCellLayout]);

  const baseStyle = useMemo(() => {
    return {
      elevation: isActive ? 1 : 0,
      zIndex: isActive ? 999 : 0,
      flexDirection: horizontal ? ('row' as const) : ('column' as const),
    };
  }, [isActive, horizontal]);

  const { itemEnteringAnimation, itemExitingAnimation, itemLayoutAnimation } =
    propsRef.current;

  useEffect(() => {
    // NOTE: Keep an eye on reanimated LayoutAnimation refactor:
    // https://github.com/software-mansion/react-native-reanimated/pull/3332/files
    // We might have to change the way we register/unregister LayouAnimations:
    // - get native module: https://github.com/software-mansion/react-native-reanimated/blob/cf59766460d05eb30357913455318d8a95909468/src/reanimated2/NativeReanimated/NativeReanimated.ts#L18
    // - register layout animation for tag: https://github.com/software-mansion/react-native-reanimated/blob/cf59766460d05eb30357913455318d8a95909468/src/reanimated2/NativeReanimated/NativeReanimated.ts#L99
    if (!propsRef.current.enableLayoutAnimationExperimental) return;
    const tag = findNodeHandle(viewRef.current);

    runOnUI((t: number | null, _layoutDisabled) => {
      'worklet';
      if (!t) return;
      const config = (global as any).LayoutAnimationRepository.configs[t];
      if (config) stashConfig(t, config);
      const stashedConfig = getStashedConfig(t);
      if (_layoutDisabled) {
        (global as any).LayoutAnimationRepository.removeConfig(t);
      } else if (stashedConfig) {
        (global as any).LayoutAnimationRepository.registerConfig(
          t,
          stashedConfig,
        );
      }
    })(tag, layoutAnimationDisabled);
  }, [propsRef, layoutAnimationDisabled]);

  return (
    <Animated.View
      {...rest}
      ref={viewRef}
      onLayout={onCellLayout}
      entering={itemEnteringAnimation}
      exiting={itemExitingAnimation}
      layout={
        propsRef.current.enableLayoutAnimationExperimental
          ? itemLayoutAnimation
          : undefined
      }
      style={[
        props.style,
        baseStyle,
        activeKey ? animStyle : styles.zeroTranslate,
      ]}
      pointerEvents={activeKey ? 'none' : 'auto'}
    >
      <CellProvider isActive={isActive}>{children}</CellProvider>
    </Animated.View>
  );
}

export default typedMemo(CellRendererComponent);

const styles = StyleSheet.create({
  zeroTranslate: {
    transform: [{ translateX: 0 }, { translateY: 0 }],
  },
});

runOnUI(() => {
  'worklet';
  (global as any).RNDFLLayoutAnimationConfigStash = {};
})();

function stashConfig(tag: number, config: unknown) {
  'worklet';
  if (!(global as any).RNDFLLayoutAnimationConfigStash)
    (global as any).RNDFLLayoutAnimationConfigStash = {};
  (global as any).RNDFLLayoutAnimationConfigStash[tag] = config;
}

function getStashedConfig(tag: number) {
  'worklet';
  if (!(global as any).RNDFLLayoutAnimationConfigStash) return null;
  return (global as any).RNDFLLayoutAnimationConfigStash[tag] as Record<
    string,
    unknown
  >;
}
