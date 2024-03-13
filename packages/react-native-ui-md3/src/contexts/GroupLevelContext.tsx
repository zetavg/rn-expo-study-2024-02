import { createContext, useContext } from 'react';

/**
 * A context for recording the current group level.
 *
 * This information, for example, can be used to determine which background color to use on the current component.
 */
export const GroupLevelContext = createContext<number | undefined>(undefined);

/**
 * Returns the current group level.
 *
 * This information, for example, can be used to determine which background color to use on the current component.
 */
export function useGroupLevel(): number | undefined {
  return useContext(GroupLevelContext);
}

export default GroupLevelContext;
