import type { Config } from 'jest';

import { jestBaseConfig } from '@rnstudy/jest-config';

const baseConfig = jestBaseConfig({ dirname: __dirname });

const config: Config = {
  ...baseConfig,
};

export default config;
