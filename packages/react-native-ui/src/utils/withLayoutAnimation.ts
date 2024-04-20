import { LayoutAnimationConfig, Platform } from 'react-native';

import configureNextLayoutAnimation from './configureNextLayoutAnimation';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function withLayoutAnimation<FN extends (...args: any) => any>(
  fn: FN,
  config?: Partial<LayoutAnimationConfig> & {
    onlyOnNativePlatforms?: readonly (typeof Platform.OS)[];
  },
): FN {
  return ((...args) => {
    configureNextLayoutAnimation(config);
    return fn(...args);
  }) as FN;
}

export default withLayoutAnimation;
