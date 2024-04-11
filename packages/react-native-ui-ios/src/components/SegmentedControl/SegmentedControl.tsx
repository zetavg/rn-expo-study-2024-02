import React, { useCallback, useMemo } from 'react';
import {
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import RNSegmentedControl, {
  NativeSegmentedControlIOSChangeEvent,
} from '@react-native-segmented-control/segmented-control';

import { useColorSchemeType } from '../../contexts/tokens/ColorSchemeTypeContext';

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

  style?: React.ComponentProps<typeof View>['style'];
};

export function SegmentedControl<T extends string>({
  options,
  value,
  onValueChange,
  disabled,
  style,
}: Props<T>) {
  const { fontScale } = useWindowDimensions();

  const appearance = useColorSchemeType();

  const values = useMemo(
    () => Reflect.ownKeys(options) as (keyof typeof options)[],
    [options],
  );
  const labels = useMemo(
    () => values.map((key) => options[key]),
    [options, values],
  );

  const fontStyle = useMemo(
    () => ({
      fontSize: FONT_SIZE * fontScale,
    }),
    [fontScale],
  );

  const height = HEIGHT * Math.min(Math.max(fontScale, 1), 1.2);

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

  const handleChange = useCallback(
    (event: NativeSyntheticEvent<NativeSegmentedControlIOSChangeEvent>) => {
      const v = values[event.nativeEvent.selectedSegmentIndex];
      if (v) onValueChange?.(v);
    },
    [values, onValueChange],
  );

  return (
    <View style={[styles.container, containerStyle, style]}>
      {/* Render all the labels to give the container a minimum width that fits all the labels. */}
      <View style={styles.containerAutoSizeTextContainer}>
        {labels.map((label, i) => (
          <Text key={i} style={styles.containerAutoSizeText}>
            {label}
          </Text>
        ))}
      </View>

      <RNSegmentedControl
        enabled={!disabled}
        appearance={appearance}
        values={labels}
        selectedIndex={value ? values.indexOf(value) : undefined}
        onChange={handleChange}
        style={[StyleSheet.absoluteFill, segmentedControlStyle]}
        fontStyle={fontStyle}
      />
    </View>
  );
}

const HEIGHT = 32;

const FONT_SIZE = 13;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerAutoSizeTextContainer: {
    flexDirection: 'row',
    marginHorizontal: 8,
    gap: 8,
  },
  containerAutoSizeText: {
    fontSize: FONT_SIZE,
    minWidth: 32,
    textAlign: 'center',
    opacity: 0,
  },
});

export default SegmentedControl;
