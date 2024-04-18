import React, { useContext } from 'react';

/**
 * Context which holds the height of the header.
 *
 * * `undefined` means that the height is not shown or should not be considered on the current platform.
 * * `0` means that the header is shown but is static.
 * * Any other number is the height of the absolute (fixed) header.
 */
export const HeaderHeightContext = React.createContext<number | undefined>(
  undefined,
);

/**
 * Hook to get the height of the header on the current screen.
 *
 * * `undefined` means that the height is not shown or should not be considered on the current platform.
 * * `0` means that the header is shown but is static.
 * * Any other number is the height of the absolute (fixed) header.
 */
export function useHeaderHeight() {
  return useContext(HeaderHeightContext);
}
