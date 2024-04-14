import React, { useState } from 'react';

import SegmentedControl, { Props } from './SegmentedControl';

export const EXAMPLE_SELECT_OPTIONS: Props<string>['options'] = {
  js: 'JavaScript',
  ts: 'TypeScript',
  other: 'Other',
};

export function ExampleUncontrolledSegmentedControl<T extends string>({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options = EXAMPLE_SELECT_OPTIONS as any,
  ...props
}: Partial<Props<T>> & { showInfo?: boolean }) {
  const [value, setValue] = useState<T | undefined>(
    props.value || (Object.keys(options)[0] as T),
  );

  return (
    <>
      <SegmentedControl
        {...props}
        options={options}
        value={value}
        onValueChange={setValue}
      />
    </>
  );
}
