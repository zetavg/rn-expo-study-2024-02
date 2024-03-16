import { createContext } from 'react';

export const IconPlatformContext = createContext<'ios' | 'android' | undefined>(
  undefined,
);

export default IconPlatformContext;
