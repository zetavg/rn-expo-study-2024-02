import { enhanceArgTypes } from '@storybook/docs-tools';
import type { Meta } from '@storybook/react';
import { parameters as defaultParameters } from '@storybook/react/dist/entry-preview-docs';

/**
 * This function is used to get the complete argTypes object for a story. It uses Storybook internal functions to generate argTypes from the component's props definitions (`__docgenInfo` generated with `babel-plugin-react-docgen`, for example), and merge them with the story's manually defined argTypes.
 */
export function getArgTypes<T>(storyMeta: Meta<T>) {
  return enhanceArgTypes({
    initialArgs: {},
    componentId: '',
    kind: '',
    name: '',
    story: '',
    ...storyMeta,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    argTypes: (storyMeta.argTypes || {}) as any,
    title: storyMeta.title || '',
    id: storyMeta.id || '',
    tags: storyMeta.tags || [],
    parameters: { ...storyMeta.parameters, ...defaultParameters },
  });
}

export default getArgTypes;
