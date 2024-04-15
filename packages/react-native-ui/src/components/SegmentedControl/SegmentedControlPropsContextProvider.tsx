import React from 'react';

import { SegmentedControlPropsContext as SegmentedControlPropsContextIOS } from '@rnstudy/react-native-ui-ios';
import { SegmentedControlPropsContext as SegmentedControlPropsContextMD3 } from '@rnstudy/react-native-ui-md3';

import { Props } from './SegmentedControl';

type SegmentedControlPropsContextValue = Partial<
  Omit<Props<string>, 'options' | 'value' | 'onValueChange'>
>;

export function SegmentedControlPropsContextProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: SegmentedControlPropsContextValue;
}) {
  return (
    <SegmentedControlPropsContextIOS.Provider value={value}>
      <SegmentedControlPropsContextMD3.Provider value={value}>
        {children}
      </SegmentedControlPropsContextMD3.Provider>
    </SegmentedControlPropsContextIOS.Provider>
  );
}
