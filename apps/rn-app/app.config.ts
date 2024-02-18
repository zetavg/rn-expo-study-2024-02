import { readFileSync } from 'fs';
import { resolve } from 'path';

import type { ConfigContext, ExpoConfig } from 'expo/config';
import JSON5 from 'json5';

const product = JSON5.parse(
  readFileSync(resolve(__dirname, 'product.json5'), 'utf8'),
);

let productConfig = product[process.env.ENVIRONMENT || 'default'];

if (!productConfig) {
  if (process.env.ENVIRONMENT === 'develop') {
    productConfig = product['development'];
  }
}

if (!productConfig) {
  throw new Error(
    `Invalid environment: "${process.env.ENVIRONMENT}". Environment must be one of [${Object.keys(
      product,
    )
      .map((env) => `"${env}"`)
      .join(', ')}] (defined in product.json5).`,
  );
}

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'rn-app',
  slug: 'rn-app',
  version: config.version || '1.0.0',
  orientation: 'default',
  userInterfaceStyle: 'automatic',
  icon: './assets/icon.png',
  primaryColor: '#cccccc',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  assetBundlePatterns: ['**/*'],
  ...productConfig,
  ios: {
    supportsTablet: true,
    config: {
      usesNonExemptEncryption: false,
      ...productConfig.ios?.config,
    },
    ...productConfig.ios,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    ...productConfig.android,
  },
});
