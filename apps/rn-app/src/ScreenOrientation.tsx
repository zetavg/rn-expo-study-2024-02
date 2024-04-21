import { useLayoutEffect } from 'react';
import DeviceInfo from 'react-native-device-info';
import {
  lockAsync,
  OrientationLock,
  unlockAsync,
} from 'expo-screen-orientation';

/**
 * A component that sets/locks the screen orientation.
 *
 * Note: also see the "expo-screen-orientation" config in `app.config.ts`.
 */
export function ScreenOrientation() {
  useLayoutEffect(() => {
    const isTablet = DeviceInfo.isTablet();

    if (!isTablet) {
      lockAsync(OrientationLock.PORTRAIT_UP);
    } else {
      unlockAsync();
    }

    return () => {
      unlockAsync();
    };
  }, []);

  return null;
}

export default ScreenOrientation;
