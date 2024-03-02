# Metro Config

This package provides a shared Metro bundler configuration for all workspaces in the monorepo.

## Install

```bash
yarn add @rnstudy/metro-config --dev
```

Then, add the following to your `metro.config.js`:

```js
const { getMetroConfig } = require('@rnstudy/metro-config');

module.exports = (async () => {
  /** @type {import('expo/metro-config').MetroConfig} */
  const config = await getMetroConfig(__dirname);

  return config;
})();
```
