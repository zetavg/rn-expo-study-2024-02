import type React from 'react';
import type { ViewStyle } from 'react-native';
import type { Meta as SBMeta, StoryObj as SBStoryObj } from '@storybook/react';
import type { Parameters as SBParameters } from '@storybook/types';

export type StoryParameters = SBParameters & {
  storyContainer?: 'default' | 'basic' | 'none';
  containerStyle?: ViewStyle;
  containerVerticalAlign?: 'top' | 'middle' | 'bottom';
  containerBackground?: 'none' | 'transparent' | 'grouped';
};

export type ArgType = {
  name?: string;
  description?: string;
} & (
  | { control: false }
  | { control: 'boolean' }
  | {
      control: {
        type: 'number' | 'range';
        min?: number;
        max?: number;
        step?: number;
      };
    }
  | { control: 'text' }
  | {
      control: 'select';
      options: (string | undefined | null)[];
      mapping?: Record<string, unknown>;
    }
  | { control: { type: 'color'; presetColors: string[] } }
  | { control: 'object' }
);

export type Meta<T> = Omit<SBMeta<T>, 'argTypes' | 'args' | 'render'> & {
  parameters?: StoryParameters;
  /**
   * ArgTypes encode basic metadata for args, such as `name`, `description`, `control`, `options` for an arg. These get automatically filled in by Storybook Docs.
   * @see — [Control annotations](https://storybook.js.org/docs/essentials/controls#annotation)
   */
  argTypes?: { [key: string]: ArgType } & {
    [key: `__${string}`]: ArgType;
  };
  /**
   * Dynamic data that are provided (and possibly updated by) Storybook and its addons.
   *
   * Name a arg with `__` prefix for args that are not a prop of the component.
   */
  args?: SBMeta<T>['args'] & { [key: `__${string}`]: unknown };
  /**
   * Define a custom render function for the story(ies). If not passed, a default render function by the renderer will be used.
   */
  render?: (
    args: Parameters<SBMeta<T>['render']>[0] & {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [key: `__${string}`]: any;
    },
  ) => ReturnType<SBMeta<T>['render']>;
  /** A React element which renders a specification of the component and can be displayed as an overlay in the Storybook UI. */
  specOverlay?: JSX.Element;
};

export type StoryObj<T> = Meta<T> &
  Omit<SBStoryObj<T>, 'argTypes' | 'args' | 'render'>;
