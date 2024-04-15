import { LayoutAnimationConfig } from 'react-native';

import configureNextLayoutAnimation from './configureNextLayoutAnimation';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function withLayoutAnimation<FN extends (...args: any) => any>(
  fn: FN,
  config?: Partial<LayoutAnimationConfig>,
): FN {
  return ((...args) => {
    configureNextLayoutAnimation(config);
    return fn(...args);
  }) as FN;
}

export default withLayoutAnimation;
