/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Meta } from '@storybook/react';

import getArgTypes from './getArgTypes';

/**
 * This function can be used to re-use argTypes from another story.
 *
 * This is useful when you have a component that uses another component as a prop - in such case, this is often used together with `collectPropsFromArgs`.
 *
 * Example:
 *
 * ```tsx
 * import React from 'react';
 *
 * import { argTypesFrom, collectPropsFromArgs } from '@rnstudy/react-utils';
 * import { Meta } from '@rnstudy/storybook-rn-types';
 *
 * import { Icon, type IconProps } from '../Icon';
 * import IconMeta from '../Icon/Icon.stories';
 *
 * import Button from './Button';
 *
 * const meta: Meta<typeof Button> = {
 *   title: 'UI/Components/Button',
 *   component: Button,
 *   argTypes: {
 *     label: { control: 'text' },
 *     ...argTypesFrom(IconMeta, {
 *       prefix: '__props:children:Icon.',
 *       exclude: ['size', 'color'],
 *     }),
 *   },
 *   render: (args) => {
 *     const iconProps = collectPropsFromArgs<IconProps>(
 *       args,
 *       '__props:children:Icon.',
 *     );
 *
 *     return <Button {...args} icon={<Icon {...iconProps} />} />;
 *   },
 * };
 * ```
 */
export function argTypesFrom<T>(
  storyMeta: Meta<T>,
  { prefix, exclude }: { prefix: string; exclude?: ReadonlyArray<keyof T> },
): any {
  const argTypes = getArgTypes(storyMeta);
  return Object.fromEntries(
    Object.entries(argTypes)
      .filter(([key]) => !exclude?.includes(key as keyof T))
      .map(([key, value]) => [`${prefix}${key}`, value]),
  );
}

export default argTypesFrom;
