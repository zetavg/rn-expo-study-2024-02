import React, { useContext } from 'react';

export const TabBarPositionContext = React.createContext<
  'bottom' | 'left' | 'right' | undefined
>(undefined);

export function useTabBarPosition() {
  return useContext(TabBarPositionContext);
}
