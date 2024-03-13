import { createContext, useContext } from 'react';
import { Platform } from 'react-native';

export type UIPlatform = 'ios' | 'android';

export const AVAILABLE_UI_PLATFORMS: readonly [UIPlatform, ...UIPlatform[]] =
  (() => {
    switch (Platform.OS) {
      case 'ios':
        return ['ios', 'android'];
      case 'android':
      default:
        return ['android'];
    }
  })();

export const UIPlatformContext = createContext(AVAILABLE_UI_PLATFORMS[0]);

export function useUIPlatform(): UIPlatform {
  return useContext(UIPlatformContext);
}

export default UIPlatformContext;
