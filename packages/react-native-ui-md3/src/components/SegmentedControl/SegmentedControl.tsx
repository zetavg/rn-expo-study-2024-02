import React, { useCallback, useMemo, useRef } from 'react';
import {
  Animated,
  LayoutChangeEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import RNNSegmentedControl, {
  type NativeSegmentedControlIOSChangeEvent,
} from '@react-native-segmented-control/segmented-control';
import Color from 'color';

import { usePropsWithContextualDefaultValues } from '@rnstudy/react-utils';

import { useColors, useColorScheme } from '../../contexts';

import SegmentedControlPropsContext from './SegmentedControlPropsContext';

// Force using the JS implementation of the SegmentedControl component.
const RNSegmentedControl: typeof RNNSegmentedControl =
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('@react-native-segmented-control/segmented-control/js/SegmentedControl.js').default;

export type Props<T extends string> = {
  disabled?: boolean;

  /**
   * The control's segment buttons. An object of values as keys and labels as values, in order.
   */
  options: { [key in T]: string };

  value: T | undefined;

  /**
   * Callback that is called when the user taps a segment; passes the segment's value as an argument
   */
  onValueChange?: (value: T) => void;

  emphasizeSelectedText?: boolean;

  height?: number;
  size?: 'small';

  style?: React.ComponentProps<typeof View>['style'];

  disableAdvancedAutoSizing?: boolean;
};

export function SegmentedControl<T extends string>(rawProps: Props<T>) {
  const { options, value, onValueChange } = rawProps;
  const {
    disabled,
    emphasizeSelectedText,
    height: heightProp = 32,
    size,
    style,
    disableAdvancedAutoSizing,
  } = usePropsWithContextualDefaultValues(
    rawProps,
    SegmentedControlPropsContext,
  );

  const values = useMemo(
    () => Reflect.ownKeys(options) as (keyof typeof options)[],
    [options],
  );
  const labels = useMemo(
    () => values.map((key) => options[key]),
    [options, values],
  );

  const handleChange = useCallback(
    (event: NativeSyntheticEvent<NativeSegmentedControlIOSChangeEvent>) => {
      const v = values[event.nativeEvent.selectedSegmentIndex];
      if (v) onValueChange?.(v);
    },
    [values, onValueChange],
  );

  const appearance = useColorScheme();
  const colors = useColors();

  const { fontScale } = useWindowDimensions();

  const fontSize = FONT_SIZE * (size === 'small' ? 0.8 : 1);

  const fontStyle = useMemo(
    () => ({
      fontSize,
      color: colors.onSurfaceVariant,
    }),
    [fontSize, colors.onSurfaceVariant],
  );

  const height =
    heightProp *
    Math.min(Math.max(fontScale, 1), 1.2) *
    (size === 'small' ? 0.8 : 1);

  const containerStyle = useMemo(
    () => ({
      height,
    }),
    [height],
  );

  const segmentedControlStyle = useMemo(
    () => ({
      height,
    }),
    [height],
  );

  const labelMaxWidths = useRef<number[]>([]);
  labelMaxWidths.current = [];
  const labelMaxWidthAnim = useRef(new Animated.Value(0)).current;

  const handleSizeMeasuringTextLayout = useCallback(
    (event: LayoutChangeEvent) => {
      if (disableAdvancedAutoSizing) return;

      if (labelMaxWidths.current.length === labels.length) {
        return;
      }

      const width = event.nativeEvent.layout.width;

      labelMaxWidths.current.push(width);

      if (labelMaxWidths.current.length === labels.length) {
        labelMaxWidthAnim.setValue(Math.max(...labelMaxWidths.current));
      }
    },
    [disableAdvancedAutoSizing, labelMaxWidthAnim, labels.length],
  );

  return (
    <View style={[styles.container, containerStyle, style]}>
      {/* Render all the labels to give the container a minimum width that fits all the labels. */}
      <Animated.View
        style={[
          styles.containerSizeMeasuringTextContainer,
          { minWidth: Animated.multiply(labelMaxWidthAnim, labels.length) },
        ]}
      >
        {labels.map((label, i) => (
          <Text
            key={i}
            numberOfLines={1}
            style={[
              styles.containerSizeMeasuringText,
              size === 'small' && styles.containerSizeMeasuringText_small,
              { fontSize },
            ]}
            onLayout={handleSizeMeasuringTextLayout}
          >
            {label}
          </Text>
        ))}
      </Animated.View>

      <RNSegmentedControl
        enabled={!disabled}
        appearance={appearance}
        values={labels}
        selectedIndex={value ? values.indexOf(value) : undefined}
        onChange={handleChange}
        style={[StyleSheet.absoluteFill, segmentedControlStyle]}
        backgroundColor={Color(colors.outlineVariant).alpha(0.5).hexa()}
        tintColor={colors.surface}
        fontStyle={fontStyle}
        activeFontStyle={
          emphasizeSelectedText ? styles.selectedText_emphasized : undefined
        }
      />
    </View>
  );
}

const FONT_SIZE = 13;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerSizeMeasuringTextContainer: {
    flexDirection: 'row',
  },
  containerSizeMeasuringText: {
    paddingHorizontal: 8,
    fontSize: FONT_SIZE,
    minWidth: 32,
    textAlign: 'center',
    opacity: 0,
  },
  containerSizeMeasuringText_small: {
    paddingHorizontal: 6,
  },
  selectedText_emphasized: {
    fontWeight: '600',
  },
});

export default SegmentedControl;
