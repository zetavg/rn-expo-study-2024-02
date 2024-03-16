import React, { useCallback, useMemo } from 'react';
import {
  ActivityIndicator,
  Alert,
  Animated,
  GestureResponderEvent,
  Insets,
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Color from 'color';

// import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import { useUIColors } from '../../contexts';
import Text from '../Text';

// const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const AnimatedText = Animated.createAnimatedComponent(Text);

type ButtonStyle = 'plain' | 'gray' | 'tinted' | 'filled';

type ControlSize = 'small' | 'regular' | 'medium' | 'large';

type ButtonBorderShape = 'automatic' | 'capsule' | 'roundedRectangle';

type Props = {
  label?: string;
  buttonStyle?: ButtonStyle;
  controlSize?: ControlSize;
  buttonBorderShape?: ButtonBorderShape;
  style?: StyleProp<ViewStyle>;
  loading?: boolean;
  disabled?: boolean;
} & {
  // Re-exposing common PressableProps so that they can be picked-up by react-docgen.
  onPress?: PressableProps['onPress'];
  onPressIn?: PressableProps['onPressIn'];
  onPressOut?: PressableProps['onPressOut'];
  onLongPress?: PressableProps['onLongPress'];
} & Omit<PressableProps, 'children'>;

const DEFAULT_HIT_SLOPS: { [k in ControlSize]: Insets } = {
  small: {
    top: 8,
    bottom: 8,
    left: 2,
    right: 2,
  },
  regular: {
    top: 4,
    bottom: 4,
    left: 1,
    right: 1,
  },
  medium: {},
  large: {},
};

export function Button({
  label,
  buttonStyle: buttonStyleFromProps = 'plain',
  controlSize: controlSizeFromProps,
  buttonBorderShape: buttonBorderShapeFromProps = 'automatic',
  style,
  loading,
  disabled,
  onPressIn,
  onPressOut,
  hitSlop: hitSlopFromProps,
  ...props
}: Props) {
  const uiColors = useUIColors();

  const buttonStyle = buttonStyleFromProps;

  const controlSize = controlSizeFromProps || 'regular';

  const buttonBorderShape = (() => {
    if (buttonBorderShapeFromProps === 'automatic') {
      switch (controlSize) {
        case 'small':
          return 'capsule';
        case 'regular':
          return 'capsule';
        case 'medium':
          return 'roundedRectangle';
        case 'large':
          return 'roundedRectangle';
      }
    }
    return buttonBorderShapeFromProps;
  })();

  const textStyle = controlSize === 'large' ? 'body' : 'subheadline';

  const backgroundColor = (() => {
    if (disabled && buttonStyle !== 'plain') {
      return uiColors.tertiarySystemFill;
    }

    switch (buttonStyle) {
      case 'plain':
        return 'transparent';
      case 'gray':
        return uiColors.tertiarySystemFill;
      case 'tinted':
        return Color(uiColors.tintColor).alpha(0.2).string();
      case 'filled':
        return uiColors.tintColor;
    }
  })();

  const color = (() => {
    if (disabled) return uiColors.tertiaryLabel;

    switch (buttonStyle) {
      case 'filled':
        return uiColors.onTintColor;
      default:
        return uiColors.tintColor;
    }
  })();

  const overlayColor = useMemo(() => {
    switch (buttonStyle) {
      case 'filled':
        return Color(uiColors.tintColor).lighten(0.5).alpha(0.4).string();
      case 'tinted':
        return Color(uiColors.tintColor).lightness(90).alpha(0.1).string();
      case 'gray':
        return Color(uiColors.tertiarySystemFill)
          .lightness(100)
          .alpha(0.1)
          .string();
      default:
        return 'transparent';
    }
  }, [buttonStyle, uiColors.tintColor, uiColors.tertiarySystemFill]);

  const backgroundOverlayColor = useMemo(() => {
    switch (buttonStyle) {
      case 'tinted':
        return Color(uiColors.tertiarySystemFill)
          .lightness(100)
          .alpha(0.4 * (Color(uiColors.systemBackground).lightness() / 100))
          .string();
      case 'gray':
        return Color(uiColors.tertiarySystemFill)
          .lightness(100)
          .alpha(0.3 * (Color(uiColors.systemBackground).lightness() / 100))
          .string();
      default:
        return 'transparent';
    }
  }, [buttonStyle, uiColors.tertiarySystemFill, uiColors.systemBackground]);

  const contentOpacity = useMemo(() => new Animated.Value(1), []);
  const overlayOpacity = useMemo(() => new Animated.Value(0), []);

  const handlePressIn = useMemo(() => {
    switch (buttonStyle) {
      case 'plain':
        return (event: GestureResponderEvent) => {
          Animated.timing(contentOpacity, {
            toValue: 0.75,
            duration: 5,
            useNativeDriver: true,
          }).start();
          onPressIn?.(event);
        };
      default:
        return (event: GestureResponderEvent) => {
          Animated.timing(overlayOpacity, {
            toValue: 1,
            duration: 0,
            useNativeDriver: true,
          }).start();
          onPressIn?.(event);
        };
    }
  }, [buttonStyle, contentOpacity, overlayOpacity, onPressIn]);

  const handlePressOut = useMemo(() => {
    switch (buttonStyle) {
      case 'plain':
        return (event: GestureResponderEvent) => {
          Animated.timing(contentOpacity, {
            toValue: 1,
            duration: 50,
            useNativeDriver: true,
          }).start();
          onPressOut?.(event);
        };
      default:
        return (event: GestureResponderEvent) => {
          Animated.timing(overlayOpacity, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }).start();
          onPressOut?.(event);
        };
    }
  }, [buttonStyle, contentOpacity, overlayOpacity, onPressOut]);

  // const handlePressIn = useMemo(() => {
  //   if (buttonStyle !== 'borderless') return onPressIn;
  //   return (event: GestureResponderEvent) => {
  //     Animated.timing(opacity, {
  //       toValue: 0.4,
  //       duration: 100,
  //       useNativeDriver: true,
  //     }).start();
  //     onPressIn?.(event);
  //   };
  // }, [buttonStyle, opacity, onPressIn]);
  // // const handlePressOut = () => {

  // // };
  // const handlePressOut = useMemo(() => {
  //   return (event: GestureResponderEvent) => {
  //     Animated.timing(opacity, {
  //       toValue: 1,
  //       duration: 200,
  //       useNativeDriver: true,
  //     }).start();
  //   };
  // }, [buttonStyle, opacity, onPressIn]);

  // const opacity = useSharedValue(1);

  // const handlePressIn = () => {
  //   opacity.value = withSpring(0.8);
  // };

  // const handlePressOut = () => {
  //   opacity.value = withSpring(1);
  // };

  const hitSlop = hitSlopFromProps || DEFAULT_HIT_SLOPS[controlSize];

  return (
    <Pressable
      {...props}
      disabled={disabled}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      hitSlop={hitSlop}
      style={(state) => [
        styles[`container_${controlSize}`],
        styles.container,
        {
          backgroundColor,
          // opacity,
        },
        buttonBorderShape === 'capsule'
          ? styles.capsule
          : styles.roundedRectangle,
        buttonStyle === 'plain' &&
          state.pressed &&
          styles.container_borderless_pressed,
        style,
      ]}
    >
      <Animated.View
        style={[
          styles.colorOverlay,
          { backgroundColor: backgroundOverlayColor, opacity: overlayOpacity },
        ]}
      />
      <AnimatedText
        textStyle={textStyle}
        style={[
          { color, opacity: contentOpacity },
          loading && styles.content_loading,
        ]}
      >
        {label}
      </AnimatedText>
      <Animated.View
        style={[
          styles.colorOverlay,
          { backgroundColor: overlayColor, opacity: overlayOpacity },
        ]}
      />
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator
            color={
              buttonStyle === 'filled' && !disabled
                ? uiColors.onTintColor
                : uiColors.systemGray
            }
          />
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    overflow: 'hidden',
  },
  container_small: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    gap: 3,
  },
  container_regular: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    gap: 4,
  },
  container_medium: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 4,
  },
  container_large: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    gap: 4,
  },
  container_borderless_pressed: {
    opacity: 0.5,
  },
  capsule: {
    borderRadius: 9999,
  },
  roundedRectangle: {
    borderRadius: 12,
  },
  content_loading: {
    opacity: 0.25,
  },
  colorOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Button;
