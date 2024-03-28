// From https://github.com/callstack/react-native-paper/issues/3689#issuecomment-1898908172

import React, { useCallback, useEffect, useState } from 'react';
import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import { Button, Icon, useTheme } from 'react-native-paper';
import { IconSource } from 'react-native-paper/lib/typescript/components/Icon';
import Animated, {
  Extrapolate,
  interpolate,
  interpolateColor,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export type Props = {
  value?: boolean;
  //   onPress: () => void;
  onValueChange?: (value: boolean) => void;
  fluid?: boolean;
  switchOnIcon?: IconSource; // IconSource from 'react-native-paper/lib/typescript/components/Icon'
  switchOffIcon?: IconSource; // IconSource from 'react-native-paper/lib/typescript/components/Icon'
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function Switch({
  value = false,
  //   onPress,
  onValueChange,
  switchOnIcon,
  switchOffIcon,
  disabled,
  style,
}: Props) {
  const theme = useTheme();
  const position = useSharedValue(value ? 10 : -10);
  const handleHeight = useSharedValue(value ? 24 : 16);
  const handleWidth = useSharedValue(value ? 24 : 16);
  const [active, setActive] = useState(value);
  const [isPressed, setIsPressed] = useState(false);
  //#region
  const pan = Gesture.Pan()
    .activateAfterLongPress(100)
    .onTouchesUp(() => setIsPressed(false))
    .runOnJS(true)
    .hitSlop(disabled ? -30 : 0)
    .onStart(() => {
      setIsPressed(true);
      handleHeight.value = withTiming(28, { duration: 160 });
      handleWidth.value = withTiming(28, { duration: 160 });
    })
    .onChange((event) => {
      if (position.value + event.translationX / 10 < -10) {
        position.value = -10;
        return;
      }
      if (position.value + event.translationX / 10 > 10) {
        position.value = 10;
        return;
      }
      position.value += event.translationX / 10;
    })
    .onEnd(() => {
      setIsPressed(false);
      if (position.value > 0) {
        position.value = withTiming(10);
        handleHeight.value = withTiming(24, { duration: 160 });
        handleWidth.value = withTiming(24, { duration: 160 }, (finished) => {
          'worklet';
          if (finished && !active) {
            runOnJS(callbackFunction)();
          }
        });
        return;
      }

      if (position.value < 0) {
        position.value = withTiming(-10);
        handleHeight.value = withTiming(16, { duration: 160 });
        handleWidth.value = withTiming(16, { duration: 160 }, (finished) => {
          'worklet';
          if (finished && active) {
            runOnJS(callbackFunction)();
          }
        });
      }
    });
  //#endregion
  const handleStyle = useAnimatedStyle(() =>
    disabled
      ? {
          transform: [{ translateX: active ? 10 : -10 }],
          height: active ? 24 : 16,
          width: active ? 24 : 16,
          marginVertical: 'auto',
          minHeight: switchOffIcon ? 24 : 16,
          minWidth: switchOffIcon ? 24 : 16,
          opacity: active ? 1 : 0.36,
          backgroundColor: active
            ? theme.colors.surface
            : theme.colors.onSurface,
          borderRadius: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }
      : {
          transform: [{ translateX: position.value }],
          opacity: 1,
          height: handleHeight.value,
          width: handleWidth.value,
          marginVertical: 'auto',
          minHeight: switchOffIcon ? 24 : 16,
          minWidth: switchOffIcon ? 24 : 16,
          backgroundColor: interpolateColor(
            position.value,
            [-10, 10],
            [theme.colors.outline, theme.colors.onPrimary],
          ),
          borderRadius: 20,
          justifyContent: 'center',
          alignItems: 'center',
        },
  );
  const trackStyle = useAnimatedStyle(() =>
    disabled
      ? {
          borderWidth: 2,
          borderRadius: 16,
          justifyContent: 'center',
          height: 32,
          width: 52,
          opacity: 0.12,
          backgroundColor: active
            ? theme.colors.onSurface
            : theme.colors.surfaceVariant,
          borderColor: theme.colors.onSurface,
        }
      : {
          alignItems: 'center',
          opacity: 1,
          backgroundColor: interpolateColor(
            position.value,
            [-10, 10],
            [theme.colors.surfaceVariant, theme.colors.primary],
          ),
          borderColor: interpolateColor(
            position.value,
            [-10, 10],
            [theme.colors.outline, theme.colors.primary],
          ),
          borderWidth: 2,
          borderRadius: 16,
          justifyContent: 'center',
          height: 32,
          width: 52,
        },
  );
  const handleOutlineStyle = useAnimatedStyle(() => ({
    height: 40,
    width: 40,
    borderRadius: 20,
    position: 'absolute',
    transform: [{ translateX: position.value }],
    backgroundColor: !isPressed
      ? 'transparent'
      : interpolateColor(
          position.value,
          [-10, 10],
          [theme.colors.onSurface, theme.colors.primary],
        ),
    alignItems: 'center',
    opacity: 0.18,
    justifyContent: 'center',
  }));

  const onSwitchPress = useCallback(() => {
    // onPress != null ? onPress() : null;
    onValueChange?.(active);
  }, [active, onValueChange]);

  const callbackFunction = useCallback(() => {
    onSwitchPress();
    setIsPressed(false);
  }, [onSwitchPress]);
  const iconOnStyle = useAnimatedStyle(() => ({
    opacity: disabled
      ? 0.38
      : interpolate(position.value, [0, 10], [0, 1], Extrapolate.CLAMP),
    overflow: 'hidden',
    transform: [
      {
        scale: interpolate(position.value, [0, 10], [0, 1], Extrapolate.CLAMP),
      },
      {
        rotate: `${interpolate(
          position.value,
          [0, 10],
          [-90, 0],
          Extrapolate.CLAMP,
        )}deg`,
      },
    ],
  }));
  const iconOffStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    opacity: disabled
      ? 0.38
      : interpolate(position.value, [-10, 0], [1, 0], Extrapolate.CLAMP),
    overflow: 'hidden',
    transform: [
      {
        scale: interpolate(position.value, [-10, 0], [1, 0], Extrapolate.CLAMP),
      },
      {
        rotate: `${interpolate(
          position.value,
          [-10, 0],
          [-90, 0],
          Extrapolate.CLAMP,
        )}deg`,
      },
    ],
    // width: interpolate(position.value, [5, 10], [0, 16]),
  }));
  const changeSwitch = useCallback(
    (withCallback: boolean) => {
      if (active) {
        handleHeight.value = withTiming(16, { duration: 100 });
        handleWidth.value = withTiming(16, { duration: 100 });
        position.value = withTiming(
          -10,
          { duration: 250 },
          withCallback
            ? (finished) => {
                'worklet';
                if (finished) {
                  runOnJS(callbackFunction)();
                }
              }
            : undefined,
        );
        setActive(false);
      } else {
        handleHeight.value = withTiming(24, { duration: 100 });
        handleWidth.value = withTiming(24, { duration: 100 });

        position.value = withTiming(
          10,
          { duration: 250 },
          withCallback
            ? (finished) => {
                'worklet';
                if (finished) {
                  runOnJS(callbackFunction)();
                }
              }
            : undefined,
        );
        setActive(true);
      }
    },
    [active, callbackFunction, handleHeight, handleWidth, position],
  );
  useEffect(() => {
    if (active !== value) {
      changeSwitch(false);
    }
    handleHeight.value = withTiming(value ? 24 : 16);
    handleWidth.value = withTiming(value ? 24 : 16);
  }, [active, changeSwitch, handleHeight, handleWidth, value]);
  return (
    <View
      style={[
        { borderRadius: 20, backgroundColor: theme.colors.surface },
        style,
      ]}
    >
      <View pointerEvents="none" style={styles.stateOuter}>
        <Animated.View style={handleOutlineStyle} key={3} />
      </View>
      <Animated.View style={trackStyle} key={1}>
        <GestureHandlerRootView>
          <GestureDetector gesture={pan}>
            <Pressable
              disabled={disabled}
              style={{
                justifyContent: 'center',
                height: 32,
                width: 52,
                alignItems: 'center',
              }}
              onLongPress={(event) => {
                handleHeight.value = withTiming(28, { duration: 100 });
                handleWidth.value = withTiming(28, { duration: 100 });
              }}
              onPress={() => {
                setIsPressed(true);
                changeSwitch(true);
              }}
            />
          </GestureDetector>
        </GestureHandlerRootView>
      </Animated.View>
      <View pointerEvents="none" style={styles.stateOuter}>
        <Animated.View style={handleStyle} key={2}>
          {switchOnIcon ? (
            <Animated.View key={10} style={iconOnStyle}>
              <Icon
                source={switchOnIcon}
                size={16}
                color={
                  disabled
                    ? theme.colors.onSurface
                    : theme.colors.onPrimaryContainer
                }
              />
            </Animated.View>
          ) : null}
          {switchOffIcon ? (
            <Animated.View key={9} style={iconOffStyle}>
              <Icon
                source={switchOffIcon}
                size={16}
                color={theme.colors.surface}
              />
            </Animated.View>
          ) : null}
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  stateOuter: {
    justifyContent: 'center',
    height: 32,
    width: 52,
    alignItems: 'center',
    position: 'absolute',
  },
});

export default Switch;
