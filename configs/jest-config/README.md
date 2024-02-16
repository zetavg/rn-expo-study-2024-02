# Jest Config

This package provides some shared Jest configurations for all workspaces in the monorepo.

## Install

```bash
yarn add @rnstudy/jest-config --dev && yarn constraints --fix && yarn
```

Then, add the following to your `jest.config.ts`:

```ts
import type { Config } from 'jest';

import { jestBaseConfig } from '@rnstudy/jest-config';

const baseConfig = jestBaseConfig({ dirname: __dirname });

const config: Config = {
  ...baseConfig,
};

export default config;
```
