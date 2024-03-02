/**
 * Automatically set the Android versionCode based on the app version.
 *
 * @param {import('expo/config').ExpoConfig} config
 * @returns {import('expo/config').ExpoConfig} The modified Expo configuration object.
 */
function withAutoAndroidVersionCode(config) {
  return {
    ...config,
    android: {
      ...config.android,
      versionCode: ((version) => {
        const [major, minor, patch] = version
          .split('.')
          .map((v) => parseInt(v, 10));

        if ((major || 0) > 100) {
          throw new Error(`Major version must be less than 100: ${version}`);
        }

        if ((minor || 0) > 999) {
          throw new Error(`Minor version must be less than 999: ${version}`);
        }

        if ((patch || 0) > 99) {
          throw new Error(`Patch version must be less than 99: ${version}`);
        }

        return (
          (major || 0) * 10000000 + (minor || 0) * 10000 + (patch || 0) * 100
        );
      })(config.version || '0.0.1'),
    },
  };
}

exports.default = withAutoAndroidVersionCode;
