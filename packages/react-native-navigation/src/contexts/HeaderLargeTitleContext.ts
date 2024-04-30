import React, { useContext } from 'react';

export type HeaderLargeTitleContextValue = {
  headerLargeTitle?: boolean;
};

export const HeaderLargeTitleContext =
  React.createContext<HeaderLargeTitleContextValue>({});

export function useHeaderLargeTitleContext() {
  return useContext(HeaderLargeTitleContext);
}
