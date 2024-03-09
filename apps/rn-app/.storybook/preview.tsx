import React from 'react';
import { Preview } from '@storybook/react';

import StoryContainer from '@rnstudy/storybook-rn/src/StoryContainer';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },

  decorators: [
    (Story, { parameters }) => (
      <StoryContainer parameters={parameters} story={Story} />
    ),
  ],
};

export default preview;
