# Expo Config

This package provides some shared Expo config plugins for all workspaces in the monorepo.

## Install

```bash
yarn add @rnstudy/expo-app-config --dev
```

And use it in `app.config.ts` like this:

```ts
import type { ConfigContext, ExpoConfig } from 'expo/config';
import { withPlugins } from 'expo/config-plugins';

import { withDefaultPlugins } from '@rnstudy/expo-app-config';

export default ({ config }: ConfigContext): ExpoConfig =>
  withPlugins(
    {
      name: 'App',
      slug: 'app',
      ...config,
    },
    [
      [
        withDefaultPlugins,
        { dirname: __dirname, environment: process.env.ENVIRONMENT },
      ],
      [
        'expo-build-properties',
        {
          ios: {
            newArchEnabled: false,
          },
          android: {
            newArchEnabled: false,
          },
        },
      ],
      // ... add other plugins here
    ],
  );
```
