import { createContext } from 'react';

import { IconProps } from './types';

export const IconPropsContext = createContext<Partial<IconProps>>({});
