import React, { forwardRef, useContext } from 'react';

import { IconPlatformContext } from '../../contexts';

import type { IconRNType } from './IconRN';
import { IconProps } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Icon = forwardRef<any, IconProps>(function Icon(
  props: IconProps,
  ref,
): JSX.Element | null {
  const iconPlatform = useContext(IconPlatformContext);

  if (!iconPlatform) {
    throw new Error(
      'Icon: No IconPlatformContext provided. Make sure to wrap your app in IconContextProvider and the platform prop is correctly set.',
    );
  }

  if (iconPlatform === 'ios' || iconPlatform === 'android') {
    const IconRN: IconRNType = (() => {
      // Use dynamic import to avoid loading the file on unsupported platforms.
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      return require('./IconRN').IconRN;
    })();

    return <IconRN ref={ref} {...props} />;
  }

  throw new Error(`Icon: Unsupported platform: ${iconPlatform}`);
});

export default Icon;
