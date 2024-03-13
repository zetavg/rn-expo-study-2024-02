# React Native UI

This is a high-level UI package that provides universal and semantic UI components.

## Guidelines

* It's API is designed to let developers describe the purpose of the UI instead of the visual appearance.
* Renders the UI differently based on the platform (iOS or Android), giving the user a native-like experience on different platforms while developers only need to write one UI code.

## Installation

```bash
yarn add @rnstudy/react-native-ui
```

### Applying the theme

To switch between the set of design tokens, such as changing the app's color theme or font size, wrap your root component with `TokensContextProvider` to use a specific set of design tokens.

```jsx
import React from 'react';

import { baselineTheme, UIContextProvider } from '@rnstudy/react-native-ui';

import App from '...';

export default function Main() {
  return (
    <UIContextProvider theme={baselineTheme} colorScheme="light">
      <App />
    </UIContextProvider>
  );
}
```

### Using background color

Wrap your root view of a screen with `BackgroundColor` to get and apply the screen's background color. Such as:

```jsx
import React from 'react';
import { ScrollView } from 'react-native';

import { BackgroundColor } from '@rnstudy/react-native-ui';

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
* The `grouped` prop specifies which set of background colors should be used. There are two sets of dynamic background colors — *system* and *grouped*. In general, the grouped background colors should be used when you have a grouped table view. See: https://developer.apple.com/design/human-interface-guidelines/color#iOS-iPadOS.
