const { readFileSync } = require('fs');
const { resolve } = require('path');

const JSON5 = require('json5');

/**
 * This plugin reads the product.json5 file and applies the configuration for the current environment, allowing product-related and environment-specific configurations.
 *
 * @param {import('expo/config').ExpoConfig} config
 * @param {Object} options - The options object.
 * @param {string} options.dirname - Pass `__dirname` in `app.config.ts`.
 * @param {string} [options.environment] - An environment, should be one of the keys in `product.json5`.
 * @returns {import('expo/config').ExpoConfig} The modified Expo configuration object.
 */
function withProductJson(config, { dirname, environment }) {
  const product = JSON5.parse(
    readFileSync(resolve(dirname, 'product.json5'), 'utf8'),
  );

  let productConfig = product[environment || 'default'];

  if (!productConfig) {
    if (environment === 'develop') {
      productConfig = product['development'];
    }
  }

  if (!productConfig) {
    throw new Error(
      `Invalid environment: "${environment}". Environment must be one of [${Object.keys(
        product,
      )
        .map((env) => `"${env}"`)
        .join(', ')}] (defined in product.json5).`,
    );
  }

  return {
    ...config,
    ...productConfig,
    ios: {
      ...config.ios,
      ...productConfig.ios,
      config: {
        usesNonExemptEncryption: false,
        ...productConfig.ios?.config,
      },
    },
    android: {
      ...config,
      ...productConfig.android,
    },
  };
}

exports.default = withProductJson;
