import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

import { withAppBuildGradle, withDangerousMod } from '@expo/config-plugins';
import type { ConfigContext, ExpoConfig } from 'expo/config';
import { withPlugins } from 'expo/config-plugins';

import { withDefaultPlugins } from '@rnstudy/expo-app-config';

export default ({ config }: ConfigContext): ExpoConfig =>
  withPlugins(
    {
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
      ios: {
        supportsTablet: true,
        config: {
          usesNonExemptEncryption: false,
        },
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
      },
      extra: {
        ...config.extra,
      },
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
            // Header `blurEffect` of react-native-screens (used by @react-navigation/native-stack) is not supported in the new architecture yet.
            // See: https://github.com/software-mansion/react-native-screens/blob/421e22c61243a8c0761c786ccb68c3b209aa1131/ios/RNSScreenStackHeaderConfig.mm#L385-L387
            newArchEnabled: false,
          },
          android: {
            // `@react-navigation/native-stack` isn't working with the new architecture on some Android devices.
            newArchEnabled: false,
          },
        },
      ],
      withInjectToPodfile,
      withAndroidDynamicProperties,
    ],
  );

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
            storeFile file(project.hasProperty('KEYSTORE_FILE') ? KEYSTORE_FILE : 'debug.keystore')
            storePassword project.hasProperty('KEYSTORE_PASSWORD') ? KEYSTORE_PASSWORD : 'android'
            keyAlias project.hasProperty('KEY_ALIAS') ? KEY_ALIAS : 'androiddebugkey'
            keyPassword project.hasProperty('KEY_PASSWORD') ? KEY_PASSWORD : 'android'
        }
    }
`;
