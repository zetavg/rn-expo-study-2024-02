const { withAppBuildGradle } = require('@expo/config-plugins');

/**
 * Allows customizing the Android signingConfig with Gradle properties.
 *
 * @param {import('expo/config').ExpoConfig} config
 * @returns {import('expo/config').ExpoConfig} The modified Expo configuration object.
 */
function withAndroidCustomizableSigningConfig(config) {
  return withAppBuildGradle(config, (cfg) => {
    const android_signing_configs_regex =
      /\s*signingConfigs\s*\{\s*(debug|release)\s*\{[^}]*\}\s*\}\n*/;

    if (!android_signing_configs_regex.test(cfg.modResults.contents)) {
      throw new Error(
        'Pattern not found. Cannot replace the signingConfigs block.',
      );
    }

    cfg.modResults.contents = cfg.modResults.contents.replace(
      android_signing_configs_regex,
      android_signing_configs,
    );

    const android_signing_config_regex =
      /signingConfig signingConfigs.(debug|release)/g;

    const android_signing_config_regex_matches = cfg.modResults.contents.match(
      android_signing_config_regex,
    );

    if (android_signing_config_regex_matches?.length !== 2) {
      throw new Error(
        `Expected 2 matches for ${android_signing_config_regex}, but found ${android_signing_config_regex_matches?.length}`,
      );
    }

    cfg.modResults.contents = cfg.modResults.contents.replace(
      android_signing_config_regex,
      'signingConfig signingConfigs.release',
    );

    return cfg;
  });
}

const android_signing_configs = `
    signingConfigs {
        release {
            storeFile file(project.hasProperty('KEYSTORE_FILE') ? KEYSTORE_FILE : 'debug.keystore')
            storePassword project.hasProperty('KEYSTORE_PASSWORD') ? KEYSTORE_PASSWORD : 'android'
            keyAlias project.hasProperty('KEY_ALIAS') ? KEY_ALIAS : 'androiddebugkey'
            keyPassword project.hasProperty('KEY_PASSWORD') ? KEY_PASSWORD : 'android'
        }
    }
`;

exports.default = withAndroidCustomizableSigningConfig;
