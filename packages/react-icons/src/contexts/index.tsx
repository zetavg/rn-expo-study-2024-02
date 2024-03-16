import React from 'react';

import { IconTheme } from '../types';

import IconPlatformContext from './IconPlatformContext';
import IconThemeContext from './IconThemeContext';

export { IconPlatformContext } from './IconPlatformContext';

export function IconContextProvider(props: {
  children: React.ReactNode;
  platform: 'ios' | 'android';
  theme: IconTheme;
}) {
  return (
    <IconPlatformContext.Provider value={props.platform}>
      <IconThemeContext.Provider value={props.theme}>
        {props.children}
      </IconThemeContext.Provider>
    </IconPlatformContext.Provider>
  );
}
