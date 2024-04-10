import { createContext, useContext } from 'react';

export const IsElevatedBackgroundContext = createContext<boolean>(false);

export function useIsElevatedBackground(): boolean {
  return useContext(IsElevatedBackgroundContext);
}

export default IsElevatedBackgroundContext;
