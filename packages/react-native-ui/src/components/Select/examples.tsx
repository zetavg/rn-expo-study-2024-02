import React, { useState } from 'react';
import { View } from 'react-native';

import Button from '../Button';
import Text from '../Text';

import Select, { Props } from './Select';

export const EXAMPLE_SELECT_OPTIONS: Props<string>['options'] = {
  js: { label: 'JavaScript' },
  ts: { label: 'TypeScript', icon: 'star.outline' as const },
  swift: { label: 'Swift' },
  kotlin: { label: 'Kotlin' },
};

export function ExampleUncontrolledSelect<T extends string>({
  showInfo,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options = EXAMPLE_SELECT_OPTIONS as any,
  ...props
}: Partial<Props<T>> & { showInfo?: boolean }) {
  const [value, setValue] = useState<T | undefined>(props.value);
  return (
    <>
      <Select
        {...props}
        options={options}
        value={value}
        onValueChange={setValue}
      />
      {showInfo && (
        // eslint-disable-next-line react-native/no-inline-styles
        <View style={{ marginTop: 12, gap: 4 }}>
          <Text>Selected value: {value || 'undefined'}</Text>
          <Button label="Clear Selection" onPress={() => setValue(undefined)} />
        </View>
      )}
    </>
  );
}
