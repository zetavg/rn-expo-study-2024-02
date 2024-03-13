import React from 'react';

import { useSeparatorColor } from '../hooks';

export function SeparatorColor({
  children,
  ...options
}: {
  children: (separatorColor: string) => React.ReactNode;
} & Parameters<typeof useSeparatorColor>[0]) {
  const separatorColor = useSeparatorColor(options);
  return children(separatorColor);
}

export default SeparatorColor;
