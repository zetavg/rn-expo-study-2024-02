import { createContext, useContext } from 'react';

/**
 * On iOS, there are two sets of background colors — *system* and *grouped*. This context is used to specify which set of background colors should be used when rendering child components.
 */
export const IsGroupedBackgroundContext = createContext<boolean>(true);

/**
 * Whether we should use the *grouped* background colors under the current context. (See: https://developer.apple.com/design/human-interface-guidelines/color#iOS-iPadOS)
 */
export function useIsGroupedBackground(): boolean {
  return useContext(IsGroupedBackgroundContext);
}

export default IsGroupedBackgroundContext;
