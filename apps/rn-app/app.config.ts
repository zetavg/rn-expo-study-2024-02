import { readFileSync, writeFileSync } from 'fs';
import { join, resolve } from 'path';

import { withAppBuildGradle, withDangerousMod } from '@expo/config-plugins';
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
  version: config.version || '0.0.1',
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
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    ...productConfig.android,
  },
  plugins: [withInjectToPodfile, withAndroidDynamicProperties],
  extra: {
    ...config.extra,
  },
});

function withInjectToPodfile(config: ExpoConfig) {
  return withDangerousMod(config, [
    'ios',
    async (config) => {
      const filePath = join(config.modRequest.platformProjectRoot, 'Podfile');
      let contents = readFileSync(filePath, 'utf-8');

      // Find the `post_install` block and inject code into it
      const postInstallStart = contents.indexOf('post_install do |installer|');
      if (postInstallStart !== -1) {
        // Calculate the insertion point immediately after `post_install do |installer|`
        const insertionPoint = contents.indexOf('\n', postInstallStart) + 1;
        // Insert the code at the calculated insertion point
        contents =
          contents.slice(0, insertionPoint) +
          podfile_post_install +
          '\n' +
          contents.slice(insertionPoint);
      }

      writeFileSync(filePath, contents);
      return config;
    },
  ]);
}

const podfile_post_install = `
    installer.pods_project.targets.each do |target|
      target.build_configurations.each do |config|
        # Using the un-qualified names means you can swap in different implementations, for example ccache
        config.build_settings["CC"] = "clang"
        config.build_settings["LD"] = "clang"
        config.build_settings["CXX"] = "clang++"
        config.build_settings["LDPLUSPLUS"] = "clang++"
      end
    end
`;

function withAndroidDynamicProperties(config: ExpoConfig) {
  return withAppBuildGradle(config, (config) => {
    const android_signing_configs_regex =
      /\s*signingConfigs\s*\{\s*(debug|release)\s*\{[^}]*\}\s*\}\n*/;

    if (!android_signing_configs_regex.test(config.modResults.contents)) {
      throw new Error(
        'Pattern not found. Cannot replace the signingConfigs block.',
      );
    }

    config.modResults.contents = config.modResults.contents.replace(
      android_signing_configs_regex,
      android_signing_configs,
    );

    const android_signing_config_regex =
      /signingConfig signingConfigs.(debug|release)/g;

    const android_signing_config_regex_matches =
      config.modResults.contents.match(android_signing_config_regex);

    if (android_signing_config_regex_matches?.length !== 2) {
      throw new Error(
        `Expected 2 matches for ${android_signing_config_regex}, but found ${android_signing_config_regex_matches?.length}`,
      );
    }

    config.modResults.contents = config.modResults.contents.replace(
      android_signing_config_regex,
      'signingConfig signingConfigs.release',
    );

    return config;
  });
}

const android_signing_configs = `
    signingConfigs {
        release {
            storeFile file(KEYSTORE_FILE)
            storePassword KEYSTORE_PASSWORD
            keyAlias KEY_ALIAS
            keyPassword KEY_PASSWORD
        }
    }
`;
