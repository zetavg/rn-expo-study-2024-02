import { useIsElevatedBackground as useIsElevatedBackgroundIOS } from '@rnstudy/react-native-ui-ios';

// import { useIsElevatedBackground as useIsElevatedBackgroundMD3 } from '@rnstudy/react-native-ui-md3';
import { useUIPlatform } from '../contexts';

export function useIsElevatedBackground(): boolean {
  const uiPlatform = useUIPlatform();

  const iosIsElevatedBackground = useIsElevatedBackgroundIOS();
  // const md3IsElevatedBackground = useIsElevatedBackgroundMD3();

  switch (uiPlatform) {
    case 'ios':
      return iosIsElevatedBackground;
    case 'android':
      // return md3IsElevatedBackground;
      return false;
  }
}

export default useIsElevatedBackground;
