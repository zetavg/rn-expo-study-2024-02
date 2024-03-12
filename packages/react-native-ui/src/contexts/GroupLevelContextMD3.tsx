import { createContext, useContext } from 'react';

export const GroupLevelContextMD3 = createContext<number | undefined>(
  undefined,
);

export function useGroupLevelMD3() {
  return useContext(GroupLevelContextMD3);
}

export default GroupLevelContextMD3;
