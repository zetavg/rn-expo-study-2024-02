import React from 'react';

export const ExitContext = React.createContext<(() => void) | undefined>(
  undefined,
);

export function useExit() {
  return React.useContext(ExitContext);
}
