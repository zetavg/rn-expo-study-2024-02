import { createContext, useContext } from 'react';

export const IsGroupedBackgroundContextMD3 = createContext<boolean>(false);

export function useIsGroupedBackgroundMD3(): boolean {
  return useContext(IsGroupedBackgroundContextMD3);
}

export default IsGroupedBackgroundContextMD3;
