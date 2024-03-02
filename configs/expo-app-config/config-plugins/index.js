const { withPlugins } = require('expo/config-plugins');

const withProductJson = require('./withProductJson').default;
const withAutoAndroidVersionCode =
  require('./withAutoAndroidVersionCode').default;
const withAndroidCustomizableSigningConfig =
  require('./withAndroidCustomizableSigningConfig').default;
const withIOSBuildCacheSupport = require('./withIOSBuildCacheSupport').default;

/**
 * Applies a default set of plugins.
 *
 * @param {import('expo/config').ExpoConfig} config
 * @param {Object} options - The options object.
 * @param {string} options.dirname - Pass `__dirname` in `app.config.ts`.
 * @param {string} [options.environment] - An environment, should be one of the keys in `product.json5`.
 * @returns {import('expo/config').ExpoConfig} The modified Expo configuration object.
 */
function withDefaultPlugins(config, { dirname, environment }) {
  return withPlugins(config, [
    // List of plugins and their inputs
    [withProductJson, { dirname, environment }],
    withAutoAndroidVersionCode,
    withAndroidCustomizableSigningConfig,
    withIOSBuildCacheSupport,
  ]);
}

exports.default = withDefaultPlugins;
