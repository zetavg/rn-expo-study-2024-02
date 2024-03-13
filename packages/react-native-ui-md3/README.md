# React Native UI - Material Design 3

This package provides a set of components and utilities to build a React Native app with Material Design 3.

## Installation

```bash
yarn add @rnstudy/react-native-ui-md3
```

### Using background color

Wrap your root view of a screen with `BackgroundColor` to get and apply the screen's background color. Such as:

```jsx
import React from 'react';
import { ScrollView } from 'react-native';

import { BackgroundColor } from '@rnstudy/react-native-ui-md3';

export default function MyScreen() {
  return (
    <BackgroundColor
      root
      grouped // In general, use this when you have a grouped table view.
    >
      {(backgroundColor) => (
        <ScrollView style={{ backgroundColor }}>
          <>{/* ... */}</>
        </ScrollView>
      )}
    </BackgroundColor>
  );
}
```

The `BackgroundColor` component not only provides the background for the current view, but also maintains context values for its children automatically, so that components used within the view can use the correct background based on the context.

Notes:

* You should set the `root` prop in this case. By doing so, the group level of the current element will be reset, and we can ensure that the provided color is the one that should be used as the root background color of the screen.
* The `grouped` prop specifies which set of background colors should be used. There are two sets of dynamic background colors — *system* and *grouped*. In general, the grouped background colors should be used when you have a grouped table view.

### Applying design token context to the whole app

To switch between the set of design tokens, such as changing the app's color theme or font size, wrap your root component with `TokensContextProvider` to use a specific set of design tokens.

```jsx
import React from 'react';

import { md3BaselineTheme, ThemeProvider } from '@rnstudy/react-native-ui-md3';

import App from '...';

export default function Main() {
  return (
    <ThemeProvider theme={md3BaselineTheme} colorScheme="light">
      <App />
    </ThemeProvider>
  );
}
```
